import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Mail, Lock, User as UserIcon, Boxes, AlertCircle } from 'lucide-react';

const Register = () => {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [localError, setLocalError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !email || !password || !confirmPassword) {
      return setLocalError('Please fill in all fields.');
    }
    if (password !== confirmPassword) {
      return setLocalError('Passwords do not match.');
    }
    if (password.length < 6) {
      return setLocalError('Password must be at least 6 characters long.');
    }

    setLocalError('');
    setSubmitting(true);

    const result = await register(name, email, password);
    setSubmitting(false);

    if (result.success) {
      navigate('/');
    } else {
      setLocalError(result.error);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#0b0f19] px-6 py-12 relative overflow-hidden font-sans">
      {/* Decorative Background Glows */}
      <div className="absolute top-[-10%] left-[-10%] h-[350px] w-[350px] rounded-full bg-emerald-500/10 blur-[80px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] h-[350px] w-[350px] rounded-full bg-blue-500/10 blur-[80px] pointer-events-none" />

      <div className="w-full max-w-md glass p-8 rounded-2xl animate-fade-in shadow-2xl relative z-10">
        {/* Brand Logo */}
        <div className="flex flex-col items-center justify-center gap-2 mb-8">
          <div className="h-12 w-12 rounded-2xl gradient-bg flex items-center justify-center shadow-lg shadow-emerald-500/20">
            <Boxes className="h-6 w-6 text-[#0b0f19]" />
          </div>
          <h2 className="text-xl font-bold uppercase tracking-wider leading-none">Antigravity</h2>
          <span className="text-xs text-gray-400 font-medium">Invoice & Inventory Panel</span>
        </div>

        <h3 className="text-lg font-semibold text-center mb-6 text-gray-200">Scaffold a New Account</h3>

        {localError && (
          <div className="mb-6 flex items-start gap-2.5 p-3 rounded-xl border border-red-500/20 bg-red-500/10 text-xs text-red-400">
            <AlertCircle className="h-4 w-4 shrink-0 mt-0.5" />
            <span>{localError}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Full Name Input */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-gray-400">Full Name</label>
            <div className="relative">
              <UserIcon className="absolute left-3.5 top-3.5 h-4.5 w-4.5 text-gray-500" />
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="John Doe"
                className="w-full bg-[#121826]/60 border border-gray-800 rounded-xl py-3 pl-11 pr-4 text-sm text-gray-200 placeholder-gray-600 focus:outline-none focus:border-emerald-500/60 focus:ring-1 focus:ring-emerald-500/60 transition-all duration-200"
              />
            </div>
          </div>

          {/* Email input */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-gray-400">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-3.5 top-3.5 h-4.5 w-4.5 text-gray-500" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="john@example.com"
                className="w-full bg-[#121826]/60 border border-gray-800 rounded-xl py-3 pl-11 pr-4 text-sm text-gray-200 placeholder-gray-600 focus:outline-none focus:border-emerald-500/60 focus:ring-1 focus:ring-emerald-500/60 transition-all duration-200"
              />
            </div>
          </div>

          {/* Password input */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-gray-400">Password (Min 6 chars)</label>
            <div className="relative">
              <Lock className="absolute left-3.5 top-3.5 h-4.5 w-4.5 text-gray-500" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-[#121826]/60 border border-gray-800 rounded-xl py-3 pl-11 pr-4 text-sm text-gray-200 placeholder-gray-600 focus:outline-none focus:border-emerald-500/60 focus:ring-1 focus:ring-emerald-500/60 transition-all duration-200"
              />
            </div>
          </div>

          {/* Confirm Password input */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-gray-400">Confirm Password</label>
            <div className="relative">
              <Lock className="absolute left-3.5 top-3.5 h-4.5 w-4.5 text-gray-500" />
              <input
                type="password"
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-[#121826]/60 border border-gray-800 rounded-xl py-3 pl-11 pr-4 text-sm text-gray-200 placeholder-gray-600 focus:outline-none focus:border-emerald-500/60 focus:ring-1 focus:ring-emerald-500/60 transition-all duration-200"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="w-full py-3.5 rounded-xl gradient-bg text-[#0b0f19] font-bold text-sm hover:scale-[1.01] active:scale-[0.99] transition-all duration-200 shadow-lg shadow-emerald-500/20 disabled:opacity-50 disabled:pointer-events-none mt-2"
          >
            {submitting ? 'Creating Account...' : 'Sign Up'}
          </button>
        </form>

        <p className="mt-8 text-center text-xs text-gray-400">
          Already have an account?{' '}
          <Link to="/login" className="text-emerald-400 hover:text-emerald-300 font-semibold underline underline-offset-4">
            Sign In Instead
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
