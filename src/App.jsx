import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import ProtectedRoute from './routes/ProtectedRoute';
import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';

// Pages
import Login from './pages/Login';
import Register from './pages/Register';
import LandingPage from './pages/LandingPage';
import QuickSetup from './pages/QuickSetup';
import Dashboard from './pages/Dashboard';
import Products from './pages/Products';
import AddProduct from './pages/AddProduct';
import EditProduct from './pages/EditProduct';
import Suppliers from './pages/Suppliers';
import Invoices from './pages/Invoices';
import Profile from './pages/Profile';

const DashboardLayout = ({ children }) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  return (
    <div className="flex min-h-screen bg-[var(--bg-app)] text-[var(--text-primary)] font-sans transition-colors duration-300">
      <Sidebar mobileOpen={mobileOpen} setMobileOpen={setMobileOpen} />
      <div className="flex flex-col flex-1 min-w-0">
        <Navbar onMenuToggle={() => setMobileOpen(!mobileOpen)} />
        <main className="flex-1 overflow-y-auto px-6 py-8 md:px-8 md:py-10">
          <div className="max-w-7xl mx-auto space-y-8 animate-fade-in">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/setup" element={<QuickSetup />} />

        {/* Protected Dashboard/Inventory Routes */}
        <Route 
          path="/dashboard" 
          element={
            <ProtectedRoute>
              <DashboardLayout>
                <Dashboard />
              </DashboardLayout>
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/products" 
          element={
            <ProtectedRoute>
              <DashboardLayout>
                <Products />
              </DashboardLayout>
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/products/add" 
          element={
            <ProtectedRoute>
              <DashboardLayout>
                <AddProduct />
              </DashboardLayout>
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/products/edit/:id" 
          element={
            <ProtectedRoute>
              <DashboardLayout>
                <EditProduct />
              </DashboardLayout>
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/suppliers" 
          element={
            <ProtectedRoute>
              <DashboardLayout>
                <Suppliers />
              </DashboardLayout>
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/invoices" 
          element={
            <ProtectedRoute>
              <DashboardLayout>
                <Invoices />
              </DashboardLayout>
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/profile" 
          element={
            <ProtectedRoute>
              <DashboardLayout>
                <Profile />
              </DashboardLayout>
            </ProtectedRoute>
          } 
        />

        {/* Catch-all redirect */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
