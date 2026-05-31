import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { AlertCircle, Boxes, Building2, Mail, Phone, Lock, Globe, Map } from 'lucide-react';

// Colored Zoho Logo component in SVG
const ZohoLogo = () => (
  <div className="flex items-center gap-2 justify-start">
    <div className="h-8 w-8 rounded bg-[#d22630] flex items-center justify-center text-white shadow-md">
      <Boxes className="h-4.5 w-4.5" />
    </div>
    <div className="flex flex-col text-left">
      <span className="text-[9px] text-slate-400 uppercase tracking-widest leading-none font-bold">Zoho</span>
      <span className="text-[17px] font-black text-slate-900 leading-tight tracking-tight">Inventory</span>
    </div>
  </div>
);

const Register = () => {
  const { register } = useAuth();
  const navigate = useNavigate();

  // Inputs
  const [companyName, setCompanyName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [country, setCountry] = useState('India');
  const [stateProvince, setStateProvince] = useState('Haryana');
  const [agreeTerms, setAgreeTerms] = useState(false);

  const [localError, setLocalError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!companyName || !email || !password) {
      return setLocalError('Please fill in all required fields.');
    }
    if (!agreeTerms) {
      return setLocalError('You must agree to the Terms of Service and Privacy Policy.');
    }
    if (password.length < 6) {
      return setLocalError('Password must be at least 6 characters long.');
    }

    setLocalError('');
    setSubmitting(true);

    // Call context register using companyName as the primary identifier
    const result = await register(companyName, email, password);
    setSubmitting(false);

    if (result.success) {
      navigate('/dashboard');
    } else {
      setLocalError(result.error);
    }
  };

  return (
    <div className="flex min-h-screen bg-white font-sans text-slate-800 antialiased select-none overflow-x-hidden">
      
      {/* --- LEFT EDITORIAL PANEL (40% Width) --- */}
      <div className="hidden lg:flex w-[40%] bg-[#f5b82a] p-12 flex-col justify-between relative overflow-hidden shrink-0 min-h-screen">
        
        {/* Floating background grids for decorative depth */}
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute top-[10%] left-[20%] w-[200px] h-[200px] border border-black rotate-12" />
        </div>

        {/* Quotation & Slogan Block */}
        <div className="space-y-8 relative z-10 text-left pt-6">
          <span className="text-6xl font-black text-[#e0a218] leading-none select-none block">“</span>
          
          <h2 className="text-3xl font-extrabold text-[#1a2332] leading-snug tracking-tight max-w-sm">
            With Zoho Inventory, you can actually organize your business.
          </h2>

          {/* Testimonial Author profile card */}
          <div className="flex items-center gap-3 pt-6">
            <div className="h-10 w-10 rounded-full bg-slate-900 border-2 border-white/40 flex items-center justify-center text-amber-400 font-extrabold text-sm shadow">
              RS
            </div>
            <div>
              <h5 className="font-extrabold text-xs text-[#1a2332]">Raghav Sukhadia</h5>
              <p className="text-[10px] text-slate-700 font-bold">Director, Sunkool Automotive Films</p>
            </div>
          </div>
        </div>

        {/* --- CUSTOM SVG WAREHOUSE SHELVING DRAWING (Screenshot 2) --- */}
        <div className="relative w-full h-72 self-end shrink-0 opacity-85 select-none pointer-events-none z-10">
          <svg className="w-full h-full" viewBox="0 0 350 250" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* Shelf Frame Pillars */}
            <rect x="30" y="20" width="8" height="230" fill="#a4720e" rx="1.5" />
            <rect x="160" y="20" width="8" height="230" fill="#a4720e" rx="1.5" />
            <rect x="290" y="20" width="8" height="230" fill="#a4720e" rx="1.5" />

            {/* Shelf Horizontal Planks */}
            <rect x="20" y="90" width="290" height="6" fill="#805400" rx="1" />
            <rect x="20" y="160" width="290" height="6" fill="#805400" rx="1" />
            <rect x="20" y="225" width="290" height="6" fill="#805400" rx="1" />

            {/* Top Shelf Items (Boxes) */}
            <rect x="45" y="45" width="40" height="45" fill="#d29624" stroke="#805400" strokeWidth="1.5" rx="2" />
            <line x1="45" y1="67.5" x2="85" y2="67.5" stroke="#805400" strokeWidth="1" />
            
            <rect x="95" y="35" width="55" height="55" fill="#e0a230" stroke="#805400" strokeWidth="1.5" rx="2" />
            <line x1="95" y1="62.5" x2="150" y2="62.5" stroke="#805400" strokeWidth="1" />

            <rect x="180" y="45" width="45" height="45" fill="#d29624" stroke="#805400" strokeWidth="1.5" rx="2" />
            <line x1="180" y1="67.5" x2="225" y2="67.5" stroke="#805400" strokeWidth="1" />

            {/* Middle Shelf Items */}
            <rect x="45" y="115" width="50" height="45" fill="#e0a230" stroke="#805400" strokeWidth="1.5" rx="2" />
            <line x1="45" y1="137.5" x2="95" y2="137.5" stroke="#805400" strokeWidth="1" />

            <rect x="180" y="105" width="60" height="55" fill="#d29624" stroke="#805400" strokeWidth="1.5" rx="2" />
            <line x1="180" y1="132.5" x2="240" y2="132.5" stroke="#805400" strokeWidth="1" />

            <rect x="250" y="125" width="30" height="35" fill="#e0a230" stroke="#805400" strokeWidth="1.5" rx="2" />
            <line x1="250" y1="142.5" x2="280" y2="142.5" stroke="#805400" strokeWidth="1" />

            {/* Bottom Shelf Items */}
            <rect x="45" y="180" width="60" height="45" fill="#d29624" stroke="#805400" strokeWidth="1.5" rx="2" />
            <line x1="45" y1="202.5" x2="105" y2="202.5" stroke="#805400" strokeWidth="1" />

            <rect x="115" y="190" width="35" height="35" fill="#e0a230" stroke="#805400" strokeWidth="1.5" rx="2" />
            <line x1="115" y1="207.5" x2="150" y2="207.5" stroke="#805400" strokeWidth="1" />

            <rect x="180" y="175" width="55" height="50" fill="#e0a230" stroke="#805400" strokeWidth="1.5" rx="2" />
            <line x1="180" y1="200" x2="235" y2="200" stroke="#805400" strokeWidth="1" />
          </svg>
        </div>
      </div>

      {/* --- RIGHT REGISTRATION FORM (60% Width) --- */}
      <div className="w-full lg:w-[60%] p-8 md:p-12 lg:p-16 flex flex-col justify-between min-h-screen text-left bg-white relative">
        
        {/* Top brand header */}
        <div className="flex justify-between items-center shrink-0 border-b border-slate-100 pb-4">
          <ZohoLogo />
          <Link to="/" className="text-xs font-bold text-slate-500 hover:text-slate-900 transition-colors uppercase tracking-wider">Home</Link>
        </div>

        {/* Registration Form Box Middle */}
        <div className="my-8 max-w-lg w-full mx-auto space-y-6">
          <div>
            <h2 className="text-xl md:text-2xl font-black text-slate-900 leading-tight">Let's get started</h2>
            <p className="text-xs text-slate-400 font-bold mt-1 uppercase tracking-wider">Configure your warehouse operations</p>
          </div>

          {localError && (
            <div className="flex items-start gap-2.5 p-3 rounded bg-rose-50 border border-rose-100 text-xs text-rose-600 font-bold">
              <AlertCircle className="h-4.5 w-4.5 shrink-0 mt-0.5" />
              <span>{localError}</span>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4 font-semibold text-xs text-slate-500">
            {/* Company Name */}
            <div className="space-y-1.5">
              <div className="relative">
                <Building2 className="absolute left-3.5 top-3.5 h-4.5 w-4.5 text-slate-400" />
                <input
                  type="text"
                  required
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  placeholder="Company Name"
                  className="w-full bg-[#fdfbf7] border border-slate-200 focus:border-[#d22630]/60 focus:ring-1 focus:ring-[#d22630]/60 rounded-lg py-3 pl-11 pr-4 text-xs font-bold text-slate-800 placeholder-slate-400 focus:outline-none transition-all"
                />
              </div>
            </div>

            {/* Email Address */}
            <div className="space-y-1.5">
              <div className="relative">
                <Mail className="absolute left-3.5 top-3.5 h-4.5 w-4.5 text-slate-400" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email Address"
                  className="w-full bg-[#fdfbf7] border border-slate-200 focus:border-[#d22630]/60 focus:ring-1 focus:ring-[#d22630]/60 rounded-lg py-3 pl-11 pr-4 text-xs font-bold text-slate-800 placeholder-slate-400 focus:outline-none transition-all"
                />
              </div>
            </div>

            {/* Phone (prefilled code) */}
            <div className="space-y-1.5">
              <div className="relative">
                <Phone className="absolute left-3.5 top-3.5 h-4.5 w-4.5 text-slate-400" />
                <div className="absolute left-11 top-3 text-xs font-black text-slate-500 border-r border-slate-200 pr-2 select-none">+91</div>
                <input
                  type="text"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="Phone number"
                  className="w-full bg-[#fdfbf7] border border-slate-200 focus:border-[#d22630]/60 focus:ring-1 focus:ring-[#d22630]/60 rounded-lg py-3 pl-20 pr-4 text-xs font-bold text-slate-800 placeholder-slate-400 focus:outline-none transition-all"
                />
              </div>
            </div>

            {/* Password */}
            <div className="space-y-1.5">
              <div className="relative">
                <Lock className="absolute left-3.5 top-3.5 h-4.5 w-4.5 text-slate-400" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                  className="w-full bg-[#fdfbf7] border border-slate-200 focus:border-[#d22630]/60 focus:ring-1 focus:ring-[#d22630]/60 rounded-lg py-3 pl-11 pr-4 text-xs font-bold text-slate-800 placeholder-slate-400 focus:outline-none transition-all"
                />
              </div>
            </div>

            {/* Country & State Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Country dropdown */}
              <div className="space-y-1.5">
                <div className="relative">
                  <Globe className="absolute left-3.5 top-3.5 h-4.5 w-4.5 text-slate-400" />
                  <select
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                    className="w-full bg-[#fdfbf7] border border-slate-200 focus:border-[#d22630]/60 rounded-lg py-3.5 pl-11 pr-4 text-xs font-bold text-slate-800 focus:outline-none transition-all cursor-pointer"
                  >
                    <option value="India">India</option>
                    <option value="United States">United States</option>
                    <option value="United Kingdom">United Kingdom</option>
                    <option value="Canada">Canada</option>
                  </select>
                </div>
              </div>

              {/* State dropdown */}
              <div className="space-y-1.5">
                <div className="relative">
                  <Map className="absolute left-3.5 top-3.5 h-4.5 w-4.5 text-slate-400" />
                  <select
                    value={stateProvince}
                    onChange={(e) => setStateProvince(e.target.value)}
                    className="w-full bg-[#fdfbf7] border border-slate-200 focus:border-[#d22630]/60 rounded-lg py-3.5 pl-11 pr-4 text-xs font-bold text-slate-800 focus:outline-none transition-all cursor-pointer"
                  >
                    <option value="Haryana">Haryana</option>
                    <option value="Karnataka">Karnataka</option>
                    <option value="Maharashtra">Maharashtra</option>
                    <option value="Delhi">Delhi</option>
                    <option value="California">California</option>
                  </select>
                </div>
              </div>
            </div>

            <p className="text-[10px] text-slate-400 font-extrabold text-center uppercase tracking-widest pt-1">
              Your data will be in INDIA data center.
            </p>

            {/* Terms checkbox */}
            <div className="flex items-start gap-2.5 pt-2 select-none">
              <input
                type="checkbox"
                required
                id="terms"
                checked={agreeTerms}
                onChange={(e) => setAgreeTerms(e.target.checked)}
                className="h-4.5 w-4.5 rounded border-slate-200 focus:ring-[#d22630] cursor-pointer mt-0.5 accent-[#d22630]"
              />
              <label htmlFor="terms" className="text-[11px] font-semibold text-slate-500 leading-relaxed cursor-pointer">
                I agree to the <span className="text-[#d22630] hover:underline font-extrabold cursor-pointer">Terms of Service</span> and <span className="text-[#d22630] hover:underline font-extrabold cursor-pointer">Privacy Policy</span>.
              </label>
            </div>

            {/* Action buttons */}
            <button
              type="submit"
              disabled={submitting}
              className="w-full py-3.5 bg-[#d22630] text-white rounded-lg font-black text-xs uppercase tracking-widest hover:bg-[#b01e25] transition-all shadow-md shadow-[#d22630]/15 active:scale-99 cursor-pointer disabled:opacity-50 disabled:pointer-events-none mt-4"
            >
              {submitting ? 'Creating your account...' : 'Create your account'}
            </button>
          </form>

          {/* Social credentials */}
          <div className="space-y-3.5 pt-6 border-t border-slate-100">
            <span className="text-[10px] text-slate-400 font-extrabold uppercase tracking-widest block text-center">or login using</span>
            <div className="flex items-center justify-center gap-3">
              {/* Google */}
              <button className="h-9 w-14 bg-slate-50 border border-slate-200 rounded flex items-center justify-center hover:bg-slate-100 shadow-sm cursor-pointer font-black text-red-500">G</button>
              {/* Facebook */}
              <button className="h-9 w-14 bg-slate-50 border border-slate-200 rounded flex items-center justify-center hover:bg-slate-100 shadow-sm cursor-pointer font-black text-[#1877f2]">F</button>
              {/* LinkedIn */}
              <button className="h-9 w-14 bg-slate-50 border border-slate-200 rounded flex items-center justify-center hover:bg-slate-100 shadow-sm cursor-pointer font-black text-[#0077b5]">in</button>
              {/* X */}
              <button className="h-9 w-14 bg-slate-50 border border-slate-200 rounded flex items-center justify-center hover:bg-slate-100 shadow-sm cursor-pointer font-black text-black">X</button>
            </div>
          </div>
        </div>

        {/* Footer login redirect link */}
        <div className="text-center text-xs font-semibold text-slate-500 border-t border-slate-100 pt-4 mt-2">
          <span>Already have a Zoho account? </span>
          <Link to="/login" className="text-[#d22630] hover:underline font-bold transition-all">
            Log in
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
