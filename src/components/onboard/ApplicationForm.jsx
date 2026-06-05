'use client';

import { useState } from 'react';
import { Building2, Mail, Wallet, CheckCircle, ArrowRight, ArrowLeft, User, Globe, Hash } from 'lucide-react';

const STEPS = [
  { id: 1, title: 'Organization Info', icon: Building2 },
  { id: 2, title: 'Domain Verification', icon: Globe },
  { id: 3, title: 'Wallet & Team', icon: Wallet },
  { id: 4, title: 'Review & Submit', icon: CheckCircle },
];

const orgTypes = ['University', 'Hospital', 'Government Body', 'Corporate', 'NGO', 'Research Institute', 'Other'];

export default function ApplicationForm() {
  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    orgName: '', orgType: '', department: '', website: '',
    email: '', emailVerified: false, otp: '',
    walletAddress: '', members: [''],
    description: '', agreeTerms: false,
  });

  const update = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const sendOTP = async () => {
    setLoading(true);
    await new Promise(r => setTimeout(r, 1200));
    setLoading(false);
    alert(`OTP sent to ${form.email} (demo: use 123456)`);
  };

  const verifyOTP = () => {
    if (form.otp === '123456') {
      update('emailVerified', true);
    } else {
      alert('Invalid OTP. Use 123456 for demo.');
    }
  };

  const handleSubmit = async () => {
    setLoading(true);
    await new Promise(r => setTimeout(r, 2000));
    setLoading(false);
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="text-center py-16 px-8">
        <div className="w-20 h-20 rounded-full bg-green-500/20 border border-green-500/30 flex items-center justify-center mx-auto mb-6">
          <CheckCircle size={40} className="text-green-400" />
        </div>
        <h2 className="text-2xl font-bold text-white mb-3">Application Submitted!</h2>
        <p className="text-white/50 mb-2">Your application is under review by TrueStamp admins.</p>
        <p className="text-white/30 text-sm">You'll receive an email at <span className="text-brand-400">{form.email}</span> when approved.</p>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      {/* Step indicators */}
      <div className="flex items-center justify-between mb-10 relative">
        <div className="absolute top-5 left-0 right-0 h-px bg-white/10" />
        {STEPS.map(({ id, title, icon: Icon }) => (
          <div key={id} className="relative flex flex-col items-center gap-2">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all duration-300 z-10 ${
              step > id ? 'bg-green-500 border-green-500' :
              step === id ? 'bg-brand-500 border-brand-500 shadow-[0_0_15px_rgba(123,63,228,0.5)]' :
              'bg-white/5 border-white/20'
            }`}>
              {step > id ? <CheckCircle size={16} className="text-white" /> : <Icon size={16} className={step >= id ? 'text-white' : 'text-white/30'} />}
            </div>
            <span className={`text-xs font-medium hidden sm:block ${step === id ? 'text-brand-300' : 'text-white/30'}`}>{title}</span>
          </div>
        ))}
      </div>

      {/* Step content */}
      <div className="glass-card border border-white/10 rounded-2xl p-8">
        {step === 1 && (
          <div className="space-y-5">
            <h3 className="text-xl font-bold text-white mb-6">Organization Information</h3>
            <div>
              <label className="text-xs text-white/50 uppercase tracking-widest mb-2 block">Organization Name *</label>
              <input className="input-dark" placeholder="e.g. LNCT University" value={form.orgName} onChange={e => update('orgName', e.target.value)} />
            </div>
            <div>
              <label className="text-xs text-white/50 uppercase tracking-widest mb-2 block">Organization Type *</label>
              <select className="input-dark" value={form.orgType} onChange={e => update('orgType', e.target.value)}>
                <option value="">Select type...</option>
                {orgTypes.map(t => <option key={t} value={t}>{t}</option>)}
              </select>
            </div>
            <div>
              <label className="text-xs text-white/50 uppercase tracking-widest mb-2 block">Department</label>
              <input className="input-dark" placeholder="e.g. Registrar's Office" value={form.department} onChange={e => update('department', e.target.value)} />
            </div>
            <div>
              <label className="text-xs text-white/50 uppercase tracking-widest mb-2 block">Official Website</label>
              <input className="input-dark" placeholder="https://university.edu" value={form.website} onChange={e => update('website', e.target.value)} />
            </div>
            <div>
              <label className="text-xs text-white/50 uppercase tracking-widest mb-2 block">Brief Description</label>
              <textarea className="input-dark h-24 resize-none" placeholder="Describe your organization and why you want to join TrueStamp..." value={form.description} onChange={e => update('description', e.target.value)} />
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-5">
            <h3 className="text-xl font-bold text-white mb-2">Domain Email Verification</h3>
            <p className="text-white/50 text-sm mb-6">Verify your official domain email to prove institutional ownership.</p>

            <div>
              <label className="text-xs text-white/50 uppercase tracking-widest mb-2 block">Official Domain Email *</label>
              <div className="flex gap-2">
                <input className="input-dark flex-1" type="email" placeholder="admin@university.edu" value={form.email} onChange={e => update('email', e.target.value)} disabled={form.emailVerified} />
                {!form.emailVerified && (
                  <button onClick={sendOTP} disabled={loading || !form.email} className="btn-primary whitespace-nowrap disabled:opacity-50">
                    {loading ? 'Sending...' : 'Send OTP'}
                  </button>
                )}
              </div>
            </div>

            {!form.emailVerified && (
              <div>
                <label className="text-xs text-white/50 uppercase tracking-widest mb-2 block">Enter OTP</label>
                <div className="flex gap-2">
                  <input className="input-dark flex-1 font-mono tracking-widest" placeholder="6-digit code" maxLength={6} value={form.otp} onChange={e => update('otp', e.target.value)} />
                  <button onClick={verifyOTP} className="btn-ghost whitespace-nowrap">Verify</button>
                </div>
                <p className="text-xs text-white/30 mt-2">💡 Demo: use code <span className="font-mono text-brand-400">123456</span></p>
              </div>
            )}

            {form.emailVerified && (
              <div className="flex items-center gap-3 p-4 bg-green-500/10 border border-green-500/30 rounded-xl">
                <CheckCircle size={20} className="text-green-400" />
                <div>
                  <p className="text-sm font-semibold text-green-400">Email Verified!</p>
                  <p className="text-xs text-white/40">{form.email}</p>
                </div>
              </div>
            )}
          </div>
        )}

        {step === 3 && (
          <div className="space-y-5">
            <h3 className="text-xl font-bold text-white mb-6">Wallet & Team Setup</h3>
            <div>
              <label className="text-xs text-white/50 uppercase tracking-widest mb-2 block">Authority Wallet Address *</label>
              <input className="input-dark font-mono text-sm" placeholder="0x..." value={form.walletAddress} onChange={e => update('walletAddress', e.target.value)} />
              <p className="text-xs text-white/30 mt-2">This wallet will receive the ISSUER_ROLE on-chain.</p>
            </div>

            <div>
              <label className="text-xs text-white/50 uppercase tracking-widest mb-2 block">Team Member Addresses</label>
              {form.members.map((m, i) => (
                <div key={i} className="flex gap-2 mb-2">
                  <input className="input-dark font-mono text-sm flex-1" placeholder={`Member ${i + 1} address (optional)`} value={m} onChange={e => {
                    const arr = [...form.members]; arr[i] = e.target.value; update('members', arr);
                  }} />
                  {i === form.members.length - 1 && (
                    <button onClick={() => update('members', [...form.members, ''])} className="px-3 py-2 glass-card border border-white/10 rounded-xl text-white/50 hover:text-white text-xl">+</button>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {step === 4 && (
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-white mb-6">Review & Submit</h3>
            {[
              ['Organization', form.orgName], ['Type', form.orgType], ['Department', form.department],
              ['Email', form.email], ['Wallet', form.walletAddress ? form.walletAddress.slice(0, 20) + '...' : 'Not set'],
            ].map(([label, val]) => (
              <div key={label} className="flex justify-between py-3 border-b border-white/10">
                <span className="text-sm text-white/40">{label}</span>
                <span className="text-sm text-white font-medium">{val || '—'}</span>
              </div>
            ))}

            <div className="flex items-start gap-3 mt-6 p-4 bg-brand-500/10 border border-brand-500/20 rounded-xl">
              <input type="checkbox" id="agree" className="mt-1 accent-brand-500" checked={form.agreeTerms} onChange={e => update('agreeTerms', e.target.checked)} />
              <label htmlFor="agree" className="text-sm text-white/60 cursor-pointer">
                I confirm all information is accurate and agree to TrueStamp's Terms of Service. I understand this triggers an on-chain role assignment.
              </label>
            </div>
          </div>
        )}

        {/* Navigation buttons */}
        <div className="flex justify-between mt-8 pt-6 border-t border-white/10">
          <button onClick={() => setStep(s => Math.max(1, s - 1))} disabled={step === 1} className="btn-ghost flex items-center gap-2 disabled:opacity-30">
            <ArrowLeft size={16} /> Back
          </button>
          {step < 4 ? (
            <button onClick={() => setStep(s => Math.min(4, s + 1))} className="btn-primary flex items-center gap-2">
              Next <ArrowRight size={16} />
            </button>
          ) : (
            <button onClick={handleSubmit} disabled={!form.agreeTerms || loading} className="btn-primary flex items-center gap-2 disabled:opacity-50">
              {loading ? 'Submitting...' : 'Submit Application'} <CheckCircle size={16} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
