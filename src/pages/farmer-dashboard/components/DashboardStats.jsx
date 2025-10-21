import React from 'react';
import Icon from '../../../components/AppIcon';

const DashboardStats = () => {
  const stats = [
    {
      id: 1,
      title: "Total Earnings",
      value: "₹45,680",
      change: "+12.5%",
      changeType: "positive",
      icon: "TrendingUp",
      description: "This month"
    },
    {
      id: 2,
      title: "Active Bookings",
      value: "8",
      change: "+3",
      changeType: "positive",
      icon: "Calendar",
      description: "Currently rented"
    },
    {
      id: 3,
      title: "Equipment Listed",
      value: "12",
      change: "+2",
      changeType: "positive",
      icon: "Wrench",
      description: "Available items"
    },
    {
      id: 4,
      title: "Rating Score",
      value: "4.8",
      change: "+0.2",
      changeType: "positive",
      icon: "Star",
      description: "Average rating"
    }
  ];

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