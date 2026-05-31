import React, { useState, useEffect } from 'react';
import API from '../api/axios';
import Loader from '../components/Loader';
import { formatDate } from '../utils/formatDate';
import { useTheme } from '../context/ThemeContext';
import { 
  Chart as ChartJS, 
  CategoryScale, 
  LinearScale, 
  PointElement, 
  LineElement, 
  BarElement,
  ArcElement,
  Title, 
  Tooltip, 
  Legend 
} from 'chart.js';
import { Line, Doughnut } from 'react-chartjs-2';
import { 
  DollarSign, 
  FileText, 
  Boxes, 
  AlertTriangle,
  TrendingUp,
  Package,
  Truck,
  ShoppingCart,
  Layers,
  RefreshCw,
  Activity,
  ArrowUpRight,
  Sparkles
} from 'lucide-react';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

const Dashboard = () => {
  const [products, setProducts] = useState([]);
  const [invoices, setInvoices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [syncing, setSyncing] = useState(false);
  const { theme } = useTheme();

  const fetchData = async () => {
    try {
      setLoading(true);
      const [prodRes, invRes] = await Promise.all([
        API.get('/products'),
        API.get('/invoices')
      ]);
      
      if (prodRes.data?.success) setProducts(prodRes.data.products);
      if (invRes.data?.success) setInvoices(invRes.data.invoices);
    } catch (err) {
      console.error(err);
      setError(err.message || 'Failed to fetch dashboard data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSyncIntegrations = () => {
    setSyncing(true);
    setTimeout(() => {
      setSyncing(false);
    }, 1200);
  };

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return (
      <div className="p-6 rounded-2xl border border-red-500/20 bg-red-500/10 text-center text-xs text-red-500">
        {error}
      </div>
    );
  }

  // --- STATISTICS CALCULATIONS ---
  const totalSales = invoices
    .filter(inv => inv.status === 'paid')
    .reduce((sum, inv) => sum + inv.total, 0);

  const pendingSales = invoices
    .filter(inv => inv.status === 'pending')
    .reduce((sum, inv) => sum + inv.total, 0);

  const totalInvoicesCount = invoices.length;
  const totalProductsCount = products.length;
  const lowStockCount = products.filter(p => p.stock < 10).length;
  const totalStockQty = products.reduce((sum, p) => sum + p.stock, 0);

  // Zoho specific metrics
  const toBePacked = invoices.filter(inv => inv.status === 'pending').length;
  const toBeShipped = products.filter(p => p.stock > 0 && p.stock < 15).length;
  const toBeDelivered = toBePacked > 0 ? toBePacked - 1 : 0;
  const toBeInvoiced = invoices.filter(inv => inv.status === 'unpaid').length;

  // --- CHART 1: REVENUE TREND (LINE) ---
  const sortedInvoices = [...invoices].sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
  const revenueByDate = {};
  sortedInvoices.forEach(inv => {
    const dateStr = formatDate(inv.createdAt);
    revenueByDate[dateStr] = (revenueByDate[dateStr] || 0) + (inv.status === 'paid' ? inv.total : 0);
  });

  const isDark = theme === 'dark';

  const revenueChartData = {
    labels: Object.keys(revenueByDate).slice(-7), // Last 7 unique invoice dates
    datasets: [
      {
        label: 'Revenue ($)',
        data: Object.values(revenueByDate).slice(-7),
        borderColor: isDark ? '#10b981' : '#0068ff',
        backgroundColor: isDark ? 'rgba(16, 185, 129, 0.1)' : 'rgba(0, 104, 255, 0.06)',
        tension: 0.4,
        fill: true,
        pointBackgroundColor: isDark ? '#10b981' : '#0068ff',
        pointBorderColor: isDark ? '#121826' : '#ffffff',
        pointHoverRadius: 8,
        borderWidth: 3
      }
    ]
  };

  const revenueChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: isDark ? '#121826' : '#ffffff',
        titleColor: isDark ? '#9ca3af' : '#475569',
        bodyColor: isDark ? '#f3f4f6' : '#1e293b',
        borderColor: isDark ? '#1f2937' : '#e2e8f0',
        borderWidth: 1,
        padding: 12,
        boxPadding: 4
      }
    },
    scales: {
      x: { 
        grid: { color: isDark ? 'rgba(255, 255, 255, 0.02)' : 'rgba(0, 0, 0, 0.03)' }, 
        ticks: { color: isDark ? '#9ca3af' : '#64748b', font: { family: 'Outfit' } } 
      },
      y: { 
        grid: { color: isDark ? 'rgba(255, 255, 255, 0.02)' : 'rgba(0, 0, 0, 0.03)' }, 
        ticks: { color: isDark ? '#9ca3af' : '#64748b', font: { family: 'Outfit' } } 
      }
    }
  };

  // --- CHART 2: INVENTORY STOCK DISTRIBUTION (DOUGHNUT) ---
  const stockChartData = {
    labels: products.slice(0, 5).map(p => p.name),
    datasets: [
      {
        data: products.slice(0, 5).map(p => p.stock),
        backgroundColor: [
          '#0068ff', // Blue
          '#10b981', // Emerald
          '#f59e0b', // Amber
          '#8b5cf6', // Purple
          '#ec4899'  // Pink
        ],
        borderWidth: 2,
        borderColor: isDark ? '#121826' : '#ffffff'
      }
    ]
  };

  const stockChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          color: isDark ? '#f3f4f6' : '#1e293b',
          boxWidth: 8,
          padding: 15,
          font: { size: 11, family: 'Outfit' }
        }
      },
      tooltip: {
        backgroundColor: isDark ? '#121826' : '#ffffff',
        titleColor: isDark ? '#9ca3af' : '#475569',
        bodyColor: isDark ? '#f3f4f6' : '#1e293b',
        borderColor: isDark ? '#1f2937' : '#e2e8f0',
        borderWidth: 1,
        padding: 10
      }
    },
    cutout: '72%'
  };

  return (
    <>
      {/* Header Panel */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Zoho Inventory Suite</h2>
          <p className="text-sm text-[var(--text-secondary)] font-medium">Core operations ledger, supply pipelines, and invoice dispatch metrics.</p>
        </div>
        <div className="flex items-center gap-3">
          <button 
            onClick={handleSyncIntegrations}
            disabled={syncing}
            className="flex items-center justify-center gap-2 px-3.5 py-2 rounded-xl border border-[var(--border-color)] bg-gray-500/5 hover:bg-gray-500/10 text-[var(--text-primary)] font-bold text-xs transition-all cursor-pointer disabled:opacity-50"
          >
            <RefreshCw className={`h-3.5 w-3.5 text-[var(--accent-primary)] ${syncing ? 'animate-spin' : ''}`} />
            <span>{syncing ? 'Syncing Channels...' : 'Sync Channels'}</span>
          </button>
          
          <div className="flex items-center gap-2 text-xs bg-[var(--accent-primary)]/10 text-[var(--accent-primary)] border border-[var(--accent-primary)]/20 px-3.5 py-2 rounded-xl font-bold">
            <Activity className="h-3.5 w-3.5 animate-pulse" />
            <span>ERP Mock Sync Enabled</span>
          </div>
        </div>
      </div>

      {/* --- ZOHO SALES ACTIVITY & INVENTORY METRICS OVERVIEW --- */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Sales Activity Card */}
        <div className="zoho-card lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between border-b border-[var(--border-color)] pb-3">
            <h3 className="text-sm font-bold uppercase tracking-wider text-[var(--text-primary)] flex items-center gap-2">
              <ShoppingCart className="h-4.5 w-4.5 text-[var(--accent-primary)]" />
              <span>Sales Activity</span>
            </h3>
            <span className="text-[10px] text-[var(--text-secondary)] font-bold uppercase tracking-wider">Awaiting Dispatch</span>
          </div>
          
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-1">
            {/* Box 1 */}
            <div className="p-4 rounded-xl bg-gray-500/5 border border-[var(--border-color)] flex flex-col items-center justify-center text-center space-y-1 hover:border-[var(--accent-primary)]/30 hover:bg-[var(--accent-primary)]/5 transition-all">
              <span className="text-2xl font-extrabold text-[var(--accent-primary)]">{toBePacked}</span>
              <span className="text-[10px] text-[var(--text-secondary)] uppercase font-bold tracking-wider">To Be Packed</span>
              <Package className="h-4 w-4 text-[var(--text-secondary)] mt-1.5 opacity-60" />
            </div>

            {/* Box 2 */}
            <div className="p-4 rounded-xl bg-gray-500/5 border border-[var(--border-color)] flex flex-col items-center justify-center text-center space-y-1 hover:border-[var(--accent-primary)]/30 hover:bg-[var(--accent-primary)]/5 transition-all">
              <span className="text-2xl font-extrabold text-amber-500">{toBeShipped}</span>
              <span className="text-[10px] text-[var(--text-secondary)] uppercase font-bold tracking-wider">To Be Shipped</span>
              <Truck className="h-4 w-4 text-[var(--text-secondary)] mt-1.5 opacity-60" />
            </div>

            {/* Box 3 */}
            <div className="p-4 rounded-xl bg-gray-500/5 border border-[var(--border-color)] flex flex-col items-center justify-center text-center space-y-1 hover:border-[var(--accent-primary)]/30 hover:bg-[var(--accent-primary)]/5 transition-all">
              <span className="text-2xl font-extrabold text-purple-500">{toBeDelivered}</span>
              <span className="text-[10px] text-[var(--text-secondary)] uppercase font-bold tracking-wider">To Be Delivered</span>
              <ShoppingCart className="h-4 w-4 text-[var(--text-secondary)] mt-1.5 opacity-60" />
            </div>

            {/* Box 4 */}
            <div className="p-4 rounded-xl bg-gray-500/5 border border-[var(--border-color)] flex flex-col items-center justify-center text-center space-y-1 hover:border-[var(--accent-primary)]/30 hover:bg-[var(--accent-primary)]/5 transition-all">
              <span className="text-2xl font-extrabold text-emerald-500">{toBeInvoiced}</span>
              <span className="text-[10px] text-[var(--text-secondary)] uppercase font-bold tracking-wider">To Be Invoiced</span>
              <FileText className="h-4 w-4 text-[var(--text-secondary)] mt-1.5 opacity-60" />
            </div>
          </div>
        </div>

        {/* Inventory Summary Widget */}
        <div className="zoho-card space-y-4">
          <div className="flex items-center justify-between border-b border-[var(--border-color)] pb-3">
            <h3 className="text-sm font-bold uppercase tracking-wider text-[var(--text-primary)] flex items-center gap-2">
              <Layers className="h-4.5 w-4.5 text-[var(--accent-secondary)]" />
              <span>Inventory Summary</span>
            </h3>
            <span className="text-[10px] text-[var(--text-secondary)] font-bold uppercase tracking-wider">Active Stocks</span>
          </div>

          <div className="divide-y divide-[var(--border-color)] pt-1 text-xs">
            <div className="flex items-center justify-between py-3">
              <span className="text-[var(--text-secondary)] font-bold uppercase text-[10px] tracking-wider">Quantity in Hand</span>
              <span className="font-extrabold text-lg text-[var(--text-primary)]">{totalStockQty} <span className="text-xs text-[var(--text-secondary)] font-medium">Units</span></span>
            </div>
            
            <div className="flex items-center justify-between py-3">
              <span className="text-[var(--text-secondary)] font-bold uppercase text-[10px] tracking-wider">To Be Received</span>
              <span className="font-extrabold text-lg text-[var(--accent-primary)]">140 <span className="text-xs text-[var(--text-secondary)] font-medium">Units</span></span>
            </div>

            <div className="flex items-center justify-between py-3">
              <span className="text-[var(--text-secondary)] font-bold uppercase text-[10px] tracking-wider">Catalog Items</span>
              <span className="font-extrabold text-lg text-purple-500">{totalProductsCount}</span>
            </div>
          </div>
        </div>
      </div>

      {/* --- INTEGRATIONS HUB & ALERTS SUBGRID --- */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Integrations Monitor */}
        <div className="zoho-card space-y-4">
          <div className="flex items-center justify-between border-b border-[var(--border-color)] pb-3">
            <h3 className="text-sm font-bold uppercase tracking-wider text-[var(--text-primary)] flex items-center gap-2">
              <Sparkles className="h-4.5 w-4.5 text-amber-500" />
              <span>Sales Channels</span>
            </h3>
            <span className="text-[9px] bg-emerald-500/10 text-emerald-500 font-bold px-2 py-0.5 rounded-full border border-emerald-500/20 uppercase tracking-wide">Live Sync</span>
          </div>

          <div className="space-y-3.5 pt-1 text-xs font-semibold">
            {/* Shopify */}
            <div className="flex items-center justify-between p-3 rounded-xl bg-gray-500/5 border border-[var(--border-color)] hover:border-[var(--accent-primary)]/20 transition-all">
              <div className="flex items-center gap-2.5">
                <span className="h-2 w-2 rounded-full bg-emerald-500"></span>
                <div>
                  <p className="text-[var(--text-primary)] font-bold">Shopify Store</p>
                  <p className="text-[9px] text-[var(--text-secondary)]">Sync ID: sh_8829</p>
                </div>
              </div>
              <span className="text-[9px] text-[var(--text-secondary)] font-bold uppercase">Synced just now</span>
            </div>

            {/* Amazon */}
            <div className="flex items-center justify-between p-3 rounded-xl bg-gray-500/5 border border-[var(--border-color)] hover:border-[var(--accent-primary)]/20 transition-all">
              <div className="flex items-center gap-2.5">
                <span className="h-2 w-2 rounded-full bg-emerald-500"></span>
                <div>
                  <p className="text-[var(--text-primary)] font-bold">Amazon Seller</p>
                  <p className="text-[9px] text-[var(--text-secondary)]">Sync ID: amz_1044</p>
                </div>
              </div>
              <span className="text-[9px] text-[var(--text-secondary)] font-bold uppercase">Synced 10m ago</span>
            </div>

            {/* WooCommerce */}
            <div className="flex items-center justify-between p-3 rounded-xl bg-gray-500/5 border border-[var(--border-color)] hover:border-[var(--accent-primary)]/20 transition-all">
              <div className="flex items-center gap-2.5">
                <span className="h-2 w-2 rounded-full bg-emerald-500"></span>
                <div>
                  <p className="text-[var(--text-primary)] font-bold">WooCommerce</p>
                  <p className="text-[9px] text-[var(--text-secondary)]">Sync ID: woo_4083</p>
                </div>
              </div>
              <span className="text-[9px] text-[var(--text-secondary)] font-bold uppercase">Synced just now</span>
            </div>
          </div>
        </div>

        {/* Low Stock Alerts List */}
        <div className="zoho-card lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between border-b border-[var(--border-color)] pb-3">
            <h3 className="text-sm font-bold uppercase tracking-wider text-[var(--text-primary)] flex items-center gap-2">
              <AlertTriangle className="h-4.5 w-4.5 text-amber-500" />
              <span>Critical Low Stock Alerts ({lowStockCount})</span>
            </h3>
            <span className="text-[10px] text-amber-500 font-bold uppercase tracking-wider">Requires Purchase Order</span>
          </div>

          <div className="space-y-2.5 overflow-y-auto max-h-56 pr-1 font-semibold text-xs">
            {products.filter(p => p.stock < 12).length > 0 ? (
              products.filter(p => p.stock < 12).map((item) => (
                <div key={item._id} className="flex items-center justify-between p-3.5 rounded-xl border border-amber-500/10 bg-amber-500/5 transition-all">
                  <div className="flex items-center gap-3">
                    <div className="h-9 w-9 rounded-xl bg-[var(--bg-app)] border border-[var(--border-color)] flex items-center justify-center font-bold text-amber-500">
                      {item.stock}
                    </div>
                    <div>
                      <p className="text-[var(--text-primary)] font-bold">{item.name}</p>
                      <p className="text-[9px] text-[var(--text-secondary)]">SKU: {item.sku || 'SKU-NONE'} | Supplier: {item.supplier?.name || 'N/A'}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="text-right">
                      <span className="text-[10px] text-amber-500 font-bold uppercase block">
                        {item.stock === 0 ? 'OUT OF STOCK' : 'LOW STOCK'}
                      </span>
                      <span className="text-[9px] text-[var(--text-secondary)] font-medium">Reorder point: 12 Units</span>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="p-12 text-center border border-dashed border-[var(--border-color)] rounded-xl text-xs text-[var(--text-secondary)]">
                ✅ Excellent! All inventory stocks are in optimal counts.
              </div>
            )}
          </div>
        </div>
      </div>

      {/* --- STAT CARDS GRID --- */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Card 1 */}
        <div className="zoho-card flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-[10px] text-[var(--text-secondary)] uppercase font-bold tracking-wider">Cleared Revenue</span>
            <p className="text-2xl font-extrabold text-[var(--text-primary)]">${totalSales.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
            <span className="text-[10px] text-emerald-500 font-semibold flex items-center gap-0.5">
              <ArrowUpRight className="h-3 w-3" />
              <span>Pending: ${pendingSales.toFixed(2)}</span>
            </span>
          </div>
          <div className="h-12 w-12 rounded-xl bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 flex items-center justify-center">
            <DollarSign className="h-6 w-6" />
          </div>
        </div>

        {/* Card 2 */}
        <div className="zoho-card flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-[10px] text-[var(--text-secondary)] uppercase font-bold tracking-wider">Cleared Invoices</span>
            <p className="text-2xl font-extrabold text-[var(--text-primary)]">{totalInvoicesCount}</p>
            <span className="text-[10px] text-[var(--text-secondary)] font-semibold">Auto-rendered via PDFKit</span>
          </div>
          <div className="h-12 w-12 rounded-xl bg-blue-500/10 text-blue-500 border border-blue-500/20 flex items-center justify-center">
            <FileText className="h-6 w-6" />
          </div>
        </div>

        {/* Card 3 */}
        <div className="zoho-card flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-[10px] text-[var(--text-secondary)] uppercase font-bold tracking-wider">Active Inventory</span>
            <p className="text-2xl font-extrabold text-[var(--text-primary)]">{totalProductsCount}</p>
            <span className="text-[10px] text-[var(--text-secondary)] font-semibold">Synced with Cloudinary</span>
          </div>
          <div className="h-12 w-12 rounded-xl bg-purple-500/10 text-purple-500 border border-purple-500/20 flex items-center justify-center">
            <Boxes className="h-6 w-6" />
          </div>
        </div>

        {/* Card 4 */}
        <div className="zoho-card flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-[10px] text-[var(--text-secondary)] uppercase font-bold tracking-wider">Low Stock alerts</span>
            <p className="text-2xl font-extrabold text-[var(--text-primary)]">{lowStockCount}</p>
            <span className="text-[10px] text-[var(--text-secondary)] font-semibold">Quantity threshold &lt; 10</span>
          </div>
          <div className="h-12 w-12 rounded-xl bg-amber-500/10 text-amber-500 border border-amber-500/20 flex items-center justify-center">
            <AlertTriangle className="h-6 w-6" />
          </div>
        </div>
      </div>

      {/* --- CHARTS SECTION --- */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Line Chart: Revenue */}
        <div className="zoho-card lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="text-sm font-bold uppercase tracking-wider text-[var(--text-primary)] flex items-center gap-2">
              <TrendingUp className="h-4.5 w-4.5 text-[var(--accent-primary)]" />
              <span>Cleared Revenue History</span>
            </h4>
            <span className="text-xs text-[var(--accent-primary)] font-bold">Active cleared sales</span>
          </div>
          <div className="h-72 relative">
            {Object.keys(revenueByDate).length > 0 ? (
              <Line data={revenueChartData} options={revenueChartOptions} />
            ) : (
              <div className="flex h-full items-center justify-center text-xs text-[var(--text-secondary)]">No cleared sales data available yet.</div>
            )}
          </div>
        </div>

        {/* Doughnut Chart: Stock Distribution */}
        <div className="zoho-card space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="text-sm font-bold uppercase tracking-wider text-[var(--text-primary)] flex items-center gap-2">
              <Boxes className="h-4.5 w-4.5 text-[var(--accent-secondary)]" />
              <span>Stock Levels (Top 5)</span>
            </h4>
            <span className="text-xs text-[var(--accent-secondary)] font-bold">Products catalog</span>
          </div>
          <div className="h-72 relative flex items-center justify-center">
            {products.length > 0 ? (
              <Doughnut data={stockChartData} options={stockChartOptions} />
            ) : (
              <div className="flex h-full items-center justify-center text-xs text-[var(--text-secondary)]">No catalog items available yet.</div>
            )}
          </div>
        </div>
      </div>

      {/* --- RECENT INVOICES ACTIVITY TABLE --- */}
      <div className="zoho-card overflow-hidden !p-0">
        <div className="p-6 border-b border-[var(--border-color)] flex items-center justify-between bg-gray-500/5">
          <h4 className="text-sm font-bold uppercase tracking-wider text-[var(--text-primary)] flex items-center gap-2">
            <FileText className="h-4.5 w-4.5 text-[var(--accent-primary)]" />
            <span>Recent Invoicing Dispatches</span>
          </h4>
          <span className="text-[10px] text-[var(--text-secondary)] font-bold">Updated just now</span>
        </div>
        <div className="overflow-x-auto">
          {invoices.length > 0 ? (
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-gray-500/5 border-b border-[var(--border-color)] text-[var(--text-secondary)] font-bold">
                  <th className="p-4 pl-6 uppercase tracking-wider">Invoice #</th>
                  <th className="p-4 uppercase tracking-wider">Client Name</th>
                  <th className="p-4 uppercase tracking-wider">Created Date</th>
                  <th className="p-4 text-right uppercase tracking-wider">Subtotal</th>
                  <th className="p-4 text-right uppercase tracking-wider">Tax (8%)</th>
                  <th className="p-4 text-right uppercase tracking-wider">Total Due</th>
                  <th className="p-4 text-center uppercase tracking-wider">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--border-color)] text-[var(--text-primary)] font-medium">
                {invoices.slice(0, 5).map((inv) => (
                  <tr key={inv._id} className="hover:bg-gray-500/5 transition-colors">
                    <td className="p-4 pl-6 font-mono font-bold text-[var(--accent-primary)]">{inv.invoiceNumber}</td>
                    <td className="p-4 font-bold">{inv.clientName}</td>
                    <td className="p-4 text-[var(--text-secondary)] font-semibold">{formatDate(inv.createdAt)}</td>
                    <td className="p-4 text-right font-mono font-bold">${inv.subtotal.toFixed(2)}</td>
                    <td className="p-4 text-right text-[var(--text-secondary)] font-mono">${inv.tax.toFixed(2)}</td>
                    <td className="p-4 text-right font-mono font-extrabold text-[var(--text-primary)]">${inv.total.toFixed(2)}</td>
                    <td className="p-4 text-center">
                      <span className={`inline-block px-2.5 py-1 rounded-full text-[10px] font-bold tracking-wide uppercase border ${
                        inv.status === 'paid'
                          ? 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20'
                          : inv.status === 'pending'
                          ? 'bg-amber-500/10 text-amber-500 border-amber-500/20'
                          : 'bg-red-500/10 text-red-500 border-red-500/20'
                      }`}>
                        {inv.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className="p-8 text-center text-xs text-[var(--text-secondary)]">No recent invoice activity.</div>
          )}
        </div>
      </div>
    </>
  );
};

export default Dashboard;
