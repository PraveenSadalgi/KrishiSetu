import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Image from '../../../components/AppImage';

const NotificationCenter = () => {
  const [activeTab, setActiveTab] = useState('all');

  const notifications = [
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
  },
  {
    id: 3,
    type: 'maintenance',
    title: "Maintenance Reminder",
    message: "Your Rotary Tiller is due for maintenance in 3 days",
    timestamp: "3 hours ago",
    isRead: true,
    avatar: null,
    avatarAlt: null,
    actionRequired: true
  },
  {
    id: 4,
    type: 'review',
    title: "New Review Received",
    message: "Amit Patel left a 5-star review for your Tractor",
    timestamp: "1 day ago",
    isRead: true,
    avatar: "https://images.unsplash.com/photo-1674702140113-ac1235dcb274",
    avatarAlt: "Elderly Indian farmer with white beard wearing traditional white shirt in rural setting",
    actionRequired: false
  },
  {
    id: 5,
    type: 'community',
    title: "Community Update",
    message: "New farming technique shared in your local community group",
    timestamp: "2 days ago",
    isRead: true,
    avatar: null,
    avatarAlt: null,
    actionRequired: false
  }];


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