import React, { useState, useEffect } from 'react';
import Header from '../../components/ui/Header';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import DashboardStats from './components/DashboardStats';
import RecentBookings from './components/RecentBookings';
import AIAssistant from './components/AIAssistant';
import EquipmentOverview from './components/EquipmentOverview';
import EarningsChart from './components/EarningsChart';
import NotificationCenter from './components/NotificationCenter';
import AddEquipmentModal from './components/AddEquipmentModal';

const FarmerDashboard = () => {
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const [userType, setUserType] = useState('owner'); // 'owner' or 'seeker'
  const [activeView, setActiveView] = useState('overview');
  const [showAddEquipmentModal, setShowAddEquipmentModal] = useState(false);

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') || 'en';
    setCurrentLanguage(savedLanguage);
  }, []);

  const quickActions = [
    {
      id: 1,
      title: "Add Equipment",
      description: "List new farming equipment",
      icon: "Plus",
      color: "bg-primary/10 text-primary",
      action: "add-equipment"
    },
    {
      id: 2,
      title: "Find Equipment",
      description: "Browse available rentals",
      icon: "Search",
      color: "bg-secondary/10 text-secondary",
      action: "find-equipment"
    },
    {
      id: 3,
      title: "Community",
      description: "Connect with farmers",
      icon: "Users",
      color: "bg-success/10 text-success",
      action: "community"
    },
    {
      id: 4,
      title: "Support",
      description: "Get help & assistance",
      icon: "HelpCircle",
      color: "bg-warning/10 text-warning",
      action: "support"
    }
  ];

  const viewTabs = [
    { id: 'overview', label: 'Overview', icon: 'LayoutDashboard' },
    { id: 'equipment', label: 'Equipment', icon: 'Wrench' },
    { id: 'bookings', label: 'Bookings', icon: 'Calendar' },
    { id: 'earnings', label: 'Earnings', icon: 'TrendingUp' },
    { id: 'notifications', label: 'Notifications', icon: 'Bell' }
  ];

  const handleQuickAction = (action) => {
    if (action === 'add-equipment') {
      setShowAddEquipmentModal(true);
    } else {
      console.log(`Quick action: ${action}`);
      // Handle other quick actions
    }
  };

  const handleEquipmentAdded = (newEquipment) => {
    // Refresh equipment overview or show success message
    console.log('Equipment added successfully:', newEquipment);
    // Could trigger a refresh of the EquipmentOverview component here
  };

  const renderContent = () => {
    switch (activeView) {
      case 'equipment':
        return (
          <div className="space-y-6">
            <EquipmentOverview />
            <AIAssistant />
          </div>
        );
      case 'bookings':
        return (
          <div className="space-y-6">
            <RecentBookings />
            <DashboardStats />
          </div>
        );
      case 'earnings':
        return (
          <div className="space-y-6">
            <EarningsChart />
            <DashboardStats />
          </div>
        );
      case 'notifications':
        return (
          <div className="space-y-6">
            <NotificationCenter />
            <AIAssistant />
          </div>
        );
      default:
        return (
          <div className="space-y-6">
            {/* Stats Overview */}
            <DashboardStats />
            
            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Left Column - Main Content */}
              <div className="lg:col-span-2 space-y-6">
                <RecentBookings />
                <EarningsChart />
              </div>
              
              {/* Right Column - Sidebar */}
              <div className="space-y-6">
                <AIAssistant />
                <NotificationCenter />
              </div>
            </div>
            
            {/* Equipment Overview */}
            <EquipmentOverview />
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Dashboard Header */}
          <div className="mb-8">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
              <div>
                <h1 className="text-3xl font-bold text-foreground">
                  Welcome back, Farmer! 🌾
                </h1>
                <p className="text-muted-foreground mt-1">
                  Manage your equipment, track earnings, and grow your farming business
                </p>
              </div>
              
              <div className="flex items-center space-x-3">
                <Button variant="outline" size="sm">
                  <Icon name="Download" size={16} />
                  Export Data
                </Button>
                <Button variant="default" size="sm" className="bg-conversion-cta hover:bg-conversion-cta/90">
                  <Icon name="Plus" size={16} />
                  Quick Add
                </Button>
              </div>
            </div>

            {/* User Type Toggle */}
            <div className="mt-6 flex items-center space-x-4">
              <span className="text-sm font-medium text-muted-foreground">Dashboard Mode:</span>
              <div className="flex space-x-1 bg-muted rounded-lg p-1">
                <button
                  onClick={() => setUserType('owner')}
                  className={`px-4 py-2 text-sm font-medium rounded-md organic-transition ${
                    userType === 'owner' ?'bg-background text-foreground shadow-sm' :'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  <Icon name="Wrench" size={16} className="inline mr-2" />
                  Equipment Owner
                </button>
                <button
                  onClick={() => setUserType('seeker')}
                  className={`px-4 py-2 text-sm font-medium rounded-md organic-transition ${
                    userType === 'seeker' ?'bg-background text-foreground shadow-sm' :'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  <Icon name="Search" size={16} className="inline mr-2" />
                  Equipment Seeker
                </button>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="mb-8">
            <h2 className="text-lg font-semibold text-foreground mb-4">Quick Actions</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {quickActions?.map((action) => (
                <button
                  key={action?.id}
                  onClick={() => handleQuickAction(action?.action)}
                  className="p-4 bg-card border border-border rounded-lg hover:shadow-organic organic-transition group text-left"
                >
                  <div className="flex items-start space-x-3">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${action?.color} group-hover:scale-110 organic-transition`}>
                      <Icon name={action?.icon} size={20} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium text-foreground">{action?.title}</h3>
                      <p className="text-sm text-muted-foreground mt-1">{action?.description}</p>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* View Tabs */}
          <div className="mb-6">
            <div className="flex space-x-1 bg-muted rounded-lg p-1 overflow-x-auto">
              {viewTabs?.map((tab) => (
                <button
                  key={tab?.id}
                  onClick={() => setActiveView(tab?.id)}
                  className={`flex items-center space-x-2 px-4 py-2 text-sm font-medium rounded-md organic-transition whitespace-nowrap ${
                    activeView === tab?.id
                      ? 'bg-background text-foreground shadow-sm'
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  <Icon name={tab?.icon} size={16} />
                  <span>{tab?.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Dynamic Content */}
          {renderContent()}

          {/* AI Insights Banner */}
          <div className="mt-8 bg-gradient-to-r from-primary/10 to-secondary/10 border border-primary/20 rounded-lg p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center">
                  <Icon name="Sparkles" size={24} className="text-primary" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-foreground">AI Insights Available</h3>
                  <p className="text-muted-foreground">
                    Get personalized recommendations to optimize your equipment utilization and earnings
                  </p>
                </div>
              </div>
              <Button variant="outline" className="border-primary/20 hover:bg-primary/10">
                <Icon name="ArrowRight" size={16} />
                View Insights
              </Button>
            </div>
          </div>
        </div>
      </main>

      {/* Add Equipment Modal */}
      <AddEquipmentModal
        isOpen={showAddEquipmentModal}
        onClose={() => setShowAddEquipmentModal(false)}
        onSuccess={handleEquipmentAdded}
      />
    </div>
  );
};

export default FarmerDashboard;
