import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../services/authContext';

const Navbar: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const getDashboardLink = () => {
    switch (user?.role) {
      case 'admin': return '/dashboard/admin';
      case 'owner': return '/dashboard/owner';
      case 'agent': return '/dashboard/agent';
      default: return '/dashboard/customer';
    }
  };

  return (
    <nav className="bg-white border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center gap-2">
              <div className="w-10 h-10 bg-brand-500 rounded-full flex items-center justify-center text-white font-bold text-xl">
                A
              </div>
              <span className="font-bold text-xl tracking-tight text-brand-500 hidden sm:block">AubriHomes</span>
            </Link>
          </div>
          
          <div className="hidden md:flex items-center space-x-2">
              <Link to="/explore" className="text-gray-700 font-medium hover:bg-gray-100 px-4 py-2 rounded-full transition text-sm">Explore</Link>
              <Link to="/about" className="text-gray-700 font-medium hover:bg-gray-100 px-4 py-2 rounded-full transition text-sm">About</Link>
          </div>

          <div className="hidden md:flex items-center gap-2">
            {user ? (
              <div className="flex items-center gap-4">
                <Link to={getDashboardLink()} className="text-sm font-medium text-gray-900 hover:text-brand-500 px-4 py-2 rounded-full hover:bg-gray-50 transition">
                  Switch to Dashboard
                </Link>
                <div className="relative group">
                  <button className="flex items-center gap-2 border border-gray-300 rounded-full p-1 pl-3 hover:shadow-md transition bg-white">
                    <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg>
                    <img className="h-8 w-8 rounded-full object-cover bg-gray-200" src={user.avatarUrl} alt={user.name} />
                  </button>
                  <div className="absolute right-0 w-60 mt-2 py-2 bg-white rounded-xl shadow-[0_6px_16px_rgba(0,0,0,0.12)] border border-gray-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform z-50">
                    <div className="px-4 py-3 border-b border-gray-100 mb-2">
                      <p className="font-semibold text-gray-900 truncate">{user.name}</p>
                      <p className="text-xs text-gray-500 capitalize">{user.role}</p>
                    </div>
                    <Link to={getDashboardLink()} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 font-medium">Dashboard</Link>
                    <Link to="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">Messages</Link>
                    <Link to="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">Trips</Link>
                    <Link to="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">Wishlist</Link>
                    <div className="border-t border-gray-100 my-2"></div>
                    <button onClick={handleLogout} className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">Sign out</button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link to="/login" className="text-gray-900 font-medium text-sm hover:bg-gray-100 px-4 py-2 rounded-full transition">Log in</Link>
                <Link to="/register" className="bg-brand-500 hover:bg-brand-600 text-white px-5 py-2.5 rounded-full text-sm font-bold transition-colors shadow-sm">
                  Sign up
                </Link>
              </div>
            )}
          </div>
          
          <div className="flex items-center md:hidden">
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-gray-500 hover:text-gray-900 focus:outline-none p-2">
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
              </svg>
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 absolute w-full shadow-lg">
          <div className="pt-2 pb-4 space-y-1 px-4">
            <Link to="/explore" className="block px-3 py-3 rounded-lg text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50">Explore</Link>
            {user ? (
              <>
                <Link to={getDashboardLink()} className="block px-3 py-3 rounded-lg text-base font-medium text-brand-500 bg-brand-50">Dashboard</Link>
                <button onClick={handleLogout} className="block w-full text-left px-3 py-3 rounded-lg text-base font-medium text-gray-700 hover:bg-gray-50">Sign out</button>
              </>
            ) : (
              <>
                <Link to="/login" className="block px-3 py-3 rounded-lg text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50">Log in</Link>
                <Link to="/register" className="block px-3 py-3 rounded-lg text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50">Sign up</Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;