import React from 'react';
import Icon from '../../../components/AppIcon';

const CategoryGrid = ({ onCategorySelect }) => {
  const categories = [
    {
      id: 'tractors',
      name: 'Tractors',
      icon: 'Truck',
      count: 245,
      color: 'bg-primary/10 text-primary',
      description: 'Heavy-duty farming tractors'
    },
    {
      id: 'harvesters',
      name: 'Harvesters',
      icon: 'Scissors',
      count: 89,
      color: 'bg-secondary/10 text-secondary',
      description: 'Crop harvesting equipment'
    },
    {
      id: 'tillers',
      name: 'Tillers',
      icon: 'Wrench',
      count: 156,
      color: 'bg-success/10 text-success',
      description: 'Soil preparation tools'
    },
    {
      id: 'sprayers',
      name: 'Sprayers',
      icon: 'Droplets',
      count: 78,
      color: 'bg-accent/10 text-accent',
      description: 'Pesticide & fertilizer sprayers'
    },
    {
      id: 'seeders',
      name: 'Seeders',
      icon: 'Flower2',
      count: 134,
      color: 'bg-warning/10 text-warning',
      description: 'Planting & seeding equipment'
    },
    {
      id: 'irrigation',
      name: 'Irrigation',
      icon: 'Waves',
      count: 67,
      color: 'bg-trust-blue/10 text-trust-blue',
      description: 'Water management systems'
    },
    {
      id: 'threshers',
      name: 'Threshers',
      icon: 'Zap',
      count: 92,
      color: 'bg-harvest-orange/10 text-harvest-orange',
      description: 'Grain separation equipment'
    },
    {
      id: 'others',
      name: 'Others',
      icon: 'MoreHorizontal',
      count: 203,
      color: 'bg-muted-foreground/10 text-muted-foreground',
      description: 'Miscellaneous farm tools'
    }
  ];

  return (
    <div className="bg-card border border-border rounded-lg p-6 shadow-organic">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-semibold text-foreground mb-1">
            Browse by Category
          </h2>
          <p className="text-muted-foreground">
            Find the right equipment for your farming needs
          </p>
        </div>
        <button className="text-primary hover:text-primary/80 organic-transition text-sm font-medium">
          View All Categories
        </button>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {categories?.map((category) => (
          <button
            key={category?.id}
            onClick={() => onCategorySelect(category?.id)}
            className="group p-4 rounded-lg border border-border hover:border-primary/20 hover:shadow-organic organic-transition text-left"
          >
            <div className={`w-12 h-12 rounded-lg ${category?.color} flex items-center justify-center mb-3 group-hover:scale-110 organic-transition`}>
              <Icon name={category?.icon} size={24} />
            </div>
            
            <h3 className="font-semibold text-foreground mb-1 group-hover:text-primary organic-transition">
              {category?.name}
            </h3>
            
            <p className="text-xs text-muted-foreground mb-2 line-clamp-2">
              {category?.description}
            </p>
            
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-primary">
                {category?.count} items
              </span>
              <Icon 
                name="ArrowRight" 
                size={16} 
                className="text-muted-foreground group-hover:text-primary group-hover:translate-x-1 organic-transition" 
              />
            </div>
          </button>
        ))}
      </div>
      {/* Popular Categories Banner */}
      <div className="mt-6 p-4 bg-gradient-to-r from-primary/5 to-secondary/5 rounded-lg border border-primary/10">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
            <Icon name="TrendingUp" size={20} className="text-primary" />
          </div>
          <div>
            <h4 className="font-medium text-foreground">Most Popular This Week</h4>
            <p className="text-sm text-muted-foreground">
              Tractors and Harvesters are in high demand • 
              <span className="text-primary font-medium ml-1">Book early to secure your slot</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryGrid;