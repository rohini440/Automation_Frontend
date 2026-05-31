import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Menu, Boxes, User } from 'lucide-react';

const Navbar = ({ onMenuToggle }) => {
  const { user } = useAuth();
  const location = useLocation();

  // Determine current page title
  const getPageTitle = () => {
    switch (location.pathname) {
      case '/':
        return 'Analytical Overview';
      case '/products':
        return 'Stock Inventory';
      case '/products/add':
        return 'Add New Product';
      case '/products/edit':
        return 'Edit Catalog Item';
      case '/suppliers':
        return 'Suppliers Registry';
      case '/invoices':
        return 'Invoices Ledger';
      case '/profile':
        return 'User Account';
      default:
        return 'Dashboard';
    }
  };

  return (
    <header className="h-16 md:h-20 flex items-center justify-between px-6 md:px-8 glass border-b border-gray-800/40 z-30 shrink-0">
      {/* Page Title for Desktop, Brand logo/menu for mobile */}
      <div className="flex items-center gap-3">
        {/* Mobile menu toggle */}
        <button
          onClick={onMenuToggle}
          className="md:hidden p-1.5 rounded-lg border border-gray-800 bg-gray-900/30 hover:bg-gray-800/50 text-gray-400"
        >
          <Menu className="h-5 w-5" />
        </button>

        {/* Mobile brand branding */}
        <div className="flex md:hidden items-center gap-2">
          <div className="h-7 w-7 rounded-lg gradient-bg flex items-center justify-center">
            <Boxes className="h-4 w-4 text-[#0b0f19]" />
          </div>
          <span className="font-bold text-xs uppercase tracking-wider">Antigravity</span>
        </div>

        {/* Desktop Title */}
        <div className="hidden md:block">
          <h2 className="text-xl font-bold tracking-tight text-gray-100">{getPageTitle()}</h2>
          <p className="text-xs text-gray-400">Inventory & Invoicing Dashboard</p>
        </div>
      </div>

      {/* User Quick Info */}
      <div className="flex items-center gap-4">
        {user && (
          <div className="hidden sm:flex flex-col text-right">
            <span className="text-xs font-semibold text-gray-200">{user.name}</span>
            <span className="text-[9px] text-emerald-500 font-bold uppercase tracking-wider">Active Session</span>
          </div>
        )}
        
        <Link 
          to="/profile" 
          className="h-9 w-9 rounded-full bg-gray-900/40 border border-gray-800 flex items-center justify-center text-emerald-500 hover:border-emerald-500/20 hover:bg-emerald-500/5 transition-all duration-200"
        >
          <User className="h-4.5 w-4.5" />
        </Link>
      </div>
    </header>
  );
};

export default Navbar;
