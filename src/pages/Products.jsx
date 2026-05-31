import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../api/axios';
import ProductTable from '../components/ProductTable';
import Loader from '../components/Loader';
import { Plus, FolderOpen, Search, Filter, ArrowUpDown } from 'lucide-react';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Search & Filter states
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [sortBy, setSortBy] = useState('name-asc');

  const navigate = useNavigate();

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const res = await API.get('/products');
      if (res.data?.success) {
        setProducts(res.data.products);
      }
    } catch (err) {
      console.error(err);
      setError(err.message || 'Failed to fetch products');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleDeleteProduct = async (id) => {
    if (!window.confirm('Are you sure you want to delete this product?')) return;
    try {
      const res = await API.delete(`/products/${id}`);
      if (res.data?.success) {
        setProducts(products.filter(p => p._id !== id));
      }
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || 'Failed to delete product');
    }
  };

  const handleEditProduct = (product) => {
    navigate(`/products/edit/${product._id}`, { state: { product } });
  };

  // --- Filtering & Sorting Core Logic ---
  const filteredAndSortedProducts = products
    .filter((product) => {
      const matchesSearch = 
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (product.sku && product.sku.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (product.description && product.description.toLowerCase().includes(searchTerm.toLowerCase()));

      if (statusFilter === 'all') return matchesSearch;
      if (statusFilter === 'instock') return matchesSearch && product.stock >= 10;
      if (statusFilter === 'lowstock') return matchesSearch && product.stock > 0 && product.stock < 10;
      if (statusFilter === 'outofstock') return matchesSearch && product.stock === 0;
      return matchesSearch;
    })
    .sort((a, b) => {
      if (sortBy === 'name-asc') return a.name.localeCompare(b.name);
      if (sortBy === 'name-desc') return b.name.localeCompare(a.name);
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      if (sortBy === 'stock-asc') return a.stock - b.stock;
      if (sortBy === 'stock-desc') return b.stock - a.stock;
      return 0;
    });

  return (
    <>
      {/* Header Panel */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Active Stock Inventory</h2>
          <p className="text-sm text-[var(--text-secondary)] font-medium">Manage cataloging, SKU assignments, and monitor real-time stock levels.</p>
        </div>
        <button
          onClick={() => navigate('/products/add')}
          className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl gradient-bg text-[#0b0f19] font-bold text-xs hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 shadow-lg cursor-pointer w-fit"
        >
          <Plus className="h-4.5 w-4.5 stroke-[3]" />
          <span>New Catalog Item</span>
        </button>
      </div>

      {/* --- Zoho Style Search & Filtering Controls --- */}
      {!loading && !error && products.length > 0 && (
        <div className="zoho-card flex flex-col md:flex-row gap-4 items-center justify-between">
          {/* Search bar */}
          <div className="relative w-full md:w-80">
            <Search className="absolute left-3.5 top-3.5 h-4 w-4 text-[var(--text-secondary)]" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by Name, SKU, Desc..."
              className="w-full bg-[var(--bg-app)] border border-[var(--border-color)] rounded-xl py-2.5 pl-10 pr-4 text-xs text-[var(--text-primary)] focus:outline-none focus:border-[var(--accent-primary)]/60 transition-all font-semibold"
            />
          </div>

          {/* Filters & Sorting */}
          <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto font-semibold text-xs text-[var(--text-secondary)]">
            {/* Filter by Stock Status */}
            <div className="flex items-center gap-2 bg-[var(--bg-app)] border border-[var(--border-color)] px-3 py-1.5 rounded-xl">
              <Filter className="h-3.5 w-3.5 text-[var(--accent-primary)]" />
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="bg-transparent text-[var(--text-primary)] focus:outline-none cursor-pointer pr-4 font-bold"
              >
                <option value="all">All Stocks</option>
                <option value="instock">In Stock (&ge;10)</option>
                <option value="lowstock">Low Stock (&lt;10)</option>
                <option value="outofstock">Out of Stock (0)</option>
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
                <option value="name-asc">Name (A to Z)</option>
                <option value="name-desc">Name (Z to A)</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="stock-asc">Stock: Low to High</option>
                <option value="stock-desc">Stock: High to Low</option>
              </select>
            </div>
          </div>
        </div>
      )}

      {loading ? (
        <Loader />
      ) : error ? (
        <div className="p-4 rounded-xl border border-red-500/20 bg-red-500/10 text-center text-xs text-red-500">
          {error}
        </div>
      ) : products.length > 0 ? (
        filteredAndSortedProducts.length > 0 ? (
          <ProductTable 
            products={filteredAndSortedProducts} 
            onEdit={handleEditProduct} 
            onDelete={handleDeleteProduct} 
          />
        ) : (
          /* Search Empty State */
          <div className="zoho-card p-12 text-center flex flex-col items-center justify-center max-w-md mx-auto">
            <Search className="h-12 w-12 text-[var(--text-secondary)] mb-3 opacity-60" />
            <h4 className="font-bold text-[var(--text-primary)]">No Matches Found</h4>
            <p className="text-xs text-[var(--text-secondary)] mt-1.5 leading-relaxed">
              No products match your current search queries or filter selectors. Clear some fields and try again.
            </p>
          </div>
        )
      ) : (
        /* Empty State */
        <div className="zoho-card p-12 text-center flex flex-col items-center justify-center max-w-lg mx-auto">
          <FolderOpen className="h-16 w-16 text-[var(--text-secondary)] mb-4 opacity-40" />
          <h4 className="font-bold text-[var(--text-primary)]">Catalog Empty</h4>
          <p className="text-xs text-[var(--text-secondary)] mt-1.5 leading-relaxed">
            No inventory items have been created yet. Click the button above to add your first product catalog.
          </p>
        </div>
      )}
    </>
  );
};

export default Products;
