export type UserRole = 'admin' | 'owner' | 'agent' | 'customer';

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  avatarUrl?: string;
  verified?: boolean;
}

export type PropertyCategory = 'short_stay' | 'long_stay' | 'hire_purchase';

export interface Property {
  id: string;
  ownerId: string;
  title: string;
  description: string;
  category: PropertyCategory;
  price: number;
  period?: 'night' | 'month' | 'total';
  location: string;
  images: string[];
  amenities: string[];
  rating: number;
  reviewsCount: number;
  status: 'pending' | 'approved' | 'rejected';
  agentId?: string;
}

export interface Booking {
  id: string;
  propertyId: string;
  customerId: string;
  startDate: string;
  endDate: string;
  totalPrice: number;
  status: 'pending' | 'confirmed' | 'cancelled' | 'completed';
  type: PropertyCategory;
}

export interface Message {
  id: string;
  senderId: string;
  receiverId: string;
  content: string;
  timestamp: string;
  read: boolean;
}