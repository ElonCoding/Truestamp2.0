'use client';

import { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAuth } from '../../src/providers/AuthProvider';
import { useWeb3 } from '../../src/providers/Web3Provider';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Mail, 
  Lock, 
  Eye, 
  EyeOff, 
  ArrowRight, 
  AlertCircle, 
  CheckCircle2, 
  User, 
  ShieldCheck, 
  RefreshCw,
  HelpCircle,
  X,
  Wallet
} from 'lucide-react';

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectPath = searchParams.get('redirect') || '/dashboard';

  const { user, login, signup, resetPassword, loginWithGoogle } = useAuth();
  const { isConnected, connect, address } = useWeb3();

  // Auth View State: 'signin' | 'signup' | 'forgot'
  const [view, setView] = useState('signin');

  // Input states
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  // Form loading & feedback
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  // Real-time validations
  const [emailValid, setEmailValid] = useState(null); // null, true, false
  const [passwordValid, setPasswordValid] = useState(null);

  // Custom connection modal simulation
  const [connectingProvider, setConnectingProvider] = useState(null); // 'walletconnect' | 'coinconnect' | null
  const [connectionStep, setConnectionStep] = useState(0);

  // Run redirect if already authenticated
  useEffect(() => {
    if (user || isConnected) {
      router.push(redirectPath);
    }
  }, [user, isConnected, router, redirectPath]);

  // Real-time email validation
  useEffect(() => {
    if (!email) {
      setEmailValid(null);
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setEmailValid(emailRegex.test(email));
  }, [email]);

  // Real-time password validation
  useEffect(() => {
    if (!password) {
      setPasswordValid(null);
      return;
    }
    // Required minimum 6 characters for safety
    setPasswordValid(password.length >= 6);
  }, [password]);

  // Handle email/password sign-in
  const handleSignIn = async (e) => {
    e.preventDefault();
    setError('');
    setSuccessMsg('');

    if (!emailValid) {
      setError('Please enter a valid email address.');
      return;
    }
    if (!password || password.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }

    setLoading(true);
    try {
      await login(email, password);
      setSuccessMsg('Welcome back! Logging in...');
      setTimeout(() => {
        router.push(redirectPath);
      }, 1000);
    } catch (err) {
      console.error(err);
      setError(err.message || 'Failed to sign in. Please check your credentials.');
      setLoading(false);
    }
  };

  // Handle email/password sign-up
  const handleSignUp = async (e) => {
    e.preventDefault();
    setError('');
    setSuccessMsg('');

    if (!emailValid) {
      setError('Please enter a valid email address.');
      return;
    }
    if (!passwordValid) {
      setError('Password must be at least 6 characters.');
      return;
    }

    setLoading(true);
    try {
      await signup(email, password);
      setSuccessMsg('Account created successfully! Welcome to TrueStamp.');
      setTimeout(() => {
        router.push(redirectPath);
      }, 1200);
    } catch (err) {
      console.error(err);
      setError(err.message || 'Failed to create account.');
      setLoading(false);
    }
  };

  // Handle forgot password reset
  const handleForgotPassword = async (e) => {
    e.preventDefault();
    setError('');
    setSuccessMsg('');

    if (!emailValid) {
      setError('Please enter a valid email address.');
      return;
    }

    setLoading(true);
    try {
      await resetPassword(email);
      setSuccessMsg('Password reset instructions have been sent to your email.');
      setEmail('');
      setTimeout(() => {
        setView('signin');
        setSuccessMsg('');
      }, 5000);
    } catch (err) {
      console.error(err);
      setError(err.message || 'Failed to send password reset email.');
    } finally {
      setLoading(false);
    }
  };

  // Handle Google / Gmail login
  const handleGoogleLogin = async () => {
    setError('');
    setSuccessMsg('');
    setLoading(true);
    try {
      await loginWithGoogle();
      setSuccessMsg('Successfully connected with Gmail!');
      setTimeout(() => {
        router.push(redirectPath);
      }, 1000);
    } catch (err) {
      console.error(err);
      setError(err.message || 'Gmail login was cancelled or failed.');
      setLoading(false);
    }
  };

  // Handle MetaMask login (Web3Provider connect)
  const handleMetaMaskLogin = async () => {
    setError('');
    setSuccessMsg('');
    setLoading(true);
    try {
      await connect();
      // connect updates states in Web3Provider. If succeeds:
      setSuccessMsg('MetaMask Connected!');
    } catch (err) {
      console.error(err);
      setError('MetaMask connection rejected.');
    } finally {
      setLoading(false);
    }
  };

  // Simulated Web3 providers (WalletConnect & CoinConnect)
  const triggerSimulatedConnect = (providerName) => {
    setError('');
    setConnectingProvider(providerName);
    setConnectionStep(1);

    // Step 1: Initializing
    setTimeout(() => {
      setConnectionStep(2); // Connecting...
    }, 1200);

    // Step 2: Requesting Approval
    setTimeout(() => {
      setConnectionStep(3); // Authenticated / Authorized
    }, 2800);

    // Step 3: Success and redirect
    setTimeout(() => {
      setConnectingProvider(null);
      setSuccessMsg(`Successfully connected via ${providerName === 'walletconnect' ? 'WalletConnect' : 'CoinConnect'}!`);
      // Trigger Web3Provider mock address set if possible, or trigger login success
      localStorage.setItem('truestamp_mock_user', JSON.stringify({
        uid: 'mock_wallet_' + Math.random().toString(36).substring(2, 9),
        email: `${providerName}-user@truestamp.io`,
        displayName: providerName === 'walletconnect' ? 'WalletConnect Account' : 'CoinConnect Account',
        photoURL: null,
      }));
      // Quick page reload / redirect
      setTimeout(() => {
        router.push(redirectPath);
        window.location.reload();
      }, 500);
    }, 4000);
  };

  return (
    <div className="relative min-h-[calc(100vh-8rem)] flex items-center justify-center px-4 sm:px-6 py-12 overflow-hidden">
      {/* Background glow highlights */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-brand-500/10 blur-[120px] pointer-events-none" />

      <div className="w-full max-w-lg z-10">
        {/* Navigation Indicator / Back to Landing */}
        <button 
          onClick={() => router.push('/')}
          className="flex items-center gap-1.5 text-xs text-white/40 hover:text-white/80 transition-colors mb-6 group"
        >
          <span className="transform group-hover:-translate-x-1 transition-transform">←</span>
          Back to Homepage
        </button>

        {/* Card */}
        <div className="glass-card border border-white/10 rounded-3xl p-6 sm:p-10 shadow-2xl relative overflow-hidden">
          {/* Subtle top border line glow */}
          <div className="absolute top-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-transparent via-brand-500 to-transparent opacity-80" />

          {/* Heading */}
          <div className="text-center mb-8">
            <h2 className="text-3xl font-extrabold text-white tracking-tight">
              {view === 'signin' && <>Let's <span className="gradient-text">Connect</span></>}
              {view === 'signup' && <>Create <span className="gradient-text">Account</span></>}
              {view === 'forgot' && <>Reset <span className="gradient-text">Password</span></>}
            </h2>
            <p className="text-white/50 text-sm mt-2">
              {view === 'signin' && 'Access your documents and on-chain verification credentials'}
              {view === 'signup' && 'Get started with TrueStamp blockchain services'}
              {view === 'forgot' && 'Provide your email to recover password access'}
            </p>
          </div>

          {/* Form Switch Tab (for Signin/Signup) */}
          {view !== 'forgot' && (
            <div className="flex bg-white/5 p-1 rounded-xl border border-white/5 mb-8">
              <button
                type="button"
                onClick={() => { setView('signin'); setError(''); }}
                className={`flex-1 py-2 rounded-lg text-sm font-semibold transition-all duration-200 ${
                  view === 'signin' 
                    ? 'bg-brand-500 text-white shadow-lg shadow-brand-500/20' 
                    : 'text-white/60 hover:text-white'
                }`}
              >
                Sign In
              </button>
              <button
                type="button"
                onClick={() => { setView('signup'); setError(''); }}
                className={`flex-1 py-2 rounded-lg text-sm font-semibold transition-all duration-200 ${
                  view === 'signup' 
                    ? 'bg-brand-500 text-white shadow-lg shadow-brand-500/20' 
                    : 'text-white/60 hover:text-white'
                }`}
              >
                Register
              </button>
            </div>
          )}

          {/* Success / Error Alerts */}
          <AnimatePresence mode="wait">
            {error && (
              <motion.div 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="flex items-start gap-2.5 p-3.5 bg-red-500/10 border border-red-500/20 rounded-xl mb-6 text-red-200 text-xs"
              >
                <AlertCircle className="text-red-400 flex-shrink-0 mt-0.5" size={15} />
                <span>{error}</span>
              </motion.div>
            )}
            {successMsg && (
              <motion.div 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="flex items-start gap-2.5 p-3.5 bg-green-500/10 border border-green-500/20 rounded-xl mb-6 text-green-200 text-xs"
              >
                <CheckCircle2 className="text-green-400 flex-shrink-0 mt-0.5" size={15} />
                <span>{successMsg}</span>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Form Actions */}
          {view === 'signin' && (
            <form onSubmit={handleSignIn} className="space-y-5">
              <div>
                <label className="block text-xs font-semibold text-white/60 uppercase tracking-wider mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30" size={18} />
                  <input
                    type="email"
                    required
                    placeholder="name@institution.edu"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className={`input-dark pl-11 pr-10 ${
                      emailValid === true ? 'border-green-500/40 focus:border-green-500/60 focus:ring-green-500/10' : 
                      emailValid === false ? 'border-red-500/40 focus:border-red-500/60 focus:ring-red-500/10' : ''
                    }`}
                  />
                  {emailValid === true && (
                    <CheckCircle2 className="absolute right-4 top-1/2 -translate-y-1/2 text-green-400" size={16} />
                  )}
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="block text-xs font-semibold text-white/60 uppercase tracking-wider">
                    Password
                  </label>
                  <button
                    type="button"
                    onClick={() => setView('forgot')}
                    className="text-xs text-brand-300 hover:text-brand-200 font-medium transition-colors"
                  >
                    Forgot Password?
                  </button>
                </div>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30" size={18} />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="input-dark pl-11 pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-white/30 hover:text-white transition-colors"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="btn-primary w-full flex items-center justify-center gap-2 mt-2 h-12"
              >
                {loading ? (
                  <RefreshCw className="animate-spin text-white" size={18} />
                ) : (
                  <>
                    Sign In
                    <ArrowRight size={16} />
                  </>
                )}
              </button>
            </form>
          )}

          {view === 'signup' && (
            <form onSubmit={handleSignUp} className="space-y-5">
              <div>
                <label className="block text-xs font-semibold text-white/60 uppercase tracking-wider mb-2">
                  Full Name
                </label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30" size={18} />
                  <input
                    type="text"
                    required
                    placeholder="Jane Doe"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="input-dark pl-11"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-white/60 uppercase tracking-wider mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30" size={18} />
                  <input
                    type="email"
                    required
                    placeholder="name@institution.edu"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className={`input-dark pl-11 pr-10 ${
                      emailValid === true ? 'border-green-500/40' : 
                      emailValid === false ? 'border-red-500/40' : ''
                    }`}
                  />
                  {emailValid === true && (
                    <CheckCircle2 className="absolute right-4 top-1/2 -translate-y-1/2 text-green-400" size={16} />
                  )}
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-white/60 uppercase tracking-wider mb-2">
                  Choose Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30" size={18} />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    placeholder="At least 6 characters"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className={`input-dark pl-11 pr-10 ${
                      passwordValid === true ? 'border-green-500/40' : 
                      passwordValid === false ? 'border-red-500/40' : ''
                    }`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-white/30 hover:text-white transition-colors"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="btn-primary w-full flex items-center justify-center gap-2 mt-2 h-12"
              >
                {loading ? (
                  <RefreshCw className="animate-spin text-white" size={18} />
                ) : (
                  <>
                    Create Account
                    <ArrowRight size={16} />
                  </>
                )}
              </button>
            </form>
          )}

          {view === 'forgot' && (
            <form onSubmit={handleForgotPassword} className="space-y-5">
              <div>
                <label className="block text-xs font-semibold text-white/60 uppercase tracking-wider mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30" size={18} />
                  <input
                    type="email"
                    required
                    placeholder="name@institution.edu"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="input-dark pl-11"
                  />
                </div>
              </div>

              <div className="flex gap-3 mt-2">
                <button
                  type="button"
                  onClick={() => { setView('signin'); setError(''); }}
                  className="btn-ghost flex-1 h-12 text-sm flex items-center justify-center gap-1.5"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="btn-primary flex-1 h-12 text-sm flex items-center justify-center gap-1.5"
                >
                  {loading ? (
                    <RefreshCw className="animate-spin text-white" size={16} />
                  ) : (
                    <>
                      Send Link
                      <ArrowRight size={14} />
                    </>
                  )}
                </button>
              </div>
            </form>
          )}

          {/* Social Logins Divider */}
          <div className="relative my-8 text-center">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-white/10" />
            </div>
            <span className="relative bg-[#0d0918] px-3.5 text-[11px] font-bold tracking-wider text-white/35 uppercase">
              Or connect via
            </span>
          </div>

          {/* Social Providers Grid */}
          <div className="grid grid-cols-2 gap-3.5">
            {/* MetaMask */}
            <button
              onClick={handleMetaMaskLogin}
              type="button"
              className="group flex items-center justify-center gap-3 px-4 py-3.5 rounded-xl bg-white/5 border border-white/10 hover:border-[#E2761B]/50 hover:bg-[#E2761B]/10 hover:shadow-[0_0_20px_rgba(226,118,27,0.2)] transition-all duration-300 text-xs font-semibold text-white/80 hover:text-white transform hover:scale-[1.03] active:scale-[0.97]"
            >
              <svg className="w-5 h-5 flex-shrink-0 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6" viewBox="0 0 320 320" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M304.7 134.1L274.6 42.8c-2.4-7.2-9.6-11.7-17.2-10.1l-76.3 16.5c-14.3-5-29.8-5-44.1 0L60.7 32.7c-7.6-1.6-14.8 2.9-17.2 10.1L13.4 134.1c-2 6 0 12.6 4.9 16.5l37.7 30.1 35.8-31.9 45.4 72.8h43.6l45.4-72.8 35.8 31.9 37.7-30.1c4.9-3.9 6.9-10.5 4.9-16.5z" fill="#E2761B"/>
                <path d="M160 300.9l76.3-67.9 35.8-21.9-35.8-21.9-45.4 72.8H129.1L83.7 162l-35.8 21.9 35.8 21.9 76.3 67.9z" fill="#E2761B"/>
                <path d="M260.6 86.8l-15.6 72.8-19.1-51.2 34.7-21.6zM57.5 86.8l15.6 72.8 19.1-51.2L57.5 86.8z" fill="#E2761B"/>
                <path d="M107.1 91.3l-8 47.1-37.8-20.9 45.8-26.2zM211 91.3l8 47.1 37.8-20.9-45.8-26.2z" fill="#E2761B"/>
                <path d="M82.2 159.6l-20.2 23.7 46.4 1.2-26.2-24.9zM235.9 159.6l20.2 23.7-46.4 1.2 26.2-24.9z" fill="#E4761B"/>
                <path d="M130.4 104.9L117.8 162l32.9 30.3 32.9-30.3-12.6-57.1-20.6-6.6z" fill="#E4761B"/>
                <path d="M235.9 159.6l-27.1 31.4 44.6-1.2-17.5-30.2zM82.2 159.6l27.1 31.4-44.6-1.2 17.5-30.2z" fill="#D5CDBE"/>
                <path d="M117.8 162L82.2 159.6l21.9-24.2 13.7 26.6zM200.3 162l35.6-2.4-21.9-24.2-13.7 26.6z" fill="#161616"/>
                <path d="M117.8 162l32.9 30.3v-41.8l-32.9 11.5zM200.3 162l-32.9 30.3v-41.8l32.9 11.5z" fill="#763D16"/>
                <path d="M211 91.3l-11.2 70.7 35.6-2.4-24.4-68.3zM107.1 91.3l11.2 70.7-35.6-2.4 24.4-68.3z" fill="#F6851B"/>
                <path d="M82.2 159.6l68.5 32.7v-30.3l-68.5-2.4zM235.9 159.6l-68.5 32.7v-30.3l68.5-2.4z" fill="#F6851B"/>
                <path d="M130.4 104.9l20.3-55.2 20.3 55.2-20.3-6.3z" fill="#F6851B"/>
                <path d="M304.7 134.1l-33.7 23.9 15.6 45.1 18.1-69zM13.4 134.1l33.7 23.9-15.6 45.1-18.1-69z" fill="#F6851B"/>
              </svg>
              MetaMask
            </button>

            {/* WalletConnect */}
            <button
              onClick={() => triggerSimulatedConnect('walletconnect')}
              type="button"
              className="group flex items-center justify-center gap-3 px-4 py-3.5 rounded-xl bg-white/5 border border-white/10 hover:border-[#3396FF]/50 hover:bg-[#3396FF]/10 hover:shadow-[0_0_20px_rgba(51,150,255,0.2)] transition-all duration-300 text-xs font-semibold text-white/80 hover:text-white transform hover:scale-[1.03] active:scale-[0.97]"
            >
              <svg className="w-5.5 h-5.5 flex-shrink-0 transition-transform duration-300 group-hover:scale-110" viewBox="0 0 28 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M23.018 5.753a9.907 9.907 0 00-14.036 0l-.962.96c-.234.234-.234.614 0 .848l1.71 1.706a.399.399 0 00.564 0l1.006-1.004a6.237 6.237 0 018.82 0l1.006 1.004a.399.399 0 00.564 0l1.71-1.706c.234-.234.234-.614 0-.848l-.962-.96-.42-.42zM27.18 9.912l-1.71-1.706c-.234-.234-.614-.234-.848 0l-1.84 1.836a.399.399 0 000 .564l.958.956a7.92 7.92 0 01-11.48 0l.958-.956a.399.399 0 000-.564L11.378 8.2a.601.601 0 00-.848 0L8.82 9.912c-.234.234-.234.614 0 .848l2.71 2.704a.601.601 0 00.848 0l2.16-2.156a.399.399 0 01.564 0l.256.256a10.822 10.822 0 0015.24 0l.256-.256a.399.399 0 01.564 0l2.16 2.156c.234.234.614.234.848 0l2.71-2.704c.234-.234.234-.614 0-.848z" fill="#3396FF"/>
              </svg>
              WalletConnect
            </button>

            {/* CoinConnect */}
            <button
              onClick={() => triggerSimulatedConnect('coinconnect')}
              type="button"
              className="flex items-center justify-center gap-2.5 px-4 py-3 rounded-xl bg-white/5 border border-white/10 hover:border-brand-500/60 hover:bg-brand-500/5 transition-all duration-200 text-xs font-semibold text-white/80 hover:text-white"
            >
              <Wallet className="text-brand-400" size={15} />
              CoinConnect
            </button>

            {/* Gmail */}
            <button
              onClick={handleGoogleLogin}
              type="button"
              className="flex items-center justify-center gap-2.5 px-4 py-3 rounded-xl bg-white/5 border border-white/10 hover:border-red-500/60 hover:bg-red-500/5 transition-all duration-200 text-xs font-semibold text-white/80 hover:text-white"
            >
              <svg className="w-4 h-4 flex-shrink-0" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l3.66-2.85z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.85c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
              </svg>
              Gmail
            </button>
          </div>
        </div>
      </div>

      {/* Simulated overlay connection modals */}
      <AnimatePresence>
        {connectingProvider && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex items-center justify-center p-4"
          >
            <motion.div 
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="glass-card border border-white/10 p-8 rounded-3xl w-full max-w-md text-center relative shadow-2xl shadow-black/80"
            >
              <button 
                onClick={() => setConnectingProvider(null)}
                className="absolute top-4 right-4 p-2 rounded-xl text-white/40 hover:text-white hover:bg-white/5 transition-all"
              >
                <X size={18} />
              </button>

              <div className="w-16 h-16 rounded-2xl bg-brand-500/20 flex items-center justify-center mx-auto mb-6 border border-brand-500/30 animate-pulse">
                <Wallet className="text-brand-400 animate-bounce" size={28} />
              </div>

              <h3 className="text-xl font-bold text-white mb-2">
                Connecting to {connectingProvider === 'walletconnect' ? 'WalletConnect' : 'CoinConnect'}
              </h3>
              <p className="text-white/40 text-xs max-w-xs mx-auto mb-8">
                Confirm request signature prompt inside your mobile wallet to authenticate session.
              </p>

              {/* Progress Stepper UI */}
              <div className="space-y-4 text-left max-w-xs mx-auto">
                <div className="flex items-center gap-3">
                  <div className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold ${
                    connectionStep >= 1 ? 'bg-green-500 text-black' : 'bg-white/10 text-white/50'
                  }`}>
                    {connectionStep >= 1 ? '✓' : '1'}
                  </div>
                  <span className={`text-xs ${connectionStep >= 1 ? 'text-white/80' : 'text-white/30'}`}>
                    Initializing secured handshake protocol
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <div className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold ${
                    connectionStep >= 2 ? 'bg-green-500 text-black' : 
                    connectionStep === 1 ? 'bg-brand-500 text-white border border-brand-400 animate-pulse' : 'bg-white/10 text-white/50'
                  }`}>
                    {connectionStep >= 2 ? '✓' : '2'}
                  </div>
                  <span className={`text-xs ${connectionStep >= 2 ? 'text-white/80' : 'text-white/30'}`}>
                    Requesting wallet account signature
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <div className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold ${
                    connectionStep >= 3 ? 'bg-green-500 text-black' : 
                    connectionStep === 2 ? 'bg-brand-500 text-white border border-brand-400 animate-pulse' : 'bg-white/10 text-white/50'
                  }`}>
                    {connectionStep >= 3 ? '✓' : '3'}
                  </div>
                  <span className={`text-xs ${connectionStep >= 3 ? 'text-white/80' : 'text-white/30'}`}>
                    Establishing authenticated user link
                  </span>
                </div>
              </div>

              {/* Shimmer loading bar */}
              <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden mt-8">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ 
                    width: connectionStep === 1 ? '33%' : 
                           connectionStep === 2 ? '66%' : '100%' 
                  }}
                  transition={{ duration: 0.8 }}
                  className="h-full bg-gradient-to-r from-brand-500 to-brand-300"
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-[#080312] flex items-center justify-center">
        <div className="w-8 h-8 rounded-full border-2 border-brand-500 border-t-transparent animate-spin" />
      </div>
    }>
      <LoginForm />
    </Suspense>
  );
}
