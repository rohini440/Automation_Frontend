import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { Menu, Boxes, User, Sun, Moon } from 'lucide-react';

const Navbar = ({ onMenuToggle }) => {
  const { user } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();

  // Determine current page title
  const getPageTitle = () => {
    switch (location.pathname) {
      case '/dashboard':
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
    <header className="h-16 md:h-20 flex items-center justify-between px-6 md:px-8 glass border-b border-[var(--border-color)] z-30 shrink-0">
      {/* Page Title for Desktop, Brand logo/menu for mobile */}
      <div className="flex items-center gap-3">
        {/* Mobile menu toggle */}
        <button
          onClick={onMenuToggle}
          className="md:hidden p-1.5 rounded-lg border border-[var(--border-color)] bg-gray-900/10 hover:bg-gray-800/20 text-[var(--text-secondary)]"
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
          <h2 className="text-xl font-bold tracking-tight text-[var(--text-primary)]">{getPageTitle()}</h2>
          <p className="text-xs text-[var(--text-secondary)] font-medium">Inventory & Invoicing Dashboard</p>
        </div>
      </div>

      {/* User Quick Info & Utilities */}
      <div className="flex items-center gap-4">
        {user && (
          <div className="hidden sm:flex flex-col text-right">
            <span className="text-xs font-semibold text-[var(--text-primary)]">{user.name}</span>
            <span className="text-[9px] text-[var(--accent-primary)] font-bold uppercase tracking-wider">Active Session</span>
          </div>
        )}
        
        {/* Theme Toggle Button */}
        <button
          onClick={toggleTheme}
          className="h-9 w-9 rounded-xl border border-[var(--border-color)] bg-gray-500/5 flex items-center justify-center hover:border-[var(--accent-primary)]/40 hover:bg-[var(--accent-primary)]/5 transition-all duration-200 cursor-pointer shadow-sm"
          title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} Mode`}
        >
          {theme === 'dark' ? (
            <Sun className="h-4.5 w-4.5 text-amber-400 animate-spin-slow" />
          ) : (
            <Moon className="h-4.5 w-4.5 text-slate-700" />
          )}
        </button>
        
        <Link 
          to="/profile" 
          className="h-9 w-9 rounded-xl bg-gray-500/5 border border-[var(--border-color)] flex items-center justify-center text-[var(--accent-primary)] hover:border-[var(--accent-primary)]/40 hover:bg-[var(--accent-primary)]/5 transition-all duration-200"
        >
          <User className="h-4.5 w-4.5" />
        </Link>
      </div>
    </header>
  );
};

export default Navbar;

