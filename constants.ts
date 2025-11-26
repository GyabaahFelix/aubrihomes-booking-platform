import { Property, User, Booking } from './types';

export const MOCK_USERS: User[] = [
  { id: '1', name: 'Admin User', email: 'admin@aubri.com', role: 'admin', avatarUrl: 'https://picsum.photos/id/1/200/200' },
  { id: '2', name: 'John Owner', email: 'owner@aubri.com', role: 'owner', verified: true, avatarUrl: 'https://picsum.photos/id/2/200/200' },
  { id: '3', name: 'Sarah Agent', email: 'agent@aubri.com', role: 'agent', verified: true, avatarUrl: 'https://picsum.photos/id/3/200/200' },
  { id: '4', name: 'Alice Renter', email: 'customer@aubri.com', role: 'customer', avatarUrl: 'https://picsum.photos/id/4/200/200' },
];

export const MOCK_PROPERTIES: Property[] = [
  {
    id: 'p1',
    ownerId: '2',
    title: 'Modern Loft in Downtown',
    description: 'A beautiful open-space loft located in the heart of the city. Close to all amenities.',
    category: 'short_stay',
    price: 150,
    period: 'night',
    location: 'New York, NY',
    images: ['https://picsum.photos/id/10/800/600', 'https://picsum.photos/id/11/800/600'],
    amenities: ['Wifi', 'Kitchen', 'AC', 'Washer'],
    rating: 4.8,
    reviewsCount: 124,
    status: 'approved',
  },
  {
    id: 'p2',
    ownerId: '2',
    title: 'Seaside Villa',
    description: 'Relax by the ocean in this stunning 4-bedroom villa with private pool.',
    category: 'long_stay',
    price: 4500,
    period: 'month',
    location: 'Malibu, CA',
    images: ['https://picsum.photos/id/12/800/600', 'https://picsum.photos/id/13/800/600'],
    amenities: ['Pool', 'Wifi', 'Parking', 'Gym'],
    rating: 4.9,
    reviewsCount: 32,
    status: 'approved',
    agentId: '3'
  },
  {
    id: 'p3',
    ownerId: '2',
    title: 'Family Starter Home',
    description: 'Perfect for new families. 3 bedrooms, large backyard. Available for hire purchase plan.',
    category: 'hire_purchase',
    price: 350000,
    period: 'total',
    location: 'Austin, TX',
    images: ['https://picsum.photos/id/14/800/600', 'https://picsum.photos/id/15/800/600'],
    amenities: ['Garden', 'Garage', 'Near School'],
    rating: 4.5,
    reviewsCount: 10,
    status: 'approved',
    agentId: '3'
  },
    {
    id: 'p4',
    ownerId: '2',
    title: 'Cozy Mountain Cabin',
    description: 'Escape to the mountains. Wood fireplace and scenic views.',
    category: 'short_stay',
    price: 200,
    period: 'night',
    location: 'Aspen, CO',
    images: ['https://picsum.photos/id/16/800/600', 'https://picsum.photos/id/17/800/600'],
    amenities: ['Fireplace', 'Hiking', 'Wifi'],
    rating: 4.7,
    reviewsCount: 56,
    status: 'pending',
  }
];

export const MOCK_BOOKINGS: Booking[] = [
  {
    id: 'b1',
    propertyId: 'p1',
    customerId: '4',
    startDate: '2023-11-01',
    endDate: '2023-11-05',
    totalPrice: 600,
    status: 'completed',
    type: 'short_stay'
  },
  {
    id: 'b2',
    propertyId: 'p2',
    customerId: '4',
    startDate: '2023-12-01',
    endDate: '2024-05-30',
    totalPrice: 27000,
    status: 'confirmed',
    type: 'long_stay'
  }
];