import React from 'react';
import Icon from '../../../components/AppIcon';

const CategoryFilter = ({ categories, activeCategory, onCategoryChange }) => {
  const getCategoryIcon = (category) => {
    switch (category) {
      case 'All': return 'Grid3X3';
      case 'Weather': return 'Cloud';
      case 'Market': return 'TrendingUp';
      case 'Technology': return 'Cpu';
      case 'Policy': return 'FileText';
      case 'Tutorials': return 'Play';
      case 'Government Schemes': return 'Building';
      case 'Sustainable Farming': return 'Leaf';
      case 'Equipment': return 'Wrench';
      default: return 'Circle';
    }
  };

  return (
    <div className="flex flex-wrap gap-2 p-4 bg-muted/50 rounded-lg">
      {categories?.map((category) => (
        <button
          key={category}
          onClick={() => onCategoryChange(category)}
          className={`flex items-center space-x-2 px-4 py-2 rounded-full text-sm font-medium organic-transition ${
            activeCategory === category
              ? 'bg-primary text-primary-foreground shadow-organic'
              : 'bg-background text-muted-foreground hover:text-foreground hover:bg-card border border-border'
          }`}
        >
          <Icon name={getCategoryIcon(category)} size={16} />
          <span>{category}</span>
        </button>
      ))}
    </div>
  );
};

export default CategoryFilter;