import React, { useEffect, useState } from 'react';
import { propertyService } from '../../services/api';
import { Property } from '../../types';

const AdminDashboard: React.FC = () => {
  const [properties, setProperties] = useState<Property[]>([]);

  useEffect(() => {
    const fetch = async () => {
      try {
        const data = await propertyService.getAllAdmin();
        setProperties(data);
      } catch (e) {
        console.error(e);
      }
    };
    fetch();
  }, []);

  const pendingProperties = properties.filter(p => p.status === 'pending');

  const handleAction = async (id: string, action: 'approve' | 'reject') => {
    try {
      if (action === 'approve') await propertyService.approveProperty(id);
      else await propertyService.rejectProperty(id);
      
      // Refresh local state
      const data = await propertyService.getAllAdmin();
      setProperties(data);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-bold text-gray-900">Admin Overview</h1>
      
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-gray-50">
          <h2 className="font-bold text-gray-900">Pending Property Approvals</h2>
          <span className="bg-brand-100 text-brand-900 text-xs px-2 py-1 rounded-full font-bold">{pendingProperties.length} Pending</span>
        </div>
        
        {pendingProperties.length === 0 ? (
          <div className="p-12 text-center text-gray-500">All caught up! No pending properties.</div>
        ) : (
          <div className="divide-y divide-gray-100">
            {pendingProperties.map(p => (
              <div key={p.id} className="p-6 flex flex-col md:flex-row gap-6 items-center">
                <img src={p.images[0] || 'https://placehold.co/100'} alt="" className="w-32 h-24 object-cover rounded-lg shadow-sm" />
                <div className="flex-1">
                  <h3 className="font-bold text-gray-900 text-lg">{p.title}</h3>
                  <p className="text-sm text-gray-500">{p.location} • {p.category}</p>
                  <p className="text-base font-bold text-gray-900 mt-2">₵{p.price}</p>
                </div>
                <div className="flex gap-3">
                  <button onClick={() => handleAction(p.id, 'reject')} className="px-5 py-2 text-sm font-bold text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition">Reject</button>
                  <button onClick={() => handleAction(p.id, 'approve')} className="px-5 py-2 text-sm font-bold text-white bg-brand-500 hover:bg-brand-600 rounded-lg transition">Approve</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
         <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
            <h3 className="font-bold mb-4 text-gray-900">Platform Revenue</h3>
            <div className="h-48 bg-gray-50 rounded-lg flex items-center justify-center text-gray-400 border border-dashed border-gray-200">
              [Graph Placeholder]
            </div>
         </div>
         <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
            <h3 className="font-bold mb-4 text-gray-900">New Users</h3>
            <div className="space-y-4">
               {[1,2,3].map(i => (
                 <div key={i} className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-gray-200"></div>
                    <div>
                      <p className="text-sm font-bold text-gray-900">User #{i}</p>
                      <p className="text-xs text-gray-500">Joined 2 hours ago</p>
                    </div>
                 </div>
               ))}
            </div>
         </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
