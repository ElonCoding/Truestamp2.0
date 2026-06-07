/**
 * lighthouse.js — IPFS upload helpers for the issue-nft flow.
 * All uploads route through /api/ipfs/upload (server-side proxy)
 * to avoid CORS issues with node.lighthouse.storage.
 */

const UPLOAD_PROXY = '/api/ipfs/upload';

/**
 * Upload a File to IPFS via server proxy.
 * Returns ipfs://<CID>
 * @param {File} file
 * @returns {Promise<string>}
 */
export async function uploadFileToIPFS(file) {
  if (!file) throw new Error('No file provided');

  const formData = new FormData();
  formData.append('file', file, file.name);

  const res = await fetch(UPLOAD_PROXY, { method: 'POST', body: formData });
  const body = await res.json().catch(() => ({}));

  if (!res.ok || !body.success || !body.data?.Hash) {
    throw new Error(body.error || `IPFS upload failed: HTTP ${res.status}`);
  }

  return `ipfs://${body.data.Hash}`;
}

/**
 * Upload a JSON metadata object to IPFS via server proxy.
 * Returns ipfs://<CID>
 * @param {object} metadataObject
 * @returns {Promise<string>}
 */
export async function uploadMetadataToIPFS(metadataObject) {
  const blob = new Blob([JSON.stringify(metadataObject, null, 2)], {
    type: 'application/json',
  });
  const metadataFile = new File([blob], 'metadata.json', {
    type: 'application/json',
  });

  const formData = new FormData();
  formData.append('file', metadataFile, 'metadata.json');

  const res = await fetch(UPLOAD_PROXY, { method: 'POST', body: formData });
  const body = await res.json().catch(() => ({}));

  if (!res.ok || !body.success || !body.data?.Hash) {
    throw new Error(body.error || `Metadata upload failed: HTTP ${res.status}`);
  }

  return `ipfs://${body.data.Hash}`;
}

/**
 * Legacy export — back-compat with any existing callers.
 * Returns raw CID (no ipfs:// prefix).
 * @param {File|FileList} file
 * @returns {Promise<string>}
 */
export async function uploadToIPFS(file) {
  const f = file instanceof File ? file : Array.from(file)[0];
  const url = await uploadFileToIPFS(f);
  return url.replace('ipfs://', '');
}
