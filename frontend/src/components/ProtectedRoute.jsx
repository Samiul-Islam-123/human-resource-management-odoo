import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export const ProtectedRoute = ({ allowedRoles }) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-DEFAULT"></div>
      </div>
    );
  }

  // Not logged in
  if (!user) {
    // Determine which login page to send them to based on where they tried to go
    if (location.pathname.startsWith('/admin')) {
      return <Navigate to="/admin/login" state={{ from: location }} replace />;
    }
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Logged in, but wrong role
  if (allowedRoles && !allowedRoles.includes(user.role)) {
    // If they are an employee trying to access admin, send to employee dashboard
    if (user.role === 'employee') {
      return <Navigate to="/" replace />;
    }
    // If they are admin trying to access employee, send to admin dashboard
    if (user.role === 'admin' || user.role === 'hr') {
      return <Navigate to="/admin/dashboard" replace />;
    }
  }

  // Render the child routes
  return <Outlet />;
};
