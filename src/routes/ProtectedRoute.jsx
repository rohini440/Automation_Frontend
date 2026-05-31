import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Loader from '../components/Loader';

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return <Loader fullPage={true} />;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (user.setupCompleted === false) {
    return <Navigate to="/setup" replace />;
  }

  return children;
};

export default ProtectedRoute;
