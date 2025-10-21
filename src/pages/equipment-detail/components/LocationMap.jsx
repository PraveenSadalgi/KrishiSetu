import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const LocationMap = ({ location, deliveryRadius, deliveryOptions }) => {
  const [selectedDeliveryOption, setSelectedDeliveryOption] = useState('pickup');

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <h3 className="text-lg font-semibold mb-4 flex items-center">
        <Icon name="MapPin" size={20} className="mr-2 text-primary" />
        Location & Delivery
      </h3>
      {/* Map Container */}
      <div className="relative bg-muted rounded-lg overflow-hidden h-64 mb-4">
        <iframe
          width="100%"
          height="100%"
          loading="lazy"
          title={location?.address}
          referrerPolicy="no-referrer-when-downgrade"
          src={`https://www.google.com/maps?q=${location?.lat},${location?.lng}&z=14&output=embed`}
          className="border-0"
        />
        
        {/* Delivery Radius Overlay */}
        <div className="absolute top-4 left-4 bg-background/90 backdrop-blur-sm px-3 py-2 rounded-lg">
          <div className="flex items-center space-x-2 text-sm">
            <div className="w-3 h-3 bg-primary rounded-full"></div>
            <span>Free delivery within {deliveryRadius}km</span>
          </div>
        </div>
      </div>
      {/* Location Details */}
      <div className="space-y-3 mb-4">
        <div className="flex items-start space-x-3">
          <Icon name="MapPin" size={16} className="text-muted-foreground mt-1" />
          <div>
            <p className="font-medium">{location?.address}</p>
            <p className="text-sm text-muted-foreground">{location?.city}, {location?.state} - {location?.pincode}</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-3">
          <Icon name="Clock" size={16} className="text-muted-foreground" />
          <span className="text-sm">Available for pickup: {location?.availableHours}</span>
        </div>
      </div>
      {/* Delivery Options */}
      <div className="space-y-3">
        <h4 className="font-medium">Delivery Options</h4>
        
        {deliveryOptions?.map((option) => (
          <div
            key={option?.id}
            className={`p-3 border rounded-lg cursor-pointer organic-transition ${
              selectedDeliveryOption === option?.id
                ? 'border-primary bg-primary/5' :'border-border hover:border-primary/50'
            }`}
            onClick={() => setSelectedDeliveryOption(option?.id)}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className={`w-4 h-4 rounded-full border-2 ${
                  selectedDeliveryOption === option?.id
                    ? 'border-primary bg-primary' :'border-muted-foreground'
                }`}>
                  {selectedDeliveryOption === option?.id && (
                    <div className="w-2 h-2 bg-white rounded-full m-0.5"></div>
                  )}
                </div>
                <div>
                  <p className="font-medium text-sm">{option?.title}</p>
                  <p className="text-xs text-muted-foreground">{option?.description}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-medium text-sm">{option?.price}</p>
                <p className="text-xs text-muted-foreground">{option?.duration}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
      {/* Distance Calculator */}
      <div className="mt-4 pt-4 border-t border-border">
        <div className="flex items-center space-x-2 mb-3">
          <Icon name="Navigation" size={16} className="text-primary" />
          <span className="font-medium text-sm">Calculate Distance</span>
        </div>
        
        <div className="flex space-x-2">
          <input
            type="text"
            placeholder="Enter your location"
            className="flex-1 px-3 py-2 border border-border rounded-lg text-sm bg-background"
          />
          <Button variant="outline" size="sm">
            <Icon name="Search" size={16} />
          </Button>
        </div>
      </div>
      {/* Contact for Delivery */}
      <div className="mt-4 p-3 bg-muted/50 rounded-lg">
        <div className="flex items-center space-x-2 mb-2">
          <Icon name="Info" size={16} className="text-primary" />
          <span className="font-medium text-sm">Delivery Information</span>
        </div>
        <p className="text-xs text-muted-foreground mb-2">
          Delivery charges may vary based on distance and equipment size. Contact owner for exact pricing.
        </p>
        <Button variant="ghost" size="sm" className="text-xs">
          Contact Owner for Custom Delivery
        </Button>
      </div>
    </div>
  );
};

export default LocationMap;