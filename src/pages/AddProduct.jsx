import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../api/axios';
import { Boxes, Tag, Layers, DollarSign, Image as ImageIcon, AlertTriangle, ArrowLeft } from 'lucide-react';

const AddProduct = () => {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [sku, setSku] = useState('');
  const [price, setPrice] = useState('');
  const [stock, setStock] = useState('');
  const [description, setDescription] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState('');
  const [formSubmitting, setFormSubmitting] = useState(false);
  const [formError, setFormError] = useState('');

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !sku || !price || !stock) {
      return setFormError('Please fill in all required fields.');
    }

    setFormSubmitting(true);
    setFormError('');

    const formData = new FormData();
    formData.append('name', name);
    formData.append('sku', sku);
    formData.append('price', price);
    formData.append('stock', stock);
    formData.append('description', description);
    if (imageFile) {
      formData.append('image', imageFile);
    }

    try {
      const res = await API.post('/products', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      if (res.data?.success) {
        navigate('/products');
      }
    } catch (err) {
      console.error(err);
      setFormError(err.response?.data?.message || err.message || 'Failed to add product');
    } finally {
      setFormSubmitting(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {/* Header and Back Button */}
      <div className="flex items-center gap-4">
        <button
          onClick={() => navigate('/products')}
          className="p-2 rounded-xl border border-gray-800 bg-gray-900/30 hover:bg-gray-800/50 text-gray-400 hover:text-white transition-all"
        >
          <ArrowLeft className="h-4.5 w-4.5" />
        </button>
        <div>
          <h2 className="text-xl font-bold tracking-tight">Catalog New Product</h2>
          <p className="text-xs text-gray-400">Add details to MongoDB and upload images dynamically to Cloudinary.</p>
        </div>
      </div>

      <div className="glass rounded-2xl shadow-xl p-6 md:p-8">
        {formError && (
          <div className="mb-6 flex items-start gap-2.5 p-3 rounded-xl border border-red-500/20 bg-red-500/10 text-xs text-red-400">
            <AlertTriangle className="h-4 w-4 shrink-0 mt-0.5" />
            <span>{formError}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6 text-xs font-semibold">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Product Name */}
            <div className="space-y-1.5">
              <label className="text-gray-400">Product Name *</label>
              <div className="relative">
                <Tag className="absolute left-3.5 top-3.5 h-4 w-4 text-gray-500" />
                <input 
                  type="text" 
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Retina Display Pro"
                  className="w-full bg-[#121826]/60 border border-gray-800 rounded-xl py-3 pl-11 pr-4 text-xs text-gray-200 focus:outline-none focus:border-emerald-500/60 transition-all font-medium"
                />
              </div>
            </div>

            {/* SKU Code */}
            <div className="space-y-1.5">
              <label className="text-gray-400">Unique SKU Code *</label>
              <div className="relative">
                <Layers className="absolute left-3.5 top-3.5 h-4 w-4 text-gray-500" />
                <input 
                  type="text" 
                  required
                  value={sku}
                  onChange={(e) => setSku(e.target.value)}
                  placeholder="e.g. RSD-PRO-09"
                  className="w-full bg-[#121826]/60 border border-gray-800 rounded-xl py-3 pl-11 pr-4 text-xs text-gray-200 focus:outline-none focus:border-emerald-500/60 transition-all font-mono"
                />
              </div>
            </div>

            {/* Price */}
            <div className="space-y-1.5">
              <label className="text-gray-400">Unit Price ($) *</label>
              <div className="relative">
                <DollarSign className="absolute left-3.5 top-3.5 h-4 w-4 text-gray-500" />
                <input 
                  type="number" 
                  step="0.01"
                  required
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  placeholder="e.g. 1599.99"
                  className="w-full bg-[#121826]/60 border border-gray-800 rounded-xl py-3 pl-11 pr-4 text-xs text-gray-200 focus:outline-none focus:border-emerald-500/60 transition-all font-medium"
                />
              </div>
            </div>

            {/* Stock */}
            <div className="space-y-1.5">
              <label className="text-gray-400">Stock Units *</label>
              <div className="relative">
                <Boxes className="absolute left-3.5 top-3.5 h-4 w-4 text-gray-500" />
                <input 
                  type="number" 
                  required
                  value={stock}
                  onChange={(e) => setStock(e.target.value)}
                  placeholder="e.g. 24"
                  className="w-full bg-[#121826]/60 border border-gray-800 rounded-xl py-3 pl-11 pr-4 text-xs text-gray-200 focus:outline-none focus:border-emerald-500/60 transition-all font-medium"
                />
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="space-y-1.5">
            <label className="text-gray-400">Product Description</label>
            <textarea 
              rows="4"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Details regarding hardware features, warranties..."
              className="w-full bg-[#121826]/60 border border-gray-800 rounded-xl p-4 text-xs text-gray-200 focus:outline-none focus:border-emerald-500/60 transition-all font-sans font-medium"
            />
          </div>

          {/* Product Image File */}
          <div className="space-y-2">
            <label className="text-gray-400 block">Product Representation Image</label>
            <div className="flex flex-col sm:flex-row items-center gap-4">
              <div className="flex-1 w-full">
                <label className="flex flex-col items-center justify-center border border-dashed border-gray-800 hover:border-emerald-500/40 rounded-xl p-6 cursor-pointer bg-[#121826]/20 transition-all duration-200 group">
                  <ImageIcon className="h-7 w-7 text-gray-600 group-hover:text-emerald-400 transition-colors mb-2" />
                  <span className="text-[10px] text-gray-400">Select Image File</span>
                  <input 
                    type="file" 
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                  />
                </label>
              </div>
              {imagePreview && (
                <div className="h-24 w-24 rounded-2xl overflow-hidden border border-gray-800 shrink-0">
                  <img src={imagePreview} alt="Preview" className="h-full w-full object-cover" />
                </div>
              )}
            </div>
          </div>

          {/* Form Buttons */}
          <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-800/40">
            <button
              type="button"
              onClick={() => navigate('/products')}
              className="px-4 py-3 rounded-xl border border-gray-800 text-gray-400 hover:text-white hover:bg-gray-800/30 transition-all font-bold"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={formSubmitting}
              className="px-6 py-3 rounded-xl gradient-bg text-[#0b0f19] font-bold hover:scale-[1.01] active:scale-[0.99] transition-all shadow-lg disabled:opacity-50 disabled:pointer-events-none"
            >
              {formSubmitting ? 'Uploading to Cloudinary...' : 'Save Product'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProduct;
