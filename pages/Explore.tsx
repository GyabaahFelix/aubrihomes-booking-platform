import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import PropertyCard from '../components/PropertyCard';
import { propertyService } from '../services/api';
import { Property, PropertyCategory } from '../types';

const Explore: React.FC = () => {
  const [properties, setProperties] = useState<Property[]>([]);
  const [filteredProperties, setFilteredProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Filters
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState<PropertyCategory | 'all'>('all');
  const [priceRange, setPriceRange] = useState(500000);

  useEffect(() => {
    const fetch = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await propertyService.getAll();
        setProperties(data);
        setFilteredProperties(data);
      } catch (e: any) {
        console.error(e);
        setError(e.message || 'Failed to load properties');
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, []);

  useEffect(() => {
    let result = properties;
    
    if (search) {
      result = result.filter(p => 
        p.location.toLowerCase().includes(search.toLowerCase()) || 
        p.title.toLowerCase().includes(search.toLowerCase())
      );
    }
    
    if (category !== 'all') {
      result = result.filter(p => p.category === category);
    }

    result = result.filter(p => p.price <= priceRange);

    setFilteredProperties(result);
  }, [search, category, priceRange, properties]);

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 min-h-[80vh]">
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Sticky Sidebar Filters */}
          <div className="w-full lg:w-1/4 h-fit">
            <div className="bg-white p-0 lg:sticky lg:top-28 space-y-8">
              <h3 className="font-bold text-xl text-gray-900">Filters</h3>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">Location</label>
                  <input 
                    type="text" 
                    placeholder="City, neighborhood..." 
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-black focus:border-transparent outline-none transition"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">Type of place</label>
                  <select 
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-black outline-none bg-white cursor-pointer"
                    value={category}
                    onChange={(e) => setCategory(e.target.value as any)}
                  >
                    <option value="all">Any type</option>
                    <option value="short_stay">Short Stay</option>
                    <option value="long_stay">Long Stay</option>
                    <option value="hire_purchase">Hire Purchase</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">
                    Max Price: ₵{priceRange.toLocaleString()}
                  </label>
                  <input 
                    type="range" 
                    min="0" 
                    max="500000" 
                    step="1000"
                    value={priceRange}
                    onChange={(e) => setPriceRange(Number(e.target.value))}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-brand-500"
                  />
                  <div className="flex justify-between text-xs text-gray-500 mt-2">
                    <span>₵0</span>
                    <span>₵500k+</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Results Grid */}
          <div className="w-full lg:w-3/4">
             <div className="mb-6 border-b border-gray-100 pb-4">
               <h1 className="text-xl font-semibold text-gray-900">
                 {filteredProperties.length} homes in Ghana
               </h1>
             </div>

             {error && (
                <div className="bg-red-50 border border-red-200 text-red-800 rounded-lg p-6 text-center mb-6">
                  <p className="font-bold">Error</p>
                  <p className="text-sm">{error}</p>
                </div>
             )}

             {loading ? (
                <div className="flex justify-center py-20"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-500"></div></div>
             ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-10">
                  {filteredProperties.map(p => (
                    <PropertyCard key={p.id} property={p} />
                  ))}
                  {filteredProperties.length === 0 && !error && (
                    <div className="col-span-full text-center py-20">
                      <div className="inline-block p-4 rounded-full bg-gray-100 mb-4">
                        <svg className="w-8 h-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                      </div>
                      <h3 className="text-lg font-medium text-gray-900">No results found</h3>
                      <p className="text-gray-500 mt-1">Try adjusting your search or filters to find what you're looking for.</p>
                      <button onClick={() => {setCategory('all'); setSearch(''); setPriceRange(500000)}} className="mt-6 text-brand-500 font-semibold hover:underline">Clear all filters</button>
                    </div>
                  )}
                </div>
             )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Explore;
