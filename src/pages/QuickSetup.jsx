import React, { useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Loader from '../components/Loader';
import { 
  AlertTriangle, 
  Check, 
  Plus, 
  X 
} from 'lucide-react';

const QuickSetup = () => {
  const { user, loading, completeSetup, logout } = useAuth();
  const navigate = useNavigate();

  // Organization Form States
  const [orgName, setOrgName] = useState('Kapil');
  const [industry, setIndustry] = useState('Art and Design');
  const [location, setLocation] = useState('India');
  const [stateTerritory, setStateTerritory] = useState('Haryana');
  const [currency, setCurrency] = useState('INR - Indian Rupee');
  const [language, setLanguage] = useState('English');
  const [timeZone, setTimeZone] = useState('(GMT 5:30) India Standard Time (Asia/Calcutta)');
  const [startDate, setStartDate] = useState('2026-06-30');
  const [fiscalYear, setFiscalYear] = useState('April - March');

  const [formSubmitting, setFormSubmitting] = useState(false);
  const [errorText, setErrorText] = useState('');
  
  // Show standard pink mock warning box from Screenshot 2
  const [showWarning, setShowWarning] = useState(true);

  if (loading) {
    return <Loader fullPage={true} />;
  }

  // Redirect if not logged in
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // Redirect if setup already completed
  if (user.setupCompleted) {
    return <Navigate to="/dashboard" replace />;
  }

  const handleGetStarted = async (e) => {
    e.preventDefault();
    if (!orgName) {
      return setErrorText('Organization Name is required.');
    }
    
    setFormSubmitting(true);
    setErrorText('');

    try {
      const res = await completeSetup(orgName);
      if (res.success) {
        navigate('/dashboard');
      } else {
        setErrorText(res.error || 'Failed to initialize organization setup.');
      }
    } catch (err) {
      console.error(err);
      setErrorText(err.message || 'An error occurred during organization settings save.');
    } finally {
      setFormSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f5f6f8] text-slate-800 font-sans selection:bg-[#d22630]/20 antialiased overflow-x-hidden p-6 md:p-12 relative flex flex-col justify-between">
      
      {/* Decorative yellow/orange background polygons (mimicking Screenshot 2) */}
      <div className="absolute inset-y-0 left-0 w-32 opacity-15 pointer-events-none hidden lg:block overflow-hidden">
        <div className="absolute top-[10%] left-[-20px] w-24 h-24 bg-amber-400 rotate-45 transform origin-top-left rounded-lg" />
        <div className="absolute top-[25%] left-[-40px] w-32 h-32 bg-yellow-500 rounded-full" />
        <div className="absolute top-[45%] left-[-10px] w-16 h-16 bg-amber-600 rotate-12 rounded" />
      </div>
      <div className="absolute inset-y-0 right-0 w-32 opacity-15 pointer-events-none hidden lg:block overflow-hidden">
        <div className="absolute bottom-[10%] right-[-20px] w-24 h-24 bg-amber-400 rotate-12 transform origin-bottom-right rounded-lg" />
        <div className="absolute bottom-[30%] right-[-45px] w-36 h-36 bg-yellow-500 rounded-full" />
        <div className="absolute bottom-[50%] right-[-10px] w-16 h-16 bg-amber-500 rotate-45 rounded" />
      </div>

      {/* Top Header Row (Power off Logout) */}
      <div className="max-w-7xl w-full mx-auto flex items-center justify-end shrink-0 mb-6 text-xs text-slate-500">
        <div className="flex items-center gap-2">
          <span>Welcome <span className="text-slate-800 font-bold">{user.name}</span></span>
          <button 
            onClick={logout}
            className="text-blue-500 hover:text-blue-700 cursor-pointer p-1 rounded-full hover:bg-slate-200/50 transition-colors"
            title="Sign Out"
          >
            <svg className="h-4.5 w-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M5.636 5.636a9 9 0 1012.728 0M12 3v9" />
            </svg>
          </button>
        </div>
      </div>

      {/* Centered Logo and Brand Statement */}
      <div className="max-w-7xl w-full mx-auto flex flex-col items-center justify-center shrink-0 mb-8 select-none">
        <div className="flex items-center gap-2.5">
          {/* Zoho Inventory signature clipboard/box icon */}
          <div className="flex items-center gap-1.5 justify-start">
            <svg width="46" height="32" viewBox="0 0 78 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="shrink-0">
              <rect x="2" y="2" width="16" height="16" rx="2" fill="#E2231A" stroke="#E2231A" strokeWidth="1.5" />
              <rect x="20" y="2" width="16" height="16" rx="2" fill="#00A24A" stroke="#00A24A" strokeWidth="1.5" />
              <rect x="20" y="20" width="16" height="16" rx="2" fill="#0069B4" stroke="#0069B4" strokeWidth="1.5" />
              <rect x="2" y="20" width="16" height="16" rx="2" fill="#F5B800" stroke="#F5B800" strokeWidth="1.5" />
              <text x="42" y="24" fill="#000000" fontSize="13" fontWeight="900" letterSpacing="1.5">ZOHO</text>
            </svg>
          </div>
          <span className="text-[22px] font-black text-slate-800 tracking-tight">Inventory</span>
        </div>
        <p className="text-xs text-slate-500 font-semibold mt-3 tracking-wide text-center">
          Zoho Inventory is your end-to-end online order management software.
        </p>
      </div>

      {/* Main Panel grid (Screenshot 2) */}
      <div className="max-w-7xl w-full mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8 items-start my-auto z-10 relative">
        
        {/* --- LEFT FORM PANEL (66% Width) --- */}
        <div className="lg:col-span-2 space-y-6 text-left">
          
          <div className="bg-white border-t-4 border-[#ff7a00] border-x border-b border-slate-200/60 rounded-b-xl shadow-md p-6 md:p-8 space-y-6 relative overflow-hidden">
            
            <div className="text-center space-y-1 py-1">
              <h2 className="text-[19px] font-bold text-slate-800 tracking-tight">Set up your organization profile</h2>
              <div className="h-0.5 w-7 bg-[#ff7a00] mx-auto mt-2" />
            </div>

            {/* Pink warning box from Screenshot 2 */}
            {showWarning && (
              <div className="flex items-center justify-between py-2 px-4 rounded bg-[#fdf2f2] border border-[#fde8e8] text-xs text-[#c81e1e] font-semibold select-none animate-fade-in">
                <div className="flex items-center gap-2">
                  <span className="text-[15px] leading-none">•</span>
                  <span>The given edition/country is not supported.</span>
                </div>
                <button 
                  onClick={() => setShowWarning(false)}
                  className="text-rose-400 hover:text-rose-600 cursor-pointer p-0.5 rounded-full hover:bg-rose-100/50 transition-colors"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            )}

            {errorText && (
              <div className="flex items-start gap-2.5 p-3 rounded bg-rose-50 border border-rose-100 text-xs text-rose-600 font-bold">
                <AlertTriangle className="h-4 w-4 shrink-0 mt-0.5" />
                <span>{errorText}</span>
              </div>
            )}

            <form onSubmit={handleGetStarted} className="space-y-6 font-semibold text-xs text-slate-500">
              
              {/* --- SECTION A: ORGANIZATIONAL DETAILS --- */}
              <div className="space-y-4">
                <h3 className="text-[9px] font-extrabold text-slate-400 uppercase tracking-widest border-b border-slate-100 pb-2">Organizational Details</h3>
                
                {/* Org Name */}
                <div className="space-y-1.5 text-left">
                  <label className="text-slate-500 font-semibold">Organization Name *</label>
                  <input
                    type="text"
                    required
                    value={orgName}
                    onChange={(e) => setOrgName(e.target.value)}
                    placeholder="e.g. Kapil Sunkool Ltd"
                    className="w-full bg-[#fdfbf7] border border-slate-200 focus:border-[#ff7a00]/60 rounded-md py-2.5 px-4 text-xs font-bold text-slate-800 focus:outline-none transition-all shadow-sm"
                  />
                </div>

                {/* Industry */}
                <div className="space-y-1.5 text-left">
                  <label className="text-slate-500 font-semibold">Industry</label>
                  <select
                    value={industry}
                    onChange={(e) => setIndustry(e.target.value)}
                    className="w-full bg-[#fdfbf7] border border-slate-200 focus:border-[#ff7a00]/60 rounded-md py-2.5 px-4 text-xs font-bold text-slate-800 focus:outline-none transition-all cursor-pointer shadow-sm"
                  >
                    <option value="Art and Design">Art and Design</option>
                    <option value="Retail">Retail</option>
                    <option value="Manufacturing">Manufacturing</option>
                    <option value="Services">Services</option>
                    <option value="Wholesale">Wholesale</option>
                  </select>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Location */}
                  <div className="space-y-1.5 text-left">
                    <label className="text-slate-500 font-semibold">Organization Location *</label>
                    <select
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      className="w-full bg-[#fdfbf7] border border-slate-200 focus:border-[#ff7a00]/60 rounded-md py-2.5 px-4 text-xs font-bold text-slate-800 focus:outline-none transition-all cursor-pointer shadow-sm"
                    >
                      <option value="India">India</option>
                      <option value="United States">United States</option>
                      <option value="United Kingdom">United Kingdom</option>
                      <option value="Canada">Canada</option>
                    </select>
                  </div>

                  {/* State */}
                  <div className="space-y-1.5 text-left">
                    <label className="text-slate-500 font-semibold">State/Union Territory *</label>
                    <select
                      value={stateTerritory}
                      onChange={(e) => setStateTerritory(e.target.value)}
                      className="w-full bg-[#fdfbf7] border border-slate-200 focus:border-[#ff7a00]/60 rounded-md py-2.5 px-4 text-xs font-bold text-slate-800 focus:outline-none transition-all cursor-pointer shadow-sm"
                    >
                      <option value="Haryana">Haryana</option>
                      <option value="Karnataka">Karnataka</option>
                      <option value="Maharashtra">Maharashtra</option>
                      <option value="California">California</option>
                    </select>
                  </div>
                </div>

                {/* Add Address button */}
                <button type="button" className="flex items-center gap-1 text-[#0088ff] hover:text-[#0077ee] font-bold cursor-pointer text-xs">
                  <span className="flex items-center justify-center w-4 h-4 rounded-full border border-[#0088ff]">
                    <Plus className="h-2.5 w-2.5 stroke-[3]" />
                  </span>
                  <span>Add Organization Address</span>
                </button>
              </div>

              {/* --- SECTION B: REGIONAL SETTINGS --- */}
              <div className="space-y-4 pt-2">
                <h3 className="text-[9px] font-extrabold text-slate-400 uppercase tracking-widest border-b border-slate-100 pb-2">Regional Settings</h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Currency */}
                  <div className="space-y-1.5 text-left">
                    <label className="text-slate-500 font-semibold">Currency *</label>
                    <select
                      value={currency}
                      onChange={(e) => setCurrency(e.target.value)}
                      className="w-full bg-[#fdfbf7] border border-slate-200 focus:border-[#ff7a00]/60 rounded-md py-2.5 px-4 text-xs font-bold text-slate-800 focus:outline-none transition-all cursor-pointer shadow-sm"
                    >
                      <option value="INR - Indian Rupee">INR - Indian Rupee</option>
                      <option value="USD - US Dollar">USD - US Dollar</option>
                      <option value="GBP - British Pound">GBP - British Pound</option>
                    </select>
                  </div>

                  {/* Language */}
                  <div className="space-y-1.5 text-left">
                    <label className="text-slate-500 font-semibold">Language *</label>
                    <select
                      value={language}
                      onChange={(e) => setLanguage(e.target.value)}
                      className="w-full bg-[#fdfbf7] border border-slate-200 focus:border-[#ff7a00]/60 rounded-md py-2.5 px-4 text-xs font-bold text-slate-800 focus:outline-none transition-all cursor-pointer shadow-sm"
                    >
                      <option value="English">English</option>
                      <option value="Hindi">Hindi</option>
                      <option value="Spanish">Spanish</option>
                    </select>
                  </div>
                </div>

                {/* Time Zone */}
                <div className="space-y-1.5 text-left">
                  <label className="text-slate-500 font-semibold">Time Zone *</label>
                  <select
                    value={timeZone}
                    onChange={(e) => setTimeZone(e.target.value)}
                    className="w-full bg-[#fdfbf7] border border-slate-200 focus:border-[#ff7a00]/60 rounded-md py-2.5 px-4 text-xs font-bold text-slate-800 focus:outline-none transition-all cursor-pointer shadow-sm"
                  >
                    <option value="(GMT 5:30) India Standard Time (Asia/Calcutta)">(GMT 5:30) India Standard Time (Asia/Calcutta)</option>
                    <option value="(GMT-8:00) Pacific Standard Time (America/Los_Angeles)">(GMT-8:00) Pacific Standard Time (America/Los_Angeles)</option>
                  </select>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Start Date */}
                  <div className="space-y-1.5 text-left">
                    <label className="text-slate-500 font-semibold">Inventory Start Date *</label>
                    <input
                      type="date"
                      required
                      value={startDate}
                      onChange={(e) => setStartDate(e.target.value)}
                      className="w-full bg-[#fdfbf7] border border-slate-200 focus:border-[#ff7a00]/60 rounded-md py-2 px-4 text-xs font-bold text-slate-800 focus:outline-none transition-all shadow-sm"
                    />
                  </div>

                  {/* Fiscal Year */}
                  <div className="space-y-1.5 text-left">
                    <label className="text-slate-500 font-semibold">Fiscal Year *</label>
                    <select
                      value={fiscalYear}
                      onChange={(e) => setFiscalYear(e.target.value)}
                      className="w-full bg-[#fdfbf7] border border-slate-200 focus:border-[#ff7a00]/60 rounded-md py-2.5 px-4 text-xs font-bold text-slate-800 focus:outline-none transition-all cursor-pointer shadow-sm"
                    >
                      <option value="April - March">April - March</option>
                      <option value="January - December">January - December</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Notes */}
              <div className="p-4 bg-slate-50 border border-slate-100 rounded-xl space-y-2 text-[11px] text-slate-500 leading-relaxed font-semibold">
                <p><span className="font-bold text-slate-700">Note:</span></p>
                <p>• You can update some of these preferences from Settings anytime.</p>
                <p>• The language you select on this page will be the default language for the following features even if you change the language later:</p>
                <div className="flex flex-wrap gap-4 font-bold text-slate-600 pt-1.5">
                  <span className="flex items-center gap-1"><span className="text-[#ff7a00]">★</span> Email Templates</span>
                  <span className="flex items-center gap-1"><span className="text-[#ff7a00]">★</span> Template Customizations</span>
                  <span className="flex items-center gap-1"><span className="text-[#ff7a00]">★</span> Payment Modes</span>
                </div>
              </div>

              {/* Form Buttons */}
              <div className="flex items-center gap-3 pt-4 border-t border-slate-100">
                <button
                  type="submit"
                  disabled={formSubmitting}
                  className="px-6 py-2.5 bg-[#d22630] text-white rounded font-bold text-[13px] hover:bg-[#b01e25] transition-all shadow-md active:scale-95 cursor-pointer disabled:opacity-50 disabled:pointer-events-none"
                >
                  {formSubmitting ? 'Saving settings...' : 'Get Started'}
                </button>
                <button
                  type="button"
                  onClick={logout}
                  className="px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded font-bold text-[13px] transition-colors cursor-pointer border border-slate-200"
                >
                  Go Back
                </button>
                <a href="#privacy" className="text-xs text-slate-400 hover:underline font-bold ml-auto">Privacy Policy</a>
              </div>
            </form>
          </div>
        </div>

        {/* --- RIGHT SIDEBAR PANELS (33% Width) --- */}
        <div className="space-y-6 text-left shrink-0">
          
          {/* Column 1: Key Features of Zoho Inventory */}
          <div className="p-5 rounded-xl bg-white border border-slate-200/80 shadow-sm space-y-4">
            <div>
              <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest block pb-1">Check out</span>
              <p className="font-extrabold text-[#f58220] text-[13px]">Key Features of Zoho Inventory!</p>
            </div>
            
            <ul className="space-y-3 font-semibold text-[11px] text-slate-600">
              <li className="flex items-center gap-2">
                <div className="h-4.5 w-4.5 rounded-full bg-[#fde8e8] flex items-center justify-center shrink-0">
                  <Check className="h-3 w-3 text-[#ff7a00] stroke-[3]" />
                </div>
                <span>Serial and Batch Tracking</span>
              </li>
              <li className="flex items-center gap-2">
                <div className="h-4.5 w-4.5 rounded-full bg-[#fde8e8] flex items-center justify-center shrink-0">
                  <Check className="h-3 w-3 text-[#ff7a00] stroke-[3]" />
                </div>
                <span>Warehouse Management</span>
              </li>
              <li className="flex items-center gap-2">
                <div className="h-4.5 w-4.5 rounded-full bg-[#fde8e8] flex items-center justify-center shrink-0">
                  <Check className="h-3 w-3 text-[#ff7a00] stroke-[3]" />
                </div>
                <span>Stock Counts</span>
              </li>
              <li className="flex items-center gap-2">
                <div className="h-4.5 w-4.5 rounded-full bg-[#fde8e8] flex items-center justify-center shrink-0">
                  <Check className="h-3 w-3 text-[#ff7a00] stroke-[3]" />
                </div>
                <span>Bin Location</span>
              </li>
              <li className="flex items-center gap-2">
                <div className="h-4.5 w-4.5 rounded-full bg-[#fde8e8] flex items-center justify-center shrink-0">
                  <Check className="h-3 w-3 text-[#ff7a00] stroke-[3]" />
                </div>
                <span>Barcode Generation</span>
              </li>
              <li className="flex items-center gap-2">
                <div className="h-4.5 w-4.5 rounded-full bg-[#fde8e8] flex items-center justify-center shrink-0">
                  <Check className="h-3 w-3 text-[#ff7a00] stroke-[3]" />
                </div>
                <span>Composite Items</span>
              </li>
              <li className="flex items-center gap-2">
                <div className="h-4.5 w-4.5 rounded-full bg-[#fde8e8] flex items-center justify-center shrink-0">
                  <Check className="h-3 w-3 text-[#ff7a00] stroke-[3]" />
                </div>
                <span>Units of Measurement</span>
              </li>
              <li className="flex items-center gap-2">
                <div className="h-4.5 w-4.5 rounded-full bg-[#fde8e8] flex items-center justify-center shrink-0">
                  <Check className="h-3 w-3 text-[#ff7a00] stroke-[3]" />
                </div>
                <span>Picklists</span>
              </li>
            </ul>
          </div>

          {/* Column 2: Your Go-To Marketplaces (Screenshot 2) */}
          <div className="p-5 rounded-xl bg-white border border-slate-200/80 shadow-sm space-y-4">
            <div>
              <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest block pb-1">Your Go-To</span>
              <p className="font-extrabold text-[#f58220] text-[13px] leading-tight">Marketplaces All in One Place!</p>
            </div>
            
            <div className="grid grid-cols-2 gap-3 pt-1 text-[10px] font-black tracking-tight select-none">
              {/* Amazon */}
              <div className="flex flex-col items-center justify-center h-12 bg-[#fdfbf7] border border-slate-200 rounded-lg hover:border-[#ff7a00]/30 transition-all p-2 relative shadow-sm">
                <span className="font-extrabold text-[12px] text-slate-800 tracking-tighter leading-none">amazon</span>
                <svg className="w-10 h-1.5 mt-0.5" viewBox="0 0 40 8" fill="none">
                  <path d="M2 2C10 6 30 6 38 2" stroke="#f58220" strokeWidth="2" strokeLinecap="round" />
                  <path d="M34 2L38 2L36 6" stroke="#f58220" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              {/* Etsy */}
              <div className="flex items-center justify-center h-12 bg-[#fdfbf7] border border-slate-200 rounded-lg hover:border-[#ff7a00]/30 transition-all p-2 shadow-sm">
                <span className="font-serif font-bold text-[13px] text-[#eb6d20]">Etsy</span>
              </div>
              {/* eBay */}
              <div className="flex items-center justify-center h-12 bg-[#fdfbf7] border border-slate-200 rounded-lg hover:border-[#ff7a00]/30 transition-all p-2 text-[14px] font-black tracking-tight shadow-sm">
                <span className="text-[#e53238]">e</span>
                <span className="text-[#0064d2]">b</span>
                <span className="text-[#fecb00]">a</span>
                <span className="text-[#86b817]">y</span>
              </div>
              {/* Zoho Commerce */}
              <div className="flex items-center justify-center gap-1 h-12 bg-[#fdfbf7] border border-slate-200 rounded-lg hover:border-[#ff7a00]/30 transition-all px-1 py-2 shadow-sm">
                <svg className="w-3.5 h-3.5 shrink-0" viewBox="0 0 24 24" fill="none">
                  <rect width="10" height="10" fill="#E2231A" rx="1" />
                  <rect x="12" width="10" height="10" fill="#00A24A" rx="1" />
                  <rect y="12" width="10" height="10" fill="#F5B800" rx="1" />
                  <rect x="12" y="12" width="10" height="10" fill="#0069B4" rx="1" />
                </svg>
                <span className="font-bold text-[8.5px] text-slate-800 tracking-tight leading-none">Commerce</span>
              </div>
              {/* Shopify */}
              <div className="flex items-center justify-center gap-0.5 h-12 bg-[#fdfbf7] border border-slate-200 rounded-lg hover:border-[#ff7a00]/30 transition-all p-2 shadow-sm">
                <span className="text-[11px]">🛒</span>
                <span className="font-black text-[10.5px] text-[#96bf48] tracking-tighter">shopify</span>
              </div>
              {/* WooCommerce */}
              <div className="flex items-center justify-center gap-1 h-12 bg-[#fdfbf7] border border-slate-200 rounded-lg hover:border-[#ff7a00]/30 transition-all p-2 shadow-sm">
                <span className="text-[11px]">💜</span>
                <span className="font-black text-[9px] text-[#7f54b3] tracking-tighter uppercase">WOO</span>
              </div>
            </div>
          </div>

          {/* Column 3: Simplify Order Fulfillment Shipping (Screenshot 1) */}
          <div className="p-5 rounded-xl bg-white border border-slate-200/80 shadow-sm space-y-4">
            <div>
              <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest block pb-1">Simplify Order Fulfilment with</span>
              <p className="font-extrabold text-[#f58220] text-[13px] leading-tight">Reliable Shipping Partners!</p>
            </div>
            
            <div className="grid grid-cols-2 gap-3 pt-1 text-[9px] font-bold tracking-tight select-none">
              {/* Aftership */}
              <div className="flex items-center justify-center gap-1 h-11 bg-[#fdfbf7] border border-slate-200 rounded-lg shadow-sm">
                <div className="h-3.5 w-3.5 bg-[#ff6b00] rounded-full flex items-center justify-center text-white text-[7px]">⚡</div>
                <span className="font-black text-[8.5px] text-[#1c2434]">aftership</span>
              </div>
              {/* USPS */}
              <div className="flex items-center justify-center h-11 bg-[#fdfbf7] border border-slate-200 rounded-lg font-black italic text-[10px] text-[#0f2c59] tracking-tighter shadow-sm">
                USPS.COM
              </div>
              {/* DHL */}
              <div className="flex items-center justify-center h-11 bg-[#fdfbf7] border border-slate-200 rounded-lg shadow-sm">
                <div className="bg-[#ffcc00] px-1.5 py-0.5 rounded font-black italic text-[9px] text-[#d4001a] tracking-tight">
                  DHL
                </div>
              </div>
              {/* Easypost */}
              <div className="flex items-center justify-center gap-0.5 h-11 bg-[#fdfbf7] border border-slate-200 rounded-lg shadow-sm">
                <span className="font-black text-[11px] text-blue-600 leading-none">e</span>
                <span className="font-black text-[8.5px] text-slate-700">easypost</span>
              </div>
              {/* Shiprocket */}
              <div className="flex items-center justify-center gap-0.5 h-11 bg-[#fdfbf7] border border-slate-200 rounded-lg shadow-sm">
                <span className="text-[10px]">🚀</span>
                <span className="font-black text-[8px] text-indigo-700">Shiprocket</span>
              </div>
              {/* UPS */}
              <div className="flex items-center justify-center h-11 bg-[#fdfbf7] border border-slate-200 rounded-lg shadow-sm">
                <div className="bg-[#351c15] text-[#ffcc00] font-black text-[8px] px-1.5 py-0.5 rounded-md">
                  ups
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer copyright */}
      <span className="text-center text-[10px] text-slate-400 font-bold shrink-0 pt-8 mt-8 border-t border-slate-200/80 w-full max-w-7xl mx-auto">
        &copy; {new Date().getFullYear()}, Zoho Corporation Pvt. Ltd. All Rights Reserved (Simulated setup).
      </span>
    </div>
  );
};

export default QuickSetup;
