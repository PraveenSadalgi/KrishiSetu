import React from 'react';
import Icon from '../../../components/AppIcon';

const WeatherWidget = ({ weatherData }) => {
  const getWeatherIcon = (condition) => {
    switch (condition?.toLowerCase()) {
      case 'sunny': return 'Sun';
      case 'cloudy': return 'Cloud';
      case 'rainy': return 'CloudRain';
      case 'stormy': return 'CloudLightning';
      case 'partly cloudy': return 'CloudSun';
      default: return 'Sun';
    }
  };

  const getRecommendationIcon = (type) => {
    switch (type) {
      case 'irrigation': return 'Droplets';
      case 'harvesting': return 'Scissors';
      case 'planting': return 'Sprout';
      case 'fertilizer': return 'Leaf';
      default: return 'AlertCircle';
    }
  };

  return (
    <div className="bg-gradient-to-br from-blue-50 to-blue-100 border border-blue-200 rounded-lg p-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-foreground">Weather Forecast</h3>
        <div className="flex items-center space-x-1 text-xs text-muted-foreground">
          <Icon name="MapPin" size={12} />
          <span>{weatherData?.location}</span>
        </div>
      </div>
      {/* Current Weather */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-blue-200 rounded-full flex items-center justify-center">
            <Icon name={getWeatherIcon(weatherData?.current?.condition)} size={24} className="text-blue-600" />
          </div>
          <div>
            <div className="text-2xl font-bold text-foreground">{weatherData?.current?.temperature}°C</div>
            <div className="text-sm text-muted-foreground">{weatherData?.current?.condition}</div>
          </div>
        </div>
        <div className="text-right">
          <div className="text-sm text-muted-foreground">Humidity</div>
          <div className="font-medium text-foreground">{weatherData?.current?.humidity}%</div>
        </div>
      </div>
      {/* 3-Day Forecast */}
      <div className="grid grid-cols-3 gap-2 mb-4">
        {weatherData?.forecast?.map((day, index) => (
          <div key={index} className="text-center p-2 bg-white/50 rounded-lg">
            <div className="text-xs text-muted-foreground mb-1">{day?.day}</div>
            <Icon name={getWeatherIcon(day?.condition)} size={16} className="text-blue-600 mx-auto mb-1" />
            <div className="text-xs font-medium text-foreground">{day?.high}°/{day?.low}°</div>
          </div>
        ))}
      </div>
      {/* Farming Recommendations */}
      <div className="space-y-2">
        <h4 className="text-sm font-medium text-foreground">Today's Recommendations</h4>
        {weatherData?.recommendations?.map((rec, index) => (
          <div key={index} className="flex items-center space-x-2 p-2 bg-white/50 rounded-lg">
            <Icon name={getRecommendationIcon(rec?.type)} size={14} className="text-primary" />
            <span className="text-xs text-foreground">{rec?.message}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WeatherWidget;