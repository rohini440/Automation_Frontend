import React, { useState, useEffect } from 'react';
import API from '../api/axios';
import DashboardCard from '../components/DashboardCard';
import Loader from '../components/Loader';
import { formatDate } from '../utils/formatDate';
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
  TrendingUp
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

  useEffect(() => {
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

    fetchData();
  }, []);

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return (
      <div className="p-4 rounded-xl border border-red-500/20 bg-red-500/10 text-center text-xs text-red-400">
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

  // --- CHART 1: REVENUE TREND (LINE) ---
  const sortedInvoices = [...invoices].sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
  const revenueByDate = {};
  sortedInvoices.forEach(inv => {
    const dateStr = formatDate(inv.createdAt);
    revenueByDate[dateStr] = (revenueByDate[dateStr] || 0) + (inv.status === 'paid' ? inv.total : 0);
  });

  const revenueChartData = {
    labels: Object.keys(revenueByDate).slice(-7), // Last 7 unique invoice dates
    datasets: [
      {
        label: 'Cleared Sales ($)',
        data: Object.values(revenueByDate).slice(-7),
        borderColor: '#10b981',
        backgroundColor: 'rgba(16, 185, 129, 0.1)',
        tension: 0.4,
        fill: true,
        pointBackgroundColor: '#10b981',
        pointBorderColor: '#0b0f19',
        pointHoverRadius: 7
      }
    ]
  };

  const revenueChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: '#121826',
        titleColor: '#9ca3af',
        bodyColor: '#fff',
        borderColor: 'rgba(255,255,255,0.08)',
        borderWidth: 1,
        padding: 12
      }
    },
    scales: {
      x: { grid: { color: 'rgba(255, 255, 255, 0.03)' }, ticks: { color: '#6b7280' } },
      y: { grid: { color: 'rgba(255, 255, 255, 0.03)' }, ticks: { color: '#6b7280' } }
    }
  };

  // --- CHART 2: INVENTORY STOCK DISTRIBUTION (DOUGHNUT) ---
  const stockChartData = {
    labels: products.slice(0, 5).map(p => p.name),
    datasets: [
      {
        data: products.slice(0, 5).map(p => p.stock),
        backgroundColor: [
          '#10b981', // Emerald
          '#3b82f6', // Blue
          '#f59e0b', // Amber
          '#ec4899', // Pink
          '#8b5cf6'  // Purple
        ],
        borderWidth: 1,
        borderColor: '#121826'
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
          color: '#e5e7eb',
          boxWidth: 10,
          padding: 15,
          font: { size: 10 }
        }
      },
      tooltip: {
        backgroundColor: '#121826',
        padding: 12
      }
    },
    cutout: '65%'
  };

  return (
    <>
      {/* Header Panel */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Analytical Overview</h2>
          <p className="text-sm text-gray-400">Real-time statistics of product inventory and dispatched client invoicing.</p>
        </div>
        <div className="flex items-center gap-2 text-xs bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-3.5 py-1.5 rounded-full font-semibold w-fit">
          <TrendingUp className="h-3.5 w-3.5" />
          <span>System active in mock database mode</span>
        </div>
      </div>

      {/* --- STAT CARDS GRID --- */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <DashboardCard 
          title="Cleared Revenue" 
          value={`$${totalSales.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}
          subtitle={`Pending Sales: $${pendingSales.toFixed(2)}`}
          icon={DollarSign}
          color="emerald"
        />
        <DashboardCard 
          title="Invoices Dispatched" 
          value={totalInvoicesCount.toString()}
          subtitle="Auto-generated via PDFKit"
          icon={FileText}
          color="blue"
        />
        <DashboardCard 
          title="Active Inventory" 
          value={totalProductsCount.toString()}
          subtitle="Synced with Cloudinary"
          icon={Boxes}
          color="purple"
        />
        <DashboardCard 
          title="Low Stock Warnings" 
          value={lowStockCount.toString()}
          subtitle="Quantity threshold < 10"
          icon={AlertTriangle}
          color={lowStockCount > 0 ? 'amber' : 'emerald'}
        />
      </div>

      {/* --- CHARTS SECTION --- */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Line Chart: Revenue */}
        <div className="glass p-6 rounded-2xl shadow-xl lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="text-sm font-bold uppercase tracking-wider text-gray-300">Cleared Revenue History</h4>
            <span className="text-xs text-emerald-400 font-semibold">Active Sales</span>
          </div>
          <div className="h-72 relative">
            {Object.keys(revenueByDate).length > 0 ? (
              <Line data={revenueChartData} options={revenueChartOptions} />
            ) : (
              <div className="flex h-full items-center justify-center text-xs text-gray-500">No sales data available.</div>
            )}
          </div>
        </div>

        {/* Doughnut Chart: Stock Distribution */}
        <div className="glass p-6 rounded-2xl shadow-xl space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="text-sm font-bold uppercase tracking-wider text-gray-300">Stock Levels (Top 5)</h4>
            <span className="text-xs text-blue-400 font-semibold">Products</span>
          </div>
          <div className="h-72 relative flex items-center justify-center">
            {products.length > 0 ? (
              <Doughnut data={stockChartData} options={stockChartOptions} />
            ) : (
              <div className="flex h-full items-center justify-center text-xs text-gray-500">No inventory products available.</div>
            )}
          </div>
        </div>
      </div>

      {/* --- RECENT INVOICES ACTIVITY TABLE --- */}
      <div className="glass rounded-2xl shadow-xl overflow-hidden border border-gray-800/40">
        <div className="p-6 border-b border-gray-800 flex items-center justify-between">
          <h4 className="text-sm font-bold uppercase tracking-wider text-gray-300">Recent Invoicing Dispatches</h4>
          <span className="text-[10px] text-gray-500 font-medium">Updated just now</span>
        </div>
        <div className="overflow-x-auto">
          {invoices.length > 0 ? (
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-gray-900/30 border-b border-gray-800 text-gray-400 font-semibold">
                  <th className="p-4 pl-6">Invoice #</th>
                  <th className="p-4">Client Name</th>
                  <th className="p-4">Created Date</th>
                  <th className="p-4 text-right">Subtotal</th>
                  <th className="p-4 text-right">Tax (8%)</th>
                  <th className="p-4 text-right">Total Due</th>
                  <th className="p-4 text-center">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-800/40 text-gray-300">
                {invoices.slice(0, 5).map((inv) => (
                  <tr key={inv._id} className="hover:bg-gray-800/10 transition-colors">
                    <td className="p-4 pl-6 font-mono font-semibold text-emerald-400">{inv.invoiceNumber}</td>
                    <td className="p-4 font-medium">{inv.clientName}</td>
                    <td className="p-4 text-gray-500">{formatDate(inv.createdAt)}</td>
                    <td className="p-4 text-right font-medium">${inv.subtotal.toFixed(2)}</td>
                    <td className="p-4 text-right text-gray-500">${inv.tax.toFixed(2)}</td>
                    <td className="p-4 text-right font-bold text-gray-100">${inv.total.toFixed(2)}</td>
                    <td className="p-4 text-center">
                      <span className={`inline-block px-2.5 py-1 rounded-full text-[10px] font-bold tracking-wide uppercase border ${
                        inv.status === 'paid'
                          ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                          : inv.status === 'pending'
                          ? 'bg-amber-500/10 text-amber-400 border-amber-500/20'
                          : 'bg-red-500/10 text-red-400 border-red-500/20'
                      }`}>
                        {inv.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className="p-8 text-center text-xs text-gray-500">No recent invoice activity.</div>
          )}
        </div>
      </div>
    </>
  );
};

export default Dashboard;
