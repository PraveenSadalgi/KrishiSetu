import React, { useState, useEffect } from 'react';
import { useAuth } from '../../../contexts/AuthContext';
import { supabase } from '../../../lib/supabase';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Image from '../../../components/AppImage';

const NotificationCenter = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('all');
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user?.id) {
      loadNotifications();

      // Set up realtime subscriptions for notifications
      const bookingSubscription = supabase
        .channel('notifications-bookings')
        .on('postgres_changes', {
          event: '*',
          schema: 'public',
          table: 'equipment_bookings',
          filter: `owner_id=eq.${user.id}`
        }, () => {
          loadNotifications();
        })
        .on('postgres_changes', {
          event: '*',
          schema: 'public',
          table: 'equipment_bookings',
          filter: `renter_id=eq.${user.id}`
        }, () => {
          loadNotifications();
        })
        .subscribe();

      const paymentSubscription = supabase
        .channel('notifications-payments')
        .on('postgres_changes', {
          event: '*',
          schema: 'public',
          table: 'payments',
          filter: `recipient_id=eq.${user.id}`
        }, () => {
          loadNotifications();
        })
        .subscribe();

      return () => {
        bookingSubscription.unsubscribe();
        paymentSubscription.unsubscribe();
      };
    }
  }, [user]);

  const loadNotifications = async () => {
    try {
      setLoading(true);

      // Get recent bookings (as owner)
      const { data: bookings, error: bookingsError } = await supabase
        .from('equipment_bookings')
        .select(`
          id,
          status,
          created_at,
          start_date,
          end_date,
          total_amount,
          equipment!inner(name),
          renter:profiles!renter_id(full_name, avatar_url)
        `)
        .eq('owner_id', user.id)
        .order('created_at', { ascending: false })
        .limit(10);

      if (bookingsError) throw bookingsError;

      // Get recent payments (as recipient)
      const { data: payments, error: paymentsError } = await supabase
        .from('payments')
        .select(`
          id,
          amount,
          created_at,
          status,
          booking:equipment_bookings!inner(
            equipment!inner(name),
            renter:profiles!renter_id(full_name)
          )
        `)
        .eq('recipient_id', user.id)
        .eq('status', 'completed')
        .order('created_at', { ascending: false })
        .limit(10);

      if (paymentsError) throw paymentsError;

      // Process notifications
      const processedNotifications = [];

      // Add booking notifications
      bookings?.forEach(booking => {
        const isNew = booking.status === 'pending';
        const timeAgo = getTimeAgo(new Date(booking.created_at));

        processedNotifications.push({
          id: `booking-${booking.id}`,
          type: 'booking',
          title: isNew ? "New Booking Request" : "Booking Update",
          message: `${booking.renter?.full_name || 'Someone'} ${isNew ? 'wants to rent' : 'updated booking for'} your ${booking.equipment?.name}`,
          timestamp: timeAgo,
          isRead: !isNew,
          avatar: booking.renter?.avatar_url,
          avatarAlt: `Avatar of ${booking.renter?.full_name}`,
          actionRequired: booking.status === 'pending'
        });
      });

      // Add payment notifications
      payments?.forEach(payment => {
        const timeAgo = getTimeAgo(new Date(payment.created_at));

        processedNotifications.push({
          id: `payment-${payment.id}`,
          type: 'payment',
          title: "Payment Received",
          message: `₹${payment.amount} received from ${payment.booking?.renter?.full_name || 'Someone'} for ${payment.booking?.equipment?.name} rental`,
          timestamp: timeAgo,
          isRead: false,
          avatar: payment.booking?.renter?.avatar_url,
          avatarAlt: `Avatar of ${payment.booking?.renter?.full_name}`,
          actionRequired: false
        });
      });

      // Sort by timestamp (most recent first)
      processedNotifications.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));

      setNotifications(processedNotifications);
    } catch (err) {
      console.error('Error loading notifications:', err);
      // Fallback to mock data on error
      setNotifications([
        {
          id: 1,
          type: 'booking',
          title: "New Booking Request",
          message: "Rajesh Kumar wants to rent your John Deere Tractor for 5 days",
          timestamp: "2 minutes ago",
          isRead: false,
          avatar: "https://images.unsplash.com/photo-1618499607072-622f1eec6194",
          avatarAlt: "Middle-aged Indian farmer with mustache wearing white kurta smiling at camera",
          actionRequired: true
        },
        {
          id: 2,
          type: 'payment',
          title: "Payment Received",
          message: "₹2,500 received from Priya Sharma for Harvester rental",
          timestamp: "1 hour ago",
          isRead: false,
          avatar: "https://images.unsplash.com/photo-1686931102593-4c5af482fa38",
          avatarAlt: "Young Indian woman farmer with traditional dupatta smiling confidently outdoors",
          actionRequired: false
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const getTimeAgo = (date) => {
    const now = new Date();
    const diffInSeconds = Math.floor((now - date) / 1000);

    if (diffInSeconds < 60) return `${diffInSeconds} seconds ago`;
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} minutes ago`;
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)} hours ago`;
    return `${Math.floor(diffInSeconds / 86400)} days ago`;
  };

  const tabs = [
  { id: 'all', label: 'All', count: notifications?.length },
  { id: 'unread', label: 'Unread', count: notifications?.filter((n) => !n?.isRead)?.length },
  { id: 'action', label: 'Action Required', count: notifications?.filter((n) => n?.actionRequired)?.length }];


  const getNotificationIcon = (type) => {
    switch (type) {
      case 'booking':
        return 'Calendar';
      case 'payment':
        return 'CreditCard';
      case 'maintenance':
        return 'Settings';
      case 'review':
        return 'Star';
      case 'community':
        return 'Users';
      default:
        return 'Bell';
    }
  };

  const getNotificationColor = (type) => {
    switch (type) {
      case 'booking':
        return 'text-primary bg-primary/10';
      case 'payment':
        return 'text-success bg-success/10';
      case 'maintenance':
        return 'text-warning bg-warning/10';
      case 'review':
        return 'text-secondary bg-secondary/10';
      case 'community':
        return 'text-accent bg-accent/10';
      default:
        return 'text-muted-foreground bg-muted';
    }
  };

  const filteredNotifications = notifications?.filter((notification) => {
    if (activeTab === 'unread') return !notification?.isRead;
    if (activeTab === 'action') return notification?.actionRequired;
    return true;
  });

  return (
    <div className="bg-card border border-border rounded-lg shadow-organic">
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-foreground">Notifications</h2>
          <Button variant="ghost" size="sm">
            <Icon name="Settings" size={18} />
          </Button>
        </div>

        {/* Tabs */}
        <div className="flex space-x-1 bg-muted rounded-lg p-1">
          {tabs?.map((tab) =>
          <button
            key={tab?.id}
            onClick={() => setActiveTab(tab?.id)}
            className={`flex-1 px-3 py-2 text-sm font-medium rounded-md organic-transition ${
            activeTab === tab?.id ?
            'bg-background text-foreground shadow-sm' :
            'text-muted-foreground hover:text-foreground'}`
            }>

              <span>{tab?.label}</span>
              {tab?.count > 0 &&
            <span className={`ml-2 px-2 py-0.5 text-xs rounded-full ${
            activeTab === tab?.id ? 'bg-primary text-primary-foreground' : 'bg-muted-foreground/20'}`
            }>
                  {tab?.count}
                </span>
            }
            </button>
          )}
        </div>
      </div>
      <div className="max-h-96 overflow-y-auto">
        {filteredNotifications?.length === 0 ?
        <div className="p-8 text-center">
            <Icon name="Bell" size={48} className="text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground">No notifications found</p>
          </div> :

        <div className="divide-y divide-border">
            {filteredNotifications?.map((notification) =>
          <div
            key={notification?.id}
            className={`p-4 hover:bg-muted/50 organic-transition ${
            !notification?.isRead ? 'bg-primary/5' : ''}`
            }>

                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0">
                    {notification?.avatar ?
                <Image
                  src={notification?.avatar}
                  alt={notification?.avatarAlt}
                  className="w-10 h-10 rounded-full object-cover" /> :


                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${getNotificationColor(notification?.type)}`}>
                        <Icon name={getNotificationIcon(notification?.type)} size={18} />
                      </div>
                }
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h4 className="text-sm font-medium text-foreground">{notification?.title}</h4>
                        <p className="text-sm text-muted-foreground mt-1">{notification?.message}</p>
                        <p className="text-xs text-muted-foreground mt-2">{notification?.timestamp}</p>
                      </div>

                      <div className="flex items-center space-x-2 ml-4">
                        {!notification?.isRead &&
                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                    }
                        {notification?.actionRequired &&
                    <div className="flex space-x-1">
                            <Button variant="outline" size="sm">
                              <Icon name="Check" size={14} />
                            </Button>
                            <Button variant="ghost" size="sm">
                              <Icon name="X" size={14} />
                            </Button>
                          </div>
                    }
                      </div>
                    </div>
                  </div>
                </div>
              </div>
          )}
          </div>
        }
      </div>
      {filteredNotifications?.length > 0 &&
      <div className="p-4 border-t border-border">
          <Button variant="ghost" fullWidth size="sm">
            Mark All as Read
          </Button>
        </div>
      }
    </div>);

};

export default NotificationCenter;