import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const EquipmentCard = ({ equipment }) => {
  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    })?.format(price);
  };

  const formatDate = (dateString) => {
    return new Date(dateString)?.toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Icon
        key={i}
        name="Star"
        size={14}
        className={i < Math.floor(rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}
      />
    ));
  };

  return (
    <div className="bg-card border border-border rounded-lg overflow-hidden shadow-organic hover:shadow-organic-lg organic-transition equipment-card">
      {/* Image Section */}
      <div className="relative h-48 overflow-hidden">
        <Image
          src={equipment?.images?.[0] || equipment?.image || '/assets/images/no_image.png'}
          alt={equipment?.name || 'Equipment image'}
          className="w-full h-full object-cover"
        />

        {/* Availability Badge */}
        <div className={`absolute top-3 left-3 px-2 py-1 rounded-full text-xs font-medium ${
          equipment?.status === 'available'
            ? 'bg-success text-success-foreground'
            : 'bg-destructive text-destructive-foreground'
        }`}>
          {equipment?.status === 'available' ? 'Available' : 'Booked'}
        </div>

        {/* AI Recommended Badge */}
        {equipment?.is_featured && (
          <div className="absolute top-3 right-3 bg-accent text-accent-foreground px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1">
            <Icon name="Sparkles" size={12} />
            Featured
          </div>
        )}

        {/* Quick Actions */}
        <div className="absolute bottom-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <button className="p-2 bg-background/80 backdrop-blur-sm rounded-full hover:bg-background organic-transition">
            <Icon name="Heart" size={16} />
          </button>
          <button className="p-2 bg-background/80 backdrop-blur-sm rounded-full hover:bg-background organic-transition">
            <Icon name="Share2" size={16} />
          </button>
        </div>
      </div>
      {/* Content Section */}
      <div className="p-4">
        {/* Header */}
        <div className="flex justify-between items-start mb-2">
          <div>
            <h3 className="font-semibold text-foreground mb-1 line-clamp-1">
              {equipment?.name}
            </h3>
            <p className="text-sm text-muted-foreground">
              {equipment?.category?.name || equipment?.category}
            </p>
          </div>
          <div className="text-right">
            <div className="text-lg font-bold text-primary">
              {formatPrice(equipment?.price_per_day)}/day
            </div>
            {equipment?.originalPrice && (
              <div className="text-sm text-muted-foreground line-through">
                {formatPrice(equipment?.originalPrice)}
              </div>
            )}
          </div>
        </div>

        {/* Rating and Reviews */}
        <div className="flex items-center gap-2 mb-3">
          <div className="flex items-center gap-1">
            {renderStars(equipment?.rating_average || 0)}
          </div>
          <span className="text-sm font-medium">{equipment?.rating_average || 0}</span>
          <span className="text-sm text-muted-foreground">
            ({equipment?.rating_count || 0} reviews)
          </span>
        </div>

        {/* Location and Distance */}
        <div className="flex items-center gap-2 mb-3 text-sm text-muted-foreground">
          <Icon name="MapPin" size={14} />
          <span>
            {equipment?.location && typeof equipment.location === 'object'
              ? `${equipment.location.city || ''}, ${equipment.location.state || ''}`.trim().replace(/^,|,$/, '')
              : 'Location not available'
            }
          </span>
          <span>•</span>
          <span>{equipment?.distance || 0} km away</span>
        </div>

        {/* Features */}
        <div className="flex flex-wrap gap-1 mb-4">
          {equipment?.features?.slice(0, 3)?.map((feature, index) => (
            <span
              key={index}
              className="px-2 py-1 bg-muted text-muted-foreground text-xs rounded-full"
            >
              {feature}
            </span>
          ))}
          {equipment?.features?.length > 3 && (
            <span className="px-2 py-1 bg-muted text-muted-foreground text-xs rounded-full">
              +{equipment?.features?.length - 3} more
            </span>
          )}
        </div>

        {/* Owner Info */}
        <div className="flex items-center gap-2 mb-4">
          <Image
            src={equipment?.owner?.profile_image_url || '/assets/images/no_image.png'}
            alt={equipment?.owner?.full_name || 'Owner'}
            className="w-6 h-6 rounded-full"
          />
          <span className="text-sm text-muted-foreground">
            by {equipment?.owner?.full_name || 'Unknown Owner'}
          </span>
          {equipment?.owner?.is_verified && (
            <Icon name="BadgeCheck" size={14} className="text-success" />
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2">
          <Link to={`/equipment-detail/${equipment?.id}`} className="flex-1">
            <Button variant="outline" fullWidth size="sm">
              View Details
            </Button>
          </Link>
          <Button
            variant="default"
            size="sm"
            className="bg-conversion-cta hover:bg-conversion-cta/90"
            disabled={equipment?.status !== 'available'}
          >
            {equipment?.status === 'available' ? 'Book Now' : 'Unavailable'}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default EquipmentCard;