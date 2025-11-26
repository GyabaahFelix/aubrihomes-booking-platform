import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import PropertyCard from '../components/PropertyCard';
import { propertyService } from '../services/api';
import { Property } from '../types';
import { Link } from 'react-router-dom';

const Home: React.FC = () => {
  const [featuredProperties, setFeaturedProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const data = await propertyService.getAll();
        setFeaturedProperties(data.slice(0, 3));
      } catch (err: any) {
        console.error("Failed to load properties", err);
        setError(err.message || 'Failed to load properties. Please check your database connection.');
      } finally {
        setLoading(false);
      }
    };
    fetchProperties();
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      {/* Hero Section */}
      <div className="relative h-[600px] w-full overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1564013799919-ab600027ffc6?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80" 
            alt="Hero background" 
            className="w-full h-full object-cover"
          />
          {/* Dark overlay for text readability */}
          <div className="absolute inset-0 bg-black/50"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex flex-col justify-center items-center text-center pt-10">
          <h1 className="text-4xl md:text-6xl font-extrabold text-white tracking-tight mb-6 drop-shadow-md">
            Find Your Perfect <span className="text-brand-500">Sanctuary</span> in Ghana
          </h1>
          <p className="text-xl text-white font-medium max-w-2xl mb-12 drop-shadow-sm">
            From short getaways to forever homes. Discover the best properties for rent, lease, or hire purchase.
          </p>
          
          <div className="bg-white p-2 rounded-full shadow-2xl max-w-4xl w-full flex flex-col md:flex-row gap-2 border border-gray-200">
            <div className="flex-grow px-6 py-3 border-r border-gray-100 hover:bg-gray-50 rounded-full transition cursor-pointer text-left relative group">
              <label className="block text-xs font-bold text-gray-800 uppercase tracking-wide ml-1">Location</label>
              <input type="text" placeholder="Where are you going?" className="w-full outline-none text-gray-700 font-medium placeholder-gray-400 bg-transparent pl-1" />
            </div>
            <div className="flex-grow px-6 py-3 border-r border-gray-100 hover:bg-gray-50 rounded-full transition cursor-pointer text-left">
              <label className="block text-xs font-bold text-gray-800 uppercase tracking-wide ml-1">Type</label>
              <select className="w-full outline-none text-gray-700 font-medium bg-transparent cursor-pointer">
                <option>Short Stay</option>
                <option>Long Stay</option>
                <option>Hire Purchase</option>
              </select>
            </div>
            <div className="p-1">
                <Link to="/explore" className="bg-brand-500 hover:bg-brand-600 text-white rounded-full h-full px-8 flex items-center justify-center font-bold text-lg transition-all shadow-md">
                Search
                </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Categories */}
      <div className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-10">How do you want to live?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: 'Short Stays', desc: 'Vacations & business trips', icon: '🌴', bg: 'bg-rose-50', text: 'text-rose-600' },
              { title: 'Long Rentals', desc: 'Monthly & yearly leases', icon: '🏠', bg: 'bg-blue-50', text: 'text-blue-600' },
              { title: 'Hire Purchase', desc: 'Rent to own your home', icon: '🔑', bg: 'bg-amber-50', text: 'text-amber-600' },
            ].map((cat, idx) => (
              <Link to={`/explore`} key={idx} className="block group p-8 rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 bg-white">
                <div className={`w-16 h-16 rounded-2xl ${cat.bg} ${cat.text} flex items-center justify-center text-3xl mb-6`}>
                  {cat.icon}
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">{cat.title}</h3>
                <p className="text-gray-500 text-lg">{cat.desc}</p>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Featured Properties */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-end mb-8">
            <div>
              <h2 className="text-3xl font-bold text-gray-900">Featured Homes</h2>
              <p className="text-gray-500 mt-2">Handpicked properties just for you</p>
            </div>
            <Link to="/explore" className="text-brand-500 font-bold hover:underline">View all &rarr;</Link>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-800 rounded-lg p-6 text-center mb-8">
              <p className="font-bold">Error loading properties</p>
              <p className="text-sm mt-1">{error}</p>
              <p className="text-xs mt-2 text-red-600">Tip: Did you run the SQL schema in Supabase?</p>
            </div>
          )}

          {loading ? (
            <div className="flex justify-center py-20">
               <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-500"></div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredProperties.length > 0 ? (
                featuredProperties.map(p => (
                  <PropertyCard key={p.id} property={p} />
                ))
              ) : (
                !error && <div className="col-span-3 text-center py-10 text-gray-500">No approved properties found yet. Log in as an owner to list one!</div>
              )}
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Home;
