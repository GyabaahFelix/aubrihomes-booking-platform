import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../services/authContext';

const DashboardSidebar: React.FC = () => {
  const { user, logout } = useAuth();
  const location = useLocation();

  if (!user) return null;

  const getLinks = () => {
    const common = [{ name: 'Overview', path: `/dashboard/${user.role}` }];
    switch (user.role) {
      case 'admin':
        return [...common, { name: 'Users', path: '#' }, { name: 'Approvals', path: '#' }, { name: 'Revenue', path: '#' }];
      case 'owner':
        return [...common, { name: 'My Properties', path: '#' }, { name: 'Bookings', path: '#' }, { name: 'Payouts', path: '#' }];
      case 'agent':
        return [...common, { name: 'Assigned Homes', path: '#' }, { name: 'Inspections', path: '#' }, { name: 'Clients', path: '#' }];
      case 'customer':
        return [...common, { name: 'Bookings', path: '#' }, { name: 'Wishlist', path: '#' }, { name: 'Payments', path: '#' }];
      default:
        return common;
    }
  };

  return (
    <div className="w-64 bg-white h-screen border-r border-gray-100 flex flex-col sticky top-0">
      <div className="h-16 flex items-center px-6 border-b border-gray-100">
        <span className="font-bold text-xl text-gray-900">Aubri<span className="text-brand-500">Dash</span></span>
      </div>
      
      <div className="flex-1 py-6 px-3 space-y-1">
        {getLinks().map((link) => (
          <Link 
            key={link.name} 
            to={link.path}
            className={`flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
              location.pathname === link.path 
                ? 'bg-brand-50 text-brand-700' 
                : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
            }`}
          >
            {link.name}
          </Link>
        ))}
      </div>

      <div className="p-4 border-t border-gray-100">
        <div className="flex items-center gap-3 mb-4 px-2">
           <img src={user.avatarUrl} className="w-8 h-8 rounded-full bg-gray-200" alt="avatar" />
           <div>
             <p className="text-sm font-medium text-gray-900">{user.name}</p>
             <p className="text-xs text-gray-500 capitalize">{user.role}</p>
           </div>
        </div>
        <button onClick={logout} className="w-full flex items-center justify-center px-4 py-2 border border-gray-200 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50 hover:text-red-600 transition">
          Sign out
        </button>
      </div>
    </div>
  );
};

export default DashboardSidebar;