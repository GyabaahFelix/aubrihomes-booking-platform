import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-50 border-t border-gray-200 pt-12 pb-8 text-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Column 1 */}
          <div className="space-y-4">
            <h3 className="font-bold text-gray-900 text-base">Support</h3>
            <ul className="space-y-3 text-gray-600">
              <li><Link to="#" className="hover:underline">Help Center</Link></li>
              <li><Link to="#" className="hover:underline">AubriCover</Link></li>
              <li><Link to="#" className="hover:underline">Anti-discrimination</Link></li>
              <li><Link to="#" className="hover:underline">Disability support</Link></li>
              <li><Link to="#" className="hover:underline">Cancellation options</Link></li>
              <li><Link to="#" className="hover:underline">Report neighborhood concern</Link></li>
            </ul>
          </div>

          {/* Column 2 */}
          <div className="space-y-4">
            <h3 className="font-bold text-gray-900 text-base">Hosting</h3>
            <ul className="space-y-3 text-gray-600">
              <li><Link to="#" className="hover:underline">List your home</Link></li>
              <li><Link to="#" className="hover:underline">AubriCover for Hosts</Link></li>
              <li><Link to="#" className="hover:underline">Hosting resources</Link></li>
              <li><Link to="#" className="hover:underline">Community forum</Link></li>
              <li><Link to="#" className="hover:underline">Hosting responsibly</Link></li>
              <li><Link to="#" className="hover:underline">Join a free hosting class</Link></li>
            </ul>
          </div>

          {/* Column 3 */}
          <div className="space-y-4">
            <h3 className="font-bold text-gray-900 text-base">AubriHomes</h3>
            <ul className="space-y-3 text-gray-600">
              <li><Link to="#" className="hover:underline">Newsroom</Link></li>
              <li><Link to="#" className="hover:underline">New features</Link></li>
              <li><Link to="#" className="hover:underline">Careers</Link></li>
              <li><Link to="#" className="hover:underline">Investors</Link></li>
              <li><Link to="#" className="hover:underline">Gift cards</Link></li>
              <li><Link to="#" className="hover:underline">AubriHomes.org emergency stays</Link></li>
            </ul>
          </div>

          {/* Column 4 - App Info */}
          <div className="space-y-4">
             <div className="mb-6">
                <Link to="/" className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-brand-500 rounded-full flex items-center justify-center text-white font-bold text-xl">
                    A
                  </div>
                  <span className="font-bold text-xl tracking-tight text-brand-500">AubriHomes</span>
                </Link>
                <p className="mt-4 text-gray-500">
                   Find your perfect sanctuary in Ghana. From short stays to hire purchase homes.
                </p>
             </div>
             <div className="flex gap-4">
                {/* Social Placeholders */}
                <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center text-gray-600 hover:bg-gray-300 cursor-pointer transition">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                </div>
                <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center text-gray-600 hover:bg-gray-300 cursor-pointer transition">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/></svg>
                </div>
                <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center text-gray-600 hover:bg-gray-300 cursor-pointer transition">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zm0 10.162a3.997 3.997 0 110-7.994 3.997 3.997 0 010 7.994zm5.338-9.32a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
                </div>
             </div>
          </div>
        </div>

        <div className="border-t border-gray-200 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex flex-wrap justify-center md:justify-start gap-4 text-gray-600">
            <span>© 2024 AubriHomes, Inc.</span>
            <span className="hidden md:inline">·</span>
            <Link to="#" className="hover:underline">Privacy</Link>
            <span className="hidden md:inline">·</span>
            <Link to="#" className="hover:underline">Terms</Link>
            <span className="hidden md:inline">·</span>
            <Link to="#" className="hover:underline">Sitemap</Link>
          </div>
          <div className="flex items-center gap-6 font-medium text-gray-700">
             <span className="flex items-center gap-2 cursor-pointer hover:underline">
               <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
               English (GH)
             </span>
             <span className="flex items-center gap-2 cursor-pointer hover:underline">
               <span className="font-bold">₵</span>
               GHS
             </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;