import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { 
  LayoutDashboard, 
  Boxes, 
  FileText, 
  LogOut, 
  Users, 
  User as UserIcon,
  X
} from 'lucide-react';

const Sidebar = ({ mobileOpen, setMobileOpen }) => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const menuItems = [
    { name: 'Dashboard', path: '/', icon: LayoutDashboard },
    { name: 'Inventory', path: '/products', icon: Boxes },
    { name: 'Suppliers', path: '/suppliers', icon: Users },
    { name: 'Invoices', path: '/invoices', icon: FileText },
    { name: 'Profile', path: '/profile', icon: UserIcon },
  ];

  const handleLogout = () => {
    logout();
    setMobileOpen(false);
    navigate('/login');
  };

  const activeLinkClass = 'gradient-bg text-[#0b0f19] font-semibold shadow-lg shadow-emerald-500/10';
  const inactiveLinkClass = 'text-gray-400 hover:text-white hover:bg-gray-800/40';

  const renderNavLinks = (closeMobile = false) => (
    <nav className="flex-1 p-4 space-y-1">
      {menuItems.map((item) => {
        const Icon = item.icon;
        const isActive = location.pathname === item.path;
        return (
          <Link
            key={item.name}
            to={item.path}
            onClick={() => closeMobile && setMobileOpen(false)}
            className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group ${
              isActive ? activeLinkClass : inactiveLinkClass
            }`}
          >
            <Icon className={`h-5 w-5 transition-transform duration-200 group-hover:scale-110 ${
              isActive ? 'text-[#0b0f19]' : 'text-gray-400 group-hover:text-white'
            }`} />
            <span>{item.name}</span>
          </Link>
        );
      })}
    </nav>
  );

  return (
    <>
      {/* --- DESKTOP SIDEBAR --- */}
      <aside className="hidden md:flex flex-col w-64 glass border-r border-gray-800 shrink-0">
        {/* Brand Logo */}
        <div className="p-6 border-b border-gray-800 flex items-center gap-3">
          <div className="h-9 w-9 rounded-xl gradient-bg flex items-center justify-center shadow-lg shadow-emerald-500/20">
            <Boxes className="h-5 w-5 text-[#0b0f19]" />
          </div>
          <div>
            <h1 className="text-md font-bold tracking-wider uppercase leading-none">Antigravity</h1>
            <span className="text-[10px] text-emerald-500 font-semibold tracking-widest uppercase">Inventory</span>
          </div>
        </div>

        {/* Navigation Menu */}
        {renderNavLinks(false)}

        {/* User Info & Logout */}
        <div className="p-4 border-t border-gray-800 space-y-3 bg-gray-900/10">
          <Link to="/profile" className="flex items-center gap-3 px-2 py-1 group">
            <div className="h-10 w-10 rounded-full bg-gray-800 border border-gray-700 flex items-center justify-center text-emerald-500 font-bold uppercase shadow-inner group-hover:border-emerald-500/30 transition-colors">
              {user?.name ? user.name[0] : <UserIcon className="h-5 w-5" />}
            </div>
            <div className="truncate flex-1">
              <p className="text-xs font-semibold text-gray-200 truncate group-hover:text-emerald-400 transition-colors">{user?.name || 'Administrator'}</p>
              <p className="text-[10px] text-gray-500 truncate">{user?.email || 'admin@inventory.com'}</p>
            </div>
          </Link>
          <button
            onClick={handleLogout}
            className="flex w-full items-center gap-3 px-4 py-2.5 text-xs rounded-xl border border-red-500/20 text-red-400 hover:text-white hover:bg-red-500/10 transition-all duration-200 font-medium"
          >
            <LogOut className="h-4 w-4" />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* --- MOBILE SIDEBAR DRAWER OVERLAY --- */}
      {mobileOpen && (
        <div className="md:hidden fixed inset-0 z-50 flex bg-black/60 backdrop-blur-sm animate-fade-in">
          <div className="flex flex-col w-64 h-full bg-[#0b0f19] border-r border-gray-800 p-6 space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-gray-800">
              <div className="flex items-center gap-3">
                <div className="h-8 w-8 rounded-lg gradient-bg flex items-center justify-center">
                  <Boxes className="h-4 w-4 text-[#0b0f19]" />
                </div>
                <span className="font-bold tracking-wider text-sm uppercase">Antigravity</span>
              </div>
              <button 
                onClick={() => setMobileOpen(false)}
                className="p-1 rounded-lg border border-gray-800 bg-gray-900/30 hover:bg-gray-800/50"
              >
                <X className="h-4.5 w-4.5" />
              </button>
            </div>

            {/* Navigation Menu */}
            {renderNavLinks(true)}

            {/* User Info & Logout */}
            <div className="border-t border-gray-800 pt-4 space-y-3">
              <Link 
                to="/profile" 
                onClick={() => setMobileOpen(false)}
                className="flex items-center gap-3"
              >
                <div className="h-8 w-8 rounded-full bg-gray-800 flex items-center justify-center text-emerald-500 font-bold uppercase">
                  {user?.name ? user.name[0] : 'A'}
                </div>
                <div className="truncate">
                  <p className="text-xs font-semibold text-gray-200 truncate">{user?.name}</p>
                  <p className="text-[10px] text-gray-500 truncate">{user?.email}</p>
                </div>
              </Link>
              <button
                onClick={handleLogout}
                className="flex w-full items-center justify-center gap-2 px-4 py-2.5 text-xs rounded-xl border border-red-500/20 text-red-400 hover:text-white hover:bg-red-500/10 transition-all duration-200"
              >
                <LogOut className="h-4 w-4" />
                <span>Sign Out</span>
              </button>
            </div>
          </div>
          <div className="flex-1" onClick={() => setMobileOpen(false)} />
        </div>
      )}
    </>
  );
};

export default Sidebar;
