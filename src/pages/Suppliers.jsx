import React, { useState, useEffect } from 'react';
import API from '../api/axios';
import Loader from '../components/Loader';
import { 
  Users, 
  Plus, 
  Trash2, 
  Edit, 
  Mail, 
  Phone, 
  MapPin, 
  User as UserIcon, 
  X, 
  AlertTriangle,
  FolderOpen,
  Search,
  ArrowUpDown
} from 'lucide-react';

const Suppliers = () => {
  const [suppliers, setSuppliers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Search & Sorting States
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('name-asc');

  // Form states
  const [modalOpen, setModalOpen] = useState(false);
  const [editingSupplier, setEditingSupplier] = useState(null);
  const [name, setName] = useState('');
  const [contactPerson, setContactPerson] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  
  const [formSubmitting, setFormSubmitting] = useState(false);
  const [formError, setFormError] = useState('');

  const fetchSuppliers = async () => {
    try {
      setLoading(true);
      const res = await API.get('/suppliers');
      if (res.data?.success) {
        setSuppliers(res.data.suppliers);
      }
    } catch (err) {
      console.error(err);
      setError(err.message || 'Failed to fetch suppliers');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSuppliers();
  }, []);

  const resetForm = () => {
    setName('');
    setContactPerson('');
    setEmail('');
    setPhone('');
    setAddress('');
    setEditingSupplier(null);
    setFormError('');
  };

  const handleOpenAddModal = () => {
    resetForm();
    setModalOpen(true);
  };

  const handleOpenEditModal = (supplier) => {
    setEditingSupplier(supplier);
    setName(supplier.name);
    setContactPerson(supplier.contactPerson || '');
    setEmail(supplier.email);
    setPhone(supplier.phone || '');
    setAddress(supplier.address || '');
    setFormError('');
    setModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !email) {
      return setFormError('Name and Email are required fields.');
    }

    setFormSubmitting(true);
    setFormError('');

    const supplierData = { name, contactPerson, email, phone, address };

    try {
      if (editingSupplier) {
        // Update Supplier
        const res = await API.put(`/suppliers/${editingSupplier._id}`, supplierData);
        if (res.data?.success) {
          setSuppliers(suppliers.map(s => s._id === editingSupplier._id ? res.data.supplier : s));
          setModalOpen(false);
          resetForm();
        }
      } else {
        // Create Supplier
        const res = await API.post('/suppliers', supplierData);
        if (res.data?.success) {
          setSuppliers([res.data.supplier, ...suppliers]);
          setModalOpen(false);
          resetForm();
        }
      }
    } catch (err) {
      console.error(err);
      setFormError(err.response?.data?.message || err.message || 'Failed to save supplier details.');
    } finally {
      setFormSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to remove this supplier registry?')) return;
    try {
      const res = await API.delete(`/suppliers/${id}`);
      if (res.data?.success) {
        setSuppliers(suppliers.filter(s => s._id !== id));
      }
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || 'Failed to remove supplier.');
    }
  };

  // --- Filtering & Sorting Core Logic ---
  const filteredAndSortedSuppliers = suppliers
    .filter((s) => {
      const term = searchTerm.toLowerCase();
      return (
        s.name.toLowerCase().includes(term) ||
        (s.contactPerson && s.contactPerson.toLowerCase().includes(term)) ||
        s.email.toLowerCase().includes(term) ||
        (s.phone && s.phone.toLowerCase().includes(term)) ||
        (s.address && s.address.toLowerCase().includes(term))
      );
    })
    .sort((a, b) => {
      if (sortBy === 'name-asc') return a.name.localeCompare(b.name);
      if (sortBy === 'name-desc') return b.name.localeCompare(a.name);
      if (sortBy === 'contact-asc') return (a.contactPerson || '').localeCompare(b.contactPerson || '');
      if (sortBy === 'contact-desc') return (b.contactPerson || '').localeCompare(a.contactPerson || '');
      return 0;
    });

  return (
    <>
      {/* Header Panel */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Suppliers Registry</h2>
          <p className="text-sm text-[var(--text-secondary)] font-medium">Manage business supplier profiles, contact representatives, and logistics addresses.</p>
        </div>
        <button
          onClick={handleOpenAddModal}
          className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl gradient-bg text-[#0b0f19] font-bold text-xs hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 shadow-lg cursor-pointer w-fit"
        >
          <Plus className="h-4.5 w-4.5 stroke-[3]" />
          <span>New Supplier</span>
        </button>
      </div>

      {/* --- Search & Sort Bar --- */}
      {!loading && !error && suppliers.length > 0 && (
        <div className="zoho-card flex flex-col md:flex-row gap-4 items-center justify-between">
          {/* Search bar */}
          <div className="relative w-full md:w-80">
            <Search className="absolute left-3.5 top-3.5 h-4 w-4 text-[var(--text-secondary)]" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search suppliers by name, email..."
              className="w-full bg-[var(--bg-app)] border border-[var(--border-color)] rounded-xl py-2.5 pl-10 pr-4 text-xs text-[var(--text-primary)] focus:outline-none focus:border-[var(--accent-primary)]/60 transition-all font-semibold"
            />
          </div>

          {/* Sort Menu */}
          <div className="flex items-center gap-2 bg-[var(--bg-app)] border border-[var(--border-color)] px-3 py-1.5 rounded-xl font-semibold text-xs text-[var(--text-secondary)] w-full md:w-auto">
            <ArrowUpDown className="h-3.5 w-3.5 text-[var(--accent-primary)]" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-transparent text-[var(--text-primary)] focus:outline-none cursor-pointer pr-4 font-bold"
            >
              <option value="name-asc">Company: A to Z</option>
              <option value="name-desc">Company: Z to A</option>
              <option value="contact-asc">Representative: A to Z</option>
              <option value="contact-desc">Representative: Z to A</option>
            </select>
          </div>
        </div>
      )}

      {loading ? (
        <Loader />
      ) : error ? (
        <div className="p-4 rounded-xl border border-red-500/20 bg-red-500/10 text-center text-xs text-red-500">
          {error}
        </div>
      ) : suppliers.length > 0 ? (
        filteredAndSortedSuppliers.length > 0 ? (
          /* --- SUPPLIERS DECK LAYOUT --- */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredAndSortedSuppliers.map((supplier) => (
              <div 
                key={supplier._id}
                className="zoho-card flex flex-col justify-between relative overflow-hidden group hover:border-[var(--accent-primary)]/30 min-h-[220px]"
              >
                {/* Top Accent background glow */}
                <div className="absolute top-0 right-0 h-24 w-24 rounded-full bg-[var(--accent-primary)]/5 blur-2xl pointer-events-none group-hover:scale-125 transition-transform" />
                
                <div className="space-y-4">
                  {/* Brand Header */}
                  <div className="flex items-start gap-3">
                    <div className="h-10 w-10 rounded-xl bg-[var(--accent-primary)]/10 flex items-center justify-center text-[var(--accent-primary)] shrink-0 shadow-sm border border-[var(--accent-primary)]/10">
                      <Users className="h-5 w-5" />
                    </div>
                    <div className="truncate flex-1">
                      <h4 className="font-bold text-[var(--text-primary)] truncate group-hover:text-[var(--accent-primary)] transition-colors leading-tight">{supplier.name}</h4>
                      {supplier.contactPerson && (
                        <p className="text-[10px] text-[var(--text-secondary)] font-bold tracking-wide uppercase flex items-center gap-1 mt-1">
                          <UserIcon className="h-3 w-3" />
                          <span>REP: {supplier.contactPerson}</span>
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Body Details */}
                  <div className="space-y-2 text-xs font-semibold text-[var(--text-secondary)] border-t border-[var(--border-color)]/40 pt-3">
                    <div className="flex items-center gap-2.5">
                      <Mail className="h-4 w-4 text-[var(--text-secondary)] opacity-60 shrink-0" />
                      <span className="truncate text-[var(--text-primary)]">{supplier.email}</span>
                    </div>
                    {supplier.phone && (
                      <div className="flex items-center gap-2.5">
                        <Phone className="h-4 w-4 text-[var(--text-secondary)] opacity-60 shrink-0" />
                        <span className="text-[var(--text-primary)]">{supplier.phone}</span>
                      </div>
                    )}
                    {supplier.address && (
                      <div className="flex items-start gap-2.5">
                        <MapPin className="h-4 w-4 text-[var(--text-secondary)] opacity-60 shrink-0 mt-0.5" />
                        <span className="line-clamp-2 font-semibold text-[var(--text-primary)] leading-relaxed">{supplier.address}</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Action Buttons Footer */}
                <div className="pt-4 mt-4 border-t border-[var(--border-color)]/60 flex items-center justify-end gap-2">
                  <button
                    onClick={() => handleOpenEditModal(supplier)}
                    className="p-2 rounded-lg border border-[var(--border-color)] text-[var(--text-secondary)] hover:text-emerald-500 hover:bg-emerald-500/10 hover:border-emerald-500/20 transition-all duration-200 cursor-pointer"
                    title="Edit Supplier"
                  >
                    <Edit className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(supplier._id)}
                    className="p-2 rounded-lg border border-[var(--border-color)] text-[var(--text-secondary)] hover:text-red-500 hover:bg-red-500/10 hover:border-red-500/20 transition-all duration-200 cursor-pointer"
                    title="Remove Supplier"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* Search Empty State */
          <div className="zoho-card p-12 text-center flex flex-col items-center justify-center max-w-md mx-auto">
            <Search className="h-12 w-12 text-[var(--text-secondary)] mb-3 opacity-60" />
            <h4 className="font-bold text-[var(--text-primary)]">No Matches Found</h4>
            <p className="text-xs text-[var(--text-secondary)] mt-1.5 leading-relaxed">
              No suppliers matched your search query. Clear the fields and try again.
            </p>
          </div>
        )
      ) : (
        /* Empty State */
        <div className="zoho-card p-12 text-center flex flex-col items-center justify-center max-w-lg mx-auto">
          <FolderOpen className="h-16 w-16 text-[var(--text-secondary)] mb-4 opacity-40" />
          <h4 className="font-bold text-[var(--text-primary)]">Registry Empty</h4>
          <p className="text-xs text-[var(--text-secondary)] mt-1.5 leading-relaxed">
            No supplier accounts have been cataloged yet. Click the button above to register your first business vendor.
          </p>
        </div>
      )}

      {/* --- ADD / EDIT SUPPLIER MODAL DIALOG --- */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-sm p-4 overflow-y-auto font-sans">
          <div className="w-full max-w-lg glass rounded-2xl shadow-2xl p-6 md:p-8 animate-fade-in relative">
            {/* Close Button */}
            <button 
              onClick={() => { setModalOpen(false); resetForm(); }}
              className="absolute top-4 right-4 p-1.5 rounded-lg border border-[var(--border-color)] bg-gray-500/10 hover:bg-gray-500/20 text-[var(--text-secondary)] hover:text-[var(--text-primary)] cursor-pointer"
            >
              <X className="h-4.5 w-4.5" />
            </button>

            <div className="flex items-center gap-3 mb-6">
              <div className="h-9 w-9 rounded-xl bg-[var(--accent-primary)]/10 flex items-center justify-center text-[var(--accent-primary)] border border-[var(--accent-primary)]/10 shadow-sm">
                <Users className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-bold text-lg text-[var(--text-primary)]">
                  {editingSupplier ? 'Modify Supplier Registry' : 'Register New Supplier'}
                </h3>
                <p className="text-xs text-[var(--text-secondary)] font-medium">Store and sync vendor details securely in our database.</p>
              </div>
            </div>

            {formError && (
              <div className="mb-6 flex items-start gap-2.5 p-3 rounded-xl border border-red-500/20 bg-red-500/10 text-xs text-red-500">
                <AlertTriangle className="h-4 w-4 shrink-0 mt-0.5" />
                <span>{formError}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4 text-xs font-semibold">
              {/* Supplier/Company Name */}
              <div className="space-y-1.5">
                <label className="text-[var(--text-secondary)]">Company Name *</label>
                <input 
                  type="text" 
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Acme Microelectronics Corp"
                  className="w-full bg-[var(--bg-app)] border border-[var(--border-color)] rounded-xl py-3 px-4 text-xs text-[var(--text-primary)] focus:outline-none focus:border-[var(--accent-primary)]/60 transition-all font-semibold"
                />
              </div>

              {/* Representative / Contact Person */}
              <div className="space-y-1.5">
                <label className="text-[var(--text-secondary)]">Contact Representative Name</label>
                <div className="relative">
                  <UserIcon className="absolute left-3.5 top-3.5 h-4 w-4 text-[var(--text-secondary)] opacity-60" />
                  <input 
                    type="text" 
                    value={contactPerson}
                    onChange={(e) => setContactPerson(e.target.value)}
                    placeholder="e.g. Sarah Jenkins"
                    className="w-full bg-[var(--bg-app)] border border-[var(--border-color)] rounded-xl py-3 pl-11 pr-4 text-xs text-[var(--text-primary)] focus:outline-none focus:border-[var(--accent-primary)]/60 transition-all font-semibold"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Email */}
                <div className="space-y-1.5">
                  <label className="text-[var(--text-secondary)]">Email Address *</label>
                  <div className="relative">
                    <Mail className="absolute left-3.5 top-3.5 h-4 w-4 text-[var(--text-secondary)] opacity-60" />
                    <input 
                      type="email" 
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="e.g. contact@acme.com"
                      className="w-full bg-[var(--bg-app)] border border-[var(--border-color)] rounded-xl py-3 pl-11 pr-4 text-xs text-[var(--text-primary)] focus:outline-none focus:border-[var(--accent-primary)]/60 transition-all font-semibold"
                    />
                  </div>
                </div>

                {/* Phone */}
                <div className="space-y-1.5">
                  <label className="text-[var(--text-secondary)]">Phone Number</label>
                  <div className="relative">
                    <Phone className="absolute left-3.5 top-3.5 h-4 w-4 text-[var(--text-secondary)] opacity-60" />
                    <input 
                      type="text" 
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="e.g. +1 (555) 304-9844"
                      className="w-full bg-[var(--bg-app)] border border-[var(--border-color)] rounded-xl py-3 pl-11 pr-4 text-xs text-[var(--text-primary)] focus:outline-none focus:border-[var(--accent-primary)]/60 transition-all font-semibold"
                    />
                  </div>
                </div>
              </div>

              {/* Physical Address */}
              <div className="space-y-1.5">
                <label className="text-[var(--text-secondary)]">Logistics / Business Address</label>
                <textarea 
                  rows="3"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="e.g. 102 Shipping Dock East, Industrial Park, Seattle WA"
                  className="w-full bg-[var(--bg-app)] border border-[var(--border-color)] rounded-xl p-4 text-xs text-[var(--text-primary)] focus:outline-none focus:border-[var(--accent-primary)]/60 transition-all font-sans font-semibold"
                />
              </div>

              {/* Form Buttons */}
              <div className="flex items-center justify-end gap-3 pt-4 border-t border-[var(--border-color)]">
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
                  className="px-6 py-3 rounded-xl gradient-bg text-[#0b0f19] font-extrabold hover:scale-[1.01] active:scale-[0.99] transition-all shadow-lg cursor-pointer disabled:opacity-50 disabled:pointer-events-none"
                >
                  {formSubmitting ? 'Saving Details...' : editingSupplier ? 'Update Supplier' : 'Register Supplier'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default Suppliers;
