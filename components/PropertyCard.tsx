import React from 'react';
import { Link } from 'react-router-dom';
import { Property } from '../types';

interface PropertyCardProps {
  property: Property;
}

const PropertyCard: React.FC<PropertyCardProps> = ({ property }) => {
  return (
    <div className="group flex flex-col cursor-pointer">
      <Link to={`/property/${property.id}`} className="relative aspect-[4/3] overflow-hidden rounded-xl bg-gray-200 mb-3">
        <img 
          src={property.images[0]} 
          alt={property.title} 
          className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-sm px-3 py-1 rounded-md text-xs font-bold uppercase tracking-wider text-gray-900 shadow-sm">
          {property.category.replace('_', ' ')}
        </div>
        <div className="absolute top-3 right-3">
          <button className="text-white hover:scale-110 transition opacity-80 hover:opacity-100">
             <svg className="w-6 h-6 fill-black/30 stroke-white stroke-2" viewBox="0 0 24 24"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>
          </button>
        </div>
      </Link>
      
      <div className="space-y-1">
        <div className="flex justify-between items-start">
          <h3 className="font-semibold text-gray-900 truncate">{property.location}</h3>
          <div className="flex items-center gap-1">
            <svg className="w-3 h-3 text-gray-900" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
            <span className="text-sm text-gray-900">{property.rating}</span>
          </div>
        </div>
        <p className="text-gray-500 text-sm truncate">{property.title}</p>
        <p className="text-gray-500 text-sm">Hosted by Owner</p>
        <div className="mt-1 flex items-baseline gap-1">
          <span className="font-semibold text-gray-900">₵{property.price.toLocaleString()}</span>
          <span className="text-gray-900">{property.period === 'total' ? ' total' : ` ${property.period}`}</span>
        </div>
      </div>
    </div>
  );
};

export default PropertyCard;