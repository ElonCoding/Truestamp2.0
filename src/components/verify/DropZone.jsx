'use client';

import { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Search, Upload, File, X, Zap } from 'lucide-react';
import LoadingSpinner from '../shared/LoadingSpinner';
import { ethers } from 'ethers';
import { TruestampContract } from '../../lib/contract';

export default function DropZone({ onVerify }) {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const onDrop = useCallback((accepted) => {
    if (accepted[0]) setFile(accepted[0]);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    multiple: false,
    accept: {
      'application/pdf': ['.pdf'],
      'image/*': ['.png', '.jpg', '.jpeg', '.webp'],
      'application/msword': ['.doc', '.docx'],
    },
    maxSize: 50 * 1024 * 1024, // 50MB
  });

  const handleVerify = async () => {
    if (!file) return;
    setLoading(true);

    try {
      // ── Step 1: keccak256 hash the file ──
      const buffer = await file.arrayBuffer();
      const bytes = new Uint8Array(buffer);
      const docHash = ethers.keccak256(bytes); // bytes32 hex string

      // ── Step 2: Query on-chain documentIndex(docHash) ──
      // documentIndex returns the batchId (uint256); 0 means not found
      const provider = new ethers.BrowserProvider(window.ethereum);
      const contract = new ethers.Contract(
        TruestampContract.address,
        TruestampContract.abi,
        provider  // read-only call — provider is fine here
      );

      const batchIdBN = await contract.documentIndex(docHash);
      const batchId = batchIdBN.toString();
      const verified = batchId !== '0';

      let issuer = null;
      if (verified) {
        // ── Step 3: Fetch batch info + authority metadata for the issuer ──
        try {
          const batch = await contract.getBatchInfo(batchIdBN);
          const authInfo = await contract.authorities(batch.issuer);
          issuer = {
            walletAddress: batch.issuer,
            orgName: authInfo.name || 'Unknown Authority',
            department: authInfo.department || '',
            approvedAt: authInfo.ts
              ? new Date(Number(authInfo.ts) * 1000).toISOString()
              : null,
            website: null,
          };
        } catch (metaErr) {
          console.warn('Could not fetch issuer metadata:', metaErr.message);
        }
      }

      onVerify?.({ verified, file, hash: docHash, batchId: verified ? batchId : null, issuer });

    } catch (err) {
      console.error('Verification failed:', err);
      // Surface a clear failure to the parent
      onVerify?.({
        verified: false,
        file,
        hash: null,
        batchId: null,
        issuer: null,
        error: err?.reason || err?.shortMessage || err?.message || 'Verification error',
      });
    } finally {
      setLoading(false);
    }
  };

  const clear = () => setFile(null);

  return (
    <div className="space-y-6">
      {/* Drop area */}
      <div
        {...getRootProps()}
        className={`relative border-2 border-dashed rounded-3xl p-16 text-center cursor-pointer transition-all duration-500 ${
          isDragActive
            ? 'border-brand-400 bg-brand-500/15 shadow-[0_0_60px_rgba(123,63,228,0.25)] scale-[1.01]'
            : file
            ? 'border-brand-500/40 bg-brand-500/5'
            : 'border-white/15 hover:border-brand-500/40 hover:bg-white/3'
        }`}
      >
        <input {...getInputProps()} id="verify-upload-input" />

        {/* Animated rings behind icon */}
        <div className="relative w-24 h-24 mx-auto mb-6">
          <div className={`absolute inset-0 rounded-full border-2 transition-all duration-500 ${isDragActive ? 'border-brand-400/50 scale-110 animate-ping' : 'border-brand-500/20'}`} />
          <div className={`absolute inset-2 rounded-full border transition-all duration-500 ${isDragActive ? 'border-brand-400/30' : 'border-brand-500/10'}`} />
          <div className={`absolute inset-0 rounded-full flex items-center justify-center transition-all duration-300 ${isDragActive ? 'bg-brand-500/30' : 'bg-brand-500/10'}`}>
            <Search size={40} className={`transition-colors duration-300 ${isDragActive ? 'text-brand-300' : 'text-brand-500'}`} />
          </div>
        </div>

        {!file ? (
          <>
            <h3 className="text-2xl font-bold text-white mb-3">
              {isDragActive ? 'Release to Verify' : 'Drop Document to Verify'}
            </h3>
            <p className="text-white/40 mb-6">
              PDF, DOC, DOCX, PNG, JPG — up to 50MB
            </p>
            <span className="btn-primary inline-flex items-center gap-2">
              <Upload size={16} /> Browse File
            </span>
          </>
        ) : (
          <div className="flex flex-col items-center gap-2">
            <File size={32} className="text-brand-400 mb-2" />
            <p className="text-lg font-semibold text-white">{file.name}</p>
            <p className="text-sm text-white/40">{(file.size / 1024).toFixed(1)} KB</p>
          </div>
        )}
      </div>

      {/* Action buttons */}
      {file && (
        <div className="flex gap-3">
          <button onClick={clear} className="btn-ghost flex items-center gap-2 flex-1 justify-center">
            <X size={16} /> Change File
          </button>
          <button
            onClick={handleVerify}
            disabled={loading}
            className="btn-primary flex items-center gap-2 flex-1 justify-center disabled:opacity-60"
            id="verify-submit-btn"
          >
            {loading ? (
              <><LoadingSpinner size="sm" /> Verifying on Polygon...</>
            ) : (
              <><Zap size={16} /> Verify Authenticity</>
            )}
          </button>
        </div>
      )}

      {loading && (
        <div className="glass-card border border-brand-500/20 rounded-2xl p-6 text-center">
          <div className="flex justify-center gap-4 text-sm text-white/50">
            {['Hashing document', 'Querying on-chain index', 'Validating Merkle proof'].map((step) => (
              <div key={step} className="flex items-center gap-1.5">
                <LoadingSpinner size="sm" className="opacity-60" />
                {step}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
