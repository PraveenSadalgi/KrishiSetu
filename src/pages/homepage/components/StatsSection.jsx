import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Icon from '../../../components/AppIcon';

const StatsSection = () => {
  const [currentLanguage, setCurrentLanguage] = useState('en');

  useEffect(() => {
    const savedLanguage = localStorage.getItem('farmSetu_language') || 'en';
    setCurrentLanguage(savedLanguage);
  }, []);

  const getTranslatedText = (key) => {
    const translations = {
      en: {
        title: "Empowering Agriculture Across India",
        subtitle: "Real-time impact of our farming community",
        equipmentShared: "Equipment Shared",
        activeFarmers: "Active Farmers",
        successfulBookings: "Successful Bookings",
        communitiesServed: "Communities Served",
        totalSavings: "Total Savings",
        carbonReduced: "CO₂ Reduced"
      },
      hi: {
        title: "भारत भर में कृषि को सशक्त बनाना",
        subtitle: "हमारे कृषि समुदाय का वास्तविक समय प्रभाव",
        equipmentShared: "साझा किए गए उपकरण",
        activeFarmers: "सक्रिय किसान",
        successfulBookings: "सफल बुकिंग",
        communitiesServed: "सेवा किए गए समुदाय",
        totalSavings: "कुल बचत",
        carbonReduced: "CO₂ कम किया गया"
      },
      kn: {
        title: "ಭಾರತದಾದ್ಯಂತ ಕೃಷಿಯನ್ನು ಸಶಕ್ತಗೊಳಿಸುವುದು",
        subtitle: "ನಮ್ಮ ಕೃಷಿ ಸಮುದಾಯದ ನೈಜ-ಸಮಯದ ಪ್ರಭಾವ",
        equipmentShared: "ಹಂಚಿಕೊಂಡ ಉಪಕರಣಗಳು",
        activeFarmers: "ಸಕ್ರಿಯ ರೈತರು",
        successfulBookings: "ಯಶಸ್ವಿ ಬುಕಿಂಗ್‌ಗಳು",
        communitiesServed: "ಸೇವೆ ಸಲ್ಲಿಸಿದ ಸಮುದಾಯಗಳು",
        totalSavings: "ಒಟ್ಟು ಉಳಿತಾಯ",
        carbonReduced: "CO₂ ಕಡಿಮೆಗೊಳಿಸಲಾಗಿದೆ"
      }
    };
    return translations?.[currentLanguage]?.[key] || translations?.en?.[key];
  };

  const stats = [
    {
      icon: "Tractor",
      value: "15,247",
      label: getTranslatedText('equipmentShared'),
      color: "text-primary",
      bgColor: "bg-primary/10",
      trend: "+12%"
    },
    {
      icon: "Users",
      value: "8,934",
      label: getTranslatedText('activeFarmers'),
      color: "text-success",
      bgColor: "bg-success/10",
      trend: "+18%"
    },
    {
      icon: "Calendar",
      value: "42,156",
      label: getTranslatedText('successfulBookings'),
      color: "text-harvest-orange",
      bgColor: "bg-harvest-orange/10",
      trend: "+25%"
    },
    {
      icon: "MapPin",
      value: "1,247",
      label: getTranslatedText('communitiesServed'),
      color: "text-trust-blue",
      bgColor: "bg-trust-blue/10",
      trend: "+8%"
    },
    {
      icon: "IndianRupee",
      value: "₹2.4Cr",
      label: getTranslatedText('totalSavings'),
      color: "text-conversion-cta",
      bgColor: "bg-conversion-cta/10",
      trend: "+35%"
    },
    {
      icon: "Leaf",
      value: "1,847T",
      label: getTranslatedText('carbonReduced'),
      color: "text-success",
      bgColor: "bg-success/10",
      trend: "+22%"
    }
  ];

  return (
    <section className="py-16 lg:py-24 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 lg:px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4 font-accent">
            {getTranslatedText('title')}
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {getTranslatedText('subtitle')}
          </p>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {stats?.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-card rounded-2xl p-6 lg:p-8 shadow-organic hover:shadow-organic-lg organic-transition group"
            >
              <div className="flex items-start justify-between mb-4">
                <div className={`w-12 h-12 ${stat?.bgColor} rounded-xl flex items-center justify-center group-hover:scale-110 organic-transition`}>
                  <Icon name={stat?.icon} size={24} className={stat?.color} />
                </div>
                <div className="flex items-center space-x-1 text-sm text-success font-medium">
                  <Icon name="TrendingUp" size={16} />
                  <span>{stat?.trend}</span>
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="text-3xl lg:text-4xl font-bold text-foreground font-accent">
                  {stat?.value}
                </div>
                <div className="text-muted-foreground font-medium">
                  {stat?.label}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Live Activity Indicator */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-12 text-center"
        >
          <div className="inline-flex items-center space-x-2 bg-success/10 text-success px-4 py-2 rounded-full">
            <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
            <span className="text-sm font-medium">Live updates every 30 seconds</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default StatsSection;