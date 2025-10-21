import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const MapView = ({ equipmentList, onEquipmentSelect }) => {
  const [selectedEquipment, setSelectedEquipment] = useState(null);

  // Mock coordinates for demonstration
  const mapCenter = { lat: 12.9716, lng: 77.5946 }; // Bangalore coordinates

  const handleMarkerClick = (equipment) => {
    setSelectedEquipment(equipment);
    onEquipmentSelect(equipment);
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    })?.format(price);
  };

  return (
    <div className="relative h-full bg-muted rounded-lg overflow-hidden">
      {/* Google Maps Iframe */}
      <iframe
        width="100%"
        height="100%"
        loading="lazy"
        title="Equipment Locations Map"
        referrerPolicy="no-referrer-when-downgrade"
        src={`https://www.google.com/maps?q=${mapCenter?.lat},${mapCenter?.lng}&z=12&output=embed`}
        className="border-0"
      />
      {/* Map Controls */}
      <div className="absolute top-4 right-4 flex flex-col gap-2">
        <Button
          variant="outline"
          size="icon"
          className="bg-background/90 backdrop-blur-sm"
          title="Zoom In"
        >
          <Icon name="Plus" size={16} />
        </Button>
        <Button
          variant="outline"
          size="icon"
          className="bg-background/90 backdrop-blur-sm"
          title="Zoom Out"
        >
          <Icon name="Minus" size={16} />
        </Button>
        <Button
          variant="outline"
          size="icon"
          className="bg-background/90 backdrop-blur-sm"
          title="My Location"
        >
          <Icon name="Locate" size={16} />
        </Button>
      </div>
      {/* Equipment Markers Overlay */}
      <div className="absolute inset-0 pointer-events-none">
        {equipmentList?.slice(0, 8)?.map((equipment, index) => (
          <div
            key={equipment?.id}
            className="absolute pointer-events-auto"
            style={{
              left: `${20 + (index % 4) * 20}%`,
              top: `${20 + Math.floor(index / 4) * 30}%`
            }}
          >
            <button
              onClick={() => handleMarkerClick(equipment)}
              className={`relative p-2 rounded-full shadow-lg organic-transition hover:scale-110 ${
                equipment?.isAvailable
                  ? 'bg-success text-success-foreground'
                  : 'bg-destructive text-destructive-foreground'
              }`}
            >
              <Icon name="MapPin" size={20} />
              
              {/* Price Badge */}
              <div className="absolute -top-2 -right-2 bg-background text-foreground text-xs font-medium px-1.5 py-0.5 rounded-full shadow-sm border border-border">
                {formatPrice(equipment?.pricePerDay)?.replace('₹', '₹')}
              </div>
            </button>
          </div>
        ))}
      </div>
      {/* Selected Equipment Info Card */}
      {selectedEquipment && (
        <div className="absolute bottom-4 left-4 right-4 bg-card border border-border rounded-lg p-4 shadow-organic-lg">
          <div className="flex items-start gap-3">
            <img
              src={selectedEquipment?.image}
              alt={selectedEquipment?.imageAlt}
              className="w-16 h-16 rounded-lg object-cover"
            />
            <div className="flex-1 min-w-0">
              <h4 className="font-semibold text-foreground mb-1 truncate">
                {selectedEquipment?.name}
              </h4>
              <p className="text-sm text-muted-foreground mb-2">
                {selectedEquipment?.location} • {selectedEquipment?.distance} km away
              </p>
              <div className="flex items-center justify-between">
                <div className="text-lg font-bold text-primary">
                  {formatPrice(selectedEquipment?.pricePerDay)}/day
                </div>
                <div className="flex items-center gap-1">
                  <Icon name="Star" size={14} className="text-yellow-400 fill-current" />
                  <span className="text-sm font-medium">{selectedEquipment?.rating}</span>
                </div>
              </div>
            </div>
            <button
              onClick={() => setSelectedEquipment(null)}
              className="p-1 text-muted-foreground hover:text-foreground organic-transition"
            >
              <Icon name="X" size={16} />
            </button>
          </div>
          
          <div className="flex gap-2 mt-3">
            <Button variant="outline" size="sm" fullWidth>
              View Details
            </Button>
            <Button 
              variant="default" 
              size="sm"
              className="bg-conversion-cta hover:bg-conversion-cta/90"
              disabled={!selectedEquipment?.isAvailable}
            >
              {selectedEquipment?.isAvailable ? 'Book Now' : 'Unavailable'}
            </Button>
          </div>
        </div>
      )}
      {/* Legend */}
      <div className="absolute top-4 left-4 bg-card border border-border rounded-lg p-3 shadow-organic">
        <h4 className="font-medium text-foreground mb-2 text-sm">Equipment Status</h4>
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-xs">
            <div className="w-3 h-3 bg-success rounded-full"></div>
            <span className="text-muted-foreground">Available</span>
          </div>
          <div className="flex items-center gap-2 text-xs">
            <div className="w-3 h-3 bg-destructive rounded-full"></div>
            <span className="text-muted-foreground">Booked</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MapView;