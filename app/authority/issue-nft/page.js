'use client';

import { useState } from 'react';
import { ethers } from 'ethers';
import { Award, Loader2, CheckCircle2, AlertCircle } from 'lucide-react';

import Sidebar from '../../../src/components/layout/Sidebar';
import RoleGuard from '../../../src/components/shared/RoleGuard';
import SoulboundNFT from '../../../src/lib/SoulboundNFT.json';
import { uploadFileToIPFS } from '../../../src/lib/lighthouse';
import { CONSTANTS } from '../../../src/lib/constants';

const STEPS = [
  'Uploading certificate to IPFS…',
  'Encoding metadata…',
  'Connecting MetaMask…',
  'Awaiting MetaMask confirmation…',
  'Minting Soulbound NFT…',
];

export default function IssueNFTPage() {
  const [studentAddress, setStudentAddress] = useState('');
  const [studentName, setStudentName]       = useState('');
  const [certType, setCertType]             = useState('Premium');
  const [file, setFile]                     = useState(null);
  const [loading, setLoading]               = useState(false);
  const [stepIndex, setStepIndex]           = useState(-1);
  const [error, setError]                   = useState('');
  const [txHash, setTxHash]                 = useState('');

  function step(i) { setStepIndex(i); }

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    setTxHash('');

    try {
      setLoading(true);

      if (!studentAddress) throw new Error('Student wallet address required');
      if (!ethers.isAddress(studentAddress)) throw new Error('Invalid wallet address');
      if (!file) throw new Error('Please upload a PDF certificate');

      // ── STEP 0 ── Upload PDF to IPFS ─────────────────────────────
      step(0);
      const fileIpfsUrl = await uploadFileToIPFS(file);
      // fileIpfsUrl is already "ipfs://<CID>" from the proxy
      const pdfCID = fileIpfsUrl.replace('ipfs://', '');

      // ── STEP 1 ── Encode metadata as base64 data URI ──────────────
      // Bypasses Lighthouse JSON upload entirely — no network call needed.
      step(1);
      const issuedAt = new Date().toISOString();
      const metadata = {
        name: `TrueStamp ${certType} Certificate`,
        description: 'Soulbound NFT certificate issued via TrueStamp. Blockchain-verified, non-transferable.',
        image: `ipfs://${pdfCID}`,
        external_url: `${process.env.NEXT_PUBLIC_APP_URL || 'https://truestamp.app'}/verify`,
        attributes: [
          { trait_type: 'Certificate Type', value: certType },
          { trait_type: 'Verification',     value: 'Blockchain Verified' },
          { trait_type: 'Network',          value: 'Polygon Amoy' },
          { trait_type: 'Issued To',        value: studentName || studentAddress },
          { trait_type: 'Issued At',        value: issuedAt },
          { trait_type: 'Soulbound',        value: 'true' },
          { trait_type: 'Issuer Platform',  value: 'TrueStamp 2.0' },
        ],
      };
      const jsonString      = JSON.stringify(metadata);
      const encodedMetadata = btoa(unescape(encodeURIComponent(jsonString))); // UTF-8 safe
      const tokenURI        = `data:application/json;base64,${encodedMetadata}`;

      // ── STEP 2 ── Connect wallet ──────────────────────────────────
      step(2);
      if (!window.ethereum) throw new Error('MetaMask not found. Install MetaMask to continue.');

      const provider = new ethers.BrowserProvider(window.ethereum);
      await provider.send('eth_requestAccounts', []);

      // Ensure correct network (Polygon Amoy = 80002)
      const network = await provider.getNetwork();
      if (Number(network.chainId) !== CONSTANTS.SUPPORTED_CHAIN_ID) {
        await window.ethereum.request({
          method: 'wallet_addEthereumChain',
          params: [CONSTANTS.NETWORK_PARAMS],
        });
      }

      const signer = await provider.getSigner();

      // Address hardcoded to bypass stale env-var cache causing Execution Reverted
      const nftContract = new ethers.Contract(
        '0xa8a804E2e33f94B01F0806E68dB07AD43041dfCe',
        SoulboundNFT.abi,
        signer
      );

      // ── STEP 3 ── MetaMask confirm ────────────────────────────────
      step(3);
      const tx = await nftContract.issuePremiumCertificate(studentAddress, tokenURI);

      // ── STEP 4 ── Wait for mine ───────────────────────────────────
      step(4);
      await tx.wait();

      setTxHash(tx.hash);
      setStudentAddress('');
      setStudentName('');
      setFile(null);
      setStepIndex(-1);
    } catch (err) {
      console.error('NFT Issue Error:', err);
      setError(err?.reason || err?.message || 'Transaction failed');
      setStepIndex(-1);
    } finally {
      setLoading(false);
    }
  }

  const explorerUrl = `${CONSTANTS.BLOCK_EXPLORER_URL}/tx/${txHash}`;

  return (
    <RoleGuard requiredRole="authority">
      <div className="flex">
        <Sidebar role="authority" />
        <div className="flex-1 min-w-0 px-6 py-10">
          <div className="max-w-2xl">

            {/* Header */}
            <div className="flex items-center gap-3 mb-8">
              <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-brand-500 to-brand-700 flex items-center justify-center">
                <Award size={22} className="text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-extrabold text-white">Issue Soulbound NFT</h1>
                <p className="text-white/40 text-sm">Mint a non-transferable certificate on Polygon Amoy</p>
              </div>
            </div>

            {/* Info callout */}
            <div className="glass-card border border-brand-500/20 rounded-xl p-4 mb-8 text-sm text-white/60 leading-relaxed">
              <strong className="text-white block mb-1">How it works</strong>
              PDF uploaded to IPFS via Lighthouse → enriched metadata pinned → Soulbound NFT minted to student wallet.
              Certificate is non-transferable and blockchain-verified.
            </div>

            {/* Form */}
            <div className="glass-card border border-white/10 rounded-2xl p-8 shadow-xl">
              <form onSubmit={handleSubmit} className="space-y-6">

                <div>
                  <label className="block mb-2 text-sm font-medium text-white/80">
                    Student Wallet Address <span className="text-brand-400">*</span>
                  </label>
                  <input
                    type="text"
                    value={studentAddress}
                    disabled={loading}
                    onChange={(e) => setStudentAddress(e.target.value)}
                    placeholder="0x…"
                    className="w-full rounded-xl bg-white/5 border border-white/10 px-4 py-3 text-white placeholder-white/20 focus:outline-none focus:ring-2 focus:ring-brand-500 disabled:opacity-50"
                  />
                </div>

                <div>
                  <label className="block mb-2 text-sm font-medium text-white/80">
                    Student Name <span className="text-white/30">(optional — stored in metadata)</span>
                  </label>
                  <input
                    type="text"
                    value={studentName}
                    disabled={loading}
                    onChange={(e) => setStudentName(e.target.value)}
                    placeholder="Jane Doe"
                    className="w-full rounded-xl bg-white/5 border border-white/10 px-4 py-3 text-white placeholder-white/20 focus:outline-none focus:ring-2 focus:ring-brand-500 disabled:opacity-50"
                  />
                </div>

                <div>
                  <label className="block mb-2 text-sm font-medium text-white/80">Certificate Type</label>
                  <select
                    value={certType}
                    disabled={loading}
                    onChange={(e) => setCertType(e.target.value)}
                    className="w-full rounded-xl bg-white/5 border border-white/10 px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-brand-500 disabled:opacity-50"
                  >
                    <option value="Premium">Premium</option>
                    <option value="Standard">Standard</option>
                    <option value="Honours">Honours</option>
                    <option value="Distinction">Distinction</option>
                  </select>
                </div>

                <div>
                  <label className="block mb-2 text-sm font-medium text-white/80">
                    Certificate PDF <span className="text-brand-400">*</span>
                  </label>
                  <input
                    type="file"
                    accept=".pdf"
                    disabled={loading}
                    onChange={(e) => setFile(e.target.files?.[0] || null)}
                    className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white/60 file:mr-4 file:py-1 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-medium file:bg-brand-500/20 file:text-brand-300 hover:file:bg-brand-500/30 disabled:opacity-50"
                  />
                  {file && (
                    <p className="mt-1.5 text-xs text-white/30">{file.name} — {(file.size / 1024).toFixed(1)} KB</p>
                  )}
                </div>

                {/* Progress */}
                {loading && stepIndex >= 0 && (
                  <div className="rounded-xl bg-blue-950/50 border border-blue-800/50 p-4 flex items-center gap-3 text-blue-300 text-sm">
                    <Loader2 size={16} className="animate-spin shrink-0" />
                    <span>{STEPS[stepIndex]}</span>
                  </div>
                )}

                {/* Error */}
                {error && (
                  <div className="rounded-xl bg-red-950/50 border border-red-800/50 p-4 flex items-start gap-3 text-red-300 text-sm">
                    <AlertCircle size={16} className="shrink-0 mt-0.5" />
                    <span className="break-all">{error}</span>
                  </div>
                )}

                {/* Success */}
                {txHash && (
                  <div className="rounded-xl bg-green-950/50 border border-green-800/50 p-4 flex items-start gap-3 text-green-300 text-sm">
                    <CheckCircle2 size={16} className="shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold mb-1">Certificate issued successfully!</p>
                      <a
                        href={explorerUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs text-green-400 underline underline-offset-2 break-all hover:text-green-300"
                      >
                        {txHash}
                      </a>
                    </div>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-brand-600 to-brand-500 hover:from-brand-500 hover:to-brand-400 disabled:opacity-50 disabled:cursor-not-allowed px-5 py-3.5 rounded-xl font-semibold text-white transition-all duration-200 flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <><Loader2 size={16} className="animate-spin" /> Processing…</>
                  ) : (
                    <><Award size={16} /> Issue Soulbound NFT</>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </RoleGuard>
  );
}
