import React, { useState, useEffect } from 'react';
import API from '../api/axios';
import Loader from '../components/Loader';
import formatDate from '../utils/formatDate';
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
  ExternalLink
} from 'lucide-react';

const Invoices = () => {
  const [invoices, setInvoices] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

  return (
    <>
      {/* Header Panel */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Invoice Dispatch Hub</h2>
          <p className="text-sm text-gray-400">Generate client billing contracts, download PDF renders, and trigger email alerts.</p>
        </div>
        <button
          onClick={() => setModalOpen(true)}
          className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl gradient-bg text-[#0b0f19] font-bold text-xs hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 shadow-lg shadow-emerald-500/10"
        >
          <Plus className="h-4.5 w-4.5 stroke-[3]" />
          <span>New Invoice Dispatch</span>
        </button>
      </div>

      {loading ? (
        <Loader />
      ) : error ? (
        <div className="p-4 rounded-xl border border-red-500/20 bg-red-500/10 text-center text-xs text-red-400">{error}</div>
      ) : invoices.length > 0 ? (
        /* --- INVOICES TABLE LIST --- */
        <div className="glass rounded-2xl shadow-xl overflow-hidden border border-gray-800/40">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-gray-900/30 border-b border-gray-800 text-gray-400 font-semibold">
                  <th className="p-4 pl-6">Invoice #</th>
                  <th className="p-4">Client</th>
                  <th className="p-4">Billing Email</th>
                  <th className="p-4">Billing Date</th>
                  <th className="p-4 text-right">Subtotal</th>
                  <th className="p-4 text-right">Total Due</th>
                  <th className="p-4 text-center">Status (Toggle)</th>
                  <th className="p-4 text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-800/40 text-gray-300">
                {invoices.map((inv) => (
                  <tr key={inv._id} className="hover:bg-gray-800/10 transition-colors">
                    <td className="p-4 pl-6 font-mono font-bold text-emerald-400">{inv.invoiceNumber}</td>
                    <td className="p-4 font-semibold text-gray-200">{inv.clientName}</td>
                    <td className="p-4 text-gray-400">{inv.clientEmail}</td>
                    <td className="p-4 text-gray-500">{formatDate(inv.createdAt)}</td>
                    <td className="p-4 text-right font-mono">${inv.subtotal.toFixed(2)}</td>
                    <td className="p-4 text-right font-mono font-bold text-gray-100">${inv.total.toFixed(2)}</td>
                    <td className="p-4 text-center">
                      <button
                        onClick={() => handleStatusChange(inv._id, inv.status)}
                        className={`px-3 py-1 rounded-full text-[10px] font-bold tracking-wide uppercase border hover:opacity-85 active:scale-95 transition-all ${
                          inv.status === 'paid'
                            ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                            : inv.status === 'pending'
                            ? 'bg-amber-500/10 text-amber-400 border-amber-500/20'
                            : 'bg-red-500/10 text-red-400 border-red-500/20'
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
                          className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg border border-emerald-500/20 bg-emerald-500/5 hover:bg-emerald-500/15 text-emerald-400 font-semibold text-[10px] transition-colors"
                        >
                          <Download className="h-3 w-3" />
                          <span>PDF</span>
                        </a>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        /* Empty State */
        <div className="glass p-12 rounded-2xl shadow-xl flex flex-col items-center justify-center text-center max-w-lg mx-auto">
          <FileText className="h-16 w-16 text-gray-700 mb-4" />
          <h4 className="font-bold text-gray-300">No Invoices</h4>
          <p className="text-xs text-gray-500 mt-1.5 leading-relaxed">No billing dispatches have been registered. Launch the dispatch builder above to create invoices and send PDF emails.</p>
        </div>
      )}

      {/* --- CREATE INVOICE DISPATCH MODAL --- */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-sm p-4 overflow-y-auto">
          <div className="w-full max-w-3xl glass rounded-2xl shadow-2xl p-6 md:p-8 animate-fade-in relative my-8">
            {/* Close Button */}
            <button 
              onClick={() => { setModalOpen(false); resetForm(); }}
              className="absolute top-4 right-4 p-1.5 rounded-lg border border-gray-800 bg-gray-900/30 hover:bg-gray-800/50 text-gray-400 hover:text-white"
            >
              <X className="h-4.5 w-4.5" />
            </button>

            <div className="flex items-center gap-3 mb-6">
              <div className="h-9 w-9 rounded-xl gradient-bg flex items-center justify-center">
                <FileText className="h-5 w-5 text-[#0b0f19]" />
              </div>
              <div>
                <h3 className="font-bold text-lg text-gray-200">Invoice Contract Dispatcher</h3>
                <p className="text-xs text-gray-500">Compiles invoice parameters, triggers PDFKit renders, and fires Nodemailer alerts.</p>
              </div>
            </div>

            {formError && (
              <div className="mb-6 flex items-start gap-2.5 p-3 rounded-xl border border-red-500/20 bg-red-500/10 text-xs text-red-400">
                <AlertTriangle className="h-4 w-4 shrink-0 mt-0.5" />
                <span>{formError}</span>
              </div>
            )}

            <form onSubmit={handleCreateInvoice} className="space-y-6 text-xs font-semibold">
              {/* Client Info Subgrid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-gray-400">Client Contact Name *</label>
                  <div className="relative">
                    <UserIcon className="absolute left-3.5 top-3.5 h-4 w-4 text-gray-500" />
                    <input 
                      type="text" 
                      required
                      value={clientName}
                      onChange={(e) => setClientName(e.target.value)}
                      placeholder="e.g. Alice Johnson"
                      className="w-full bg-[#121826]/60 border border-gray-800 rounded-xl py-3 pl-11 pr-4 text-xs text-gray-200 focus:outline-none focus:border-emerald-500/60 transition-all"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-gray-400">Client Dispatch Email *</label>
                  <div className="relative">
                    <Mail className="absolute left-3.5 top-3.5 h-4 w-4 text-gray-500" />
                    <input 
                      type="email" 
                      required
                      value={clientEmail}
                      onChange={(e) => setClientEmail(e.target.value)}
                      placeholder="e.g. alice@company.com"
                      className="w-full bg-[#121826]/60 border border-gray-800 rounded-xl py-3 pl-11 pr-4 text-xs text-gray-200 focus:outline-none focus:border-emerald-500/60 transition-all"
                    />
                  </div>
                </div>
              </div>

              {/* Line Items Dynamic Section */}
              <div className="space-y-3">
                <div className="flex items-center justify-between border-b border-gray-800 pb-2">
                  <h4 className="text-xs uppercase tracking-wider text-emerald-400 font-bold">Line Items List</h4>
                  <button
                    type="button"
                    onClick={addLineItemRow}
                    className="flex items-center gap-1 px-2.5 py-1 rounded-lg border border-emerald-500/20 text-emerald-400 hover:bg-emerald-500/10 font-bold"
                  >
                    <PlusCircle className="h-3.5 w-3.5" />
                    <span>Add Item</span>
                  </button>
                </div>

                {lineItems.map((item, idx) => (
                  <div key={idx} className="flex flex-col sm:flex-row items-center gap-3 bg-[#121826]/40 p-3 rounded-xl border border-gray-800/40 relative">
                    {/* Item Select */}
                    <div className="flex-1 w-full space-y-1">
                      <label className="text-[10px] text-gray-500 uppercase">Product Name</label>
                      <select
                        value={item.productId}
                        onChange={(e) => handleProductSelect(idx, e.target.value)}
                        className="w-full bg-[#0b0f19] border border-gray-800 rounded-lg py-2.5 px-3 text-xs text-gray-300 focus:outline-none focus:border-emerald-500/60 transition-all font-medium"
                      >
                        <option value="">-- Choose Product --</option>
                        {products.map(p => (
                          <option key={p._id} value={p._id}>
                            {p.name} (${p.price.toFixed(2)})
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Qty Selector */}
                    <div className="w-full sm:w-28 space-y-1">
                      <label className="text-[10px] text-gray-500 uppercase">Quantity</label>
                      <input
                        type="number"
                        min="1"
                        value={item.quantity}
                        onChange={(e) => handleQtyChange(idx, e.target.value)}
                        className="w-full bg-[#0b0f19] border border-gray-800 rounded-lg py-2 px-3 text-xs text-gray-300 focus:outline-none focus:border-emerald-500/60 transition-all"
                      />
                    </div>

                    {/* Cost Visual */}
                    <div className="w-full sm:w-32 text-right self-end pb-2">
                      <span className="text-[10px] text-gray-500 block uppercase font-semibold">Row Cost</span>
                      <span className="font-mono text-emerald-400 font-bold">${(item.price * item.quantity).toFixed(2)}</span>
                    </div>

                    {/* Delete Row Button */}
                    <button
                      type="button"
                      disabled={lineItems.length === 1}
                      onClick={() => removeLineItemRow(idx)}
                      className="absolute sm:static top-2 right-2 p-1.5 rounded-lg border border-red-500/10 text-red-500 hover:bg-red-500/15 disabled:opacity-30 self-end mb-1"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                ))}
              </div>

              {/* Total Calculations Summary */}
              <div className="border-t border-gray-800 pt-4 flex flex-col items-end space-y-2 text-xs font-semibold text-gray-400">
                <div className="flex items-center gap-10">
                  <span>Subtotal:</span>
                  <span className="font-mono text-gray-200">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex items-center gap-10">
                  <span className="flex items-center gap-1"><Percent className="h-3 w-3" /> Tax (8%):</span>
                  <span className="font-mono text-gray-200">${tax.toFixed(2)}</span>
                </div>
                <div className="flex items-center gap-10 pt-2 border-t border-gray-800">
                  <span className="text-emerald-400 font-bold">Grand Total:</span>
                  <span className="font-mono text-emerald-400 font-extrabold text-lg">${total.toFixed(2)}</span>
                </div>
              </div>

              {/* Form Buttons */}
              <div className="flex items-center justify-end gap-3 pt-3 border-t border-gray-800/40">
                <button
                  type="button"
                  onClick={() => { setModalOpen(false); resetForm(); }}
                  className="px-4 py-3 rounded-xl border border-gray-800 text-gray-400 hover:text-white hover:bg-gray-800/30 transition-all font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={formSubmitting}
                  className="flex items-center gap-2 px-6 py-3 rounded-xl gradient-bg text-[#0b0f19] font-extrabold hover:scale-[1.01] active:scale-[0.99] transition-all shadow-lg shadow-emerald-500/15 disabled:opacity-50 disabled:pointer-events-none"
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
