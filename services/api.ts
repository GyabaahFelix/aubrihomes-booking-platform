import { supabase } from '../lib/supabaseClient';
import { Property, Booking, PropertyCategory } from '../types';

// Helper to map DB snake_case to CamelCase
// safely handles missing data

export const propertyService = {
  getAll: async () => {
    const { data, error } = await supabase
      .from('properties')
      .select('*')
      .eq('status', 'approved')
      .order('created_at', { ascending: false });
    
    if (error) {
      console.error('Supabase getAll error:', JSON.stringify(error));
      throw new Error(error.message || 'Failed to fetch properties from database');
    }
    return mapProperties(data);
  },
  
  getById: async (id: string) => {
    const { data, error } = await supabase
      .from('properties')
      .select('*')
      .eq('id', id)
      .single();
      
    if (error) {
       console.error('Supabase getById error:', error);
       throw new Error(error.message || 'Failed to fetch property details');
    }
    return mapProperty(data);
  },

  search: async (query: string, category?: PropertyCategory | 'all') => {
    let queryBuilder = supabase
      .from('properties')
      .select('*')
      .eq('status', 'approved');

    if (category && category !== 'all') {
      queryBuilder = queryBuilder.eq('category', category);
    }

    if (query) {
      // Simple OR search on title and location
      queryBuilder = queryBuilder.or(`title.ilike.%${query}%,location.ilike.%${query}%`);
    }

    const { data, error } = await queryBuilder;
    if (error) {
      console.error('Supabase search error:', error);
      throw new Error(error.message || 'Search failed');
    }
    return mapProperties(data);
  },

  // Owner methods
  create: async (property: Omit<Property, 'id' | 'status' | 'rating' | 'reviewsCount' | 'createdAt'>) => {
    const dbPayload = {
      owner_id: property.ownerId,
      title: property.title,
      description: property.description,
      category: property.category,
      price: property.price,
      period: property.period,
      location: property.location,
      images: property.images,
      amenities: property.amenities,
      status: 'pending'
    };

    const { data, error } = await supabase
      .from('properties')
      .insert(dbPayload)
      .select()
      .single();

    if (error) {
      console.error('Supabase create property error:', error);
      throw new Error(error.message || 'Failed to create property');
    }
    return mapProperty(data);
  },

  getByOwnerId: async (ownerId: string) => {
    const { data, error } = await supabase
      .from('properties')
      .select('*')
      .eq('owner_id', ownerId)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Supabase getByOwnerId error:', error);
      throw new Error(error.message);
    }
    return mapProperties(data);
  },

  // Admin methods
  getAllAdmin: async () => {
    const { data, error } = await supabase
      .from('properties')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Supabase getAllAdmin error:', error);
      throw new Error(error.message);
    }
    return mapProperties(data);
  },

  approveProperty: async (id: string) => {
    const { error } = await supabase
      .from('properties')
      .update({ status: 'approved' })
      .eq('id', id);
    if (error) throw new Error(error.message);
  },

  rejectProperty: async (id: string) => {
    const { error } = await supabase
      .from('properties')
      .update({ status: 'rejected' })
      .eq('id', id);
    if (error) throw new Error(error.message);
  }
};

export const bookingService = {
  create: async (booking: Omit<Booking, 'id' | 'status'>) => {
    const dbPayload = {
      property_id: booking.propertyId,
      customer_id: booking.customerId,
      start_date: booking.startDate,
      end_date: booking.endDate,
      total_price: booking.totalPrice,
      type: booking.type,
      status: 'pending'
    };

    const { data, error } = await supabase
      .from('bookings')
      .insert(dbPayload)
      .select()
      .single();

    if (error) {
      console.error('Supabase booking create error:', error);
      throw new Error(error.message);
    }
    return mapBooking(data);
  },

  getByUserId: async (userId: string) => {
    const { data, error } = await supabase
      .from('bookings')
      .select('*')
      .eq('customer_id', userId)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Supabase booking getByUserId error:', error);
      throw new Error(error.message);
    }
    return mapBookings(data);
  },

  getByOwnerProperties: async (ownerId: string) => {
    // Advanced query: Get bookings where property.owner_id = ownerId
    // Note: This requires a foreign key relationship set up in Supabase
    // If this fails, we might need a two-step query
    const { data, error } = await supabase
      .from('bookings')
      .select('*, properties!inner(owner_id)')
      .eq('properties.owner_id', ownerId);

    if (error) {
      console.error('Supabase booking getByOwnerProperties error:', error);
      // Fallback strategy if relation query fails
      return []; 
    }
    return mapBookings(data);
  }
};

// Mappers to convert snake_case DB fields to camelCase TS interfaces
const mapProperty = (data: any): Property => {
  if (!data) return {} as Property;
  return {
    id: data.id,
    ownerId: data.owner_id,
    title: data.title,
    description: data.description,
    category: data.category,
    price: data.price,
    period: data.period,
    location: data.location,
    images: data.images || [],
    amenities: data.amenities || [],
    rating: data.rating,
    reviewsCount: data.reviews_count,
    status: data.status,
    agentId: data.agent_id
  };
};

const mapProperties = (data: any[]): Property[] => data ? data.map(mapProperty) : [];

const mapBooking = (data: any): Booking => {
  if (!data) return {} as Booking;
  return {
    id: data.id,
    propertyId: data.property_id,
    customerId: data.customer_id,
    startDate: data.start_date,
    endDate: data.end_date,
    totalPrice: data.total_price,
    status: data.status,
    type: data.type
  };
};

const mapBookings = (data: any[]): Booking[] => data ? data.map(mapBooking) : [];
