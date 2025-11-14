import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import { equipmentService } from '../../../services/equipmentService';

const CategoryGrid = ({ onCategorySelect, selectedCategoryId, onClearFilter }) => {
  const [categories, setCategories] = useState([]);
  const [categoriesLoading, setCategoriesLoading] = useState(true);
  const [categoryCounts, setCategoryCounts] = useState({});

  useEffect(() => {
    const fetchCategoriesAndCounts = async () => {
      try {
        // Fetch categories and counts in parallel
        const [categoriesResult, countsResult] = await Promise.all([
          equipmentService.getCategories(),
          equipmentService.getCategoryCounts()
        ]);

        if (categoriesResult.error) throw categoriesResult.error;
        if (countsResult.error) {
          console.warn('Error fetching category counts:', countsResult.error);
        }

        // Transform database categories to match the expected format
        const transformedCategories = categoriesResult.data?.map(category => ({
          id: category.id, // Use UUID from database
          name: category.name,
          icon: getIconForCategory(category.name),
          count: countsResult.data?.[category.id] || 0, // Use real count from database
          color: getColorForCategory(category.name),
          description: getDescriptionForCategory(category.name)
        }));

        setCategories(transformedCategories);
        setCategoryCounts(countsResult.data || {});
      } catch (error) {
        console.error('Error fetching categories:', error);
        // Fallback to hardcoded categories if API fails
        setCategories([
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
          }
        ]);
      } finally {
        setCategoriesLoading(false);
      }
    };

    fetchCategoriesAndCounts();
  }, []);

  const getIconForCategory = (categoryName) => {
    const iconMap = {
      'Tractors': 'Truck',
      'Harvesters': 'Scissors',
      'Tillers & Cultivators': 'Wrench',
      'Sprayers': 'Droplets',
      'Seeders & Planters': 'Flower2',
      'Irrigation Equipment': 'Waves',
      'Threshers': 'Zap'
    };
    return iconMap[categoryName] || 'MoreHorizontal';
  };

  const getColorForCategory = (categoryName) => {
    const colorMap = {
      'Tractors': 'bg-primary/10 text-primary',
      'Harvesters': 'bg-secondary/10 text-secondary',
      'Tillers & Cultivators': 'bg-success/10 text-success',
      'Sprayers': 'bg-accent/10 text-accent',
      'Seeders & Planters': 'bg-warning/10 text-warning',
      'Irrigation Equipment': 'bg-trust-blue/10 text-trust-blue',
      'Threshers': 'bg-harvest-orange/10 text-harvest-orange'
    };
    return colorMap[categoryName] || 'bg-muted-foreground/10 text-muted-foreground';
  };

  const getDescriptionForCategory = (categoryName) => {
    const descriptionMap = {
      'Tractors': 'Heavy-duty farming tractors',
      'Harvesters': 'Crop harvesting equipment',
      'Tillers & Cultivators': 'Soil preparation tools',
      'Sprayers': 'Pesticide & fertilizer sprayers',
      'Seeders & Planters': 'Planting & seeding equipment',
      'Irrigation Equipment': 'Water management systems',
      'Threshers': 'Grain separation equipment'
    };
    return descriptionMap[categoryName] || 'Miscellaneous farm tools';
  };

  if (categoriesLoading) {
    return (
      <div className="bg-card border border-border rounded-lg p-6 shadow-organic">
        <div className="animate-pulse">
          <div className="h-6 bg-muted rounded mb-4"></div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="p-5 border-2 border-border rounded-xl">
                <div className="w-14 h-14 bg-muted rounded-xl mb-4"></div>
                <div className="h-4 bg-muted rounded mb-2"></div>
                <div className="h-3 bg-muted rounded"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

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
        <div className="flex items-center gap-2">
          {selectedCategoryId && (
            <button
              onClick={onClearFilter}
              className="text-sm text-muted-foreground hover:text-foreground organic-transition flex items-center gap-1"
            >
              <Icon name="X" size={16} />
              Clear Filter
            </button>
          )}
          <button className="text-primary hover:text-primary/80 organic-transition text-sm font-medium">
            View All Categories
          </button>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
        {categories?.map((category) => (
          <button
            key={category?.id}
            onClick={() => onCategorySelect(category?.id)}
            className={`group relative p-5 rounded-xl border-2 organic-transition text-left cursor-pointer hover:shadow-lg hover:-translate-y-1 ${
              selectedCategoryId === category?.id
                ? 'border-primary bg-primary/5 shadow-organic ring-2 ring-primary/20'
                : 'border-border hover:border-primary/30 hover:shadow-organic'
            }`}
          >
            <div className={`w-14 h-14 rounded-xl ${category?.color} flex items-center justify-center mb-4 group-hover:scale-110 organic-transition shadow-sm`}>
              <Icon name={category?.icon} size={28} />
            </div>

            <h3 className="font-semibold text-foreground mb-2 group-hover:text-primary organic-transition text-base leading-tight">
              {category?.name}
            </h3>

            <p className="text-sm text-muted-foreground mb-3 line-clamp-2 leading-relaxed">
              {category?.description}
            </p>

            <div className="flex items-center justify-between mt-auto">
              <span className="text-sm font-semibold text-primary bg-primary/10 px-2 py-1 rounded-md">
                {category?.count} items
              </span>
              <Icon
                name="ArrowRight"
                size={18}
                className="text-muted-foreground group-hover:text-primary group-hover:translate-x-1 organic-transition"
              />
            </div>

            {/* Active indicator */}
            {selectedCategoryId === category?.id && (
              <div className="absolute top-3 right-3 w-3 h-3 bg-primary rounded-full animate-pulse"></div>
            )}
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
