import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Icon from '../../../components/AppIcon';

const WeatherInsights = () => {
  const [currentLanguage, setCurrentLanguage] = useState('en');

  useEffect(() => {
    const savedLanguage = localStorage.getItem('farmSetu_language') || 'en';
    setCurrentLanguage(savedLanguage);
  }, []);

  const getTranslatedText = (key) => {
    const translations = {
      en: {
        title: "Weather-Integrated Farming Insights",
        subtitle: "AI-powered recommendations based on current weather conditions",
        currentWeather: "Current Weather",
        forecast: "7-Day Forecast",
        recommendations: "AI Recommendations",
        humidity: "Humidity",
        windSpeed: "Wind Speed",
        uvIndex: "UV Index",
        rainfall: "Rainfall",
        temperature: "Temperature",
        condition: "Condition"
      },
      hi: {
        title: "मौसम-एकीकृत कृषि अंतर्दृष्टि",
        subtitle: "वर्तमान मौसम स्थितियों के आधार पर AI-संचालित सिफारिशें",
        currentWeather: "वर्तमान मौसम",
        forecast: "7-दिन का पूर्वानुमान",
        recommendations: "AI सिफारिशें",
        humidity: "आर्द्रता",
        windSpeed: "हवा की गति",
        uvIndex: "UV सूचकांक",
        rainfall: "वर्षा",
        temperature: "तापमान",
        condition: "स्थिति"
      },
      kn: {
        title: "ಹವಾಮಾನ-ಸಂಯೋಜಿತ ಕೃಷಿ ಒಳನೋಟಗಳು",
        subtitle: "ಪ್ರಸ್ತುತ ಹವಾಮಾನ ಪರಿಸ್ಥಿತಿಗಳ ಆಧಾರದ ಮೇಲೆ AI-ಚಾಲಿತ ಶಿಫಾರಸುಗಳು",
        currentWeather: "ಪ್ರಸ್ತುತ ಹವಾಮಾನ",
        forecast: "7-ದಿನಗಳ ಮುನ್ಸೂಚನೆ",
        recommendations: "AI ಶಿಫಾರಸುಗಳು",
        humidity: "ಆರ್ದ್ರತೆ",
        windSpeed: "ಗಾಳಿಯ ವೇಗ",
        uvIndex: "UV ಸೂಚ್ಯಂಕ",
        rainfall: "ಮಳೆ",
        temperature: "ತಾಪಮಾನ",
        condition: "ಸ್ಥಿತಿ"
      }
    };
    return translations?.[currentLanguage]?.[key] || translations?.en?.[key];
  };

  const currentWeather = {
    location: "Bangalore, Karnataka",
    temperature: 28,
    condition: "Partly Cloudy",
    humidity: 65,
    windSpeed: 12,
    uvIndex: 6,
    rainfall: 0,
    icon: "CloudSun"
  };

  const forecast = [
    { day: "Today", temp: "28°C", condition: "Partly Cloudy", icon: "CloudSun", rain: 10 },
    { day: "Tomorrow", temp: "26°C", condition: "Light Rain", icon: "CloudRain", rain: 80 },
    { day: "Wed", temp: "24°C", condition: "Heavy Rain", icon: "CloudRain", rain: 95 },
    { day: "Thu", temp: "27°C", condition: "Cloudy", icon: "Cloud", rain: 20 },
    { day: "Fri", temp: "29°C", condition: "Sunny", icon: "Sun", rain: 5 },
    { day: "Sat", temp: "31°C", condition: "Sunny", icon: "Sun", rain: 0 },
    { day: "Sun", temp: "30°C", condition: "Partly Cloudy", icon: "CloudSun", rain: 15 }
  ];

  const aiRecommendations = [
    {
      icon: "Droplets",
      title: "Irrigation Alert",
      message: "Heavy rain expected in 2 days. Reduce irrigation by 40% to prevent waterlogging.",
      priority: "high",
      color: "text-trust-blue bg-trust-blue/10"
    },
    {
      icon: "Tractor",
      title: "Equipment Usage",
      message: "Ideal conditions for harvesting today. Consider using combine harvester before rain.",
      priority: "medium",
      color: "text-harvest-orange bg-harvest-orange/10"
    },
    {
      icon: "Sprout",
      title: "Crop Care",
      message: "High humidity levels. Monitor for fungal diseases in tomato crops.",
      priority: "medium",
      color: "text-success bg-success/10"
    },
    {
      icon: "Shield",
      title: "Pest Control",
      message: "Weather conditions favorable for pest activity. Consider preventive spraying.",
      priority: "low",
      color: "text-warning bg-warning/10"
    }
  ];

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'border-l-4 border-l-destructive';
      case 'medium': return 'border-l-4 border-l-warning';
      case 'low': return 'border-l-4 border-l-success';
      default: return 'border-l-4 border-l-muted';
    }
  };

  return (
    <section className="py-16 lg:py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 lg:px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4 font-accent">
            {getTranslatedText('title')}
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {getTranslatedText('subtitle')}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Current Weather */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="bg-card rounded-2xl p-6 shadow-organic"
          >
            <h3 className="text-xl font-semibold text-foreground mb-6 flex items-center">
              <Icon name="MapPin" size={20} className="mr-2 text-primary" />
              {getTranslatedText('currentWeather')}
            </h3>
            
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Icon name={currentWeather?.icon} size={32} className="text-primary" />
              </div>
              <div className="text-3xl font-bold text-foreground mb-1">{currentWeather?.temperature}°C</div>
              <div className="text-muted-foreground">{currentWeather?.condition}</div>
              <div className="text-sm text-muted-foreground mt-1">{currentWeather?.location}</div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="text-center">
                <Icon name="Droplets" size={20} className="text-trust-blue mx-auto mb-1" />
                <div className="text-sm font-medium">{currentWeather?.humidity}%</div>
                <div className="text-xs text-muted-foreground">{getTranslatedText('humidity')}</div>
              </div>
              <div className="text-center">
                <Icon name="Wind" size={20} className="text-muted-foreground mx-auto mb-1" />
                <div className="text-sm font-medium">{currentWeather?.windSpeed} km/h</div>
                <div className="text-xs text-muted-foreground">{getTranslatedText('windSpeed')}</div>
              </div>
              <div className="text-center">
                <Icon name="Sun" size={20} className="text-warning mx-auto mb-1" />
                <div className="text-sm font-medium">{currentWeather?.uvIndex}</div>
                <div className="text-xs text-muted-foreground">{getTranslatedText('uvIndex')}</div>
              </div>
              <div className="text-center">
                <Icon name="CloudRain" size={20} className="text-trust-blue mx-auto mb-1" />
                <div className="text-sm font-medium">{currentWeather?.rainfall}mm</div>
                <div className="text-xs text-muted-foreground">{getTranslatedText('rainfall')}</div>
              </div>
            </div>
          </motion.div>

          {/* 7-Day Forecast */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-card rounded-2xl p-6 shadow-organic"
          >
            <h3 className="text-xl font-semibold text-foreground mb-6 flex items-center">
              <Icon name="Calendar" size={20} className="mr-2 text-primary" />
              {getTranslatedText('forecast')}
            </h3>
            
            <div className="space-y-3">
              {forecast?.map((day, index) => (
                <div key={index} className="flex items-center justify-between p-3 rounded-lg hover:bg-muted/50 organic-transition">
                  <div className="flex items-center space-x-3">
                    <Icon name={day?.icon} size={20} className="text-primary" />
                    <div>
                      <div className="font-medium text-sm">{day?.day}</div>
                      <div className="text-xs text-muted-foreground">{day?.condition}</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-semibold">{day?.temp}</div>
                    <div className="text-xs text-trust-blue">{day?.rain}%</div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* AI Recommendations */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="bg-card rounded-2xl p-6 shadow-organic"
          >
            <h3 className="text-xl font-semibold text-foreground mb-6 flex items-center">
              <Icon name="Sparkles" size={20} className="mr-2 text-primary" />
              {getTranslatedText('recommendations')}
            </h3>
            
            <div className="space-y-4">
              {aiRecommendations?.map((rec, index) => (
                <div key={index} className={`p-4 rounded-lg ${getPriorityColor(rec?.priority)} bg-muted/30`}>
                  <div className="flex items-start space-x-3">
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${rec?.color}`}>
                      <Icon name={rec?.icon} size={16} />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium text-foreground mb-1">{rec?.title}</h4>
                      <p className="text-sm text-muted-foreground leading-relaxed">{rec?.message}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 p-3 bg-primary/5 rounded-lg">
              <div className="flex items-center space-x-2 text-primary">
                <Icon name="Zap" size={16} />
                <span className="text-sm font-medium">AI-powered insights updated every hour</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default WeatherInsights;