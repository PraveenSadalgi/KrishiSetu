import React from 'react';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const OwnerProfile = ({ owner }) => {
  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <h3 className="text-lg font-semibold mb-4">Equipment Owner</h3>
      <div className="flex items-start space-x-4">
        {/* Owner Avatar */}
        <div className="relative">
          <Image
            src={owner?.avatar}
            alt={owner?.avatarAlt}
            className="w-16 h-16 rounded-full object-cover"
          />
          {owner?.isVerified && (
            <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-success rounded-full flex items-center justify-center">
              <Icon name="Check" size={12} className="text-white" />
            </div>
          )}
        </div>

        {/* Owner Info */}
        <div className="flex-1">
          <div className="flex items-center space-x-2 mb-1">
            <h4 className="font-semibold">{owner?.name}</h4>
            {owner?.isVerified && (
              <span className="text-xs bg-success/10 text-success px-2 py-1 rounded-full">
                Verified
              </span>
            )}
          </div>
          
          <p className="text-sm text-muted-foreground mb-2">{owner?.location}</p>
          
          {/* Stats */}
          <div className="flex items-center space-x-4 text-sm">
            <div className="flex items-center space-x-1">
              <Icon name="Star" size={14} className="text-warning fill-current" />
              <span className="font-medium">{owner?.rating}</span>
              <span className="text-muted-foreground">({owner?.reviewCount} reviews)</span>
            </div>
            <div className="text-muted-foreground">
              {owner?.equipmentCount} equipment
            </div>
          </div>
        </div>
      </div>
      {/* Owner Stats */}
      <div className="grid grid-cols-3 gap-4 mt-4 pt-4 border-t border-border">
        <div className="text-center">
          <div className="text-lg font-bold text-primary">{owner?.yearsExperience}</div>
          <div className="text-xs text-muted-foreground">Years Experience</div>
        </div>
        <div className="text-center">
          <div className="text-lg font-bold text-primary">{owner?.totalBookings}</div>
          <div className="text-xs text-muted-foreground">Total Bookings</div>
        </div>
        <div className="text-center">
          <div className="text-lg font-bold text-primary">{owner?.responseTime}</div>
          <div className="text-xs text-muted-foreground">Response Time</div>
        </div>
      </div>
      {/* Contact Actions */}
      <div className="flex space-x-3 mt-4">
        <Button variant="outline" className="flex-1">
          <Icon name="MessageCircle" size={16} className="mr-2" />
          Message
        </Button>
        <Button variant="outline" className="flex-1">
          <Icon name="Phone" size={16} className="mr-2" />
          Call
        </Button>
      </div>
      {/* Recent Reviews Preview */}
      <div className="mt-4 pt-4 border-t border-border">
        <h5 className="font-medium mb-3">Recent Reviews</h5>
        <div className="space-y-3">
          {owner?.recentReviews?.map((review, index) => (
            <div key={index} className="text-sm">
              <div className="flex items-center space-x-2 mb-1">
                <div className="flex">
                  {[...Array(5)]?.map((_, i) => (
                    <Icon
                      key={i}
                      name="Star"
                      size={12}
                      className={i < review?.rating ? 'text-warning fill-current' : 'text-muted-foreground'}
                    />
                  ))}
                </div>
                <span className="text-muted-foreground">by {review?.reviewerName}</span>
              </div>
              <p className="text-muted-foreground">{review?.comment}</p>
            </div>
          ))}
        </div>
        
        <Button variant="ghost" className="w-full mt-3 text-sm">
          View All Reviews
        </Button>
      </div>
    </div>
  );
};

export default OwnerProfile;