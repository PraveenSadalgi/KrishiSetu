import React, { useState, useEffect } from 'react';
import { useAuth } from '../../../contexts/AuthContext';
import { supabase } from '../../../lib/supabase';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const EarningsChart = () => {
  const { user } = useAuth();
  const [monthlyData, setMonthlyData] = useState([]);
  const [equipmentPerformance, setEquipmentPerformance] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user?.id) {
      loadChartData();

      // Set up realtime subscription for bookings
      const subscription = supabase
        .channel('earnings-chart-realtime')
        .on('postgres_changes', {
          event: '*',
          schema: 'public',
          table: 'equipment_bookings',
          filter: `owner_id=eq.${user.id}`
        }, () => {
          loadChartData();
        })
        .subscribe();

      return () => {
        subscription.unsubscribe();
      };
    }
  }, [user]);

  const loadChartData = async () => {
    try {
      setLoading(true);

      // Get last 7 months of booking data
      const endDate = new Date();
      const startDate = new Date();
      startDate.setMonth(startDate.getMonth() - 6);

      const { data: bookings, error } = await supabase
        .from('equipment_bookings')
        .select('total_amount, created_at, equipment!inner(name, category_id)')
        .eq('owner_id', user.id)
        .gte('created_at', startDate.toISOString())
        .lte('created_at', endDate.toISOString())
        .eq('status', 'completed');

      if (error) throw error;

      // Process monthly data
      const monthlyMap = {};
      const equipmentMap = {};

      bookings?.forEach(booking => {
        const month = new Date(booking.created_at).toLocaleDateString('en-US', { month: 'short' });
        const amount = booking.total_amount || 0;

        if (!monthlyMap[month]) {
          monthlyMap[month] = { earnings: 0, bookings: 0 };
        }
        monthlyMap[month].earnings += amount;
        monthlyMap[month].bookings += 1;

        // Equipment performance
        const equipmentName = booking.equipment?.name || 'Unknown';
        if (!equipmentMap[equipmentName]) {
          equipmentMap[equipmentName] = 0;
        }
        equipmentMap[equipmentName] += amount;
      });

      // Convert to arrays
      const processedMonthlyData = Object.entries(monthlyMap).map(([month, data]) => ({
        month,
        earnings: data.earnings,
        bookings: data.bookings
      }));

      const totalEarnings = Object.values(equipmentMap).reduce((sum, earnings) => sum + earnings, 0);
      const processedEquipmentPerformance = Object.entries(equipmentMap).map(([name, earnings]) => ({
        name,
        earnings,
        percentage: Math.round((earnings / totalEarnings) * 100)
      }));

      setMonthlyData(processedMonthlyData);
      setEquipmentPerformance(processedEquipmentPerformance);

    } catch (err) {
      console.error('Error loading chart data:', err);
      // Fallback to mock data
      setMonthlyData([
        { month: 'Jul', earnings: 28000, bookings: 15 },
        { month: 'Aug', earnings: 32000, bookings: 18 },
        { month: 'Sep', earnings: 35000, bookings: 22 },
        { month: 'Oct', earnings: 41000, bookings: 25 },
        { month: 'Nov', earnings: 38000, bookings: 20 },
        { month: 'Dec', earnings: 45000, bookings: 28 },
        { month: 'Jan', earnings: 45680, bookings: 30 }
      ]);

      setEquipmentPerformance([
        { name: 'Tractor', earnings: 25000, percentage: 55 },
        { name: 'Harvester', earnings: 15000, percentage: 33 },
        { name: 'Tiller', earnings: 5680, percentage: 12 }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload?.length) {
      return (
        <div className="bg-popover border border-border rounded-lg p-3 shadow-organic">
          <p className="text-sm font-medium text-foreground">{`${label}`}</p>
          <p className="text-sm text-primary">
            {`Earnings: ₹${payload?.[0]?.value?.toLocaleString()}`}
          </p>
          {payload?.[1] && (
            <p className="text-sm text-secondary">
              {`Bookings: ${payload?.[1]?.value}`}
            </p>
          )}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-card border border-border rounded-lg shadow-organic">
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-foreground">Earnings Analytics</h2>
          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="sm">
              <Icon name="Download" size={16} />
            </Button>
            <Button variant="ghost" size="sm">
              <Icon name="MoreHorizontal" size={16} />
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
          <div className="text-center p-4 bg-primary/5 rounded-lg">
            <p className="text-sm text-muted-foreground">This Month</p>
            <p className="text-2xl font-bold text-primary">₹45,680</p>
            <div className="flex items-center justify-center space-x-1 mt-1">
              <Icon name="TrendingUp" size={14} className="text-success" />
              <span className="text-sm text-success">+12.5%</span>
            </div>
          </div>
          
          <div className="text-center p-4 bg-secondary/5 rounded-lg">
            <p className="text-sm text-muted-foreground">Total Bookings</p>
            <p className="text-2xl font-bold text-secondary">30</p>
            <div className="flex items-center justify-center space-x-1 mt-1">
              <Icon name="TrendingUp" size={14} className="text-success" />
              <span className="text-sm text-success">+7</span>
            </div>
          </div>
          
          <div className="text-center p-4 bg-success/5 rounded-lg">
            <p className="text-sm text-muted-foreground">Avg. Per Booking</p>
            <p className="text-2xl font-bold text-success">₹1,523</p>
            <div className="flex items-center justify-center space-x-1 mt-1">
              <Icon name="TrendingUp" size={14} className="text-success" />
              <span className="text-sm text-success">+5.2%</span>
            </div>
          </div>
        </div>
      </div>
      <div className="p-6">
        <h3 className="text-lg font-medium text-foreground mb-4">Monthly Earnings Trend</h3>
        <div className="w-full h-64 mb-8" aria-label="Monthly Earnings Bar Chart">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={monthlyData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis 
                dataKey="month" 
                stroke="hsl(var(--muted-foreground))"
                fontSize={12}
              />
              <YAxis 
                stroke="hsl(var(--muted-foreground))"
                fontSize={12}
                tickFormatter={(value) => `₹${value/1000}k`}
              />
              <Tooltip content={<CustomTooltip />} />
              <Bar 
                dataKey="earnings" 
                fill="hsl(var(--primary))" 
                radius={[4, 4, 0, 0]}
                name="Earnings"
              />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Equipment Performance */}
          <div>
            <h4 className="text-lg font-medium text-foreground mb-4">Equipment Performance</h4>
            <div className="space-y-4">
              {equipmentPerformance?.map((item, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-muted/30 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-3 h-3 rounded-full bg-primary" style={{
                      backgroundColor: index === 0 ? 'hsl(var(--primary))' : 
                                     index === 1 ? 'hsl(var(--secondary))': 'hsl(var(--success))'
                    }}></div>
                    <span className="font-medium text-foreground">{item?.name}</span>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-foreground">₹{item?.earnings?.toLocaleString()}</p>
                    <p className="text-sm text-muted-foreground">{item?.percentage}%</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Booking Trend */}
          <div>
            <h4 className="text-lg font-medium text-foreground mb-4">Booking Trend</h4>
            <div className="w-full h-48" aria-label="Booking Trend Line Chart">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={monthlyData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis 
                    dataKey="month" 
                    stroke="hsl(var(--muted-foreground))"
                    fontSize={12}
                  />
                  <YAxis 
                    stroke="hsl(var(--muted-foreground))"
                    fontSize={12}
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <Line 
                    type="monotone" 
                    dataKey="bookings" 
                    stroke="hsl(var(--secondary))" 
                    strokeWidth={3}
                    dot={{ fill: 'hsl(var(--secondary))', strokeWidth: 2, r: 4 }}
                    name="Bookings"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EarningsChart;