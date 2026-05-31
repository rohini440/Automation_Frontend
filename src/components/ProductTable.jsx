import React from 'react';
import { Trash2, Edit, AlertTriangle, CheckCircle, XCircle } from 'lucide-react';

const ProductTable = ({ products, onEdit, onDelete }) => {
  return (
    <div className="glass rounded-2xl shadow-xl overflow-hidden border border-gray-800/40">
      <div className="overflow-x-auto">
        {products.length > 0 ? (
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-gray-900/30 border-b border-gray-800 text-gray-400 font-semibold">
                <th className="p-4 pl-6">Product</th>
                <th className="p-4">SKU</th>
                <th className="p-4 text-right">Price</th>
                <th className="p-4 text-right">Stock</th>
                <th className="p-4 text-center">Status</th>
                <th className="p-4 pr-6 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800/40 text-gray-300">
              {products.map((product) => {
                let statusLabel = 'In Stock';
                let statusClass = 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20';
                let StatusIcon = CheckCircle;

                if (product.stock === 0) {
                  statusLabel = 'Out of Stock';
                  statusClass = 'bg-red-500/10 text-red-400 border-red-500/20';
                  StatusIcon = XCircle;
                } else if (product.stock < 10) {
                  statusLabel = 'Low Stock';
                  statusClass = 'bg-amber-500/10 text-amber-400 border-amber-500/20';
                  StatusIcon = AlertTriangle;
                }

                return (
                  <tr key={product._id} className="hover:bg-gray-800/10 transition-colors">
                    {/* Product Image & Name */}
                    <td className="p-4 pl-6">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-lg overflow-hidden bg-gray-950/40 border border-gray-800 flex items-center justify-center shrink-0">
                          {product.imageUrl ? (
                            <img src={product.imageUrl} alt={product.name} className="h-full w-full object-cover" />
                          ) : (
                            <span className="text-xs text-gray-600 font-bold uppercase">{product.name[0]}</span>
                          )}
                        </div>
                        <div>
                          <p className="font-bold text-gray-200">{product.name}</p>
                          <p className="text-[10px] text-gray-500 font-medium truncate max-w-xs">{product.description || 'No description cataloged.'}</p>
                        </div>
                      </div>
                    </td>

                    {/* SKU */}
                    <td className="p-4 font-mono font-semibold text-emerald-400">{product.sku}</td>

                    {/* Price */}
                    <td className="p-4 text-right font-extrabold text-emerald-400">${product.price.toFixed(2)}</td>

                    {/* Stock */}
                    <td className="p-4 text-right font-bold">{product.stock} units</td>

                    {/* Status */}
                    <td className="p-4 text-center">
                      <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold tracking-wide uppercase border ${statusClass}`}>
                        <StatusIcon className="h-3 w-3" />
                        {statusLabel}
                      </span>
                    </td>

                    {/* Actions */}
                    <td className="p-4 pr-6 text-center">
                      <div className="flex items-center justify-center gap-2">
                        <button
                          onClick={() => onEdit(product)}
                          className="p-1.5 rounded-lg border border-gray-800 text-gray-400 hover:text-emerald-400 hover:bg-emerald-500/10 hover:border-emerald-500/20 transition-all duration-200"
                          title="Edit Product"
                        >
                          <Edit className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => onDelete(product._id)}
                          className="p-1.5 rounded-lg border border-gray-800 text-gray-400 hover:text-red-400 hover:bg-red-500/10 hover:border-red-500/20 transition-all duration-200"
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
          <div className="p-8 text-center text-xs text-gray-500">No inventory products available.</div>
        )}
      </div>
    </div>
  );
};

export default ProductTable;
