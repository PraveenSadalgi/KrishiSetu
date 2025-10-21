import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const EquipmentOverview = () => {
  const equipment = [
  {
    id: 1,
    name: "John Deere Tractor 5050D",
    category: "Tractor",
    status: "rented",
    image: "https://images.unsplash.com/photo-1622422931446-6e5c3a2610b1",
    imageAlt: "Green John Deere tractor in agricultural field with clear blue sky background",
    currentRenter: "Rajesh Kumar",
    rentalEndDate: "2025-01-20",
    monthlyEarnings: "₹12,500",
    utilizationRate: 85,
    nextMaintenance: "2025-02-15"
  },
  {
    id: 2,
    name: "Mahindra Harvester",
    category: "Harvester",
    status: "available",
    image: "https://images.unsplash.com/photo-1731603363718-9c74f6531a21",
    imageAlt: "Red Mahindra combine harvester working in golden wheat field during harvest season",
    currentRenter: null,
    rentalEndDate: null,
    monthlyEarnings: "₹8,200",
    utilizationRate: 65,
    nextMaintenance: "2025-03-10"
  },
  {
    id: 3,
    name: "Rotary Tiller",
    category: "Tiller",
    status: "maintenance",
    image: "https://images.unsplash.com/photo-1723585647220-731072d1c0c9",
    imageAlt: "Orange rotary tiller attachment working soil in prepared agricultural field",
    currentRenter: null,
    rentalEndDate: null,
    monthlyEarnings: "₹4,800",
    utilizationRate: 45,
    nextMaintenance: "In Progress"
  }];


  const getStatusColor = (status) => {
    switch (status) {
      case 'rented':
        return 'bg-success/10 text-success border-success/20';
      case 'available':
        return 'bg-primary/10 text-primary border-primary/20';
      case 'maintenance':
        return 'bg-warning/10 text-warning border-warning/20';
      default:
        return 'bg-muted text-muted-foreground border-border';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'rented':
        return 'UserCheck';
      case 'available':
        return 'CheckCircle';
      case 'maintenance':
        return 'Settings';
      default:
        return 'Circle';
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg shadow-organic">
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold text-foreground">My Equipment</h2>
          <Button variant="outline" size="sm">
            <Icon name="Plus" size={16} />
            Add Equipment
          </Button>
        </div>
      </div>
      <div className="divide-y divide-border">
        {equipment?.map((item) =>
        <div key={item?.id} className="p-6 hover:bg-muted/50 organic-transition">
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0">
                <Image
                src={item?.image}
                alt={item?.imageAlt}
                className="w-20 h-20 rounded-lg object-cover" />

              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="text-lg font-medium text-foreground">{item?.name}</h3>
                    <p className="text-sm text-muted-foreground">{item?.category}</p>
                  </div>
                  
                  <div className={`px-3 py-1 rounded-full border text-xs font-medium ${getStatusColor(item?.status)}`}>
                    <div className="flex items-center space-x-1">
                      <Icon name={getStatusIcon(item?.status)} size={12} />
                      <span className="capitalize">{item?.status}</span>
                    </div>
                  </div>
                </div>

                {item?.status === 'rented' &&
              <div className="bg-success/5 border border-success/20 rounded-lg p-3 mb-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-success">Currently Rented</p>
                        <p className="text-xs text-muted-foreground">Renter: {item?.currentRenter}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-xs text-muted-foreground">Returns on</p>
                        <p className="text-sm font-medium text-foreground">{item?.rentalEndDate}</p>
                      </div>
                    </div>
                  </div>
              }

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
                  <div className="text-center p-3 bg-muted/30 rounded-lg">
                    <p className="text-xs text-muted-foreground">Monthly Earnings</p>
                    <p className="text-lg font-semibold text-foreground">{item?.monthlyEarnings}</p>
                  </div>
                  
                  <div className="text-center p-3 bg-muted/30 rounded-lg">
                    <p className="text-xs text-muted-foreground">Utilization Rate</p>
                    <div className="flex items-center justify-center space-x-2 mt-1">
                      <div className="w-16 h-2 bg-muted rounded-full overflow-hidden">
                        <div
                        className="h-full bg-primary rounded-full progress-fill"
                        style={{ width: `${item?.utilizationRate}%` }}>
                      </div>
                      </div>
                      <span className="text-sm font-medium text-foreground">{item?.utilizationRate}%</span>
                    </div>
                  </div>
                  
                  <div className="text-center p-3 bg-muted/30 rounded-lg">
                    <p className="text-xs text-muted-foreground">Next Maintenance</p>
                    <p className="text-sm font-medium text-foreground">{item?.nextMaintenance}</p>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Button variant="ghost" size="sm">
                      <Icon name="Eye" size={16} />
                      View Details
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Icon name="Edit" size={16} />
                      Edit
                    </Button>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    {item?.status === 'available' &&
                  <Button variant="outline" size="sm">
                        <Icon name="Share2" size={16} />
                        Promote
                      </Button>
                  }
                    <Button variant="ghost" size="sm">
                      <Icon name="MoreHorizontal" size={16} />
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
          Manage All Equipment
        </Button>
      </div>
    </div>);

};

export default EquipmentOverview;