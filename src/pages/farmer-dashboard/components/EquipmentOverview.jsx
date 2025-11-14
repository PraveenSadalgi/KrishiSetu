import React, { useState, useEffect } from 'react';
import { useAuth } from '../../../contexts/AuthContext';
import { equipmentService } from '../../../services/equipmentService';
import { supabase } from '../../../lib/supabase';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const EquipmentOverview = () => {
  const { user } = useAuth();
  const [equipment, setEquipment] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (user?.id) {
      loadEquipment();

      // Set up realtime subscription for equipment
      const subscription = supabase
        .channel('equipment-overview-realtime')
        .on('postgres_changes', {
          event: '*',
          schema: 'public',
          table: 'equipment',
          filter: `owner_id=eq.${user.id}`
        }, (payload) => {
          console.log('Equipment change detected:', payload);
          loadEquipment(); // Reload equipment on any change
        })
        .subscribe();

      return () => {
        subscription.unsubscribe();
      };
    }
  }, [user]);

  const loadEquipment = async () => {
    try {
      setLoading(true);
      const { data, error } = await equipmentService.getUserEquipment(user.id);
      if (error) throw error;

      // Transform equipment data to match expected format
      const transformedEquipment = data?.map(item => ({
        id: item.id,
        name: item.name,
        category: item.category?.name || 'Unknown Category',
        status: item.status || 'available',
        image: item.images?.[0] || '/assets/images/no_image.png',
        imageAlt: `Image of ${item.name}`,
        currentRenter: item.current_booking?.renter?.full_name || null,
        rentalEndDate: item.current_booking?.end_date || null,
        monthlyEarnings: `₹${item.monthly_earnings || 0}`,
        utilizationRate: item.utilization_rate || 0,
        nextMaintenance: item.next_maintenance || 'Not scheduled'
      })) || [];

      setEquipment(transformedEquipment);
    } catch (err) {
      console.error('Error loading equipment:', err);
      setError('Failed to load equipment');
    } finally {
      setLoading(false);
    }
  };


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