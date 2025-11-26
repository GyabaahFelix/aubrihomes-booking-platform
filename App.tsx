import React from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './services/authContext';
import Home from './pages/Home';
import Explore from './pages/Explore';
import PropertyDetails from './pages/PropertyDetails';
import Login from './pages/Login';
import Register from './pages/Register';
import AdminDashboard from './pages/dashboards/AdminDashboard';
import OwnerDashboard from './pages/dashboards/OwnerDashboard';
import AgentDashboard from './pages/dashboards/AgentDashboard';
import CustomerDashboard from './pages/dashboards/CustomerDashboard';
import DashboardSidebar from './components/DashboardSidebar';

// Layout wrapper for dashboard routes
const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen bg-gray-50 flex">
      <DashboardSidebar />
      <div className="flex-1 p-8 overflow-y-auto h-screen">
        {children}
      </div>
    </div>
  );
};

// Protected Route wrapper
const ProtectedRoute = ({ children, allowedRoles }: { children: React.ReactNode, allowedRoles?: string[] }) => {
  const { user, isLoading } = useAuth();
  
  if (isLoading) return <div className="p-10 text-center">Loading...</div>;
  if (!user) return <Navigate to="/login" replace />;
  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};

const App: React.FC = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/property/:id" element={<PropertyDetails />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/about" element={<div className="p-20 text-center">About Page Placeholder</div>} />

          {/* Protected Dashboard Routes */}
          <Route path="/dashboard/admin" element={
            <ProtectedRoute allowedRoles={['admin']}>
              <DashboardLayout><AdminDashboard /></DashboardLayout>
            </ProtectedRoute>
          } />
          
          <Route path="/dashboard/owner" element={
            <ProtectedRoute allowedRoles={['owner']}>
              <DashboardLayout><OwnerDashboard /></DashboardLayout>
            </ProtectedRoute>
          } />

          <Route path="/dashboard/agent" element={
            <ProtectedRoute allowedRoles={['agent']}>
              <DashboardLayout><AgentDashboard /></DashboardLayout>
            </ProtectedRoute>
          } />

          <Route path="/dashboard/customer" element={
            <ProtectedRoute allowedRoles={['customer']}>
              <DashboardLayout><CustomerDashboard /></DashboardLayout>
            </ProtectedRoute>
          } />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;