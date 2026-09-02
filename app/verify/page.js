'use client';

import { useState, useEffect } from 'react';
import { 
  Search, Shield, Activity, GitFork, CheckCircle2, AlertTriangle, 
  Download, Send, Copy, ArrowRight, ExternalLink, RefreshCw, 
  Terminal, Building2, Lock, FileText, Check, ShieldAlert
} from 'lucide-react';

const PRESET_WALLETS = [
  {
    label: 'Cyber Fraud FIR #892 (ETH)',
    chain: 'Ethereum',
    address: '0x71C2834E0a6D921FcBb7612cDb5359a37777b4E9',
    crimeType: 'Investment Scam / Phishing',
    totalValue: '18.45 ETH ($46,125)',
    hops: 2,
    targetVasp: 'WazirX India',
    targetDeposit: '0x28C6c06298d514Db089934071355E5743bf21d60',
    confidence: 99.4,
    riskScore: 88,
    typologies: ['Peel Chain Layering', 'Rapid Liquidation Velocity', 'Exchange Direct Cash-out'],
    nodes: [
      { id: 'suspect', label: 'Suspect (Unhosted)', address: '0x71C2...b4E9', type: 'suspect', amount: '18.45 ETH' },
      { id: 'hop1', label: 'Hop 1 (Intermediary)', address: '0x3dA4...89Af', type: 'hop', amount: '18.39 ETH' },
      { id: 'vasp', label: 'WazirX Deposit Desk', address: '0x28C6...1d60', type: 'vasp', amount: '18.30 ETH' },
    ]
  },
  {
    label: 'Ransomware Proceeds (BTC)',
    chain: 'Bitcoin',
    address: 'bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh',
    crimeType: 'Ransomware Extortion',
    totalValue: '1.24 BTC ($78,120)',
    hops: 3,
    targetVasp: 'Binance Global',
    targetDeposit: 'bc1qm34lsc65zpw79lxes69zkqmk6ee3ewf0j77s3h',
    confidence: 97.8,
    riskScore: 94,
    typologies: ['Mixer Hop (Tornado/Wasabi)', 'UTXO Splitting', 'Known Darknet Cluster'],
    nodes: [
      { id: 'suspect', label: 'Ransomware Wallet', address: 'bc1q...0wlh', type: 'suspect', amount: '1.24 BTC' },
      { id: 'hop1', label: 'Mixer Output', address: '1P5Z...4kL9', type: 'mixer', amount: '1.22 BTC' },
      { id: 'hop2', label: 'Hop 2 (Mule)', address: '3J98...tD4a', type: 'hop', amount: '1.21 BTC' },
      { id: 'vasp', label: 'Binance Hot Wallet', address: 'bc1q...7s3h', type: 'vasp', amount: '1.20 BTC' },
    ]
  },
  {
    label: 'Loan App Extortion (TRC20)',
    chain: 'Tron',
    address: 'TLyqzVGLV1srkB7dToTAwdg296WC9gVowN',
    crimeType: 'Illegal Chinese Loan App syndicate',
    totalValue: '95,400 USDT',
    hops: 2,
    targetVasp: 'CoinDCX India',
    targetDeposit: 'TLa2f6VPqDgRE67v1736s7bJ8Ray5wYjU7',
    confidence: 98.9,
    riskScore: 82,
    typologies: ['High-Velocity TRC-20 Layering', 'Mule Account Consolidation'],
    nodes: [
      { id: 'suspect', label: 'Loan Syndicate Wallet', address: 'TLyq...VowN', type: 'suspect', amount: '95,400 USDT' },
      { id: 'hop1', label: 'Consolidator Mule', address: 'TR7N...99xP', type: 'hop', amount: '95,350 USDT' },
      { id: 'vasp', label: 'CoinDCX Hot Wallet', address: 'TLa2...YjU7', type: 'vasp', amount: '95,300 USDT' },
    ]
  }
];

export default function TraceStudioPage() {
  const [selectedPreset, setSelectedPreset] = useState(PRESET_WALLETS[0]);
  const [inputAddress, setInputAddress] = useState(PRESET_WALLETS[0].address);
  const [isTracing, setIsTracing] = useState(false);
  const [traceComplete, setTraceComplete] = useState(true);
  const [showNoticeModal, setShowNoticeModal] = useState(false);
  const [noticeSent, setNoticeSent] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleStartTrace = () => {
    setIsTracing(true);
    setTraceComplete(false);
    setTimeout(() => {
      setIsTracing(false);
      setTraceComplete(true);
    }, 1200);
  };

  const handleSelectPreset = (preset) => {
    setSelectedPreset(preset);
    setInputAddress(preset.address);
    setIsTracing(true);
    setTraceComplete(false);
    setTimeout(() => {
      setIsTracing(false);
      setTraceComplete(true);
    }, 800);
  };

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-[#05070E] min-h-screen text-slate-100 py-12 px-4 sm:px-6 relative overflow-hidden">
      
      {/* Top Ambient Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-96 bg-evervault-purple/15 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto space-y-10 relative z-10">
        
        {/* Header Title */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.04] border border-white/[0.1] text-xs font-mono text-purple-300">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>EVERVAULT ZERO-TRUST PLATFORM</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
            Confidential <span className="text-violet-grad">Encryption & Enclaves</span> Studio
          </h1>
          <p className="text-slate-400 text-sm sm:text-base font-normal">
            Test real-time inbound relay encryption, automated payload tokenization, and confidential computing enclaves.
          </p>
        </div>

        {/* Multi-Chain Search Input Card */}
        <div className="evervault-card p-6 sm:p-8 space-y-4 max-w-4xl mx-auto shadow-2xl">
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
              <input
                type="text"
                value={inputAddress}
                onChange={(e) => setInputAddress(e.target.value)}
                placeholder="Enter suspect wallet (0x..., bc1q..., TLyq..., etc.)"
                className="w-full bg-[#090D22] border border-white/[0.1] rounded-2xl pl-12 pr-4 py-3.5 text-xs sm:text-sm font-mono text-white placeholder:text-slate-600 focus:outline-none focus:border-evervault-purple transition-all"
              />
            </div>
            <button
              onClick={handleStartTrace}
              disabled={isTracing}
              className="btn-white px-8 py-3 text-xs sm:text-sm font-semibold flex-shrink-0"
            >
              {isTracing ? (
                <>
                  <RefreshCw size={15} className="animate-spin" />
                  <span>Encrypting Payload...</span>
                </>
              ) : (
                <>
                  <Activity size={15} />
                  <span>Run Encryption Relay</span>
                </>
              )}
            </button>
          </div>

          {/* Quick Presets for Demo */}
          <div className="flex flex-wrap items-center gap-2 pt-2 text-xs">
            <span className="text-slate-500 font-mono text-[11px]">CASE PRESETS:</span>
            {PRESET_WALLETS.map((p, idx) => (
              <button
                key={idx}
                onClick={() => handleSelectPreset(p)}
                className={`px-3 py-1.5 rounded-lg border text-xs font-mono transition-all ${
                  selectedPreset.address === p.address
                    ? 'bg-evervault-purple/25 border-evervault-purple text-white shadow-sm'
                    : 'bg-white/[0.03] border-white/[0.08] text-slate-400 hover:text-white hover:bg-white/[0.06]'
                }`}
              >
                {p.label}
              </button>
            ))}
          </div>
        </div>

        {/* Live Trace Results Workspace */}
        {traceComplete && (
          <div className="space-y-8 max-w-6xl mx-auto">
            
            {/* Top Stat Ribbon */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="evervault-card p-5 space-y-1 text-left">
                <div className="text-[11px] font-mono text-slate-500">ATTRIBUTED VASP</div>
                <div className="text-lg font-bold text-emerald-400 flex items-center gap-1.5">
                  <CheckCircle2 size={16} />
                  {selectedPreset.targetVasp}
                </div>
                <div className="text-[10px] text-slate-400 font-mono">Nearest Direct Deposit</div>
              </div>

              <div className="evervault-card p-5 space-y-1 text-left">
                <div className="text-[11px] font-mono text-slate-500">CONFIDENCE SCORE</div>
                <div className="text-lg font-bold text-white font-mono">{selectedPreset.confidence}%</div>
                <div className="text-[10px] text-emerald-400 font-mono">High Attribution Certainty</div>
              </div>

              <div className="evervault-card p-5 space-y-1 text-left">
                <div className="text-[11px] font-mono text-slate-500">TOTAL HOP DISTANCE</div>
                <div className="text-lg font-bold text-white font-mono">{selectedPreset.hops} Hops</div>
                <div className="text-[10px] text-slate-400 font-mono">Layering depth to exchange</div>
              </div>

              <div className="evervault-card p-5 space-y-1 text-left">
                <div className="text-[11px] font-mono text-slate-500">LAUNDERING RISK INDEX</div>
                <div className="text-lg font-bold text-red-400 font-mono flex items-center gap-1.5">
                  <ShieldAlert size={16} />
                  {selectedPreset.riskScore} / 100
                </div>
                <div className="text-[10px] text-red-300 font-mono">Critical Action Required</div>
              </div>
            </div>

            {/* Interactive Fund Flow Graph (SVG/Canvas Representation) */}
            <div className="evervault-card p-6 sm:p-8 space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/[0.08] pb-4">
                <div>
                  <h3 className="text-lg font-bold text-white flex items-center gap-2">
                    <GitFork size={18} className="text-evervault-light" />
                    Interactive Fund Flow & Hop Graph
                  </h3>
                  <p className="text-xs text-slate-400 font-mono mt-0.5">
                    Tracing path: Suspect unhosted wallet $\rightarrow$ Intermediary mules $\rightarrow$ Centralized exchange deposit cluster
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-mono px-2.5 py-1 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                    Active Path Verified
                  </span>
                </div>
              </div>

              {/* Visual Hop Pathway */}
              <div className="py-8 flex flex-col md:flex-row items-center justify-between gap-6 relative">
                {selectedPreset.nodes.map((node, i) => (
                  <div key={node.id} className="flex-1 w-full flex flex-col items-center relative z-10 group">
                    <div className={`w-full p-4 rounded-2xl border text-center space-y-2 transition-all duration-300 ${
                      node.type === 'suspect' 
                        ? 'bg-red-500/10 border-red-500/40 shadow-[0_0_25px_rgba(239,68,68,0.2)]'
                        : node.type === 'vasp'
                        ? 'bg-emerald-500/10 border-emerald-500/40 shadow-[0_0_25px_rgba(34,197,94,0.2)]'
                        : node.type === 'mixer'
                        ? 'bg-purple-500/10 border-purple-500/40 shadow-[0_0_25px_rgba(168,85,247,0.2)]'
                        : 'bg-[#0A0E24] border-white/[0.1]'
                    }`}>
                      <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-full ${
                        node.type === 'suspect' ? 'bg-red-500/20 text-red-300' :
                        node.type === 'vasp' ? 'bg-emerald-500/20 text-emerald-300' :
                        node.type === 'mixer' ? 'bg-purple-500/20 text-purple-300' :
                        'bg-white/[0.08] text-slate-400'
                      }`}>
                        {node.type.toUpperCase()}
                      </span>
                      <div className="text-sm font-bold text-white">{node.label}</div>
                      <div className="text-xs font-mono text-slate-400 bg-black/40 py-1 px-2 rounded">
                        {node.address}
                      </div>
                      <div className="text-[11px] font-mono text-evervault-light font-bold">
                        {node.amount}
                      </div>
                    </div>

                    {/* Step indicator below */}
                    <div className="text-[10px] font-mono text-slate-500 mt-2">
                      Step 0{i + 1}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom 2-Column: Attribution Details & Lawful Action Dispatch */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              
              {/* Left Column: Attribution & Typologies */}
              <div className="evervault-card p-6 sm:p-8 space-y-6 text-left">
                <div className="border-b border-white/[0.08] pb-3">
                  <h3 className="text-base font-bold text-white flex items-center gap-2">
                    <Shield size={16} className="text-evervault-light" />
                    Attribution & Typology Evidence
                  </h3>
                </div>

                <div className="space-y-4 text-xs font-mono">
                  <div className="flex justify-between py-2 border-b border-white/[0.06]">
                    <span className="text-slate-500">CRIME INCIDENT</span>
                    <span className="text-white font-bold">{selectedPreset.crimeType}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-white/[0.06]">
                    <span className="text-slate-500">TRACED VOLUME</span>
                    <span className="text-emerald-400 font-bold">{selectedPreset.totalValue}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-white/[0.06]">
                    <span className="text-slate-500">TARGET DEPOSIT WALLET</span>
                    <span className="text-slate-200 font-bold">{selectedPreset.targetDeposit.slice(0, 18)}...</span>
                  </div>
                  
                  <div className="space-y-2 pt-2">
                    <span className="text-slate-500 block">DETECTED LAUNDERING TYPOLOGIES:</span>
                    <div className="flex flex-wrap gap-1.5">
                      {selectedPreset.typologies.map((t, idx) => (
                        <span key={idx} className="px-2.5 py-1 rounded-md bg-white/[0.05] border border-white/[0.08] text-slate-300 text-[11px]">
                          ⚡ {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column: Instant Legal Dispatch (Section 91 Notice) */}
              <div className="evervault-card p-6 sm:p-8 space-y-6 text-left flex flex-col justify-between">
                <div className="space-y-3">
                  <div className="border-b border-white/[0.08] pb-3">
                    <h3 className="text-base font-bold text-white flex items-center gap-2">
                      <FileText size={16} className="text-emerald-400" />
                      Lawful Freezing Notice Generator
                    </h3>
                  </div>

                  <p className="text-xs text-slate-400 leading-relaxed">
                    Auto-populate Section 91 CrPC / Bharatiya Nagarik Suraksha Sanhita freezing requisition pre-filled with trace evidence directly to <strong className="text-white">{selectedPreset.targetVasp}</strong>.
                  </p>

                  <div className="p-3.5 rounded-xl bg-[#090D22] border border-emerald-500/20 text-xs font-mono text-emerald-300 space-y-1">
                    <div>✓ Pre-populated FIR details</div>
                    <div>✓ Cryptographic hash & transaction audit trail</div>
                    <div>✓ Directed to verified VASP Compliance Desk</div>
                  </div>
                </div>

                <div className="flex flex-wrap gap-3 pt-4">
                  <button
                    onClick={() => setShowNoticeModal(true)}
                    className="btn-white text-xs px-5 py-2.5 flex-1"
                  >
                    <Send size={13} />
                    Dispatch Sec. 91 Notice
                  </button>
                  <button
                    onClick={() => alert("Downloading official SAHYOG Investigation Dossier (PDF)...")}
                    className="btn-glass text-xs px-4 py-2.5"
                  >
                    <Download size={13} />
                    Export PDF
                  </button>
                </div>
              </div>

            </div>

          </div>
        )}

      </div>

      {/* Freezing Notice Modal */}
      {showNoticeModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="max-w-xl w-full rounded-3xl bg-[#090D22] border border-white/[0.15] p-6 sm:p-8 shadow-2xl space-y-6 text-left">
            <div className="flex items-center justify-between border-b border-white/[0.08] pb-4">
              <div>
                <h3 className="text-lg font-bold text-white">Section 91 CrPC Freezing Requisition</h3>
                <p className="text-xs text-slate-400 font-mono mt-0.5">Automated SAHYOG Portal Dispatch</p>
              </div>
              <button
                onClick={() => setShowNoticeModal(false)}
                className="text-slate-500 hover:text-white text-sm font-mono"
              >
                ✕
              </button>
            </div>

            <div className="p-4 rounded-xl bg-black/50 border border-white/[0.08] font-mono text-xs text-slate-300 space-y-2 leading-relaxed">
              <div className="text-amber-400 font-bold">TO: Compliance Officer, {selectedPreset.targetVasp}</div>
              <div>RE: Urgent Freeze Order & Beneficial KYC Disclosure for Deposit Wallet {selectedPreset.targetDeposit}</div>
              <div className="text-slate-400 text-[11px]">
                Under Section 91 Cr.P.C. / BNSS, you are hereby requested to immediately freeze assets in the above deposit address linked to FIR cyber fraud investigations and furnish user KYC credentials within 24 hours.
              </div>
            </div>

            <div className="flex items-center justify-between pt-2">
              <span className="text-xs font-mono text-slate-500">Status: Ready for digital sign</span>
              <button
                onClick={() => {
                  setNoticeSent(true);
                  setTimeout(() => {
                    setNoticeSent(false);
                    setShowNoticeModal(false);
                    alert("Section 91 Freezing Notice dispatched to " + selectedPreset.targetVasp + " via SAHYOG API webhook!");
                  }, 1000);
                }}
                className="btn-white text-xs px-6 py-2.5"
              >
                {noticeSent ? "Dispatching..." : "Confirm & Send Notice"}
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
