import React, { useState, useEffect } from 'react';
import { useAuth } from '../../../contexts/AuthContext';
import { supabase } from '../../../lib/supabase';
import Icon from '../../../components/AppIcon';

const DashboardStats = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user?.id) {
      loadStats();

      // Set up realtime subscriptions for stats
      const bookingSubscription = supabase
        .channel('dashboard-stats-bookings')
        .on('postgres_changes', {
          event: '*',
          schema: 'public',
          table: 'equipment_bookings',
          filter: `owner_id=eq.${user.id}`
        }, () => {
          loadStats();
        })
        .on('postgres_changes', {
          event: '*',
          schema: 'public',
          table: 'equipment_bookings',
          filter: `renter_id=eq.${user.id}`
        }, () => {
          loadStats();
        })
        .subscribe();

      const equipmentSubscription = supabase
        .channel('dashboard-stats-equipment')
        .on('postgres_changes', {
          event: '*',
          schema: 'public',
          table: 'equipment',
          filter: `owner_id=eq.${user.id}`
        }, () => {
          loadStats();
        })
        .subscribe();

      return () => {
        bookingSubscription.unsubscribe();
        equipmentSubscription.unsubscribe();
      };
    }
  }, [user]);

  const loadStats = async () => {
    try {
      setLoading(true);

      // Calculate stats from database
      const currentMonth = new Date().toISOString().slice(0, 7); // YYYY-MM format

      // Get bookings for current month
      const { data: bookings, error: bookingsError } = await supabase
        .from('equipment_bookings')
        .select('total_amount, status, created_at, owner_id, renter_id')
        .or(`owner_id.eq.${user.id},renter_id.eq.${user.id}`)
        .gte('created_at', `${currentMonth}-01`)
        .lte('created_at', `${currentMonth}-31T23:59:59`);

      if (bookingsError) throw bookingsError;

      // Get equipment count
      const { data: equipment, error: equipmentError } = await supabase
        .from('equipment')
        .select('id, status')
        .eq('owner_id', user.id);

      if (equipmentError) throw equipmentError;

      // Calculate earnings (as owner)
      const totalEarnings = bookings
        ?.filter(b => b.owner_id === user.id)
        ?.reduce((sum, b) => sum + (b.total_amount || 0), 0) || 0;

      // Active bookings (as owner)
      const activeBookings = bookings
        ?.filter(b => b.owner_id === user.id && b.status === 'active')
        ?.length || 0;

      // Equipment listed
      const equipmentListed = equipment?.length || 0;

      // Mock rating for now (would come from reviews table)
      const rating = 4.8;

      const calculatedStats = [
        {
          id: 1,
          title: "Total Earnings",
          value: `₹${totalEarnings.toLocaleString()}`,
          change: "+12.5%", // Would calculate from previous month
          changeType: "positive",
          icon: "TrendingUp",
          description: "This month"
        },
        {
          id: 2,
          title: "Active Bookings",
          value: activeBookings.toString(),
          change: "+3", // Would calculate from previous month
          changeType: "positive",
          icon: "Calendar",
          description: "Currently rented"
        },
        {
          id: 3,
          title: "Equipment Listed",
          value: equipmentListed.toString(),
          change: "+2", // Would calculate from previous month
          changeType: "positive",
          icon: "Wrench",
          description: "Available items"
        },
        {
          id: 4,
          title: "Rating Score",
          value: rating.toString(),
          change: "+0.2",
          changeType: "positive",
          icon: "Star",
          description: "Average rating"
        }
      ];

      setStats(calculatedStats);
    } catch (err) {
      console.error('Error loading stats:', err);
      // Fallback to mock data on error
      setStats([
        {
          id: 1,
          title: "Total Earnings",
          value: "₹0",
          change: "+0%",
          changeType: "positive",
          icon: "TrendingUp",
          description: "This month"
        },
        {
          id: 2,
          title: "Active Bookings",
          value: "0",
          change: "+0",
          changeType: "positive",
          icon: "Calendar",
          description: "Currently rented"
        },
        {
          id: 3,
          title: "Equipment Listed",
          value: "0",
          change: "+0",
          changeType: "positive",
          icon: "Wrench",
          description: "Available items"
        },
        {
          id: 4,
          title: "Rating Score",
          value: "0.0",
          change: "+0.0",
          changeType: "positive",
          icon: "Star",
          description: "Average rating"
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats?.map((stat) => (
        <div
          key={stat?.id}
          className="bg-card border border-border rounded-lg p-6 shadow-organic hover:shadow-organic-lg organic-transition"
        >
          <div className="flex items-center justify-between mb-4">
            <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
              stat?.changeType === 'positive' ? 'bg-success/10' : 'bg-error/10'
            }`}>
              <Icon 
                name={stat?.icon} 
                size={24} 
                className={stat?.changeType === 'positive' ? 'text-success' : 'text-error'} 
              />
            </div>
            <div className={`flex items-center space-x-1 text-sm font-medium ${
              stat?.changeType === 'positive' ? 'text-success' : 'text-error'
            }`}>
              <Icon 
                name={stat?.changeType === 'positive' ? 'TrendingUp' : 'TrendingDown'} 
                size={16} 
              />
              <span>{stat?.change}</span>
            </div>
          </div>
          
          <div className="space-y-1">
            <h3 className="text-2xl font-bold text-foreground">{stat?.value}</h3>
            <p className="text-sm font-medium text-muted-foreground">{stat?.title}</p>
            <p className="text-xs text-muted-foreground">{stat?.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default DashboardStats;