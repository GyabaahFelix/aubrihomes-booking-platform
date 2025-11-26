import React from 'react';

const AgentDashboard: React.FC = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">Agent Portal</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {['Assigned Properties', 'Pending Inspections', 'Active Clients', 'Total Commission'].map((stat, i) => (
          <div key={i} className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm">
            <p className="text-gray-500 text-xs font-bold uppercase tracking-wide">{stat}</p>
            <p className="text-2xl font-bold text-gray-900 mt-2">{Math.floor(Math.random() * 20) + 1}</p>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-xl border border-gray-100 p-6">
         <h2 className="font-bold text-gray-900 mb-4">Inspection Requests</h2>
         <div className="space-y-4">
            {[1, 2].map(i => (
              <div key={i} className="flex justify-between items-center p-4 bg-gray-50 rounded-lg border border-gray-200">
                <div>
                  <p className="font-medium text-gray-900">Villa Sunset Inspection</p>
                  <p className="text-sm text-gray-500">Requested by John Doe • 2 days ago</p>
                </div>
                <button className="text-sm bg-gray-900 text-white px-3 py-1.5 rounded-md hover:bg-gray-800">
                   Schedule
                </button>
              </div>
            ))}
         </div>
      </div>
    </div>
  );
};

export default AgentDashboard;