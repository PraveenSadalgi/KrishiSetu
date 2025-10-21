import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const RecentBookings = () => {
  const bookings = [
  {
    id: 1,
    equipmentName: "John Deere Tractor 5050D",
    renterName: "Rajesh Kumar",
    renterAvatar: "https://images.unsplash.com/photo-1618499607072-622f1eec6194",
    renterAvatarAlt: "Middle-aged Indian farmer with mustache wearing white kurta smiling at camera",
    startDate: "2025-01-15",
    endDate: "2025-01-20",
    status: "active",
    amount: "₹2,500",
    location: "Pune, Maharashtra",
    equipmentImage: "https://images.unsplash.com/photo-1622422931446-6e5c3a2610b1",
    equipmentImageAlt: "Green John Deere tractor in agricultural field with clear blue sky background"
  },
  {
    id: 2,
    equipmentName: "Mahindra Harvester",
    renterName: "Priya Sharma",
    renterAvatar: "https://images.unsplash.com/photo-1686931102593-4c5af482fa38",
    renterAvatarAlt: "Young Indian woman farmer with traditional dupatta smiling confidently outdoors",
    startDate: "2025-01-18",
    endDate: "2025-01-22",
    status: "pending",
    amount: "₹4,200",
    location: "Nashik, Maharashtra",
    equipmentImage: "https://images.unsplash.com/photo-1731603363718-9c74f6531a21",
    equipmentImageAlt: "Red Mahindra combine harvester working in golden wheat field during harvest season"
  },
  {
    id: 3,
    equipmentName: "Rotary Tiller",
    renterName: "Amit Patel",
    renterAvatar: "https://images.unsplash.com/photo-1674702140113-ac1235dcb274",
    renterAvatarAlt: "Elderly Indian farmer with white beard wearing traditional white shirt in rural setting",
    startDate: "2025-01-12",
    endDate: "2025-01-14",
    status: "completed",
    amount: "₹1,800",
    location: "Aurangabad, Maharashtra",
    equipmentImage: "https://images.unsplash.com/photo-1723585647220-731072d1c0c9",
    equipmentImageAlt: "Orange rotary tiller attachment working soil in prepared agricultural field"
  }];


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
        {bookings?.map((booking) =>
        <div key={booking?.id} className="p-6 hover:bg-muted/50 organic-transition">
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0">
                <Image
                src={booking?.equipmentImage}
                alt={booking?.equipmentImageAlt}
                className="w-16 h-16 rounded-lg object-cover" />

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
                      className="w-6 h-6 rounded-full object-cover" />

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