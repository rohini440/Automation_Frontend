import React, { useState, useEffect } from 'react';
import API from '../api/axios';
import Loader from '../components/Loader';
import { formatDate } from '../utils/formatDate';
import { 
  Plus, 
  FileText, 
  Mail, 
  Download, 
  Trash2, 
  FolderOpen,
  DollarSign,
  User as UserIcon,
  Percent,
  X,
  PlusCircle,
  AlertTriangle,
  Send,
  Eye,
  CheckCircle,
  ExternalLink,
  Search,
  Filter,
  ArrowUpDown
} from 'lucide-react';

const Invoices = () => {
  const [invoices, setInvoices] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Search & Filter & Sort States
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [sortBy, setSortBy] = useState('date-desc');

  // Form Modal states
  const [modalOpen, setModalOpen] = useState(false);
  const [clientName, setClientName] = useState('');
  const [clientEmail, setClientEmail] = useState('');
  
  // Dynamic Line Items Builder
  const [lineItems, setLineItems] = useState([
    { productId: '', name: '', quantity: 1, price: 0 }
  ]);

  const [formSubmitting, setFormSubmitting] = useState(false);
  const [formError, setFormError] = useState('');

  const fetchData = async () => {
    try {
      setLoading(true);
      const [invRes, prodRes] = await Promise.all([
        API.get('/invoices'),
        API.get('/products')
      ]);

      if (invRes.data?.success) setInvoices(invRes.data.invoices);
      if (prodRes.data?.success) setProducts(prodRes.data.products);
    } catch (err) {
      console.error(err);
      setError(err.message || 'Failed to fetch invoice details');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleProductSelect = (index, productId) => {
    const selectedProd = products.find(p => p._id === productId);
    const updatedItems = [...lineItems];
    if (selectedProd) {
      updatedItems[index] = {
        productId,
        name: selectedProd.name,
        price: selectedProd.price,
        quantity: updatedItems[index].quantity
      };
    } else {
      updatedItems[index] = {
        productId: '',
        name: '',
        price: 0,
        quantity: 1
      };
    }
    setLineItems(updatedItems);
  };

  const handleQtyChange = (index, qty) => {
    const updatedItems = [...lineItems];
    updatedItems[index].quantity = Math.max(1, parseInt(qty) || 1);
    setLineItems(updatedItems);
  };

  const addLineItemRow = () => {
    setLineItems([...lineItems, { productId: '', name: '', quantity: 1, price: 0 }]);
  };

  const removeLineItemRow = (index) => {
    if (lineItems.length === 1) return;
    setLineItems(lineItems.filter((_, idx) => idx !== index));
  };

  // Live total calculations for UI visual
  const subtotal = lineItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const tax = Math.round((subtotal * 0.08) * 100) / 100;
  const total = Math.round((subtotal + tax) * 100) / 100;

  const resetForm = () => {
    setClientName('');
    setClientEmail('');
    setLineItems([{ productId: '', name: '', quantity: 1, price: 0 }]);
    setFormError('');
  };

  const handleCreateInvoice = async (e) => {
    e.preventDefault();
    if (!clientName || !clientEmail) {
      return setFormError('Client name and email are required.');
    }

    // Validate line items
    const invalidItem = lineItems.some(it => !it.productId || it.quantity <= 0);
    if (invalidItem) {
      return setFormError('Please select products for all line item rows.');
    }

    setFormSubmitting(true);
    setFormError('');

    try {
      const res = await API.post('/invoices', {
        clientName,
        clientEmail,
        items: lineItems.map(it => ({
          name: it.name,
          price: it.price,
          quantity: it.quantity
        }))
      });

      if (res.data?.success) {
        setInvoices([res.data.invoice, ...invoices]);
        setModalOpen(false);
        resetForm();
      }
    } catch (err) {
      console.error(err);
      setFormError(err.response?.data?.message || err.message || 'Failed to dispatch invoice');
    } finally {
      setFormSubmitting(false);
    }
  };

  const handleStatusChange = async (id, currentStatus) => {
    const nextStatusMap = {
      pending: 'paid',
      paid: 'unpaid',
      unpaid: 'pending'
    };
    const nextStatus = nextStatusMap[currentStatus];

    try {
      const res = await API.put(`/invoices/${id}/status`, { status: nextStatus });
      if (res.data?.success) {
        setInvoices(invoices.map(inv => inv._id === id ? { ...inv, status: nextStatus } : inv));
      }
    } catch (err) {
      console.error(err);
      alert('Failed to update payment status');
    }
  };

  const handleDeleteInvoice = async (id) => {
    if (!window.confirm('Are you sure you want to permanently delete this invoice contract?')) return;
    try {
      const res = await API.delete(`/invoices/${id}`);
      if (res.data?.success) {
        setInvoices(invoices.filter(inv => inv._id !== id));
      }
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || 'Failed to delete invoice');
    }
  };

  // --- Filtering & Sorting Core Logic ---
  const filteredAndSortedInvoices = invoices
    .filter((inv) => {
      const matchesSearch = 
        inv.invoiceNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
        inv.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        inv.clientEmail.toLowerCase().includes(searchTerm.toLowerCase());

      if (statusFilter === 'all') return matchesSearch;
      return matchesSearch && inv.status === statusFilter;
    })
    .sort((a, b) => {
      if (sortBy === 'date-desc') return new Date(b.createdAt) - new Date(a.createdAt);
      if (sortBy === 'date-asc') return new Date(a.createdAt) - new Date(b.createdAt);
      if (sortBy === 'num-asc') return a.invoiceNumber.localeCompare(b.invoiceNumber);
      if (sortBy === 'num-desc') return b.invoiceNumber.localeCompare(a.invoiceNumber);
      if (sortBy === 'total-asc') return a.total - b.total;
      if (sortBy === 'total-desc') return b.total - a.total;
      return 0;
    });

  return (
    <>
      {/* Header Panel */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Invoice Dispatch Hub</h2>
          <p className="text-sm text-[var(--text-secondary)] font-medium">Generate client billing contracts, download PDF renders, and trigger email alerts.</p>
        </div>
        <button
          onClick={() => setModalOpen(true)}
          className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl gradient-bg text-[#0b0f19] font-bold text-xs hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 shadow-lg cursor-pointer"
        >
          <Plus className="h-4.5 w-4.5 stroke-[3]" />
          <span>New Invoice Dispatch</span>
        </button>
      </div>

      {/* --- Zoho Style Search & Filtering Controls --- */}
      {!loading && !error && invoices.length > 0 && (
        <div className="zoho-card flex flex-col md:flex-row gap-4 items-center justify-between">
          {/* Search bar */}
          <div className="relative w-full md:w-80">
            <Search className="absolute left-3.5 top-3.5 h-4 w-4 text-[var(--text-secondary)]" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by Invoice #, client, email..."
              className="w-full bg-[var(--bg-app)] border border-[var(--border-color)] rounded-xl py-2.5 pl-10 pr-4 text-xs text-[var(--text-primary)] focus:outline-none focus:border-[var(--accent-primary)]/60 transition-all font-semibold"
            />
          </div>

          {/* Filters & Sorting */}
          <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto font-semibold text-xs text-[var(--text-secondary)]">
            {/* Filter by Status */}
            <div className="flex items-center gap-2 bg-[var(--bg-app)] border border-[var(--border-color)] px-3 py-1.5 rounded-xl">
              <Filter className="h-3.5 w-3.5 text-[var(--accent-primary)]" />
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="bg-transparent text-[var(--text-primary)] focus:outline-none cursor-pointer pr-4 font-bold"
              >
                <option value="all">All Invoices</option>
                <option value="paid">Paid</option>
                <option value="pending">Pending</option>
                <option value="unpaid">Unpaid</option>
              </select>
            </div>

            {/* Sorting selector */}
            <div className="flex items-center gap-2 bg-[var(--bg-app)] border border-[var(--border-color)] px-3 py-1.5 rounded-xl">
              <ArrowUpDown className="h-3.5 w-3.5 text-[var(--accent-secondary)]" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-transparent text-[var(--text-primary)] focus:outline-none cursor-pointer pr-4 font-bold"
              >
                <option value="date-desc">Date: Newest First</option>
                <option value="date-asc">Date: Oldest First</option>
                <option value="num-asc">Invoice #: Ascending</option>
                <option value="num-desc">Invoice #: Descending</option>
                <option value="total-desc">Amount: High to Low</option>
                <option value="total-asc">Amount: Low to High</option>
              </select>
            </div>
          </div>
        </div>
      )}

      {loading ? (
        <Loader />
      ) : error ? (
        <div className="p-4 rounded-xl border border-red-500/20 bg-red-500/10 text-center text-xs text-red-500">{error}</div>
      ) : invoices.length > 0 ? (
        filteredAndSortedInvoices.length > 0 ? (
          /* --- INVOICES TABLE LIST --- */
          <div className="zoho-card !p-0 overflow-hidden border border-[var(--border-color)]">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="bg-gray-500/5 border-b border-[var(--border-color)] text-[var(--text-secondary)] font-bold">
                    <th className="p-4 pl-6 uppercase tracking-wider">Invoice #</th>
                    <th className="p-4 uppercase tracking-wider">Client</th>
                    <th className="p-4 uppercase tracking-wider">Billing Email</th>
                    <th className="p-4 uppercase tracking-wider">Billing Date</th>
                    <th className="p-4 text-right uppercase tracking-wider">Subtotal</th>
                    <th className="p-4 text-right uppercase tracking-wider">Total Due</th>
                    <th className="p-4 text-center uppercase tracking-wider">Status (Toggle)</th>
                    <th className="p-4 text-center uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[var(--border-color)] text-[var(--text-primary)] font-medium">
                  {filteredAndSortedInvoices.map((inv) => (
                    <tr key={inv._id} className="hover:bg-gray-500/5 transition-colors">
                      <td className="p-4 pl-6 font-mono font-bold text-[var(--accent-primary)]">{inv.invoiceNumber}</td>
                      <td className="p-4 font-bold">{inv.clientName}</td>
                      <td className="p-4 text-[var(--text-secondary)] font-semibold">{inv.clientEmail}</td>
                      <td className="p-4 text-[var(--text-secondary)] font-semibold">{formatDate(inv.createdAt)}</td>
                      <td className="p-4 text-right font-mono font-bold">${inv.subtotal.toFixed(2)}</td>
                      <td className="p-4 text-right font-mono font-extrabold text-[var(--text-primary)]">${inv.total.toFixed(2)}</td>
                      <td className="p-4 text-center">
                        <button
                          onClick={() => handleStatusChange(inv._id, inv.status)}
                          className={`px-3 py-1 rounded-full text-[10px] font-bold tracking-wide uppercase border hover:opacity-85 active:scale-95 transition-all cursor-pointer ${
                            inv.status === 'paid'
                              ? 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20'
                              : inv.status === 'pending'
                              ? 'bg-amber-500/10 text-amber-500 border-amber-500/20'
                              : 'bg-red-500/10 text-red-500 border-red-500/20'
                          }`}
                        >
                          {inv.status}
                        </button>
                      </td>
                      <td className="p-4">
                        <div className="flex items-center justify-center gap-2">
                          {/* Download PDF button */}
                          <a
                            href={`http://localhost:5050/api/invoices/download/${inv.invoiceNumber}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg border border-[var(--accent-primary)]/20 bg-[var(--accent-primary)]/5 hover:bg-[var(--accent-primary)]/15 text-[var(--accent-primary)] font-bold text-[10px] transition-colors shadow-sm"
                          >
                            <Download className="h-3 w-3" />
                            <span>PDF</span>
                          </a>

                          {/* Delete invoice button */}
                          <button
                            onClick={() => handleDeleteInvoice(inv._id)}
                            className="p-1.5 rounded-lg border border-[var(--border-color)] text-[var(--text-secondary)] hover:text-red-500 hover:bg-red-500/10 hover:border-red-500/20 transition-all duration-200 cursor-pointer"
                            title="Delete Invoice"
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          /* Search Empty State */
          <div className="zoho-card p-12 text-center flex flex-col items-center justify-center max-w-md mx-auto">
            <Search className="h-12 w-12 text-[var(--text-secondary)] mb-3 opacity-60" />
            <h4 className="font-bold text-[var(--text-primary)]">No Matches Found</h4>
            <p className="text-xs text-[var(--text-secondary)] mt-1.5 leading-relaxed">
              No invoice records matched your search queries. Clear the inputs and try again.
            </p>
          </div>
        )
      ) : (
        /* Empty State */
        <div className="zoho-card p-12 text-center flex flex-col items-center justify-center max-w-lg mx-auto">
          <FileText className="h-16 w-16 text-[var(--text-secondary)] mb-4 opacity-40" />
          <h4 className="font-bold text-[var(--text-primary)]">No Invoices</h4>
          <p className="text-xs text-[var(--text-secondary)] mt-1.5 leading-relaxed">No billing dispatches have been registered. Launch the dispatch builder above to create invoices and send PDF emails.</p>
        </div>
      )}

      {/* --- CREATE INVOICE DISPATCH MODAL --- */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-sm p-4 overflow-y-auto font-sans">
          <div className="w-full max-w-3xl glass rounded-2xl shadow-2xl p-6 md:p-8 animate-fade-in relative my-8">
            {/* Close Button */}
            <button 
              onClick={() => { setModalOpen(false); resetForm(); }}
              className="absolute top-4 right-4 p-1.5 rounded-lg border border-[var(--border-color)] bg-gray-500/10 hover:bg-gray-500/20 text-[var(--text-secondary)] hover:text-[var(--text-primary)] cursor-pointer"
            >
              <X className="h-4.5 w-4.5" />
            </button>

            <div className="flex items-center gap-3 mb-6">
              <div className="h-9 w-9 rounded-xl gradient-bg flex items-center justify-center shadow-sm">
                <FileText className="h-5 w-5 text-[#0b0f19]" />
              </div>
              <div>
                <h3 className="font-bold text-lg text-[var(--text-primary)]">Invoice Contract Dispatcher</h3>
                <p className="text-xs text-[var(--text-secondary)] font-medium">Compiles invoice parameters, triggers PDFKit renders, and fires Nodemailer alerts.</p>
              </div>
            </div>

            {formError && (
              <div className="mb-6 flex items-start gap-2.5 p-3 rounded-xl border border-red-500/20 bg-red-500/10 text-xs text-red-500">
                <AlertTriangle className="h-4 w-4 shrink-0 mt-0.5" />
                <span>{formError}</span>
              </div>
            )}

            <form onSubmit={handleCreateInvoice} className="space-y-6 text-xs font-semibold">
              {/* Client Info Subgrid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-[var(--text-secondary)]">Client Contact Name *</label>
                  <div className="relative">
                    <UserIcon className="absolute left-3.5 top-3.5 h-4 w-4 text-[var(--text-secondary)] opacity-60" />
                    <input 
                      type="text" 
                      required
                      value={clientName}
                      onChange={(e) => setClientName(e.target.value)}
                      placeholder="e.g. Alice Johnson"
                      className="w-full bg-[var(--bg-app)] border border-[var(--border-color)] rounded-xl py-3 pl-11 pr-4 text-xs text-[var(--text-primary)] focus:outline-none focus:border-[var(--accent-primary)]/60 transition-all font-semibold"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[var(--text-secondary)]">Client Dispatch Email *</label>
                  <div className="relative">
                    <Mail className="absolute left-3.5 top-3.5 h-4 w-4 text-[var(--text-secondary)] opacity-60" />
                    <input 
                      type="email" 
                      required
                      value={clientEmail}
                      onChange={(e) => setClientEmail(e.target.value)}
                      placeholder="e.g. alice@company.com"
                      className="w-full bg-[var(--bg-app)] border border-[var(--border-color)] rounded-xl py-3 pl-11 pr-4 text-xs text-[var(--text-primary)] focus:outline-none focus:border-[var(--accent-primary)]/60 transition-all font-semibold"
                    />
                  </div>
                </div>
              </div>

              {/* Line Items Dynamic Section */}
              <div className="space-y-3">
                <div className="flex items-center justify-between border-b border-[var(--border-color)] pb-2">
                  <h4 className="text-xs uppercase tracking-wider text-[var(--accent-primary)] font-bold">Line Items List</h4>
                  <button
                    type="button"
                    onClick={addLineItemRow}
                    className="flex items-center gap-1 px-2.5 py-1 rounded-lg border border-[var(--accent-primary)]/20 text-[var(--accent-primary)] hover:bg-[var(--accent-primary)]/10 font-bold cursor-pointer"
                  >
                    <PlusCircle className="h-3.5 w-3.5" />
                    <span>Add Item</span>
                  </button>
                </div>

                {lineItems.map((item, idx) => (
                  <div key={idx} className="flex flex-col sm:flex-row items-center gap-3 bg-gray-500/5 p-3 rounded-xl border border-[var(--border-color)]/40 relative">
                    {/* Item Select */}
                    <div className="flex-1 w-full space-y-1">
                      <label className="text-[10px] text-[var(--text-secondary)] uppercase">Product Name</label>
                      <select
                        value={item.productId}
                        onChange={(e) => handleProductSelect(idx, e.target.value)}
                        className="w-full bg-[var(--bg-app)] border border-[var(--border-color)] rounded-lg py-2.5 px-3 text-xs text-[var(--text-primary)] focus:outline-none focus:border-[var(--accent-primary)]/60 transition-all font-bold"
                      >
                        <option value="">-- Choose Product --</option>
                        {products.map(p => (
                          <option key={p._id} value={p._id} className="text-slate-800">
                            {p.name} (${p.price.toFixed(2)}) | Stock: {p.stock}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Qty Selector */}
                    <div className="w-full sm:w-28 space-y-1">
                      <label className="text-[10px] text-[var(--text-secondary)] uppercase">Quantity</label>
                      <input
                        type="number"
                        min="1"
                        value={item.quantity}
                        onChange={(e) => handleQtyChange(idx, e.target.value)}
                        className="w-full bg-[var(--bg-app)] border border-[var(--border-color)] rounded-lg py-2 px-3 text-xs text-[var(--text-primary)] focus:outline-none focus:border-[var(--accent-primary)]/60 transition-all font-semibold"
                      />
                    </div>

                    {/* Cost Visual */}
                    <div className="w-full sm:w-32 text-right self-end pb-2">
                      <span className="text-[10px] text-[var(--text-secondary)] block uppercase font-bold">Row Cost</span>
                      <span className="font-mono text-[var(--accent-primary)] font-extrabold text-sm">${(item.price * item.quantity).toFixed(2)}</span>
                    </div>

                    {/* Delete Row Button */}
                    <button
                      type="button"
                      disabled={lineItems.length === 1}
                      onClick={() => removeLineItemRow(idx)}
                      className="absolute sm:static top-2 right-2 p-1.5 rounded-lg border border-red-500/10 text-red-500 hover:bg-red-500/15 disabled:opacity-30 self-end mb-1 cursor-pointer"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                ))}
              </div>

              {/* Total Calculations Summary */}
              <div className="border-t border-[var(--border-color)] pt-4 flex flex-col items-end space-y-2 text-xs font-semibold text-[var(--text-secondary)]">
                <div className="flex items-center gap-10">
                  <span>Subtotal:</span>
                  <span className="font-mono text-[var(--text-primary)] font-bold">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex items-center gap-10">
                  <span className="flex items-center gap-1"><Percent className="h-3 w-3" /> Tax (8%):</span>
                  <span className="font-mono text-[var(--text-primary)] font-bold">${tax.toFixed(2)}</span>
                </div>
                <div className="flex items-center gap-10 pt-2 border-t border-[var(--border-color)]">
                  <span className="text-[var(--accent-primary)] font-extrabold">Grand Total:</span>
                  <span className="font-mono text-[var(--accent-primary)] font-black text-lg">${total.toFixed(2)}</span>
                </div>
              </div>

              {/* Form Buttons */}
              <div className="flex items-center justify-end gap-3 pt-3 border-t border-[var(--border-color)]/40">
                <button
                  type="button"
                  onClick={() => { setModalOpen(false); resetForm(); }}
                  className="px-4 py-3 rounded-xl border border-[var(--border-color)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-gray-500/10 transition-all font-bold cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={formSubmitting}
                  className="flex items-center gap-2 px-6 py-3 rounded-xl gradient-bg text-[#0b0f19] font-extrabold hover:scale-[1.01] active:scale-[0.99] transition-all shadow-lg cursor-pointer disabled:opacity-50 disabled:pointer-events-none"
                >
                  <Send className="h-4 w-4 text-[#0b0f19] stroke-[2.5]" />
                  <span>{formSubmitting ? 'Generating Contract & Emailing...' : 'Dispatch Invoice'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default Invoices;
