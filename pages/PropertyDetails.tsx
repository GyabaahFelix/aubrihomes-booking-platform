import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { propertyService, bookingService } from '../services/api';
import { Property } from '../types';
import { useAuth } from '../services/authContext';

const PropertyDetails: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [property, setProperty] = useState<Property | undefined>(undefined);
  const [loading, setLoading] = useState(true);
  const [bookingLoading, setBookingLoading] = useState(false);

  useEffect(() => {
    const fetch = async () => {
      if (id) {
        try {
          const data = await propertyService.getById(id);
          setProperty(data);
        } catch(e) {
          console.error(e);
        }
      }
      setLoading(false);
    };
    fetch();
  }, [id]);

  const handleBook = async () => {
    if (!user) {
      navigate('/login');
      return;
    }
    if (!property) return;

    setBookingLoading(true);
    try {
      await bookingService.create({
        propertyId: property.id,
        customerId: user.id,
        startDate: new Date().toISOString(),
        endDate: new Date(Date.now() + 86400000 * 5).toISOString(), // 5 days later
        totalPrice: property.price * 5, // Simple mock calc
        type: property.category
      });
      alert('Booking request sent successfully!');
      navigate('/dashboard/customer');
    } catch (e) {
      console.error(e);
      alert('Failed to book. Please try again.');
    } finally {
      setBookingLoading(false);
    }
  };

  if (loading) return <div className="min-h-screen bg-white flex items-center justify-center"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-500"></div></div>;
  if (!property) return <div>Property not found</div>;

  return (
    <div className="min-h-screen bg-white text-gray-900">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Title Header */}
        <div className="mb-6">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">{property.title}</h1>
          <div className="flex items-center gap-2 text-sm font-medium underline text-gray-900">
             <span>★ {property.rating || 'New'}</span>
             <span>·</span>
             <span>{property.reviewsCount} reviews</span>
             <span>·</span>
             <span>{property.location}</span>
          </div>
        </div>

        {/* Image Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-2 rounded-2xl overflow-hidden mb-10 h-[400px] md:h-[500px]">
          <div className="md:col-span-2 h-full">
            <img src={property.images[0] || 'https://placehold.co/600x400'} className="w-full h-full object-cover hover:opacity-95 transition" alt="Main" />
          </div>
          <div className="md:col-span-2 grid grid-rows-2 gap-2 h-full">
             <img src={property.images[1] || property.images[0] || 'https://placehold.co/600x400'} className="w-full h-full object-cover hover:opacity-95 transition" alt="Sub 1" />
             <div className="relative h-full">
                <img src={property.images[2] || property.images[0] || 'https://placehold.co/600x400'} className="w-full h-full object-cover hover:opacity-95 transition" alt="Sub 2" />
                <button className="absolute bottom-4 right-4 bg-white border border-gray-900 px-4 py-1.5 rounded-lg text-sm font-medium hover:bg-gray-100 shadow-sm">Show all photos</button>
             </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mb-20">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <div className="border-b border-gray-200 pb-8 mb-8 flex justify-between items-center">
              <div>
                 <h2 className="text-xl font-bold mb-1">Hosted by Owner</h2>
                 <p className="text-gray-500 text-sm">2 guests · 1 bedroom · 1 bed · 1 bath</p>
              </div>
              <div className="w-12 h-12 bg-gray-200 rounded-full overflow-hidden">
                <img src="https://picsum.photos/seed/host/200" className="w-full h-full object-cover" alt="Host" />
              </div>
            </div>

            <div className="border-b border-gray-200 pb-8 mb-8 space-y-6">
               <div className="flex gap-4">
                  <div className="mt-1"><svg className="w-6 h-6 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg></div>
                  <div>
                    <h3 className="font-bold text-gray-900">Dedicated workspace</h3>
                    <p className="text-gray-500 text-sm">A common area with wifi that’s well-suited for working.</p>
                  </div>
               </div>
               <div className="flex gap-4">
                  <div className="mt-1"><svg className="w-6 h-6 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" /></svg></div>
                  <div>
                    <h3 className="font-bold text-gray-900">Self check-in</h3>
                    <p className="text-gray-500 text-sm">Check yourself in with the keypad.</p>
                  </div>
               </div>
            </div>

            <div className="border-b border-gray-200 pb-8 mb-8">
              <h2 className="text-xl font-bold mb-4">About this place</h2>
              <p className="text-gray-700 leading-relaxed">{property.description}</p>
            </div>

            <div className="border-b border-gray-200 pb-8 mb-8">
              <h2 className="text-xl font-bold mb-4">What this place offers</h2>
              <div className="grid grid-cols-2 gap-4">
                {property.amenities.map((amenity, idx) => (
                  <div key={idx} className="flex items-center gap-3 text-gray-700">
                     <svg className="w-5 h-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                     {amenity}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sticky Booking Card */}
          <div className="lg:col-span-1">
            <div className="bg-white border border-gray-200 shadow-[0_6px_16px_rgba(0,0,0,0.12)] rounded-xl p-6 sticky top-28">
              <div className="flex justify-between items-end mb-6">
                <div>
                  <span className="text-2xl font-bold text-gray-900">₵{property.price.toLocaleString()}</span>
                  <span className="text-gray-500"> / {property.period}</span>
                </div>
                <div className="flex items-center gap-1 text-sm">
                   <span className="font-bold">★ {property.rating || 'New'}</span>
                   <span className="text-gray-400">({property.reviewsCount} reviews)</span>
                </div>
              </div>

              <div className="border border-gray-400 rounded-lg mb-4 grid grid-cols-2">
                  <div className="p-3 border-r border-b border-gray-400 col-span-1">
                    <label className="block text-[10px] font-bold uppercase text-gray-700">Check-in</label>
                    <input type="date" className="w-full text-sm outline-none bg-transparent" />
                  </div>
                  <div className="p-3 border-b border-gray-400 col-span-1">
                    <label className="block text-[10px] font-bold uppercase text-gray-700">Check-out</label>
                    <input type="date" className="w-full text-sm outline-none bg-transparent" />
                  </div>
                  <div className="p-3 col-span-2">
                    <label className="block text-[10px] font-bold uppercase text-gray-700">Guests</label>
                    <select className="w-full text-sm outline-none bg-transparent">
                      <option>1 guest</option>
                      <option>2 guests</option>
                    </select>
                  </div>
              </div>

              <button 
                 onClick={handleBook}
                 disabled={bookingLoading}
                 className="w-full bg-brand-500 hover:bg-brand-600 text-white font-bold py-3.5 rounded-lg transition active:scale-[0.98] mb-4"
              >
                 {bookingLoading ? 'Reserving...' : 'Reserve'}
              </button>
              
              <div className="text-center text-sm text-gray-500 mb-6">You won't be charged yet</div>

              <div className="space-y-3">
                 <div className="flex justify-between text-gray-600">
                    <span className="underline">₵{property.price} x 5 {property.period === 'night' ? 'nights' : 'units'}</span>
                    <span>₵{(property.price * 5).toLocaleString()}</span>
                 </div>
                 <div className="flex justify-between text-gray-600">
                    <span className="underline">Cleaning fee</span>
                    <span>₵150</span>
                 </div>
                 <div className="flex justify-between text-gray-600">
                    <span className="underline">Service fee</span>
                    <span>₵0</span>
                 </div>
              </div>

              <div className="border-t border-gray-200 mt-6 pt-6 flex justify-between font-bold text-lg text-gray-900">
                 <span>Total before taxes</span>
                 <span>₵{(property.price * 5 + 150).toLocaleString()}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default PropertyDetails;
