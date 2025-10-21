import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const AIRecommendations = ({ onEquipmentSelect }) => {
  const recommendations = [
  {
    id: 'ai-rec-1',
    type: 'seasonal',
    title: 'Perfect for Rabi Season',
    description: 'Based on your location and current weather patterns',
    equipment: {
      id: 'eq-ai-1',
      name: 'John Deere 5050D Tractor',
      image: "https://images.unsplash.com/photo-1734224384775-16eaf841c58f",
      imageAlt: 'Green John Deere tractor in agricultural field with farming equipment attached',
      pricePerDay: 1200,
      rating: 4.8,
      location: 'Bangalore Rural',
      distance: 8,
      matchScore: 95
    }
  },
  {
    id: 'ai-rec-2',
    type: 'weather',
    title: 'Weather-Optimized Choice',
    description: 'Ideal for current soil moisture conditions',
    equipment: {
      id: 'eq-ai-2',
      name: 'Mahindra Rotary Tiller',
      image: "https://images.unsplash.com/photo-1621470549142-28627b7eed34",
      imageAlt: 'Orange Mahindra rotary tiller working in brown soil field preparing land for planting',
      pricePerDay: 800,
      rating: 4.6,
      location: 'Mysore',
      distance: 12,
      matchScore: 92
    }
  },
  {
    id: 'ai-rec-3',
    type: 'usage',
    title: 'Based on Your History',
    description: 'Similar farmers also rented this equipment',
    equipment: {
      id: 'eq-ai-3',
      name: 'Swaraj Combine Harvester',
      image: "https://images.unsplash.com/photo-1726490144135-516f99c4f0ff",
      imageAlt: 'Red Swaraj combine harvester machine operating in golden wheat field during harvest season',
      pricePerDay: 2500,
      rating: 4.7,
      location: 'Hassan',
      distance: 15,
      matchScore: 89
    }
  }];


  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    })?.format(price);
  };

  const getRecommendationIcon = (type) => {
    switch (type) {
      case 'seasonal':return 'Calendar';
      case 'weather':return 'CloudRain';
      case 'usage':return 'Users';
      default:return 'Sparkles';
    }
  };

  const getRecommendationColor = (type) => {
    switch (type) {
      case 'seasonal':return 'text-primary';
      case 'weather':return 'text-accent';
      case 'usage':return 'text-secondary';
      default:return 'text-primary';
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 shadow-organic">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center">
          <Icon name="Sparkles" size={20} className="text-accent" />
        </div>
        <div>
          <h2 className="text-xl font-semibold text-foreground">
            AI Recommendations
          </h2>
          <p className="text-muted-foreground">
            Personalized suggestions based on your needs
          </p>
        </div>
      </div>
      {/* Recommendations List */}
      <div className="space-y-4">
        {recommendations?.map((rec) =>
        <div
          key={rec?.id}
          className="border border-border rounded-lg p-4 hover:border-primary/20 hover:shadow-organic organic-transition">

            {/* Recommendation Header */}
            <div className="flex items-start gap-3 mb-3">
              <div className={`w-8 h-8 rounded-full bg-muted flex items-center justify-center ${getRecommendationColor(rec?.type)}`}>
                <Icon name={getRecommendationIcon(rec?.type)} size={16} />
              </div>
              <div className="flex-1">
                <h3 className="font-medium text-foreground mb-1">
                  {rec?.title}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {rec?.description}
                </p>
              </div>
              <div className="text-right">
                <div className="flex items-center gap-1 text-sm">
                  <Icon name="Target" size={14} className="text-success" />
                  <span className="font-medium text-success">
                    {rec?.equipment?.matchScore}% match
                  </span>
                </div>
              </div>
            </div>

            {/* Equipment Card */}
            <div className="flex items-center gap-4 p-3 bg-muted/50 rounded-lg">
              <Image
              src={rec?.equipment?.image}
              alt={rec?.equipment?.imageAlt}
              className="w-16 h-16 rounded-lg object-cover" />

              
              <div className="flex-1 min-w-0">
                <h4 className="font-medium text-foreground mb-1 truncate">
                  {rec?.equipment?.name}
                </h4>
                <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
                  <Icon name="MapPin" size={12} />
                  <span>{rec?.equipment?.location}</span>
                  <span>•</span>
                  <span>{rec?.equipment?.distance} km away</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1">
                    <Icon name="Star" size={12} className="text-yellow-400 fill-current" />
                    <span className="text-sm font-medium">{rec?.equipment?.rating}</span>
                  </div>
                  <span className="text-lg font-bold text-primary">
                    {formatPrice(rec?.equipment?.pricePerDay)}/day
                  </span>
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <Button
                variant="outline"
                size="sm"
                onClick={() => onEquipmentSelect(rec?.equipment)}>

                  View
                </Button>
                <Button
                variant="default"
                size="sm"
                className="bg-conversion-cta hover:bg-conversion-cta/90">

                  Book
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
      {/* AI Insights Footer */}
      <div className="mt-6 p-4 bg-gradient-to-r from-accent/5 to-primary/5 rounded-lg border border-accent/10">
        <div className="flex items-start gap-3">
          <Icon name="Brain" size={20} className="text-accent mt-0.5" />
          <div>
            <h4 className="font-medium text-foreground mb-1">
              AI Insight
            </h4>
            <p className="text-sm text-muted-foreground">
              Based on weather forecasts, your location, and seasonal patterns, 
              <span className="text-accent font-medium"> tractor rentals are 40% more in demand</span> this week. 
              Consider booking early for better availability.
            </p>
          </div>
        </div>
      </div>
    </div>);

};

export default AIRecommendations;