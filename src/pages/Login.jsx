import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { AlertCircle, ArrowLeft } from 'lucide-react';

// Colored Zoho Logo component in SVG (Screenshot 1)
const ZohoLogo = () => (
  <div className="flex items-center gap-1.5 justify-start">
    <svg width="42" height="24" viewBox="0 0 78 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="shrink-0">
      {/* Red box */}
      <rect x="2" y="2" width="16" height="16" rx="2" fill="#E2231A" stroke="#E2231A" strokeWidth="1.5" />
      {/* Green box */}
      <rect x="20" y="2" width="16" height="16" rx="2" fill="#00A24A" stroke="#00A24A" strokeWidth="1.5" />
      {/* Blue box */}
      <rect x="20" y="20" width="16" height="16" rx="2" fill="#0069B4" stroke="#0069B4" strokeWidth="1.5" />
      {/* Yellow box */}
      <rect x="2" y="20" width="16" height="16" rx="2" fill="#F5B800" stroke="#F5B800" strokeWidth="1.5" />
      {/* Z O H O text */}
      <text x="42" y="24" fill="#000000" fontSize="13" fontWeight="900" letterSpacing="1.5">ZOHO</text>
    </svg>
  </div>
);

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  // Inputs
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  // High-fidelity interactive state (two-step login)
  const [showPasswordStep, setShowPasswordStep] = useState(false);
  
  const [localError, setLocalError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleNextStep = (e) => {
    e.preventDefault();
    if (!email) {
      return setLocalError('Please enter your email address.');
    }
    // Simple email pattern check
    if (!email.includes('@')) {
      return setLocalError('Please enter a valid email address.');
    }
    setLocalError('');
    setShowPasswordStep(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!password) {
      return setLocalError('Please enter your password.');
    }

    setLocalError('');
    setSubmitting(true);

    const result = await login(email, password);
    setSubmitting(false);

    if (result.success) {
      navigate('/dashboard');
    } else {
      setLocalError(result.error);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#f4f7fa] px-6 py-12 font-sans relative overflow-hidden text-slate-800 antialiased select-none">
      
      {/* Facetted background shapes mockup */}
      <div className="absolute inset-0 opacity-40 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-slate-100 via-transparent to-slate-100" />
        <div className="absolute top-[20%] left-[10%] w-[300px] h-[300px] border border-white/80 rotate-45" />
        <div className="absolute bottom-[20%] right-[10%] w-[400px] h-[400px] border border-white/80 -rotate-12" />
      </div>

      <div className="w-full max-w-4xl bg-white border border-slate-200/80 rounded-2xl shadow-xl overflow-hidden flex flex-col md:flex-row relative z-10 min-h-[490px]">
        
        {/* --- LEFT FORM PANEL (50%) --- */}
        <div className="w-full md:w-1/2 p-8 md:p-10 flex flex-col justify-between relative bg-white border-r border-slate-100">
          
          {/* Top Row: Brand & Smart sign-in */}
          <div className="flex items-center justify-between">
            <ZohoLogo />
            <button className="flex items-center gap-1.5 px-3 py-1 rounded bg-[#0f2cc0]/5 border border-[#0f2cc0]/10 text-[#0f2cc0] text-[10px] font-black uppercase tracking-wider hover:bg-[#0f2cc0]/10 transition-colors cursor-pointer shadow-sm">
              <span>Try smart sign-in</span>
              <span className="h-1.5 w-1.5 rounded-full bg-amber-500 animate-ping" />
            </button>
          </div>

          {/* Form Content Middle */}
          <div className="my-8 space-y-6 text-left">
            <div>
              <h2 className="text-xl md:text-2xl font-black text-slate-900 leading-tight">Sign in</h2>
              <p className="text-xs text-slate-400 font-bold mt-1 uppercase tracking-wider">to access Inventory</p>
            </div>

            {localError && (
              <div className="flex items-start gap-2.5 p-3 rounded bg-rose-50 border border-rose-100 text-xs text-rose-600 font-bold">
                <AlertCircle className="h-4 w-4 shrink-0 mt-0.5" />
                <span>{localError}</span>
              </div>
            )}

            {/* TWO-STEP FORM FLOW */}
            {!showPasswordStep ? (
              /* STEP 1: EMAIL ADDRESS */
              <form onSubmit={handleNextStep} className="space-y-5">
                <div className="space-y-1.5">
                  <div className="relative">
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Email address or mobile number"
                      className="w-full bg-[#fdfbf7] border border-slate-200 focus:border-[#0088ff] focus:ring-1 focus:ring-[#0088ff] rounded px-4 py-3 text-xs font-bold text-slate-800 placeholder-slate-400 focus:outline-none transition-all"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-[#0088ff] text-white rounded font-extrabold text-xs uppercase tracking-widest hover:bg-[#0077ee] transition-all shadow-md shadow-[#0088ff]/10 active:scale-99 cursor-pointer"
                >
                  Next
                </button>
              </form>
            ) : (
              /* STEP 2: PASSWORD */
              <form onSubmit={handleSubmit} className="space-y-5 animate-fade-in">
                {/* Selected email display widget */}
                <div className="p-2.5 rounded bg-slate-50 border border-slate-100 flex items-center justify-between text-[11px] font-bold text-slate-600">
                  <span className="truncate max-w-[200px]">{email}</span>
                  <button 
                    type="button" 
                    onClick={() => { setShowPasswordStep(false); setPassword(''); setLocalError(''); }}
                    className="flex items-center gap-1 text-[#0088ff] hover:text-[#0077ee] font-black cursor-pointer uppercase text-[9px] tracking-wider"
                  >
                    <ArrowLeft className="h-3 w-3" />
                    <span>Change</span>
                  </button>
                </div>

                <div className="space-y-1.5">
                  <div className="relative">
                    <input
                      type="password"
                      required
                      autoFocus
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Enter password"
                      className="w-full bg-[#fdfbf7] border border-slate-200 focus:border-[#0088ff] focus:ring-1 focus:ring-[#0088ff] rounded px-4 py-3 text-xs font-bold text-slate-800 placeholder-slate-400 focus:outline-none transition-all"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full py-3 bg-[#0088ff] text-white rounded font-extrabold text-xs uppercase tracking-widest hover:bg-[#0077ee] transition-all shadow-md shadow-[#0088ff]/10 active:scale-99 cursor-pointer disabled:opacity-50"
                >
                  {submitting ? 'Authenticating...' : 'Sign In'}
                </button>
              </form>
            )}

            {/* OAuth icons (Screenshot 1) */}
            <div className="space-y-3.5 pt-4">
              <span className="text-[10px] text-slate-400 font-extrabold uppercase tracking-widest block text-center">Sign in using</span>
              <div className="flex items-center justify-center gap-2.5 flex-wrap">
                {/* Apple */}
                <button className="h-8 w-8 bg-black rounded flex items-center justify-center text-white hover:opacity-85 shadow-sm cursor-pointer">🍎</button>
                {/* Google */}
                <button className="h-8 w-8 bg-slate-50 border border-slate-100 rounded flex items-center justify-center hover:bg-slate-100 shadow-sm cursor-pointer font-black text-red-500">G</button>
                {/* Yahoo */}
                <button className="h-8 w-8 bg-[#6001d2] rounded flex items-center justify-center text-white hover:opacity-85 shadow-sm cursor-pointer font-black">Y</button>
                {/* Facebook */}
                <button className="h-8 w-8 bg-[#1877f2] rounded flex items-center justify-center text-white hover:opacity-85 shadow-sm cursor-pointer font-black">F</button>
                {/* LinkedIn */}
                <button className="h-8 w-8 bg-[#0077b5] rounded flex items-center justify-center text-white hover:opacity-85 shadow-sm cursor-pointer font-black">in</button>
                {/* X */}
                <button className="h-8 w-8 bg-black rounded flex items-center justify-center text-white hover:opacity-85 shadow-sm cursor-pointer font-black">X</button>
                {/* Microsoft */}
                <button className="h-8 w-8 bg-slate-50 border border-slate-100 rounded flex items-center justify-center hover:bg-slate-100 shadow-sm cursor-pointer font-bold text-amber-500">田</button>
              </div>
            </div>
          </div>

          {/* Footer sign-up redirect link */}
          <div className="text-center text-xs font-semibold text-slate-500 border-t border-slate-100 pt-4 mt-2">
            <span>Don't have a Zoho account? </span>
            <Link to="/register" className="text-[#0088ff] hover:underline font-bold transition-all">
              Sign up now
            </Link>
          </div>
        </div>

        {/* --- RIGHT VISUAL PANEL (50%) --- */}
        <div className="hidden md:flex w-1/2 p-8 md:p-10 bg-slate-50/50 flex-col justify-center items-center text-center space-y-6">
          {/* Laptop & Mobile Device Passcode Mock Visual in pure SVG/CSS (Screenshot 1) */}
          <div className="relative h-44 w-72 flex items-center justify-center select-none scale-105">
            {/* Monitor Stand */}
            <div className="absolute bottom-2 w-14 h-8 bg-slate-300 rounded" />
            <div className="absolute bottom-0 w-24 h-2.5 bg-slate-400 rounded-t" />

            {/* Laptop Display */}
            <div className="absolute bottom-4 w-[210px] h-[115px] bg-[#0c2340] rounded-lg border-4 border-slate-800 shadow-xl p-2 flex flex-col justify-between items-center text-[7px] text-white relative z-10">
              {/* Webcam */}
              <div className="h-1 w-1 bg-slate-500 rounded-full absolute top-1" />
              {/* Inner screen view */}
              <div className="flex-1 w-full bg-slate-100 rounded border border-slate-200 p-2 flex flex-col justify-center items-center relative overflow-hidden text-slate-700">
                {/* FaceID visual icon */}
                <div className="h-7 w-7 rounded-full bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-500 mb-1">
                  🔍
                </div>
                {/* Mock User Pill */}
                <div className="px-2.5 py-1 rounded-full bg-white border border-slate-200 flex items-center gap-1 font-bold text-[6px] tracking-tight shadow-sm">
                  <span>🔒</span>
                  <span className="text-slate-800">michealrio@zylker.biz</span>
                </div>
              </div>
            </div>

            {/* Mobile Phone Illustration overlay */}
            <div className="absolute bottom-3 right-6 w-24 h-48 bg-white border-2 border-slate-800 rounded-2xl shadow-2xl relative z-20 overflow-hidden flex flex-col justify-between p-2.5 text-[6px]">
              {/* Phone Speaker */}
              <div className="w-8 h-1 bg-slate-800 rounded-full mx-auto" />
              
              {/* Inner screen mock */}
              <div className="flex-1 w-full bg-slate-50 rounded-lg border border-slate-200 p-1 flex flex-col justify-between items-center relative overflow-hidden my-1">
                <span className="font-extrabold text-[5px] text-slate-400 uppercase tracking-widest">ONEAUTH</span>
                {/* Fingerprint visual blue button */}
                <div className="h-10 w-10 rounded-full bg-gradient-to-br from-indigo-500 to-blue-600 shadow-md shadow-blue-500/20 flex items-center justify-center text-white text-md cursor-pointer hover:scale-105 active:scale-95 transition-all">
                  🖐️
                </div>
                <span className="font-bold text-[5px] text-slate-500 text-center leading-tight">One-tap passwordless access</span>
              </div>

              {/* Home button circle */}
              <div className="w-4 h-4 rounded-full border border-slate-200 mx-auto bg-slate-50 shrink-0" />
            </div>
          </div>

          <div className="space-y-3.5 max-w-sm">
            <h3 className="font-extrabold text-[#0c2340] text-sm tracking-tight leading-snug">Passwordless sign-in</h3>
            <p className="text-[11px] text-slate-500 font-semibold leading-relaxed">
              Move away from risky passwords and experience one-tap access to Zoho. Download and install OneAuth.
            </p>
            <button className="px-4 py-1.5 rounded-full bg-[#0088ff]/10 text-[#0088ff] font-extrabold text-[10px] tracking-wide hover:bg-[#0088ff]/20 transition-colors uppercase border border-[#0088ff]/10 cursor-pointer">
              Learn more
            </button>
          </div>
        </div>
      </div>

      {/* Bottom copyright replica */}
      <span className="absolute bottom-6 left-0 right-0 text-center text-[10px] text-slate-400 font-bold">
        &copy; {new Date().getFullYear()}, Zoho Corporation Pvt. Ltd. All Rights Reserved.
      </span>
    </div>
  );
};

export default Login;
