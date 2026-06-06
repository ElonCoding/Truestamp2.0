'use client';

import { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload, File, X, CheckCircle, AlertCircle, Zap, Loader2 } from 'lucide-react';
import { ethers } from 'ethers';
import { TruestampContract } from '../../lib/contract';

const STAGE_LABELS = ['Uploading to IPFS', 'Building Merkle Tree', 'Submitting On-Chain'];

// Hash a file buffer with keccak256 using ethers
async function hashFile(file) {
  const buffer = await file.arrayBuffer();
  const bytes = new Uint8Array(buffer);
  return ethers.keccak256(bytes);
}

// Build Merkle root from array of 32-byte hex hashes
function buildMerkleRoot(hashes) {
  if (!hashes.length) return ethers.ZeroHash;
  let layer = hashes.map(h => ethers.getBytes(h));
  while (layer.length > 1) {
    const next = [];
    for (let i = 0; i < layer.length; i += 2) {
      const left = layer[i];
      const right = i + 1 < layer.length ? layer[i + 1] : layer[i];
      // Sort-pair before hashing (standard OpenZeppelin Merkle convention)
      const sorted = Buffer.compare(left, right) <= 0
        ? ethers.concat([left, right])
        : ethers.concat([right, left]);
      next.push(ethers.getBytes(ethers.keccak256(sorted)));
    }
    layer = next;
  }
  return ethers.hexlify(layer[0]);
}

export default function BulkUploader({ onBatchComplete }) {
  const [files, setFiles] = useState([]);
  const [stage, setStage] = useState(null); // null | 0 | 1 | 2 | 'done' | 'error'
  const [progress, setProgress] = useState(0);
  const [result, setResult] = useState(null);
  const [errorMsg, setErrorMsg] = useState('');

  const onDrop = useCallback(accepted => {
    setFiles(prev => [
      ...prev,
      ...accepted.filter(f => !prev.find(p => p.name === f.name)),
    ]);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf'],
      'image/*': ['.png', '.jpg', '.jpeg'],
      'application/msword': ['.doc', '.docx'],
    },
    multiple: true,
  });

  const removeFile = (name) => setFiles(f => f.filter(x => x.name !== name));

  const handleUpload = async () => {
    if (!files.length) return;
    setStage(0); setProgress(0); setErrorMsg('');

    // ── Stage 0: IPFS upload (simulated — replace body with Lighthouse SDK call) ──
    let ipfsCID = 'bafybeig' + Math.random().toString(36).slice(2, 32);
    for (let i = 0; i <= 100; i += 4) {
      await new Promise(r => setTimeout(r, 40));
      setProgress(i);
    }

    // ── Stage 1: Hash each file + build Merkle root ──
    setStage(1); setProgress(0);
    const hashes = [];
    for (let i = 0; i < files.length; i++) {
      const h = await hashFile(files[i]);
      hashes.push(h);
      setProgress(Math.round(((i + 1) / files.length) * 100));
    }
    const merkleRoot = buildMerkleRoot(hashes);

    // ── Stage 2: Submit batch on-chain via signer ──
    setStage(2); setProgress(0);
    try {
      if (!window.ethereum) throw new Error('MetaMask not found. Install MetaMask to submit on-chain.');

      const readProvider = new ethers.JsonRpcProvider(
        process.env.REACT_APP_ALCHEMY_RPC_URL
      )
      const writeProvider = new ethers.BrowserProvider(window.ethereum)
      const signer = await writeProvider.getSigner(); // ← signer required for write tx

      const contract = new ethers.Contract(
        TruestampContract.address,
        TruestampContract.abi,
        signer
      );

      // Animate progress bar while tx is pending in MetaMask / mining
      let fakeP = 0;
      const ticker = setInterval(() => {
        fakeP = Math.min(fakeP + 3, 85);
        setProgress(fakeP);
      }, 300);

      const tx = await contract.submitBatch(merkleRoot, ipfsCID, files.length);
      const receipt = await tx.wait(); // ← block until tx confirmed on-chain

      clearInterval(ticker);
      setProgress(100);

      // Parse BatchSubmitted event to get batchId
      let batchId = null;
      for (const log of receipt.logs) {
        try {
          const parsed = contract.interface.parseLog(log);
          if (parsed?.name === 'BatchSubmitted') {
            batchId = parsed.args.batchId?.toString();
          }
        } catch (_) { /* skip unparseable logs */ }
      }

      const payload = { merkleRoot, ipfsCID, docCount: files.length, txHash: receipt.hash, batchId };
      setResult(payload);
      setStage('done');
      onBatchComplete?.(payload);

    } catch (err) {
      console.error('On-chain submission failed:', err);
      setErrorMsg(err?.reason || err?.shortMessage || err?.message || 'Transaction failed');
      setStage('error');
    }
  };

  const reset = () => {
    setFiles([]); setStage(null); setProgress(0); setResult(null); setErrorMsg('');
  };

  return (
    <div className="space-y-6">

      {/* ── Dropzone ── */}
      {stage === null && (
        <div
          {...getRootProps()}
          className={`relative border-2 border-dashed rounded-2xl p-12 text-center cursor-pointer transition-all duration-300 ${
            isDragActive
              ? 'border-brand-500 bg-brand-500/10 shadow-[0_0_30px_rgba(123,63,228,0.2)]'
              : 'border-white/20 hover:border-brand-500/50 hover:bg-white/3'
          }`}
        >
          <input {...getInputProps()} id="bulk-upload-input" />
          <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 transition-all duration-300 ${isDragActive ? 'bg-brand-500/30 scale-110' : 'bg-brand-500/10'}`}>
            <Upload size={32} className={isDragActive ? 'text-brand-300' : 'text-brand-500'} />
          </div>
          <h3 className="text-xl font-bold text-white mb-2">
            {isDragActive ? 'Drop files here!' : 'Drag & Drop Documents'}
          </h3>
          <p className="text-white/40 text-sm mb-4">
            PDF, DOC, DOCX, PNG, JPG — batch upload for IPFS storage
          </p>
          <span className="btn-primary inline-flex items-center gap-2 text-sm">
            <Upload size={14} /> Browse Files
          </span>
        </div>
      )}

      {/* ── File list ── */}
      {files.length > 0 && stage === null && (
        <div className="glass-card border border-white/10 rounded-2xl overflow-hidden">
          <div className="flex items-center justify-between px-5 py-4 border-b border-white/10">
            <span className="text-sm font-semibold text-white">
              {files.length} file{files.length !== 1 ? 's' : ''} selected
            </span>
            <button onClick={() => setFiles([])} className="text-xs text-white/40 hover:text-red-400 transition-colors">
              Clear all
            </button>
          </div>
          <div className="max-h-48 overflow-y-auto divide-y divide-white/5">
            {files.map(f => (
              <div key={f.name} className="flex items-center gap-3 px-5 py-3 hover:bg-white/3">
                <File size={14} className="text-brand-400 flex-shrink-0" />
                <span className="text-sm text-white/70 truncate flex-1">{f.name}</span>
                <span className="text-xs text-white/30 flex-shrink-0">{(f.size / 1024).toFixed(1)} KB</span>
                <button onClick={() => removeFile(f.name)} className="text-white/20 hover:text-red-400 transition-colors flex-shrink-0">
                  <X size={14} />
                </button>
              </div>
            ))}
          </div>
          <div className="px-5 py-4 border-t border-white/10">
            <button onClick={handleUpload} className="btn-primary w-full flex items-center justify-center gap-2">
              <Zap size={16} /> Upload {files.length} Files to IPFS & Chain
            </button>
          </div>
        </div>
      )}

      {/* ── Progress ── */}
      {(stage === 0 || stage === 1 || stage === 2) && (
        <div className="glass-card border border-brand-500/20 rounded-2xl p-8 text-center">
          <div className="w-16 h-16 rounded-full bg-brand-500/20 flex items-center justify-center mx-auto mb-6">
            <Loader2 size={32} className="text-brand-400 animate-spin" />
          </div>
          <h3 className="text-lg font-bold text-white mb-2">{STAGE_LABELS[stage]}</h3>
          <p className="text-sm text-white/40 mb-6">
            Stage {Number(stage) + 1} of 3 — Processing {files.length} documents
          </p>
          <div className="flex justify-center gap-2 mb-6">
            {STAGE_LABELS.map((label, i) => (
              <div key={label} className={`flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-full border transition-all ${
                i < stage ? 'border-green-500/30 bg-green-500/10 text-green-400' :
                i === stage ? 'border-brand-500/40 bg-brand-500/15 text-brand-300' :
                'border-white/10 text-white/30'
              }`}>
                {i < stage ? <CheckCircle size={10} /> : i === stage ? <Loader2 size={10} className="animate-spin" /> : null}
                {label}
              </div>
            ))}
          </div>
          <div className="h-2 bg-white/10 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-brand-500 to-brand-300 rounded-full transition-all duration-100"
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="text-xs text-white/40 mt-2">{progress}%</p>
        </div>
      )}

      {/* ── Error ── */}
      {stage === 'error' && (
        <div className="glass-card border border-red-500/30 bg-red-500/5 rounded-2xl p-8 text-center">
          <AlertCircle size={48} className="text-red-400 mx-auto mb-4" />
          <h3 className="text-xl font-bold text-white mb-2">Submission Failed</h3>
          <p className="text-sm text-red-300/70 mb-6 font-mono break-all">{errorMsg}</p>
          <button onClick={reset} className="btn-ghost">Try Again</button>
        </div>
      )}

      {/* ── Success ── */}
      {stage === 'done' && result && (
        <div className="glass-card border border-green-500/30 bg-green-500/5 rounded-2xl p-8 text-center verified-glow">
          <CheckCircle size={48} className="text-green-400 mx-auto mb-4" />
          <h3 className="text-xl font-bold text-white mb-2">Batch Submitted On-Chain!</h3>
          <p className="text-sm text-white/50 mb-6">{result.docCount} documents anchored on Polygon</p>
          <div className="space-y-3 text-left mb-6">
            <div className="glass-card rounded-xl p-4">
              <p className="text-xs text-white/30 mb-1">Merkle Root (On-Chain)</p>
              <p className="font-mono text-xs text-brand-400 break-all">{result.merkleRoot}</p>
            </div>
            <div className="glass-card rounded-xl p-4">
              <p className="text-xs text-white/30 mb-1">IPFS CID (Lighthouse)</p>
              <p className="font-mono text-xs text-brand-400 break-all">{result.ipfsCID}</p>
            </div>
            {result.txHash && (
              <div className="glass-card rounded-xl p-4">
                <p className="text-xs text-white/30 mb-1">Transaction Hash</p>
                <a
                  href={`https://polygonscan.com/tx/${result.txHash}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-mono text-xs text-brand-400 break-all hover:text-brand-300 transition-colors"
                >
                  {result.txHash}
                </a>
              </div>
            )}
            {result.batchId && (
              <div className="glass-card rounded-xl p-4">
                <p className="text-xs text-white/30 mb-1">Batch ID</p>
                <p className="font-mono text-xs text-green-400">{result.batchId}</p>
              </div>
            )}
          </div>
          <button onClick={reset} className="btn-ghost">Upload Another Batch</button>
        </div>
      )}
    </div>
  );
}
