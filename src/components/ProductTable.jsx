import React from 'react';
import { Trash2, Edit, AlertTriangle, CheckCircle, XCircle } from 'lucide-react';

const ProductTable = ({ products, onEdit, onDelete }) => {
  return (
    <div className="zoho-card !p-0 overflow-hidden border border-[var(--border-color)]">
      <div className="overflow-x-auto">
        {products.length > 0 ? (
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-gray-500/5 border-b border-[var(--border-color)] text-[var(--text-secondary)] font-bold">
                <th className="p-4 pl-6 uppercase tracking-wider">Product</th>
                <th className="p-4 uppercase tracking-wider">SKU</th>
                <th className="p-4 text-right uppercase tracking-wider">Price</th>
                <th className="p-4 text-right uppercase tracking-wider">Stock</th>
                <th className="p-4 text-center uppercase tracking-wider">Status</th>
                <th className="p-4 pr-6 text-center uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--border-color)] text-[var(--text-primary)] font-medium">
              {products.map((product) => {
                let statusLabel = 'In Stock';
                let statusClass = 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20';
                let StatusIcon = CheckCircle;

                if (product.stock === 0) {
                  statusLabel = 'Out of Stock';
                  statusClass = 'bg-red-500/10 text-red-500 border-red-500/20';
                  StatusIcon = XCircle;
                } else if (product.stock < 10) {
                  statusLabel = 'Low Stock';
                  statusClass = 'bg-amber-500/10 text-amber-500 border-amber-500/20';
                  StatusIcon = AlertTriangle;
                }

                return (
                  <tr key={product._id} className="hover:bg-gray-500/5 transition-colors">
                    {/* Product Image & Name */}
                    <td className="p-4 pl-6">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-xl overflow-hidden bg-[var(--bg-app)] border border-[var(--border-color)] flex items-center justify-center shrink-0">
                          {product.imageUrl ? (
                            <img src={product.imageUrl} alt={product.name} className="h-full w-full object-cover" />
                          ) : (
                            <span className="text-xs text-[var(--text-secondary)] font-bold uppercase">{product.name[0]}</span>
                          )}
                        </div>
                        <div>
                          <p className="font-bold text-[var(--text-primary)]">{product.name}</p>
                          <p className="text-[10px] text-[var(--text-secondary)] font-semibold truncate max-w-xs">{product.description || 'No description cataloged.'}</p>
                        </div>
                      </div>
                    </td>

                    {/* SKU */}
                    <td className="p-4 font-mono font-bold text-[var(--accent-primary)]">{product.sku}</td>

                    {/* Price */}
                    <td className="p-4 text-right font-mono font-extrabold text-[var(--text-primary)]">${product.price.toFixed(2)}</td>

                    {/* Stock */}
                    <td className="p-4 text-right font-extrabold text-[var(--text-primary)]">{product.stock} <span className="text-[10px] text-[var(--text-secondary)] font-bold uppercase">units</span></td>

                    {/* Status */}
                    <td className="p-4 text-center">
                      <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold tracking-wide uppercase border ${statusClass}`}>
                        <StatusIcon className="h-3 w-3" />
                        <span>{statusLabel}</span>
                      </span>
                    </td>

                    {/* Actions */}
                    <td className="p-4 pr-6 text-center">
                      <div className="flex items-center justify-center gap-2">
                        <button
                          onClick={() => onEdit(product)}
                          className="p-1.5 rounded-lg border border-[var(--border-color)] text-[var(--text-secondary)] hover:text-emerald-500 hover:bg-emerald-500/10 hover:border-emerald-500/20 transition-all duration-200 cursor-pointer"
                          title="Edit Product"
                        >
                          <Edit className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => onDelete(product._id)}
                          className="p-1.5 rounded-lg border border-[var(--border-color)] text-[var(--text-secondary)] hover:text-red-500 hover:bg-red-500/10 hover:border-red-500/20 transition-all duration-200 cursor-pointer"
                          title="Delete Product"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        ) : (
          <div className="p-8 text-center text-xs text-[var(--text-secondary)]">No inventory products available.</div>
        )}
      </div>
    </div>
  );
};

export default ProductTable;
