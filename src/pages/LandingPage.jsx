import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Boxes, 
  ArrowRight, 
  Check, 
  ChevronDown, 
  ChevronUp,
  Star,
  Search,
  ShoppingCart,
  Download,
  Smartphone,
  Info,
  CheckCircle,
  FileText,
  Warehouse,
  QrCode,
  Layers,
  ArrowUpRight
} from 'lucide-react';

const LandingPage = () => {
  // Megamenu visibility states
  const [activeMenu, setActiveMenu] = useState(null); // 'features' | 'integrations' | null

  // Compliance tab state
  const [activeTab, setActiveTab] = useState('gstin');

  // FAQ accordion state
  const [expandedFaq, setExpandedFaq] = useState(null);

  const toggleFaq = (index) => {
    setExpandedFaq(expandedFaq === index ? null : index);
  };

  const faqItems = [
    {
      q: "How does the real-time channel sync work?",
      a: "Antigravity connects directly to your Shopify, Amazon Seller, and WooCommerce stores via secure API webhooks. It automatically pulls sales invoices, updates stock quantities in real time, and alerts you the moment a catalog item hits critical low levels."
    },
    {
      q: "Is there a limit on PDF invoice generations?",
      a: "No! All premium tiers include unlimited, dynamic PDF invoice creations powered directly by PDFKit on our Node.js microservice. You can generate, customize, download, and email billing contracts with zero restrictions."
    },
    {
      q: "Can I connect my own custom email servers?",
      a: "Yes! While the platform triggers automated Nodemailer dispatches instantly using our high-speed relays, you can easily input your custom SMTP host, ports, and TLS credentials in your backend configuration to dispatch emails from your own domain."
    },
    {
      q: "What is the 'Resilient In-Memory Mock Database' mode?",
      a: "If the platform runs without an active MongoDB connection, our advanced backend automatically activates an in-memory database simulation. This keeps the entire system—authentication, inventory CRUD, invoicing pipelines, and Cloudinary mock file uploads—100% functional, allowing seamless local testing and product trials."
    }
  ];

  const handleMenuHover = (menu) => {
    setActiveMenu(menu);
  };

  const handleMenuLeave = () => {
    setActiveMenu(null);
  };

  const complianceTabs = [
    { id: 'gstin', label: 'GSTIN' },
    { id: 'hsn', label: 'HSN/SAC CODES' },
    { id: 'invoices', label: 'INVOICES' },
    { id: 'taxes', label: 'TAXES' },
    { id: 'eway', label: 'E-WAY BILLS' },
    { id: 'challan', label: 'DELIVERY CHALLAN' }
  ];

  const complianceContent = {
    gstin: {
      title: "Save GSTINs",
      desc: "Keep a central record of the GSTIN for the registered businesses and save time from manually entering it every time.",
      bullets: [
        "Save GSTIN of customers and vendors",
        "GSTIN gets added in the documents automatically",
        "Documents like invoice, bills, sales and purchase orders"
      ],
      formFields: [
        { label: "GST Treatment", val: "Registered Business" },
        { label: "GST Identification Number (GSTIN)", val: "29AAAAA0000A1Z5" },
        { label: "Place of Supply", val: "Karnataka" },
        { label: "Tax Preference", val: "Taxable" },
        { label: "Currency", val: "INR - Indian Rupee" },
        { label: "Payment Terms", val: "Due on Receipt" }
      ]
    },
    hsn: {
      title: "Automate HSN Mapping",
      desc: "Categorize your physical inventory catalog quickly using pre-validated HSN and SAC codes directly within your billing system.",
      bullets: [
        "Predefined catalog HSN codes",
        "Accurate tax rates mapping for interstate trades",
        "Avoid compliance delays during invoice dispatch"
      ],
      formFields: [
        { label: "Item Type", val: "Goods" },
        { label: "HSN Code", val: "84713010" },
        { label: "Tax Rate (%)", val: "18% GST" },
        { label: "Exemption Reason", val: "N/A" }
      ]
    },
    invoices: {
      title: "Compliant GST Invoices",
      desc: "Generate professional tax invoices instantly. The system dynamically populates CGST, SGST, and IGST according to trade coordinates.",
      bullets: [
        "CGST & SGST automatically computed for local sales",
        "IGST auto-allocated for interstate operations",
        "Direct print, download, and email triggers"
      ],
      formFields: [
        { label: "Invoice Number", val: "INV-2026-0042" },
        { label: "State of Origin", val: "Karnataka (29)" },
        { label: "State of Supply", val: "Maharashtra (27)" },
        { label: "Applicable Tax", val: "IGST (18%)" }
      ]
    },
    taxes: {
      title: "Auto-Allocated Taxes",
      desc: "Ditch manual spreadsheets. Configure nested tax rules that apply seamlessly based on user invoice transactions.",
      bullets: [
        "Set custom tax group structures",
        "Process local and export duties dynamically",
        "Visual audit logs for direct compliance ledger mapping"
      ],
      formFields: [
        { label: "Tax Group", val: "GST 18% (CGST 9% + SGST 9%)" },
        { label: "TDS / TCS Applicable", val: "Yes (1.00%)" },
        { label: "Cess Rule", val: "0% Cess" }
      ]
    },
    eway: {
      title: "Frictionless E-Way Bills",
      desc: "Prepare for high-throughput logistics. Instantly export transaction bills formatted perfectly for e-way compliance portals.",
      bullets: [
        "Generate JSON logs for direct portal upload",
        "Track transporter documents and vehicle IDs",
        "Maintain compliance history per package"
      ],
      formFields: [
        { label: "Transporter Name", val: "VRL Logistics Ltd" },
        { label: "Vehicle Number", val: "KA-01-MJ-8842" },
        { label: "Distance (KM)", val: "340 KM" }
      ]
    },
    challan: {
      title: "Standardized Delivery Challans",
      desc: "Draft official transit documents for goods shipped for job work, internal warehouses, or trial sales.",
      bullets: [
        "Print professional gate passes",
        "Track inventory transferred without formal sales bills",
        "Convert challans to GST invoices in one click"
      ],
      formFields: [
        { label: "Challan Number", val: "DC-0012" },
        { label: "Purpose of Transport", val: "Job Work / Processing" },
        { label: "Gate Officer Sign", val: "VERIFIED" }
      ]
    }
  };

  return (
    <div className="min-h-screen bg-[#fdfbf7] text-[#1c2434] font-sans selection:bg-[#d22630]/20 antialiased overflow-x-hidden">
      
      {/* --- TOP BRAND / SUITE NAVBAR --- */}
      <div className="bg-white border-b border-slate-100 py-2.5 px-6 md:px-12 flex items-center justify-between text-[11px] font-bold tracking-wider text-slate-500 uppercase shrink-0">
        <div className="flex items-center gap-4 flex-wrap">
          <span className="text-[#d22630] font-black cursor-pointer tracking-widest text-[12px] pr-2">ZOHO</span>
          <span className="hover:text-slate-900 cursor-pointer transition-colors">ERP</span>
          <span className="hover:text-slate-900 cursor-pointer transition-colors">Books</span>
          <span className="hover:text-slate-900 cursor-pointer transition-colors">Procurement</span>
          <span className="hover:text-slate-900 cursor-pointer transition-colors">Payroll</span>
          <span className="hover:text-slate-900 cursor-pointer transition-colors">Billing</span>
          <span className="hover:text-slate-900 cursor-pointer transition-colors">CRM</span>
          <span className="hover:text-slate-900 cursor-pointer transition-colors text-[10px] lowercase normal-case text-slate-400 font-medium">All Products ▼</span>
        </div>
        <div className="flex items-center gap-5 shrink-0">
          <Search className="h-3.5 w-3.5 text-slate-400 cursor-pointer hover:text-slate-600" />
          <Link to="/login" className="hover:text-slate-900 transition-colors">Sign In</Link>
          <Link to="/register" className="bg-[#d22630] text-white px-3 py-1.5 rounded text-[10px] tracking-widest hover:bg-[#b01e25] transition-colors shadow-sm">Sign Up Now</Link>
        </div>
      </div>

      {/* --- MAIN HEADER & DROPDOWN MEGAMENUS --- */}
      <header 
        className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-100 shadow-sm transition-all"
        onMouseLeave={handleMenuLeave}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 h-16 md:h-20 flex items-center justify-between relative">
          {/* Logo brand */}
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded bg-[#d22630] flex items-center justify-center text-white shadow-md">
              <Boxes className="h-4.5 w-4.5" />
            </div>
            <div className="flex flex-col">
              <span className="text-[9px] text-slate-400 uppercase tracking-widest leading-none font-bold">Zoho</span>
              <span className="text-[17px] font-black text-slate-900 leading-tight tracking-tight">Inventory</span>
            </div>
          </div>

          {/* Navigation link deck */}
          <nav className="hidden lg:flex items-center gap-7 text-[12px] font-bold text-slate-600">
            {/* Features Link with Dropdown */}
            <div 
              className={`flex items-center gap-1 py-6 cursor-pointer select-none transition-colors hover:text-slate-950 ${activeMenu === 'features' ? 'text-[#d22630]' : ''}`}
              onMouseEnter={() => handleMenuHover('features')}
            >
              <span>Features</span>
              <ChevronDown className="h-3 w-3" />
            </div>

            <span className="hover:text-slate-950 cursor-pointer transition-colors py-6">Solutions</span>
            <span className="hover:text-slate-950 cursor-pointer transition-colors py-6">Pricing</span>
            <span className="hover:text-slate-950 cursor-pointer transition-colors py-6">Customers</span>

            {/* Integrations Link with Dropdown */}
            <div 
              className={`flex items-center gap-1 py-6 cursor-pointer select-none transition-colors hover:text-slate-950 ${activeMenu === 'integrations' ? 'text-[#d22630]' : ''}`}
              onMouseEnter={() => handleMenuHover('integrations')}
            >
              <span>Integrations</span>
              <ChevronDown className="h-3 w-3" />
            </div>

            <span className="hover:text-slate-950 cursor-pointer transition-colors py-6">Resources</span>
          </nav>

          {/* Right side primary CTA */}
          <div className="hidden lg:block">
            <Link 
              to="/register" 
              className="bg-[#d22630] text-white px-5 py-2.5 rounded text-xs font-black tracking-wider hover:bg-[#b01e25] transition-all shadow-md active:scale-95 cursor-pointer"
            >
              Sign Up Now
            </Link>
          </div>
        </div>

        {/* --- FEATURES MEGAMENU DROPDOWN PANEL --- */}
        {activeMenu === 'features' && (
          <div 
            className="absolute left-0 right-0 w-full bg-white border-b border-slate-200 shadow-2xl z-50 animate-fade-in"
            onMouseEnter={() => handleMenuHover('features')}
          >
            <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-4 gap-8 p-8 text-left border-t border-slate-100">
              {/* Col 1 */}
              <div className="lg:col-span-3 grid grid-cols-1 md:grid-cols-3 gap-6 font-semibold text-xs text-slate-500">
                {/* Section A */}
                <div className="space-y-4">
                  <div className="space-y-1">
                    <h5 className="font-extrabold text-[#d22630] uppercase text-[10px] tracking-widest">Purchasing</h5>
                    <ul className="space-y-2 pt-1 font-bold text-slate-700">
                      <li className="hover:text-[#d22630] cursor-pointer">Purchase orders</li>
                      <li className="hover:text-[#d22630] cursor-pointer">Purchase receives</li>
                      <li className="hover:text-[#d22630] cursor-pointer">Vendor payments</li>
                    </ul>
                  </div>
                  <div className="space-y-1 pt-2">
                    <h5 className="font-extrabold text-[#d22630] uppercase text-[10px] tracking-widest">Warehousing</h5>
                    <ul className="space-y-2 pt-1 font-bold text-slate-700">
                      <li className="hover:text-[#d22630] cursor-pointer">Multi-warehouse management</li>
                      <li className="hover:text-[#d22630] cursor-pointer">Transfer orders</li>
                      <li className="hover:text-[#d22630] cursor-pointer">Picklists & Bin Locations</li>
                    </ul>
                  </div>
                </div>

                {/* Section B */}
                <div className="space-y-4">
                  <div className="space-y-1">
                    <h5 className="font-extrabold text-[#d22630] uppercase text-[10px] tracking-widest">Order Fulfillment</h5>
                    <ul className="space-y-2 pt-1 font-bold text-slate-700">
                      <li className="hover:text-[#d22630] cursor-pointer">Backorders & Dropshipments</li>
                      <li className="hover:text-[#d22630] cursor-pointer">Packaging and shipping</li>
                      <li className="hover:text-[#d22630] cursor-pointer">Post-shipment tracking</li>
                      <li className="hover:text-[#d22630] cursor-pointer">Delivery challans</li>
                    </ul>
                  </div>
                  <div className="space-y-1 pt-2">
                    <h5 className="font-extrabold text-[#d22630] uppercase text-[10px] tracking-widest">Inventory</h5>
                    <ul className="space-y-2 pt-1 font-bold text-slate-700">
                      <li className="hover:text-[#d22630] cursor-pointer">Item Groups & Composites</li>
                      <li className="hover:text-[#d22630] cursor-pointer">Serial & batch tracking</li>
                      <li className="hover:text-[#d22630] cursor-pointer">Price Lists & Adjustments</li>
                    </ul>
                  </div>
                </div>

                {/* Section C */}
                <div className="space-y-4">
                  <div className="space-y-1">
                    <h5 className="font-extrabold text-[#d22630] uppercase text-[10px] tracking-widest">Order Management</h5>
                    <ul className="space-y-2 pt-1 font-bold text-slate-700">
                      <li className="hover:text-[#d22630] cursor-pointer">Sales order management</li>
                      <li className="hover:text-[#d22630] cursor-pointer">Multichannel selling</li>
                      <li className="hover:text-[#d22630] cursor-pointer">GST Invoicing & Returns</li>
                    </ul>
                  </div>
                  <div className="space-y-1 pt-2">
                    <h5 className="font-extrabold text-[#d22630] uppercase text-[10px] tracking-widest">Automation</h5>
                    <ul className="space-y-2 pt-1 font-bold text-slate-700">
                      <li className="hover:text-[#d22630] cursor-pointer">Email alerts & fields</li>
                      <li className="hover:text-[#d22630] cursor-pointer">Webhooks & Zoho Analytics</li>
                      <li className="hover:text-[#d22630] cursor-pointer text-[#d22630] font-black underline underline-offset-4">View All Features →</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Sidebar Feature PDF Card (As in Screenshot 4) */}
              <div className="p-5 bg-gradient-to-br from-[#faf6f0] to-[#f5ebd7] rounded-xl border border-amber-500/10 flex flex-col justify-between space-y-4 font-semibold text-xs text-slate-500">
                <div className="space-y-2">
                  <span className="text-[9px] font-black text-amber-600 uppercase tracking-widest">Features Guide PDF</span>
                  <p className="font-black text-slate-800 text-sm leading-snug">Get the Complete Feature Capability Matrix</p>
                </div>
                <div className="h-28 bg-white/70 backdrop-blur rounded-lg border border-amber-500/5 flex items-center justify-center p-4">
                  <FileText className="h-10 w-10 text-slate-400" />
                </div>
                <button className="flex items-center justify-center gap-2 w-full py-2 bg-[#d22630] text-white rounded font-bold hover:bg-[#b01e25] transition-colors shadow">
                  <Download className="h-3.5 w-3.5" />
                  <span>Download Now</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* --- INTEGRATIONS MEGAMENU DROPDOWN PANEL --- */}
        {activeMenu === 'integrations' && (
          <div 
            className="absolute left-0 right-0 w-full bg-white border-b border-slate-200 shadow-2xl z-50 animate-fade-in"
            onMouseEnter={() => handleMenuHover('integrations')}
          >
            <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-4 gap-8 p-8 text-left border-t border-slate-100">
              {/* Navigation Categories Left Sidebar */}
              <div className="border-r border-slate-100 pr-4 space-y-1 font-bold text-xs text-slate-500 shrink-0">
                <div className="px-3 py-2 bg-[#d22630]/5 text-[#d22630] rounded cursor-pointer">Marketplace</div>
                <div className="px-3 py-2 hover:bg-slate-50 rounded cursor-pointer transition-colors">Shopping Cart</div>
                <div className="px-3 py-2 hover:bg-slate-50 rounded cursor-pointer transition-colors">Accounting</div>
                <div className="px-3 py-2 hover:bg-slate-50 rounded cursor-pointer transition-colors">Shipping Relays</div>
                <div className="px-3 py-2 hover:bg-slate-50 rounded cursor-pointer transition-colors">Payment Services</div>
              </div>

              {/* Active integrations listing middle */}
              <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-4 font-semibold text-xs text-slate-500">
                {/* Amazon */}
                <div className="p-4 rounded-xl border border-slate-100 hover:border-[#d22630]/20 hover:bg-[#fdfbf7]/40 transition-all flex items-start gap-3">
                  <div className="h-10 w-10 bg-slate-50 rounded border border-slate-100 flex items-center justify-center font-extrabold text-slate-800 shrink-0">AMZ</div>
                  <div>
                    <h6 className="font-extrabold text-slate-900">Amazon Marketplace</h6>
                    <p className="text-[10px] text-slate-500 leading-relaxed mt-0.5">Sync Amazon multi-channel orders and update stock levels centrally.</p>
                  </div>
                </div>

                {/* Shopify */}
                <div className="p-4 rounded-xl border border-slate-100 hover:border-[#d22630]/20 hover:bg-[#fdfbf7]/40 transition-all flex items-start gap-3">
                  <div className="h-10 w-10 bg-slate-50 rounded border border-slate-100 flex items-center justify-center font-extrabold text-slate-800 shrink-0">SHO</div>
                  <div>
                    <h6 className="font-extrabold text-slate-900">Shopify Connector</h6>
                    <p className="text-[10px] text-slate-500 leading-relaxed mt-0.5">Import Shopify products, customer portfolios, and execute instant billing.</p>
                  </div>
                </div>

                {/* Etsy */}
                <div className="p-4 rounded-xl border border-slate-100 hover:border-[#d22630]/20 hover:bg-[#fdfbf7]/40 transition-all flex items-start gap-3">
                  <div className="h-10 w-10 bg-slate-50 rounded border border-slate-100 flex items-center justify-center font-extrabold text-slate-800 shrink-0">ETS</div>
                  <div>
                    <h6 className="font-extrabold text-slate-900">Etsy Store Integration</h6>
                    <p className="text-[10px] text-slate-500 leading-relaxed mt-0.5">Automate hand-crafted catalog lists and sync transactional logs.</p>
                  </div>
                </div>

                {/* WooCommerce */}
                <div className="p-4 rounded-xl border border-slate-100 hover:border-[#d22630]/20 hover:bg-[#fdfbf7]/40 transition-all flex items-start gap-3">
                  <div className="h-10 w-10 bg-slate-50 rounded border border-slate-100 flex items-center justify-center font-extrabold text-slate-800 shrink-0">WOO</div>
                  <div>
                    <h6 className="font-extrabold text-slate-900">WooCommerce Pipeline</h6>
                    <p className="text-[10px] text-slate-500 leading-relaxed mt-0.5">Maintain real-time pricing grids and dispatch invoices seamlessly.</p>
                  </div>
                </div>
              </div>

              {/* Sidebar Mobile App (As in Screenshot 5) */}
              <div className="p-5 bg-gradient-to-br from-[#faf6f0] to-[#f5ebd7] rounded-xl border border-amber-500/10 flex flex-col justify-between space-y-4 font-semibold text-xs text-slate-500">
                <div className="space-y-2">
                  <span className="text-[9px] font-black text-amber-600 uppercase tracking-widest">Mobile ERP Client</span>
                  <p className="font-black text-slate-800 text-sm leading-snug">Download the Zoho Inventory Mobile App</p>
                </div>
                <div className="h-28 bg-white/70 backdrop-blur rounded-lg border border-amber-500/5 flex items-center justify-center gap-1.5 p-4">
                  <Smartphone className="h-7 w-7 text-slate-500 shrink-0" />
                  <span className="text-[10px] text-slate-600 font-bold leading-tight">Mock iOS / Android app simulator included</span>
                </div>
                <button className="flex items-center justify-center gap-2 w-full py-2 bg-[#d22630] text-white rounded font-bold hover:bg-[#b01e25] transition-colors shadow">
                  <Smartphone className="h-3.5 w-3.5" />
                  <span>Get App Link</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* --- HERO SECTION (Light Zoho Palette as in Screenshot 1) --- */}
      <section className="pt-20 md:pt-28 pb-16 px-6 max-w-7xl mx-auto text-center space-y-8 relative z-10">
        {/* Brand Tagline */}
        <h1 className="text-3xl sm:text-5xl md:text-[54px] font-black tracking-tight text-slate-900 leading-[1.1] max-w-5xl mx-auto font-sans">
          Inventory management software designed for growing businesses
        </h1>
        
        {/* Slogan details */}
        <p className="text-sm sm:text-md text-slate-600 font-bold max-w-3xl mx-auto leading-relaxed">
          Manage orders. Track inventory. Handle GST billing. Oversee warehouses. One inventory management software to run all your inventory operations.
        </p>

        {/* Hero CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
          <Link 
            to="/register" 
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-3.5 rounded bg-[#d22630] text-white font-extrabold text-xs uppercase tracking-wider hover:bg-[#b01e25] transition-all shadow-md active:scale-95 cursor-pointer"
          >
            <span>SIGN UP - IT'S FREE</span>
          </Link>
          <Link 
            to="/login" 
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-3.5 rounded border border-[#d22630]/30 bg-white text-[#d22630] font-extrabold text-xs uppercase tracking-wider hover:bg-[#d22630]/5 transition-all shadow-sm active:scale-95"
          >
            <span>EXPLORE DEMO ACCOUNT</span>
          </Link>
        </div>

        {/* Ratings Proof Line (Screenshot 1) */}
        <div className="flex flex-wrap items-center justify-center gap-4 md:gap-8 pt-8 text-xs font-bold text-slate-600">
          <div className="flex items-center gap-1.5">
            <span className="text-blue-600 font-extrabold tracking-tight">Capterra</span>
            <div className="flex text-amber-500"><Star className="h-3 w-3 fill-amber-500" /><Star className="h-3 w-3 fill-amber-500" /><Star className="h-3 w-3 fill-amber-500" /><Star className="h-3 w-3 fill-amber-500" /><Star className="h-3 w-3 fill-amber-500" /></div>
            <span className="text-slate-800">4.5 <span className="text-slate-400">/ 5</span></span>
          </div>

          <span className="text-slate-300">|</span>

          <div className="flex items-center gap-1.5">
            <span className="text-slate-700 font-black tracking-tight">G2 CROWD</span>
            <div className="flex text-amber-500"><Star className="h-3 w-3 fill-amber-500" /><Star className="h-3 w-3 fill-amber-500" /><Star className="h-3 w-3 fill-amber-500" /><Star className="h-3 w-3 fill-amber-500" /><Star className="h-3 w-3 fill-amber-500" /></div>
            <span className="text-slate-800">4.5 <span className="text-slate-400">/ 5</span></span>
          </div>

          <span className="text-slate-300">|</span>

          <div className="flex items-center gap-1.5">
            <span className="text-[#d22630] font-black tracking-tight">Software Advice.</span>
            <div className="flex text-amber-500"><Star className="h-3 w-3 fill-amber-500" /><Star className="h-3 w-3 fill-amber-500" /><Star className="h-3 w-3 fill-amber-500" /><Star className="h-3 w-3 fill-amber-500" /><Star className="h-3 w-3 fill-amber-500" /></div>
            <span className="text-slate-800">4.7 <span className="text-slate-400">/ 5</span></span>
          </div>
        </div>
      </section>

      {/* --- DASHBOARD PREVIEW SCREEN COMPONENT (Light theme replica) --- */}
      <section className="pb-24 px-6 max-w-6xl mx-auto relative z-10">
        <div className="rounded-2xl border border-slate-200 bg-white p-3 shadow-2xl overflow-hidden">
          {/* Simulated Browser Bar */}
          <div className="bg-slate-50 px-4 py-2.5 border-b border-slate-100 rounded-t-xl flex items-center justify-between shrink-0 font-semibold text-[10px] text-slate-500">
            <div className="flex gap-2">
              <span className="h-3.5 w-3.5 rounded-full bg-slate-200" />
              <span className="h-3.5 w-3.5 rounded-full bg-slate-200" />
              <span className="h-3.5 w-3.5 rounded-full bg-slate-200" />
            </div>
            <span className="text-[10px] text-slate-400 font-mono">https://www.zoho.com/inventory/console</span>
            <span className="text-[9px] bg-slate-200 text-slate-600 px-2 py-0.5 rounded uppercase">Mock Active</span>
          </div>

          {/* Zoho Dashboard Content Replica */}
          <div className="p-4 md:p-6 grid grid-cols-1 lg:grid-cols-4 gap-6 text-[10px] font-semibold text-slate-500 bg-slate-50/40">
            
            {/* Main Section */}
            <div className="lg:col-span-3 space-y-6">
              
              {/* Sales Activity Header (From Screenshot 1) */}
              <div className="p-5 rounded-xl bg-white border border-slate-200/80 space-y-4 shadow-sm">
                <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                  <span className="text-[11px] font-extrabold uppercase tracking-wide text-slate-900">Sales Activity</span>
                  <span className="text-[8px] text-[#d22630] font-black uppercase">Real-Time Sync</span>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {/* Item 1 */}
                  <div className="p-4 rounded-xl bg-[#d22630]/2 border border-[#d22630]/5 flex flex-col items-center justify-center text-center">
                    <span className="text-2xl font-black text-blue-600">228</span>
                    <span className="text-[9px] uppercase tracking-wider text-slate-400 font-extrabold mt-1">To Be Packed</span>
                  </div>

                  {/* Item 2 */}
                  <div className="p-4 rounded-xl bg-[#d22630]/2 border border-[#d22630]/5 flex flex-col items-center justify-center text-center">
                    <span className="text-2xl font-black text-rose-600">6</span>
                    <span className="text-[9px] uppercase tracking-wider text-slate-400 font-extrabold mt-1">To Be Shipped</span>
                  </div>

                  {/* Item 3 */}
                  <div className="p-4 rounded-xl bg-[#d22630]/2 border border-[#d22630]/5 flex flex-col items-center justify-center text-center">
                    <span className="text-2xl font-black text-emerald-600">10</span>
                    <span className="text-[9px] uppercase tracking-wider text-slate-400 font-extrabold mt-1">To Be Delivered</span>
                  </div>

                  {/* Item 4 */}
                  <div className="p-4 rounded-xl bg-[#d22630]/2 border border-[#d22630]/5 flex flex-col items-center justify-center text-center">
                    <span className="text-2xl font-black text-indigo-600">474</span>
                    <span className="text-[9px] uppercase tracking-wider text-slate-400 font-extrabold mt-1">To Be Invoiced</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Sidebar Inventory Summary (From Screenshot 1) */}
            <div className="p-5 rounded-xl bg-white border border-slate-200/80 space-y-4 shadow-sm">
              <span className="text-[11px] font-extrabold uppercase tracking-wide text-slate-900 block border-b border-slate-100 pb-2">Inventory Summary</span>
              
              <div className="divide-y divide-slate-100">
                <div className="flex items-center justify-between py-3">
                  <span className="text-[9px] text-slate-400 uppercase font-extrabold">Quantity in Hand</span>
                  <span className="text-sm font-black text-slate-800">10,458 <span className="text-[8px] font-normal text-slate-400 uppercase">Units</span></span>
                </div>
                <div className="flex items-center justify-between py-3">
                  <span className="text-[9px] text-slate-400 uppercase font-extrabold">To Be Received</span>
                  <span className="text-sm font-black text-slate-800">168 <span className="text-[8px] font-normal text-slate-400 uppercase">Units</span></span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- GST COMPLIANCE INTERACTIVE TAB PANEL (Screenshot 2) --- */}
      <section className="py-24 bg-white border-y border-slate-100 relative z-10">
        <div className="max-w-7xl mx-auto px-6 md:px-12 relative space-y-16">
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <h2 className="text-3xl sm:text-[38px] font-black text-slate-900 leading-tight">What makes Zoho Inventory GST Compliant</h2>
          </div>

          {/* Interactive Compliance Tab Bar (Screenshot 2) */}
          <div className="flex flex-wrap items-center justify-center border border-slate-200 bg-slate-50/50 rounded-xl overflow-hidden p-1 max-w-5xl mx-auto font-bold text-xs">
            {complianceTabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 py-3.5 px-4 text-center rounded-lg transition-all focus:outline-none cursor-pointer ${
                  activeTab === tab.id
                    ? 'bg-white text-[#d22630] shadow-sm border border-slate-200'
                    : 'text-slate-500 hover:text-slate-900'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Compliance Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center max-w-5xl mx-auto">
            {/* Visual Mock Form (Left Side) */}
            <div className="p-6 md:p-8 bg-[#faf6f0] rounded-2xl border border-amber-500/5 shadow-sm space-y-6 relative overflow-hidden">
              <div className="absolute top-0 right-0 h-20 w-20 rounded-full bg-[#d22630]/2 blur-xl" />
              
              <span className="text-[9px] font-black text-amber-700 uppercase tracking-widest">Compliance Form Mockup</span>
              
              <div className="space-y-4">
                {complianceContent[activeTab].formFields.map((field, idx) => (
                  <div key={idx} className="grid grid-cols-3 items-center gap-4 text-xs font-semibold">
                    <span className="text-slate-400 text-left">{field.label}</span>
                    <div className="col-span-2 p-2.5 rounded bg-white border border-slate-200 font-bold text-slate-800 text-left">
                      {field.val}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Bullets & Summary (Right Side) */}
            <div className="space-y-6 text-left">
              <div className="space-y-2">
                <span className="text-[10px] font-black text-[#d22630] uppercase tracking-widest">Active Component</span>
                <h3 className="text-2xl font-black text-slate-900">{complianceContent[activeTab].title}</h3>
                <p className="text-xs text-slate-600 font-bold leading-relaxed">{complianceContent[activeTab].desc}</p>
              </div>

              <ul className="space-y-3 font-semibold text-xs text-slate-700">
                {complianceContent[activeTab].bullets.map((bullet, idx) => (
                  <li key={idx} className="flex items-center gap-2">
                    <CheckCircle className="h-4.5 w-4.5 text-emerald-500 shrink-0" />
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* --- BUSINESSES DECKS GRID SECTION (Screenshot 3) --- */}
      <section className="py-24 max-w-7xl mx-auto px-6 md:px-12 relative z-10 text-center space-y-16">
        <div className="space-y-4 max-w-3xl mx-auto">
          <h2 className="text-3xl sm:text-[38px] font-black text-slate-900 leading-tight">
            From MSMEs to large-scale corporations, Zoho Inventory supports all businesses
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          
          {/* Card 1: Order management (Solid Dark Blue as in Screenshot 3) */}
          <div className="p-8 rounded-2xl bg-[#0c2340] text-white flex flex-col justify-between text-left space-y-6 shadow-xl border border-white/5 hover:translate-y-[-2px] transition-all duration-300">
            <div className="space-y-4">
              <div className="h-10 w-10 rounded-xl bg-white/10 flex items-center justify-center text-[#d22630] shrink-0 border border-white/10">
                <ShoppingCart className="h-5 w-5 text-white" />
              </div>
              <h3 className="text-xl font-extrabold tracking-tight">Order management</h3>
              <p className="text-xs text-slate-300 leading-relaxed font-semibold">
                Handle all your sales and purchases activities, manage invoices and bills, and track payments. Zoho Inventory also helps you monitor packages and shipments to keep your deliveries on time.
              </p>
            </div>
            <Link to="/register" className="text-white hover:text-white/80 font-extrabold text-xs uppercase flex items-center gap-1.5 pt-4 border-t border-white/10">
              <span>Learn More</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          {/* Card 2: Warehouse management */}
          <div className="p-8 rounded-2xl bg-white text-slate-800 flex flex-col justify-between text-left space-y-6 shadow-lg border border-slate-100 hover:translate-y-[-2px] transition-all duration-300">
            <div className="space-y-4">
              <div className="h-10 w-10 rounded-xl bg-amber-500/10 flex items-center justify-center text-[#d22630] shrink-0 border border-amber-500/10">
                <Warehouse className="h-5 w-5 text-amber-600" />
              </div>
              <h3 className="text-xl font-extrabold tracking-tight text-slate-900">Warehouse management</h3>
              <p className="text-xs text-slate-500 leading-relaxed font-semibold">
                You can control your stock in different warehouses or godowns centrally from Zoho Inventory. Track item movements, transfer items within warehouses, and generate warehouse-specific reports.
              </p>
            </div>
            <Link to="/register" className="text-[#d22630] hover:text-[#b01e25] font-extrabold text-xs uppercase flex items-center gap-1.5 pt-4 border-t border-slate-100">
              <span>Learn More</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          {/* Card 3: Barcode scanning */}
          <div className="p-8 rounded-2xl bg-white text-slate-800 flex flex-col justify-between text-left space-y-6 shadow-lg border border-slate-100 hover:translate-y-[-2px] transition-all duration-300">
            <div className="space-y-4">
              <div className="h-10 w-10 rounded-xl bg-blue-500/10 flex items-center justify-center text-[#d22630] shrink-0 border border-blue-500/10">
                <QrCode className="h-5 w-5 text-blue-600" />
              </div>
              <h3 className="text-xl font-extrabold tracking-tight text-slate-900">Barcode scanning</h3>
              <p className="text-xs text-slate-500 leading-relaxed font-semibold">
                Zoho Inventory is compatible with different types of barcode scanners which makes it easy to set up a barcode system and add SKUs, serial and batch numbers, and items to sales and purchase orders.
              </p>
            </div>
            <Link to="/register" className="text-[#d22630] hover:text-[#b01e25] font-extrabold text-xs uppercase flex items-center gap-1.5 pt-4 border-t border-slate-100">
              <span>Learn More</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          {/* Card 4: Integrations */}
          <div className="p-8 rounded-2xl bg-white text-slate-800 flex flex-col justify-between text-left space-y-6 shadow-lg border border-slate-100 hover:translate-y-[-2px] transition-all duration-300">
            <div className="space-y-4">
              <div className="h-10 w-10 rounded-xl bg-purple-500/10 flex items-center justify-center text-[#d22630] shrink-0 border border-purple-500/10">
                <Layers className="h-5 w-5 text-purple-600" />
              </div>
              <h3 className="text-xl font-extrabold tracking-tight text-slate-900">Integrations</h3>
              <p className="text-xs text-slate-500 leading-relaxed font-semibold">
                Sell on Shopify or Etsy, integrate with Zoho CRM and Zoho Books—there is a wide range of integrations to support your business, and receive payment online via PayPal or Razorpay.
              </p>
            </div>
            <Link to="/register" className="text-[#d22630] hover:text-[#b01e25] font-extrabold text-xs uppercase flex items-center gap-1.5 pt-4 border-t border-slate-100">
              <span>Learn More</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>
      </section>

      {/* --- PRICING SECTION --- */}
      <section id="pricing" className="py-24 px-6 max-w-7xl mx-auto relative z-10 border-t border-slate-100">
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <h2 className="text-3xl md:text-4xl font-black tracking-tight text-slate-900">Simple, Transparent Pricing</h2>
          <p className="text-xs text-slate-500 font-bold leading-relaxed">
            Scaffold your supply chains today. Start free and switch tiers anytime as your catalog volumes expand.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto items-stretch">
          {/* Card 1 */}
          <div className="p-8 rounded-2xl bg-white border border-slate-200 flex flex-col justify-between shadow-sm">
            <div className="space-y-6 text-left">
              <div>
                <h4 className="font-extrabold text-sm uppercase tracking-widest text-[#d22630]">Starter</h4>
                <p className="text-[10px] text-slate-400 mt-1 font-semibold">Perfect for micro stores & catalog testers.</p>
              </div>
              <div className="flex items-baseline gap-1 border-t border-slate-100 pt-4">
                <span className="text-4xl font-extrabold text-slate-900">$19</span>
                <span className="text-xs text-slate-400 uppercase font-bold">/ Month</span>
              </div>
              <ul className="space-y-3 text-xs text-slate-600 font-semibold pt-4">
                <li className="flex items-center gap-2"><Check className="h-4 w-4 text-emerald-500" /><span>Up to 10 active products</span></li>
                <li className="flex items-center gap-2"><Check className="h-4 w-4 text-emerald-500" /><span>50 PDF dispatches / mo</span></li>
                <li className="flex items-center gap-2"><Check className="h-4 w-4 text-emerald-500" /><span>In-Memory Mock DB Fallback</span></li>
              </ul>
            </div>
            <Link to="/register" className="w-full text-center py-3 bg-[#d22630] text-white rounded font-bold text-xs uppercase hover:bg-[#b01e25] transition-colors mt-8 block">
              Sign Up Free
            </Link>
          </div>

          {/* Card 2 */}
          <div className="p-8 rounded-2xl bg-white border-2 border-[#d22630]/30 flex flex-col justify-between shadow-md relative">
            <div className="absolute top-4 right-4 text-[8px] font-black uppercase bg-[#d22630]/10 text-[#d22630] border border-[#d22630]/20 px-3 py-1 rounded-full">
              Recommended
            </div>
            <div className="space-y-6 text-left">
              <div>
                <h4 className="font-extrabold text-sm uppercase tracking-widest text-[#d22630]">Professional</h4>
                <p className="text-[10px] text-slate-400 mt-1 font-semibold">For scaling operations & high-volume shops.</p>
              </div>
              <div className="flex items-baseline gap-1 border-t border-slate-100 pt-4">
                <span className="text-4xl font-extrabold text-slate-900">$49</span>
                <span className="text-xs text-slate-400 uppercase font-bold">/ Month</span>
              </div>
              <ul className="space-y-3 text-xs text-slate-600 font-semibold pt-4">
                <li className="flex items-center gap-2"><Check className="h-4 w-4 text-emerald-500" /><span>Unlimited active products</span></li>
                <li className="flex items-center gap-2"><Check className="h-4 w-4 text-emerald-500" /><span>Unlimited PDF invoices</span></li>
                <li className="flex items-center gap-2"><Check className="h-4 w-4 text-emerald-500" /><span>Shopify & Amazon channel sync</span></li>
                <li className="flex items-center gap-2"><Check className="h-4 w-4 text-emerald-500" /><span>Nodemailer dynamic relays</span></li>
              </ul>
            </div>
            <Link to="/register" className="w-full text-center py-3 bg-[#d22630] text-white rounded font-bold text-xs uppercase hover:bg-[#b01e25] transition-colors mt-8 block shadow-md">
              Start Free Trial
            </Link>
          </div>

          {/* Card 3 */}
          <div className="p-8 rounded-2xl bg-white border border-slate-200 flex flex-col justify-between shadow-sm">
            <div className="space-y-6 text-left">
              <div>
                <h4 className="font-extrabold text-sm uppercase tracking-widest text-[#d22630]">Enterprise</h4>
                <p className="text-[10px] text-slate-400 mt-1 font-semibold">For complex supply pipelines & logistics hubs.</p>
              </div>
              <div className="flex items-baseline gap-1 border-t border-slate-100 pt-4">
                <span className="text-4xl font-extrabold text-slate-900">$149</span>
                <span className="text-xs text-slate-400 uppercase font-bold">/ Month</span>
              </div>
              <ul className="space-y-3 text-xs text-slate-600 font-semibold pt-4">
                <li className="flex items-center gap-2"><Check className="h-4 w-4 text-emerald-500" /><span>Complete logistics automation</span></li>
                <li className="flex items-center gap-2"><Check className="h-4 w-4 text-emerald-500" /><span>Dedicated SMTP pipeline support</span></li>
                <li className="flex items-center gap-2"><Check className="h-4 w-4 text-emerald-500" /><span>Custom MongoDB integrations</span></li>
              </ul>
            </div>
            <Link to="/register" className="w-full text-center py-3 bg-[#d22630] text-white rounded font-bold text-xs uppercase hover:bg-[#b01e25] transition-colors mt-8 block">
              Contact Sales
            </Link>
          </div>
        </div>
      </section>

      {/* --- FAQ SECTION --- */}
      <section id="faq" className="py-24 px-6 max-w-4xl mx-auto relative z-10 border-t border-slate-100">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-3xl font-black text-slate-900">Frequently Asked Queries</h2>
          <p className="text-xs text-slate-500 font-bold leading-relaxed">
            Need clarity on invoicing dispatch setups or mock database modes? Read through our standard FAQ answers.
          </p>
        </div>

        <div className="space-y-4 font-semibold text-xs text-slate-600">
          {faqItems.map((item, idx) => {
            const isExpanded = expandedFaq === idx;
            return (
              <div 
                key={idx} 
                className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm"
              >
                <button
                  onClick={() => toggleFaq(idx)}
                  className="w-full flex items-center justify-between p-5 text-left font-extrabold text-sm text-slate-900 cursor-pointer hover:bg-slate-50 transition-colors focus:outline-none"
                >
                  <span>{item.q}</span>
                  {isExpanded ? (
                    <ChevronUp className="h-4 w-4 text-[#d22630] shrink-0" />
                  ) : (
                    <ChevronDown className="h-4 w-4 text-slate-400 shrink-0" />
                  )}
                </button>
                
                {isExpanded && (
                  <div className="p-5 pt-0 border-t border-slate-100 text-xs text-slate-500 leading-relaxed font-semibold bg-slate-50/20 animate-fade-in text-left">
                    {item.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* --- FOOTER --- */}
      <footer className="border-t border-slate-200 bg-white py-16 px-6 relative z-10">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10 text-xs font-semibold text-slate-500 mb-12 text-left">
          {/* Col 1 */}
          <div className="space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="h-8 w-8 rounded bg-[#d22630] flex items-center justify-center text-white">
                <Boxes className="h-4.5 w-4.5" />
              </div>
              <span className="font-extrabold text-[15px] text-slate-900">Zoho Inventory</span>
            </div>
            <p className="leading-relaxed text-[11px] font-semibold text-slate-500">
              Next-generation multi-channel inventory management software for high-throughput teams.
            </p>
          </div>

          {/* Col 2 */}
          <div className="space-y-3">
            <h5 className="font-bold text-slate-950 uppercase tracking-wider text-[10px]">Product</h5>
            <ul className="space-y-2.5">
              <li><span className="hover:text-[#d22630] cursor-pointer transition-colors">Features Catalogue</span></li>
              <li><span className="hover:text-[#d22630] cursor-pointer transition-colors">Console Preview</span></li>
              <li><span className="hover:text-[#d22630] cursor-pointer transition-colors">Pricing Plans</span></li>
            </ul>
          </div>

          {/* Col 3 */}
          <div className="space-y-3">
            <h5 className="font-bold text-slate-950 uppercase tracking-wider text-[10px]">Developer API</h5>
            <ul className="space-y-2.5">
              <li><Link to="/login" className="hover:text-[#d22630] transition-colors">Login Gateway</Link></li>
              <li><Link to="/register" className="hover:text-[#d22630] transition-colors">Scaffold Account</Link></li>
              <li><span className="text-[10px] text-emerald-600 font-bold uppercase block">SMTP Relays Online</span></li>
            </ul>
          </div>

          {/* Col 4 */}
          <div className="space-y-3">
            <h5 className="font-bold text-slate-950 uppercase tracking-wider text-[10px]">Resources</h5>
            <ul className="space-y-2.5">
              <li><span className="hover:text-[#d22630] cursor-pointer transition-colors">Support Desk</span></li>
              <li><span className="hover:text-[#d22630] cursor-pointer transition-colors">Terms & Security</span></li>
              <li><span className="hover:text-[#d22630] cursor-pointer transition-colors">ERP integrations</span></li>
            </ul>
          </div>
        </div>

        <div className="max-w-7xl mx-auto pt-8 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4 text-[10px] text-slate-400 font-bold">
          <span>&copy; {new Date().getFullYear()} Zoho Corporation. All rights reserved (Simulated replica).</span>
          <div className="flex gap-6">
            <span className="hover:text-slate-600 cursor-pointer">PRIVACY POLICY</span>
            <span className="hover:text-slate-600 cursor-pointer">SECURITY PROTOCOLS</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
