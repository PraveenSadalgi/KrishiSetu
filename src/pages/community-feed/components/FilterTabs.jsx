import React from 'react';
import Icon from '../../../components/AppIcon';

const FilterTabs = ({ activeFilter, onFilterChange }) => {
  const filters = [
    {
      id: 'all',
      label: 'All Posts',
      icon: 'Grid3X3',
      count: 1247
    },
    {
      id: 'following',
      label: 'Following',
      icon: 'Users',
      count: 89
    },
    {
      id: 'questions',
      label: 'Questions',
      icon: 'HelpCircle',
      count: 234
    },
    {
      id: 'tips',
      label: 'Tips & Advice',
      icon: 'Lightbulb',
      count: 456
    },
    {
      id: 'equipment',
      label: 'Equipment',
      icon: 'Wrench',
      count: 178
    },
    {
      id: 'success',
      label: 'Success Stories',
      icon: 'Trophy',
      count: 123
    }
  ];

  return (
    <div className="bg-card border border-border rounded-lg shadow-organic p-4 mb-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-foreground">Community Feed</h3>
        <div className="flex items-center space-x-2">
          <Icon name="Filter" size={16} className="text-muted-foreground" />
          <span className="text-sm text-muted-foreground">Filter by</span>
        </div>
      </div>
      <div className="flex flex-wrap gap-2">
        {filters?.map((filter) => (
          <button
            key={filter?.id}
            onClick={() => onFilterChange(filter?.id)}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg organic-transition ${
              activeFilter === filter?.id
                ? 'bg-primary text-primary-foreground shadow-organic'
                : 'bg-muted text-muted-foreground hover:bg-muted/80 hover:text-foreground'
            }`}
          >
            <Icon name={filter?.icon} size={16} />
            <span className="font-medium">{filter?.label}</span>
            <span className={`text-xs px-2 py-1 rounded-full ${
              activeFilter === filter?.id
                ? 'bg-primary-foreground/20 text-primary-foreground'
                : 'bg-background text-muted-foreground'
            }`}>
              {filter?.count}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default FilterTabs;