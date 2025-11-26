import React, { useEffect, useState } from 'react';
import { useAuth } from '../../services/authContext';
import { bookingService } from '../../services/api';
import { Booking } from '../../types';

const CustomerDashboard: React.FC = () => {
  const { user } = useAuth();
  const [bookings, setBookings] = useState<Booking[]>([]);

  useEffect(() => {
    const fetch = async () => {
      if (user) {
        try {
          const data = await bookingService.getByUserId(user.id);
          setBookings(data);
        } catch (e) {
          console.error(e);
        }
      }
    };
    fetch();
  }, [user]);

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
           <h1 className="text-2xl font-bold text-gray-900">Trips</h1>
           <p className="text-gray-500 text-sm mt-1">Upcoming and past reservations</p>
        </div>
        <button className="bg-white border border-gray-300 text-gray-900 px-5 py-2.5 rounded-lg text-sm font-bold hover:bg-gray-50 transition">Start searching</button>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
        {bookings.length === 0 ? (
          <div className="p-12 text-center text-gray-500">
             <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
               <svg className="w-8 h-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>
             </div>
             <p className="text-lg font-medium text-gray-900">No trips booked... yet!</p>
             <p className="text-sm mt-2">Time to dust off your bags and start planning your next adventure.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="bg-gray-50 border-b border-gray-100 text-gray-500">
                <tr>
                  <th className="px-6 py-4 font-semibold">Booking ID</th>
                  <th className="px-6 py-4 font-semibold">Property</th>
                  <th className="px-6 py-4 font-semibold">Dates</th>
                  <th className="px-6 py-4 font-semibold">Amount</th>
                  <th className="px-6 py-4 font-semibold">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {bookings.map(b => (
                  <tr key={b.id} className="hover:bg-gray-50 transition">
                    <td className="px-6 py-4 font-mono text-xs text-gray-500">#{b.id.slice(0, 8)}</td>
                    <td className="px-6 py-4 font-medium text-gray-900">Property #{b.propertyId.slice(0,5)}...</td>
                    <td className="px-6 py-4 text-gray-600">{new Date(b.startDate).toLocaleDateString()} - {new Date(b.endDate).toLocaleDateString()}</td>
                    <td className="px-6 py-4 font-medium text-gray-900">₵{b.totalPrice.toLocaleString()}</td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold capitalize
                        ${b.status === 'confirmed' ? 'bg-green-100 text-green-700' : 
                          b.status === 'pending' ? 'bg-yellow-100 text-yellow-700' : 'bg-gray-100 text-gray-800'}`}>
                        {b.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default CustomerDashboard;
