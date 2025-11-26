import React, { useEffect, useState } from 'react';
import { useAuth } from '../../services/authContext';
import { propertyService, bookingService } from '../../services/api';
import { Property, Booking, PropertyCategory } from '../../types';

const OwnerDashboard: React.FC = () => {
  const { user } = useAuth();
  const [properties, setProperties] = useState<Property[]>([]);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [showAddModal, setShowAddModal] = useState(false);
  
  // Form State
  const [newProperty, setNewProperty] = useState<Partial<Property>>({
    title: '', location: '', price: 0, category: 'short_stay', description: '', amenities: []
  });

  useEffect(() => {
    const fetch = async () => {
      if (user) {
        const props = await propertyService.getByOwnerId(user.id);
        setProperties(props);
        const books = await bookingService.getByOwnerProperties(user.id);
        setBookings(books);
      }
    };
    fetch();
  }, [user]);

  const handleSubmit = async () => {
    if (!user) return;
    try {
      await propertyService.create({
        ownerId: user.id,
        title: newProperty.title || 'Untitled',
        description: newProperty.description || '',
        category: newProperty.category as PropertyCategory,
        price: newProperty.price || 0,
        period: 'night', // default
        location: newProperty.location || '',
        images: ['https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3'], // placeholder
        amenities: ['Wifi'],
      });
      alert('Property submitted for approval!');
      setShowAddModal(false);
      // Refresh
      const props = await propertyService.getByOwnerId(user.id);
      setProperties(props);
    } catch (e) {
      console.error(e);
      alert('Error creating property');
    }
  };

  const totalEarnings = bookings
    .filter(b => b.status === 'completed' || b.status === 'confirmed')
    .reduce((sum, b) => sum + b.totalPrice, 0);

  return (
    <div className="space-y-8">
      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <p className="text-sm text-gray-500 font-medium">Total Earnings</p>
          <p className="text-3xl font-bold text-gray-900 mt-2">₵{totalEarnings.toLocaleString()}</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <p className="text-sm text-gray-500 font-medium">Active Listings</p>
          <p className="text-3xl font-bold text-gray-900 mt-2">{properties.length}</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <p className="text-sm text-gray-500 font-medium">Total Bookings</p>
          <p className="text-3xl font-bold text-gray-900 mt-2">{bookings.length}</p>
        </div>
      </div>

      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold text-gray-900">My Properties</h2>
        <button 
          onClick={() => setShowAddModal(true)}
          className="bg-brand-500 text-white px-5 py-2.5 rounded-lg text-sm font-bold hover:bg-brand-600 transition shadow-sm">
          + Add Property
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {properties.map(p => (
           <div key={p.id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
             <div className="h-40 overflow-hidden relative">
                <img src={p.images[0] || 'https://placehold.co/600x400'} alt={p.title} className="w-full h-full object-cover" />
                <div className="absolute top-2 right-2">
                    <span className={`px-2 py-1 text-xs font-bold rounded-md uppercase tracking-wider ${p.status === 'approved' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                      {p.status}
                    </span>
                </div>
             </div>
             <div className="p-5">
                <h3 className="font-bold text-gray-900 text-lg truncate mb-1">{p.title}</h3>
                <p className="text-gray-500 text-sm mb-4">{p.location}</p>
                <div className="flex justify-between items-center pt-3 border-t border-gray-50">
                    <span className="font-semibold text-gray-900">₵{p.price}/{p.period}</span>
                    <button className="text-brand-500 text-sm font-bold hover:underline">Manage</button>
                </div>
             </div>
           </div>
        ))}
      </div>

      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-8 shadow-2xl">
            <h2 className="text-2xl font-bold mb-2">List New Property</h2>
            <p className="text-gray-500 mb-8 text-sm">Fill in the details to submit your property for review.</p>
            {/* Form */}
            <div className="space-y-5">
               <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1">Property Title</label>
                  <input 
                    className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-black outline-none" 
                    placeholder="Cozy Apartment..."
                    value={newProperty.title}
                    onChange={e => setNewProperty({...newProperty, title: e.target.value})} 
                  />
               </div>
               <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1">Location</label>
                  <input 
                    className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-black outline-none" 
                    placeholder="Accra, Ghana"
                    value={newProperty.location}
                    onChange={e => setNewProperty({...newProperty, location: e.target.value})}
                  />
               </div>
               <div className="flex gap-4">
                 <div className="w-1/2">
                    <label className="block text-sm font-bold text-gray-700 mb-1">Price (GHS)</label>
                    <input 
                      className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-black outline-none" 
                      placeholder="0.00" 
                      type="number"
                      value={newProperty.price}
                      onChange={e => setNewProperty({...newProperty, price: Number(e.target.value)})}
                    />
                 </div>
                 <div className="w-1/2">
                    <label className="block text-sm font-bold text-gray-700 mb-1">Type</label>
                    <select 
                      className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-black outline-none bg-white"
                      value={newProperty.category}
                      onChange={e => setNewProperty({...newProperty, category: e.target.value as any})}
                    >
                        <option value="short_stay">Short Stay</option>
                        <option value="long_stay">Long Stay</option>
                        <option value="hire_purchase">Hire Purchase</option>
                    </select>
                 </div>
               </div>
            </div>
            <div className="flex justify-end gap-3 mt-10">
              <button onClick={() => setShowAddModal(false)} className="px-6 py-3 rounded-lg font-bold hover:bg-gray-100 transition">Cancel</button>
              <button onClick={handleSubmit} className="bg-brand-500 text-white px-6 py-3 rounded-lg font-bold hover:bg-brand-600 transition">Submit</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OwnerDashboard;
