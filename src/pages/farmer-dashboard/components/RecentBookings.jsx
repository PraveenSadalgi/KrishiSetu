import React, { useState, useEffect } from 'react';
import { useAuth } from '../../../contexts/AuthContext';
import { profileService } from '../../../services/profileService';
import { supabase } from '../../../lib/supabase';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const RecentBookings = () => {
  const { user } = useAuth();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (user?.id) {
      loadBookings();

      // Set up realtime subscription for bookings
      const subscription = supabase
        .channel('recent-bookings-realtime')
        .on('postgres_changes', {
          event: '*',
          schema: 'public',
          table: 'equipment_bookings',
          filter: `owner_id=eq.${user.id}`
        }, (payload) => {
          console.log('Booking change detected:', payload);
          loadBookings(); // Reload bookings on any change
        })
        .on('postgres_changes', {
          event: '*',
          schema: 'public',
          table: 'equipment_bookings',
          filter: `renter_id=eq.${user.id}`
        }, (payload) => {
          console.log('Booking change detected (as renter):', payload);
          loadBookings(); // Reload bookings on any change
        })
        .subscribe();

      return () => {
        subscription.unsubscribe();
      };
    }
  }, [user]);

  const loadBookings = async () => {
    try {
      setLoading(true);
      const result = await profileService.getProfileWithBookings(user.id);
      if (result.bookings) {
        // Transform bookings to match the expected format
        const transformedBookings = result.bookings.slice(0, 3).map(booking => ({
          id: booking.id,
          equipmentName: booking.equipment?.name || 'Unknown Equipment',
          renterName: booking.renter_id === user.id ? booking.owner?.full_name : booking.renter?.full_name,
          renterAvatar: booking.renter_id === user.id ? booking.owner?.profile_image_url : booking.renter?.profile_image_url,
          renterAvatarAlt: booking.renter_id === user.id ? `Profile of ${booking.owner?.full_name}` : `Profile of ${booking.renter?.full_name}`,
          startDate: booking.start_date,
          endDate: booking.end_date,
          status: booking.status,
          amount: `₹${booking.total_amount}`,
          location: booking.equipment?.location?.address || 'Location not specified',
          equipmentImage: booking.equipment?.images?.[0] || '/assets/images/no_image.png',
          equipmentImageAlt: `Image of ${booking.equipment?.name || 'equipment'}`
        }));
        setBookings(transformedBookings);
      }
    } catch (err) {
      console.error('Error loading bookings:', err);
      setError('Failed to load bookings');
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'active':
        return 'bg-success/10 text-success border-success/20';
      case 'pending':
        return 'bg-warning/10 text-warning border-warning/20';
      case 'completed':
        return 'bg-muted text-muted-foreground border-border';
      default:
        return 'bg-muted text-muted-foreground border-border';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'active':
        return 'Play';
      case 'pending':
        return 'Clock';
      case 'completed':
        return 'CheckCircle';
      default:
        return 'Circle';
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg shadow-organic">
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold text-foreground">Recent Bookings</h2>
          <Button variant="ghost" size="sm">
            <Icon name="MoreHorizontal" size={18} />
          </Button>
        </div>
      </div>
      <div className="divide-y divide-border">
        {loading ? (
          <div className="p-6 text-center">
            <Icon name="Loader2" size={24} className="animate-spin text-muted-foreground mx-auto mb-2" />
            <p className="text-muted-foreground">Loading bookings...</p>
          </div>
        ) : error ? (
          <div className="p-6 text-center">
            <Icon name="AlertCircle" size={24} className="text-destructive mx-auto mb-2" />
            <p className="text-destructive">{error}</p>
          </div>
        ) : bookings.length === 0 ? (
          <div className="p-6 text-center">
            <Icon name="Calendar" size={48} className="text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium text-foreground mb-2">No bookings yet</h3>
            <p className="text-muted-foreground">Your recent bookings will appear here once you start renting equipment.</p>
          </div>
        ) : (
          bookings?.map((booking) => (
            <div key={booking?.id} className="p-6 hover:bg-muted/50 organic-transition">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <Image
                    src={booking?.equipmentImage}
                    alt={booking?.equipmentImageAlt}
                    className="w-16 h-16 rounded-lg object-cover"
                  />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className="text-lg font-medium text-foreground truncate">
                        {booking?.equipmentName}
                      </h3>
                      <div className="flex items-center space-x-2 mt-1">
                        <Image
                          src={booking?.renterAvatar}
                          alt={booking?.renterAvatarAlt}
                          className="w-6 h-6 rounded-full object-cover"
                        />
                        <span className="text-sm text-muted-foreground">{booking?.renterName}</span>
                      </div>
                    </div>

                    <div className="flex items-center space-x-3">
                      <span className="text-lg font-semibold text-foreground">{booking?.amount}</span>
                      <div className={`px-3 py-1 rounded-full border text-xs font-medium ${getStatusColor(booking?.status)}`}>
                        <div className="flex items-center space-x-1">
                          <Icon name={getStatusIcon(booking?.status)} size={12} />
                          <span className="capitalize">{booking?.status}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-1">
                        <Icon name="Calendar" size={14} />
                        <span>{booking?.startDate} to {booking?.endDate}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Icon name="MapPin" size={14} />
                        <span>{booking?.location}</span>
                      </div>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Button variant="ghost" size="sm">
                        <Icon name="MessageCircle" size={16} />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Icon name="Phone" size={16} />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
      <div className="p-6 border-t border-border">
        <Button variant="outline" fullWidth>
          View All Bookings
        </Button>
      </div>
    </div>);

};

export default RecentBookings;