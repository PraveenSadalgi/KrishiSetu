import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import Button from '../../../components/ui/Button';
import { AIVoiceInput } from '../../../components/ui/ai-voice-input';

const SearchFilters = ({ onFiltersChange, onVoiceSearch }) => {
  const [filters, setFilters] = useState({
    searchQuery: '',
    category: '',
    priceRange: '',
    distance: '',
    availability: '',
    rating: ''
  });

  const [isAdvancedOpen, setIsAdvancedOpen] = useState(false);
  const [showVoiceInput, setShowVoiceInput] = useState(false);

  const categoryOptions = [
    { value: '', label: 'All Categories' },
    { value: 'tractors', label: 'Tractors' },
    { value: 'harvesters', label: 'Harvesters' },
    { value: 'tillers', label: 'Tillers & Cultivators' },
    { value: 'sprayers', label: 'Sprayers' },
    { value: 'seeders', label: 'Seeders & Planters' },
    { value: 'irrigation', label: 'Irrigation Equipment' },
    { value: 'threshers', label: 'Threshers' },
    { value: 'others', label: 'Other Equipment' }
  ];

  const priceRangeOptions = [
    { value: '', label: 'Any Price' },
    { value: '0-500', label: '₹0 - ₹500/day' },
    { value: '500-1000', label: '₹500 - ₹1,000/day' },
    { value: '1000-2000', label: '₹1,000 - ₹2,000/day' },
    { value: '2000-5000', label: '₹2,000 - ₹5,000/day' },
    { value: '5000+', label: '₹5,000+/day' }
  ];

  const distanceOptions = [
    { value: '', label: 'Any Distance' },
    { value: '5', label: 'Within 5 km' },
    { value: '10', label: 'Within 10 km' },
    { value: '25', label: 'Within 25 km' },
    { value: '50', label: 'Within 50 km' },
    { value: '100', label: 'Within 100 km' }
  ];

  const availabilityOptions = [
    { value: '', label: 'Any Time' },
    { value: 'today', label: 'Available Today' },
    { value: 'tomorrow', label: 'Available Tomorrow' },
    { value: 'week', label: 'This Week' },
    { value: 'month', label: 'This Month' }
  ];

  const ratingOptions = [
    { value: '', label: 'Any Rating' },
    { value: '4', label: '4+ Stars' },
    { value: '3', label: '3+ Stars' },
    { value: '2', label: '2+ Stars' }
  ];

  const handleFilterChange = (key, value) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFiltersChange(newFilters);
  };

  const handleClearFilters = () => {
    const clearedFilters = {
      searchQuery: '',
      category: '',
      priceRange: '',
      distance: '',
      availability: '',
      rating: ''
    };
    setFilters(clearedFilters);
    onFiltersChange(clearedFilters);
  };

  const handleVoiceSearch = () => {
    setShowVoiceInput(true);
  };

  const handleVoiceResult = (transcript) => {
    setShowVoiceInput(false);
    handleFilterChange('searchQuery', transcript);
    onVoiceSearch(transcript);
  };

  const handleVoiceCancel = () => {
    setShowVoiceInput(false);
  };

  const hasActiveFilters = Object.values(filters)?.some(value => value !== '');

  return (
    <div className="bg-card border border-border rounded-lg p-4 shadow-organic">
      {/* Main Search Bar */}
      <div className="flex gap-3 mb-4">
        <div className="flex-1 relative">
          <Input
            type="search"
            placeholder="Search equipment by name, type, or location..."
            value={filters?.searchQuery}
            onChange={(e) => handleFilterChange('searchQuery', e?.target?.value)}
            className="pr-12"
          />
          <button
            onClick={handleVoiceSearch}
            className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-muted-foreground hover:text-primary organic-transition"
            title="Voice Search"
          >
            <Icon name="Mic" size={18} />
          </button>
        </div>
        <Button
          variant="outline"
          onClick={() => setIsAdvancedOpen(!isAdvancedOpen)}
          iconName={isAdvancedOpen ? "ChevronUp" : "ChevronDown"}
          iconPosition="right"
        >
          Filters
        </Button>
      </div>
      {/* Quick Category Filters */}
      <div className="flex flex-wrap gap-2 mb-4">
        {categoryOptions?.slice(1, 6)?.map((category) => (
          <button
            key={category?.value}
            onClick={() => handleFilterChange('category', 
              filters?.category === category?.value ? '' : category?.value
            )}
            className={`px-3 py-1.5 rounded-full text-sm font-medium organic-transition ${
              filters?.category === category?.value
                ? 'bg-primary text-primary-foreground'
                : 'bg-muted text-muted-foreground hover:bg-primary/10 hover:text-primary'
            }`}
          >
            {category?.label}
          </button>
        ))}
      </div>
      {/* Voice Input Modal */}
      {showVoiceInput && (
        <AIVoiceInput
          onResult={handleVoiceResult}
          onCancel={handleVoiceCancel}
        />
      )}

      {/* Advanced Filters */}
      {isAdvancedOpen && (
        <div className="border-t border-border pt-4 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <Select
              label="Category"
              options={categoryOptions}
              value={filters?.category}
              onChange={(value) => handleFilterChange('category', value)}
              placeholder="Select category"
            />

            <Select
              label="Price Range"
              options={priceRangeOptions}
              value={filters?.priceRange}
              onChange={(value) => handleFilterChange('priceRange', value)}
              placeholder="Select price range"
            />

            <Select
              label="Distance"
              options={distanceOptions}
              value={filters?.distance}
              onChange={(value) => handleFilterChange('distance', value)}
              placeholder="Select distance"
            />

            <Select
              label="Availability"
              options={availabilityOptions}
              value={filters?.availability}
              onChange={(value) => handleFilterChange('availability', value)}
              placeholder="Select availability"
            />

            <Select
              label="Rating"
              options={ratingOptions}
              value={filters?.rating}
              onChange={(value) => handleFilterChange('rating', value)}
              placeholder="Select rating"
            />
          </div>

          {hasActiveFilters && (
            <div className="flex justify-between items-center pt-2">
              <span className="text-sm text-muted-foreground">
                {Object.values(filters)?.filter(v => v !== '')?.length} filter(s) applied
              </span>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleClearFilters}
                iconName="X"
                iconPosition="left"
              >
                Clear All
              </Button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchFilters;