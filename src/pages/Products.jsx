import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../api/axios';
import ProductTable from '../components/ProductTable';
import Loader from '../components/Loader';
import { Plus, FolderOpen } from 'lucide-react';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
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

  return (
    <>
      {/* Header Panel */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Active Stock Inventory</h2>
          <p className="text-sm text-gray-400">Manage cataloging, SKU assignments, and monitor real-time stock levels.</p>
        </div>
        <button
          onClick={() => navigate('/products/add')}
          className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl gradient-bg text-[#0b0f19] font-bold text-xs hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 shadow-lg shadow-emerald-500/10 w-fit"
        >
          <Plus className="h-4.5 w-4.5 stroke-[3]" />
          <span>New Catalog Item</span>
        </button>
      </div>

      {loading ? (
        <Loader />
      ) : error ? (
        <div className="p-4 rounded-xl border border-red-500/20 bg-red-500/10 text-center text-xs text-red-400">
          {error}
        </div>
      ) : products.length > 0 ? (
        <ProductTable 
          products={products} 
          onEdit={handleEditProduct} 
          onDelete={handleDeleteProduct} 
        />
      ) : (
        /* Empty State */
        <div className="glass p-12 rounded-2xl shadow-xl flex flex-col items-center justify-center text-center max-w-lg mx-auto">
          <FolderOpen className="h-16 w-16 text-gray-700 mb-4" />
          <h4 className="font-bold text-gray-300">Catalog Empty</h4>
          <p className="text-xs text-gray-500 mt-1.5 leading-relaxed">
            No inventory items have been created yet. Click the button above to add your first product catalog.
          </p>
        </div>
      )}
    </>
  );
};

export default Products;
