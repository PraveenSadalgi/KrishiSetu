import React, { useEffect, useRef, useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import { mapService } from '../../../services/mapService';

const MapView = ({ equipmentList, onEquipmentSelect }) => {
  const mapRef = useRef(null);
  const [selectedEquipment, setSelectedEquipment] = useState(null);
  const [mapLoaded, setMapLoaded] = useState(false);
  const [userLocation, setUserLocation] = useState(null);
  const [mapError, setMapError] = useState(null);

  useEffect(() => {
    initializeMap();
  }, []);

  useEffect(() => {
    if (mapLoaded && equipmentList) {
      updateEquipmentMarkers();
    }
  }, [equipmentList, mapLoaded]);

  const initializeMap = async () => {
    try {
      if (!mapRef.current) return;

      await mapService.createMap(mapRef.current);
      setMapLoaded(true);

      // Try to get user's location
      try {
        const location = await mapService.getCurrentLocation();
        setUserLocation(location);
        mapService.addUserLocationMarker(location);
      } catch (locationError) {
        console.warn('Could not get user location:', locationError);
      }
    } catch (error) {
      console.error('Failed to initialize map:', error);
      setMapError('Failed to load Google Maps. Please check your API key.');
    }
  };

  const updateEquipmentMarkers = () => {
    if (!equipmentList || equipmentList.length === 0) return;

    // Transform equipment data to include availability status
    const transformedEquipment = equipmentList.map(equipment => ({
      ...equipment,
      isAvailable: equipment.status === 'available'
    }));

    mapService.addEquipmentMarkers(transformedEquipment, handleMarkerClick);
  };

  const handleMarkerClick = (equipment) => {
    setSelectedEquipment(equipment);
    onEquipmentSelect(equipment);
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(price);
  };

  const handleZoomIn = () => {
    if (mapService.map) {
      const currentZoom = mapService.map.getZoom();
      mapService.map.setZoom(currentZoom + 1);
    }
  };

  const handleZoomOut = () => {
    if (mapService.map) {
      const currentZoom = mapService.map.getZoom();
      mapService.map.setZoom(currentZoom - 1);
    }
  };

  const handleMyLocation = async () => {
    try {
      const location = await mapService.getCurrentLocation();
      setUserLocation(location);

      if (mapService.map) {
        mapService.map.setCenter(location);
        mapService.map.setZoom(14);
      }

      // Add or update user location marker
      mapService.clearMarkers();
      mapService.addUserLocationMarker(location);
      updateEquipmentMarkers();
    } catch (error) {
      console.error('Failed to get location:', error);
      // Could show a toast notification here
    }
  };

  if (mapError) {
    return (
      <div className="h-full bg-muted rounded-lg flex items-center justify-center">
        <div className="text-center p-6">
          <Icon name="AlertTriangle" size={48} className="text-destructive mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-foreground mb-2">Map Unavailable</h3>
          <p className="text-muted-foreground">{mapError}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative h-full bg-muted rounded-lg overflow-hidden">
      {/* Map Container */}
      <div ref={mapRef} className="w-full h-full" />

      {/* Loading Overlay */}
      {!mapLoaded && (
        <div className="absolute inset-0 bg-muted flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full mx-auto mb-4"></div>
            <p className="text-muted-foreground">Loading map...</p>
          </div>
        </div>
      )}

      {/* Map Controls */}
      <div className="absolute top-4 right-4 flex flex-col gap-2">
        <Button
          variant="outline"
          size="icon"
          className="bg-background/90 backdrop-blur-sm hover:bg-background"
          onClick={handleZoomIn}
          title="Zoom In"
        >
          <Icon name="Plus" size={16} />
        </Button>
        <Button
          variant="outline"
          size="icon"
          className="bg-background/90 backdrop-blur-sm hover:bg-background"
          onClick={handleZoomOut}
          title="Zoom Out"
        >
          <Icon name="Minus" size={16} />
        </Button>
        <Button
          variant="outline"
          size="icon"
          className="bg-background/90 backdrop-blur-sm hover:bg-background"
          onClick={handleMyLocation}
          title="My Location"
        >
          <Icon name="Locate" size={16} />
        </Button>
      </div>

      {/* Equipment Count Badge */}
      {equipmentList && equipmentList.length > 0 && (
        <div className="absolute top-4 left-4 bg-background/90 backdrop-blur-sm border border-border rounded-lg px-3 py-2">
          <div className="flex items-center gap-2">
            <Icon name="MapPin" size={16} className="text-primary" />
            <span className="text-sm font-medium">
              {equipmentList.length} equipment{equipmentList.length !== 1 ? 's' : ''} found
            </span>
          </div>
        </div>
      )}

      {/* Selected Equipment Info Card */}
      {selectedEquipment && (
        <div className="absolute bottom-4 left-4 right-4 bg-card border border-border rounded-lg p-4 shadow-organic-lg">
          <div className="flex items-start gap-3">
            <img
              src={selectedEquipment?.images?.[0] || '/assets/images/no_image.png'}
              alt={selectedEquipment?.name}
              className="w-16 h-16 rounded-lg object-cover"
            />
            <div className="flex-1 min-w-0">
              <h4 className="font-semibold text-foreground mb-1 truncate">
                {selectedEquipment?.name}
              </h4>
              <p className="text-sm text-muted-foreground mb-2">
                {selectedEquipment?.location?.city || 'Location not available'}
                {selectedEquipment?.distance && ` • ${selectedEquipment.distance} km away`}
              </p>
              <div className="flex items-center justify-between">
                <div className="text-lg font-bold text-primary">
                  {formatPrice(selectedEquipment?.pricePerDay)}/day
                </div>
                <div className="flex items-center gap-1">
                  <Icon name="Star" size={14} className="text-yellow-400 fill-current" />
                  <span className="text-sm font-medium">
                    {selectedEquipment?.ratingAverage || selectedEquipment?.rating || 'N/A'}
                  </span>
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