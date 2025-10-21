import React, { useState } from 'react';
import EquipmentCard from './EquipmentCard';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';

const EquipmentGrid = ({ equipmentList, isLoading }) => {
  const [sortBy, setSortBy] = useState('relevance');
  const [viewMode, setViewMode] = useState('grid');

  const sortOptions = [
    { value: 'relevance', label: 'Most Relevant' },
    { value: 'price-low', label: 'Price: Low to High' },
    { value: 'price-high', label: 'Price: High to Low' },
    { value: 'rating', label: 'Highest Rated' },
    { value: 'distance', label: 'Nearest First' },
    { value: 'newest', label: 'Newest Listed' }
  ];

  const getSortedEquipment = () => {
    const sorted = [...equipmentList];

    switch (sortBy) {
      case 'price-low':
        return sorted?.sort((a, b) => a?.price_per_day - b?.price_per_day);
      case 'price-high':
        return sorted?.sort((a, b) => b?.price_per_day - a?.price_per_day);
      case 'rating':
        return sorted?.sort((a, b) => b?.rating_average - a?.rating_average);
      case 'distance':
        return sorted?.sort((a, b) => a?.distance - b?.distance);
      case 'newest':
        return sorted?.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
      default:
        return sorted;
    }
  };

  const sortedEquipment = getSortedEquipment();

  if (isLoading) {
    return (
      <div className="space-y-4">
        {/* Loading Header */}
        <div className="flex justify-between items-center">
          <div className="h-6 bg-muted rounded w-48 animate-pulse"></div>
          <div className="h-10 bg-muted rounded w-32 animate-pulse"></div>
        </div>
        {/* Loading Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 })?.map((_, index) => (
            <div key={index} className="bg-card border border-border rounded-lg overflow-hidden">
              <div className="h-48 bg-muted animate-pulse"></div>
              <div className="p-4 space-y-3">
                <div className="h-4 bg-muted rounded animate-pulse"></div>
                <div className="h-3 bg-muted rounded w-2/3 animate-pulse"></div>
                <div className="h-3 bg-muted rounded w-1/2 animate-pulse"></div>
                <div className="flex gap-2">
                  <div className="h-8 bg-muted rounded flex-1 animate-pulse"></div>
                  <div className="h-8 bg-muted rounded w-20 animate-pulse"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header with Results Count and Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <h2 className="text-xl font-semibold text-foreground">
            {sortedEquipment?.length} Equipment Found
          </h2>
          
          {/* View Mode Toggle */}
          <div className="flex items-center bg-muted rounded-lg p-1">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded-md organic-transition ${
                viewMode === 'grid' ?'bg-background text-foreground shadow-sm' :'text-muted-foreground hover:text-foreground'
              }`}
              title="Grid View"
            >
              <Icon name="Grid3X3" size={16} />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 rounded-md organic-transition ${
                viewMode === 'list' ?'bg-background text-foreground shadow-sm' :'text-muted-foreground hover:text-foreground'
              }`}
              title="List View"
            >
              <Icon name="List" size={16} />
            </button>
          </div>
        </div>

        {/* Sort Controls */}
        <div className="flex items-center gap-3">
          <span className="text-sm text-muted-foreground">Sort by:</span>
          <Select
            options={sortOptions}
            value={sortBy}
            onChange={setSortBy}
            className="w-48"
          />
        </div>
      </div>
      {/* Equipment Grid/List */}
      {sortedEquipment?.length === 0 ? (
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
            <Icon name="Search" size={24} className="text-muted-foreground" />
          </div>
          <h3 className="text-lg font-medium text-foreground mb-2">
            No Equipment Found
          </h3>
          <p className="text-muted-foreground mb-6">
            Try adjusting your filters or search terms to find more equipment.
          </p>
          <Button variant="outline">
            Clear All Filters
          </Button>
        </div>
      ) : (
        <div className={
          viewMode === 'grid' ?'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6' :'space-y-4'
        }>
          {sortedEquipment?.map((equipment) => (
            <EquipmentCard
              key={equipment?.id}
              equipment={equipment}
            />
          ))}
        </div>
      )}
      {/* Load More Button */}
      {sortedEquipment?.length > 0 && sortedEquipment?.length >= 12 && (
        <div className="text-center pt-6">
          <Button variant="outline" size="lg">
            Load More Equipment
          </Button>
          <p className="text-sm text-muted-foreground mt-2">
            Showing {sortedEquipment?.length} of 500+ available equipment
          </p>
        </div>
      )}
      {/* Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-6 border-t border-border">
        <div className="text-center">
          <div className="text-2xl font-bold text-primary">500+</div>
          <div className="text-sm text-muted-foreground">Total Equipment</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-success">85%</div>
          <div className="text-sm text-muted-foreground">Available Now</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-secondary">4.8★</div>
          <div className="text-sm text-muted-foreground">Average Rating</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-accent">24/7</div>
          <div className="text-sm text-muted-foreground">Support Available</div>
        </div>
      </div>
    </div>
  );
};

export default EquipmentGrid;