import { Property, Booking, PropertyCategory } from '../types';
import { MOCK_PROPERTIES, MOCK_BOOKINGS } from '../constants';

// This service mocks Supabase database interactions
// In a real app, replace these with: const { data, error } = await supabase.from('...').select(...)

let properties = [...MOCK_PROPERTIES];
let bookings = [...MOCK_BOOKINGS];

export const propertyService = {
  getAll: async () => {
    await new Promise(r => setTimeout(r, 500));
    return properties.filter(p => p.status === 'approved');
  },
  
  getById: async (id: string) => {
    await new Promise(r => setTimeout(r, 300));
    return properties.find(p => p.id === id);
  },

  search: async (query: string, category?: PropertyCategory) => {
    await new Promise(r => setTimeout(r, 600));
    return properties.filter(p => {
      const matchQuery = p.location.toLowerCase().includes(query.toLowerCase()) || 
                         p.title.toLowerCase().includes(query.toLowerCase());
      const matchCategory = category ? p.category === category : true;
      return matchQuery && matchCategory && p.status === 'approved';
    });
  },

  // Owner methods
  create: async (property: Omit<Property, 'id' | 'status' | 'rating' | 'reviewsCount'>) => {
    await new Promise(r => setTimeout(r, 800));
    const newProperty: Property = {
      ...property,
      id: Math.random().toString(36).substr(2, 9),
      status: 'pending', // Requires admin approval
      rating: 0,
      reviewsCount: 0
    };
    properties.push(newProperty);
    return newProperty;
  },

  getByOwnerId: async (ownerId: string) => {
    return properties.filter(p => p.ownerId === ownerId);
  },

  // Admin methods
  getAllAdmin: async () => {
    return properties;
  },

  approveProperty: async (id: string) => {
    properties = properties.map(p => p.id === id ? { ...p, status: 'approved' } : p);
  },

  rejectProperty: async (id: string) => {
    properties = properties.map(p => p.id === id ? { ...p, status: 'rejected' } : p);
  }
};

export const bookingService = {
  create: async (booking: Omit<Booking, 'id' | 'status'>) => {
    await new Promise(r => setTimeout(r, 800));
    const newBooking: Booking = {
      ...booking,
      id: Math.random().toString(36).substr(2, 9),
      status: 'pending'
    };
    bookings.push(newBooking);
    return newBooking;
  },

  getByUserId: async (userId: string) => {
    return bookings.filter(b => b.customerId === userId);
  },

  getByOwnerProperties: async (ownerId: string) => {
    const ownerPropIds = properties.filter(p => p.ownerId === ownerId).map(p => p.id);
    return bookings.filter(b => ownerPropIds.includes(b.propertyId));
  }
};