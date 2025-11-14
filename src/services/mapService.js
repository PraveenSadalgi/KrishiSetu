import { setOptions, importLibrary } from '@googlemaps/js-api-loader';

class MapService {
  constructor() {
    this.google = null;
    this.map = null;
    this.markers = [];
    this.infoWindows = [];
    this.isInitialized = false;
  }

  async initialize() {
    if (this.isInitialized) return this.google;

    try {
      // Set API options
      setOptions({
        apiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
        version: 'weekly',
        libraries: ['places', 'geometry']
      });

      // Import the Maps library
      const { Map } = await importLibrary('maps');
      const { Marker } = await importLibrary('marker');

      this.google = {
        maps: {
          Map,
          Marker,
          InfoWindow: (await importLibrary('maps')).InfoWindow,
          LatLng: (await importLibrary('core')).LatLng,
          LatLngBounds: (await importLibrary('core')).LatLngBounds,
          Size: (await importLibrary('core')).Size,
          Point: (await importLibrary('core')).Point,
          SymbolPath: (await importLibrary('core')).SymbolPath,
          Animation: (await importLibrary('core')).Animation
        },
        geometry: await importLibrary('geometry')
      };

      this.isInitialized = true;
      return this.google;
    } catch (error) {
      console.error('Failed to initialize Google Maps:', error);
      throw error;
    }
  }

  async createMap(container, options = {}) {
    await this.initialize();

    const defaultOptions = {
      center: { lat: 12.9716, lng: 77.5946 }, // Bangalore
      zoom: 10,
      mapTypeControl: false,
      streetViewControl: false,
      fullscreenControl: true,
      zoomControl: true,
      gestureHandling: 'greedy',
      styles: [
        {
          featureType: 'poi',
          elementType: 'labels',
          stylers: [{ visibility: 'off' }]
        }
      ]
    };

    this.map = new this.google.maps.Map(container, { ...defaultOptions, ...options });
    return this.map;
  }

  clearMarkers() {
    this.markers.forEach(marker => marker.setMap(null));
    this.markers = [];
    this.infoWindows.forEach(infoWindow => infoWindow.close());
    this.infoWindows = [];
  }

  addEquipmentMarkers(equipmentList, onMarkerClick) {
    if (!this.map || !this.google) return;

    this.clearMarkers();

    equipmentList.forEach((equipment) => {
      const position = this.extractCoordinates(equipment.location);

      if (!position) return;

      const marker = new this.google.maps.Marker({
        position,
        map: this.map,
        title: equipment.name,
        icon: {
          url: this.getMarkerIcon(equipment.isAvailable),
          scaledSize: new this.google.maps.Size(40, 40),
          anchor: new this.google.maps.Point(20, 40)
        },
        animation: this.google.maps.Animation.DROP
      });

      // Create info window
      const infoWindow = new this.google.maps.InfoWindow({
        content: this.createInfoWindowContent(equipment)
      });

      // Add click listener
      marker.addListener('click', () => {
        // Close other info windows
        this.infoWindows.forEach(iw => iw.close());

        infoWindow.open(this.map, marker);

        if (onMarkerClick) {
          onMarkerClick(equipment);
        }
      });

      this.markers.push(marker);
      this.infoWindows.push(infoWindow);
    });

    // Fit bounds to show all markers
    if (this.markers.length > 0) {
      const bounds = new this.google.maps.LatLngBounds();
      this.markers.forEach(marker => bounds.extend(marker.getPosition()));
      this.map.fitBounds(bounds);

      // Don't zoom in too much for single marker
      const listener = this.google.maps.event.addListener(this.map, 'idle', () => {
        if (this.map.getZoom() > 15) this.map.setZoom(15);
        this.google.maps.event.removeListener(listener);
      });
    }
  }

  extractCoordinates(location) {
    if (!location) return null;

    // Try coordinates field first
    if (location.coordinates && Array.isArray(location.coordinates)) {
      return {
        lat: location.coordinates[0],
        lng: location.coordinates[1]
      };
    }

    // Fallback to geocoding if address is available
    if (location.address) {
      // For now, return null - we'll implement geocoding later
      return null;
    }

    return null;
  }

  getMarkerIcon(isAvailable) {
    // Create custom marker icons based on availability
    const color = isAvailable ? '#10b981' : '#ef4444'; // green or red

    // Create SVG marker
    const svg = `
      <svg width="40" height="40" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">
        <circle cx="20" cy="20" r="18" fill="${color}" stroke="white" stroke-width="3"/>
        <path d="M20 8 L28 16 L20 24 L12 16 Z" fill="white"/>
      </svg>
    `;

    return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;
  }

  createInfoWindowContent(equipment) {
    const formatPrice = (price) => {
      return new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR',
        maximumFractionDigits: 0
      }).format(price);
    };

    return `
      <div style="max-width: 250px; font-family: system-ui, sans-serif;">
        <div style="display: flex; gap: 12px; margin-bottom: 8px;">
          <img
            src="${equipment.images?.[0] || '/assets/images/no_image.png'}"
            alt="${equipment.name}"
            style="width: 60px; height: 60px; border-radius: 8px; object-fit: cover;"
          />
          <div style="flex: 1;">
            <h4 style="margin: 0; font-size: 14px; font-weight: 600; color: #1f2937;">
              ${equipment.name}
            </h4>
            <p style="margin: 4px 0; font-size: 12px; color: #6b7280;">
              ${equipment.location?.city || 'Location not available'}
            </p>
            <div style="display: flex; align-items: center; gap: 4px; margin-top: 4px;">
              <span style="font-size: 12px; color: #f59e0b;">★</span>
              <span style="font-size: 12px; font-weight: 500;">${equipment.rating || 'N/A'}</span>
            </div>
          </div>
        </div>
        <div style="display: flex; justify-content: space-between; align-items: center;">
          <div style="font-size: 16px; font-weight: 700; color: #059669;">
            ${formatPrice(equipment.pricePerDay)}/day
          </div>
          <span style="
            padding: 4px 8px;
            border-radius: 12px;
            font-size: 10px;
            font-weight: 500;
            background: ${equipment.isAvailable ? '#dcfce7' : '#fef2f2'};
            color: ${equipment.isAvailable ? '#166534' : '#991b1b'};
          ">
            ${equipment.isAvailable ? 'Available' : 'Booked'}
          </span>
        </div>
      </div>
    `;
  }

  // Geocoding utility
  async geocodeAddress(address) {
    await this.initialize();

    const geocoder = new this.google.maps.Geocoder();

    return new Promise((resolve, reject) => {
      geocoder.geocode({ address }, (results, status) => {
        if (status === 'OK' && results[0]) {
          const location = results[0].geometry.location;
          resolve({
            lat: location.lat(),
            lng: location.lng(),
            formattedAddress: results[0].formatted_address
          });
        } else {
          reject(new Error(`Geocoding failed: ${status}`));
        }
      });
    });
  }

  // Calculate distance between two points
  calculateDistance(point1, point2) {
    if (!this.google) return null;

    const p1 = new this.google.maps.LatLng(point1.lat, point1.lng);
    const p2 = new this.google.maps.LatLng(point2.lat, point2.lng);

    return this.google.maps.geometry.spherical.computeDistanceBetween(p1, p2) / 1000; // in km
  }

  // Add user location marker
  addUserLocationMarker(position, title = "Your Location") {
    if (!this.map || !this.google) return;

    const marker = new this.google.maps.Marker({
      position,
      map: this.map,
      title,
      icon: {
        path: this.google.maps.SymbolPath.CIRCLE,
        scale: 8,
        fillColor: '#3b82f6',
        fillOpacity: 1,
        strokeColor: 'white',
        strokeWeight: 2
      }
    });

    this.markers.push(marker);
    return marker;
  }

  // Get user's current location
  async getCurrentLocation() {
    return new Promise((resolve, reject) => {
      if (!navigator.geolocation) {
        reject(new Error('Geolocation is not supported'));
        return;
      }

      navigator.geolocation.getCurrentPosition(
        (position) => {
          resolve({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          });
        },
        (error) => {
          reject(error);
        },
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 300000 // 5 minutes
        }
      );
    });
  }
}

export const mapService = new MapService();
export default mapService;
