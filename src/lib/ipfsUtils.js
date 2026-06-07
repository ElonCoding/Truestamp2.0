'use client';

/**
 * ipfsUtils.js — Client-side PDF validation, cryptographic hashing,
 * and real Lighthouse IPFS upload utilities.
 */

// ─── PDF Integrity Validation ────────────────────────────────────────────────

/**
 * Validate that a file begins with the PDF magic bytes (%PDF)
 * @param {File} file
 * @returns {Promise<boolean>}
 */
export async function validatePDF(file) {
  try {
    const chunk = file.slice(0, 4);
    const buffer = await chunk.arrayBuffer();
    const bytes = new Uint8Array(buffer);
    // %PDF = 0x25 0x50 0x44 0x46
    return bytes[0] === 0x25 && bytes[1] === 0x50 && bytes[2] === 0x44 && bytes[3] === 0x46;
  } catch {
    return false;
  }
}

/**
 * Validate file size (max 50 MB by default)
 * @param {File} file
 * @param {number} maxMB
 * @returns {boolean}
 */
export function validateFileSize(file, maxMB = 50) {
  return file.size <= maxMB * 1024 * 1024;
}

/**
 * Validate a list of files: PDF magic bytes + size limit
 * Returns { valid: File[], invalid: { file, reason }[] }
 * @param {File[]} files
 */
export async function validateFiles(files) {
  const valid = [];
  const invalid = [];
  for (const file of files) {
    if (!validateFileSize(file)) {
      invalid.push({ file, reason: `Exceeds 50 MB size limit (${(file.size / 1024 / 1024).toFixed(1)} MB)` });
      continue;
    }
    if (file.type === 'application/pdf' || file.name.toLowerCase().endsWith('.pdf')) {
      const isValidPDF = await validatePDF(file);
      if (!isValidPDF) {
        invalid.push({ file, reason: 'Invalid PDF: file header mismatch (not a real PDF)' });
        continue;
      }
    }
    valid.push(file);
  }
  return { valid, invalid };
}

// ─── Cryptographic Hashing ────────────────────────────────────────────────────

/**
 * Compute keccak256 hash of a file (for blockchain storage)
 * Uses ethers.js which must be available in the bundle.
 * @param {File} file
 * @returns {Promise<string>} 0x-prefixed hex hash
 */
export async function keccak256File(file) {
  const { ethers } = await import('ethers');
  const buffer = await file.arrayBuffer();
  const bytes = new Uint8Array(buffer);
  return ethers.keccak256(bytes);
}

/**
 * Compute SHA-256 hash of a file (standard, for display/audit)
 * Uses native Web Crypto API (no dependencies)
 * @param {File} file
 * @returns {Promise<string>} hex string
 */
export async function sha256File(file) {
  const buffer = await file.arrayBuffer();
  const hashBuffer = await crypto.subtle.digest('SHA-256', buffer);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

/**
 * Hash all files in parallel (keccak256 + sha256)
 * @param {File[]} files
 * @param {function} onProgress - called with (index, total)
 * @returns {Promise<{ name, size, keccak, sha256 }[]>}
 */
export async function hashFiles(files, onProgress) {
  const results = [];
  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    const [keccak, sha256] = await Promise.all([
      keccak256File(file),
      sha256File(file),
    ]);
    results.push({
      name: file.name,
      size: file.size,
      type: file.type,
      keccak,
      sha256,
    });
    onProgress?.(i + 1, files.length);
  }
  return results;
}

// ─── Merkle Tree ─────────────────────────────────────────────────────────────

/**
 * Build a Merkle root from an array of keccak256 hashes.
 * Follows OpenZeppelin sort-pair convention.
 * @param {string[]} hashes - array of 0x-prefixed hex hashes
 * @returns {string} 0x-prefixed Merkle root
 */
export function buildMerkleRoot(hashes) {
  if (!hashes.length) {
    return '0x' + '0'.repeat(64);
  }

  // Lazy import ethers to avoid SSR issues
  const ethersModule = require('ethers');
  const { ethers } = ethersModule;

  let layer = hashes.map(h => ethers.getBytes(h));
  while (layer.length > 1) {
    const next = [];
    for (let i = 0; i < layer.length; i += 2) {
      const left = layer[i];
      const right = i + 1 < layer.length ? layer[i + 1] : layer[i];
      const sorted =
        Buffer.compare(left, right) <= 0
          ? ethers.concat([left, right])
          : ethers.concat([right, left]);
      next.push(ethers.getBytes(ethers.keccak256(sorted)));
    }
    layer = next;
  }
  return ethers.hexlify(layer[0]);
}

// ─── IPFS + Filecoin Upload via Server Proxy ─────────────────────────────────
// Client → /api/ipfs/upload (our Next.js API route) → Lighthouse node (server-side)
// This avoids CORS issues: browser never talks to node.lighthouse.storage directly.
// Lighthouse automatically pins to IPFS and creates Filecoin storage deals.

const UPLOAD_PROXY = '/api/ipfs/upload';

/**
 * Upload files to IPFS+Filecoin via server-side Lighthouse proxy.
 * Returns { cid, name, size } on success.
 * @param {File[]} files
 * @param {function} onProgress - called with (0-100)
 * @returns {Promise<{ cid: string, name: string, size: string }>}
 */
export async function uploadToLighthouse(files, onProgress) {
  const formData = new FormData();
  for (const file of files) {
    formData.append('file', file, file.name);
  }

  // XHR for real upload progress (client → our server)
  const result = await new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();

    xhr.upload.addEventListener('progress', (e) => {
      if (e.lengthComputable) {
        // Show 0-90% for upload, reserve 90-100% for server→Lighthouse
        onProgress?.(Math.round((e.loaded / e.total) * 90));
      }
    });

    xhr.addEventListener('load', () => {
      if (xhr.status < 200 || xhr.status >= 300) {
        let errorMsg = `IPFS upload failed: HTTP ${xhr.status}`;
        try {
          const body = JSON.parse(xhr.responseText);
          if (body.error) errorMsg = body.error;
        } catch {}
        reject(new Error(errorMsg));
        return;
      }
      try {
        const body = JSON.parse(xhr.responseText);
        if (!body.success || !body.data?.Hash) {
          reject(new Error(body.error || 'Lighthouse returned no CID.'));
          return;
        }
        onProgress?.(100);
        resolve(body.data);
      } catch (parseErr) {
        reject(new Error(`Response parse error: ${parseErr.message}`));
      }
    });

    xhr.addEventListener('error', () => {
      reject(new Error('Upload failed: could not reach server. Check if dev server is running.'));
    });

    xhr.addEventListener('timeout', () => {
      reject(new Error('Upload timed out. Try again or reduce file size.'));
    });

    xhr.open('POST', UPLOAD_PROXY);
    xhr.timeout = 180_000; // 3 min (includes server→Lighthouse time)
    xhr.send(formData);
  });

  return {
    cid: result.Hash,
    name: result.Name,
    size: result.Size,
  };
}

/**
 * Upload JSON metadata to IPFS+Filecoin via server proxy.
 * @param {object} metadata
 * @returns {Promise<string>} CID
 */
export async function uploadMetadataToLighthouse(metadata) {
  const jsonString = JSON.stringify(metadata, null, 2);
  const blob = new Blob([jsonString], { type: 'application/json' });
  const file = new File([blob], 'metadata.json', { type: 'application/json' });

  const formData = new FormData();
  formData.append('file', file, 'metadata.json');

  const response = await fetch(UPLOAD_PROXY, {
    method: 'POST',
    body: formData,
  });

  if (!response.ok) {
    const err = await response.json().catch(() => ({}));
    throw new Error(err.error || `Metadata upload failed: HTTP ${response.status}`);
  }

  const body = await response.json();
  return body.data?.Hash ?? null;
}

/**
 * Build a publicly accessible Lighthouse/IPFS gateway URL from a CID.
 * @param {string} cid
 * @returns {string}
 */
export function lighthouseGatewayUrl(cid) {
  return `https://gateway.lighthouse.storage/ipfs/${cid}`;
}

