import React from 'react';
import Icon from '../../../components/AppIcon';

const CommunityStats = () => {
  const stats = [
    {
      id: 1,
      icon: "Users",
      label: "Active Farmers",
      value: "12,847",
      change: "+234 this week",
      color: "text-primary"
    },
    {
      id: 2,
      icon: "MessageSquare",
      label: "Posts Today",
      value: "1,456",
      change: "+18% from yesterday",
      color: "text-secondary"
    },
    {
      id: 3,
      icon: "Heart",
      label: "Helpful Answers",
      value: "8,923",
      change: "+156 today",
      color: "text-success"
    },
    {
      id: 4,
      icon: "Share2",
      label: "Knowledge Shared",
      value: "45,678",
      change: "All time",
      color: "text-harvest-orange"
    }
  ];

  return (
    <div className="bg-card border border-border rounded-lg shadow-organic p-6">
      <div className="flex items-center space-x-2 mb-6">
        <Icon name="BarChart3" size={20} className="text-primary" />
        <h3 className="text-lg font-semibold text-foreground">Community Stats</h3>
      </div>
      <div className="grid grid-cols-2 gap-4">
        {stats?.map((stat) => (
          <div key={stat?.id} className="text-center p-4 rounded-lg bg-muted/50 hover:bg-muted organic-transition">
            <div className={`inline-flex items-center justify-center w-12 h-12 rounded-full bg-background mb-3 ${stat?.color}`}>
              <Icon name={stat?.icon} size={20} />
            </div>
            <div className="space-y-1">
              <p className="text-2xl font-bold text-foreground">{stat?.value}</p>
              <p className="text-sm font-medium text-foreground">{stat?.label}</p>
              <p className="text-xs text-muted-foreground">{stat?.change}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-6 pt-4 border-t border-border">
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">Community Growth</span>
          <span className="text-success font-medium">+15.2% this month</span>
        </div>
        <div className="mt-2 w-full bg-muted rounded-full h-2">
          <div className="bg-success h-2 rounded-full progress-fill" style={{ width: '78%' }}></div>
        </div>
      </div>
    </div>
  );
};

export default CommunityStats;