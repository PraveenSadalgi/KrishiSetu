import React, { useState, useEffect } from 'react';
import Header from '../../components/ui/Header';
import SearchFilters from './components/SearchFilters';
import CategoryGrid from './components/CategoryGrid';
import AIRecommendations from './components/AIRecommendations';
import EquipmentGrid from './components/EquipmentGrid';
import MapView from './components/MapView';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import { equipmentService } from '../../services/equipmentService';

const Marketplace = () => {
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'map'
  const [isLoading, setIsLoading] = useState(true);
  const [filters, setFilters] = useState({});
  const [selectedEquipment, setSelectedEquipment] = useState(null);
  const [equipmentList, setEquipmentList] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEquipment = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const { data, error } = await equipmentService.getEquipment(filters);

        if (error) {
          throw error;
        }

        setEquipmentList(data || []);
      } catch (error) {
        console.error('Error fetching equipment:', error);
        setError(error.message || 'Failed to load equipment');
        // Fallback to mock data if API fails
        setEquipmentList([
          {
            id: 'eq-1',
            name: 'John Deere 5050D Tractor',
            category: 'Tractors',
            image: "https://images.unsplash.com/photo-1734224384775-16eaf841c58f",
            imageAlt: 'Green John Deere tractor in agricultural field with farming equipment attached',
            price_per_day: 1200,
            rating_average: 4.8,
            location: 'Bangalore Rural',
            is_available: true,
            reviewCount: 24,
            distance: 5,
            features: ['GPS Navigation', 'Air Conditioning', 'Power Steering', 'Hydraulic Lift'],
            owner: {
              full_name: 'Rajesh Kumar',
              profile_image_url: "https://images.unsplash.com/photo-1642060220445-dc4971be3f99",
              is_verified: true
            },
            created_at: '2025-10-15'
          }
        ]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchEquipment();
  }, [filters]);

  const handleFiltersChange = (newFilters) => {
    setFilters(newFilters);
  };



  const handleCategorySelect = (categoryId) => {
    setFilters((prev) => ({ ...prev, category: categoryId }));
  };

  const handleClearCategoryFilter = () => {
    setFilters((prev) => {
      const newFilters = { ...prev };
      delete newFilters.category;
      return newFilters;
    });
  };

  const handleEquipmentSelect = (equipment) => {
    setSelectedEquipment(equipment);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      {/* Main Content */}
      <main className="pt-16">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-primary/5 via-background to-secondary/5 py-12">
          <div className="max-w-7xl mx-auto px-4 lg:px-6">
            <div className="text-center mb-8">
              <h1 className="text-fluid-hero font-bold text-foreground mb-4">
                Smart Equipment Marketplace
              </h1>
              <p className="text-fluid-lg text-muted-foreground max-w-2xl mx-auto">
                Discover, compare, and book agricultural equipment with AI-powered recommendations
              </p>
            </div>

            {/* Search Filters */}
            <SearchFilters
              onFiltersChange={handleFiltersChange} />

          </div>
        </section>

        {/* Main Content Area */}
        <section className="py-8">
          <div className="max-w-7xl mx-auto px-4 lg:px-6">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
              {/* Sidebar */}
              <div className="lg:col-span-1 space-y-6">
                {/* Category Grid */}
                <CategoryGrid
                  onCategorySelect={handleCategorySelect}
                  selectedCategoryId={filters.category}
                  onClearFilter={handleClearCategoryFilter}
                />

                {/* AI Recommendations */}
                <AIRecommendations onEquipmentSelect={handleEquipmentSelect} />
              </div>

              {/* Main Content */}
              <div className="lg:col-span-3">
                {/* View Toggle */}
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-2">
                    <Icon name="Filter" size={20} className="text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">
                      {Object.values(filters)?.filter((v) => v !== '')?.length} active filters
                    </span>
                  </div>

                  <div className="flex items-center bg-muted rounded-lg p-1">
                    <button
                      onClick={() => setViewMode('grid')}
                      className={`flex items-center gap-2 px-3 py-2 rounded-md organic-transition ${
                      viewMode === 'grid' ? 'bg-background text-foreground shadow-sm' : 'text-muted-foreground hover:text-foreground'}`
                      }>

                      <Icon name="Grid3X3" size={16} />
                      <span className="hidden sm:inline">Grid</span>
                    </button>
                    <button
                      onClick={() => setViewMode('map')}
                      className={`flex items-center gap-2 px-3 py-2 rounded-md organic-transition ${
                      viewMode === 'map' ? 'bg-background text-foreground shadow-sm' : 'text-muted-foreground hover:text-foreground'}`
                      }>

                      <Icon name="Map" size={16} />
                      <span className="hidden sm:inline">Map</span>
                    </button>
                  </div>
                </div>

                {/* Content Area */}
                <div className="min-h-[600px]">
                  {viewMode === 'grid' ?
                  <EquipmentGrid
                    equipmentList={equipmentList}
                    isLoading={isLoading} /> :


                  <MapView
                    equipmentList={equipmentList}
                    onEquipmentSelect={handleEquipmentSelect} />

                  }
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Trust Signals Section */}
        <section className="py-12 bg-muted/50">
          <div className="max-w-7xl mx-auto px-4 lg:px-6">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-foreground mb-2">
                Trusted by Farmers Across India
              </h2>
              <p className="text-muted-foreground">
                Join thousands of farmers who trust FarmSetu for their equipment needs
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Icon name="Shield" size={24} className="text-primary" />
                </div>
                <h3 className="font-semibold text-foreground mb-1">Verified Equipment</h3>
                <p className="text-sm text-muted-foreground">All equipment is inspected and verified</p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Icon name="Clock" size={24} className="text-success" />
                </div>
                <h3 className="font-semibold text-foreground mb-1">24/7 Support</h3>
                <p className="text-sm text-muted-foreground">Round-the-clock customer assistance</p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Icon name="CreditCard" size={24} className="text-secondary" />
                </div>
                <h3 className="font-semibold text-foreground mb-1">Secure Payments</h3>
                <p className="text-sm text-muted-foreground">UPI, cards, and wallet support</p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Icon name="MapPin" size={24} className="text-accent" />
                </div>
                <h3 className="font-semibold text-foreground mb-1">Local Network</h3>
                <p className="text-sm text-muted-foreground">Equipment available in your area</p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-12 bg-gradient-to-r from-primary to-secondary">
          <div className="max-w-4xl mx-auto px-4 lg:px-6 text-center">
            <h2 className="text-3xl font-bold text-primary-foreground mb-4">
              Ready to List Your Equipment?
            </h2>
            <p className="text-primary-foreground/90 mb-8 text-lg">
              Join our marketplace and start earning from your idle agricultural equipment
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                variant="secondary"
                size="lg"
                className="bg-background text-foreground hover:bg-background/90">

                List Equipment
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary">

                Learn More
              </Button>
            </div>
          </div>
        </section>
      </main>
    </div>);

};

export default Marketplace;
