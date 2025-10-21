import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const FeaturedEquipment = () => {
  const [currentLanguage, setCurrentLanguage] = useState('en');

  useEffect(() => {
    const savedLanguage = localStorage.getItem('farmSetu_language') || 'en';
    setCurrentLanguage(savedLanguage);
  }, []);

  const getTranslatedText = (key) => {
    const translations = {
      en: {
        title: "AI-Recommended Equipment",
        subtitle: "Smart suggestions based on your location and farming needs",
        viewAll: "View All Equipment",
        bookNow: "Book Now",
        available: "Available",
        perDay: "per day",
        rating: "Rating",
        distance: "away"
      },
      hi: {
        title: "AI-अनुशंसित उपकरण",
        subtitle: "आपके स्थान और कृषि आवश्यकताओं के आधार पर स्मार्ट सुझाव",
        viewAll: "सभी उपकरण देखें",
        bookNow: "अभी बुक करें",
        available: "उपलब्ध",
        perDay: "प्रति दिन",
        rating: "रेटिंग",
        distance: "दूर"
      },
      kn: {
        title: "AI-ಶಿಫಾರಸು ಮಾಡಿದ ಉಪಕರಣಗಳು",
        subtitle: "ನಿಮ್ಮ ಸ್ಥಳ ಮತ್ತು ಕೃಷಿ ಅಗತ್ಯಗಳ ಆಧಾರದ ಮೇಲೆ ಸ್ಮಾರ್ಟ್ ಸಲಹೆಗಳು",
        viewAll: "ಎಲ್ಲಾ ಉಪಕರಣಗಳನ್ನು ನೋಡಿ",
        bookNow: "ಈಗ ಬುಕ್ ಮಾಡಿ",
        available: "ಲಭ್ಯವಿದೆ",
        perDay: "ದಿನಕ್ಕೆ",
        rating: "ರೇಟಿಂಗ್",
        distance: "ದೂರ"
      }
    };
    return translations?.[currentLanguage]?.[key] || translations?.en?.[key];
  };

  const featuredEquipment = [
  {
    id: 1,
    name: "John Deere 5310 Tractor",
    image: "https://images.unsplash.com/photo-1684431416282-be019e1b39f9",
    imageAlt: "Green John Deere tractor in agricultural field with farming attachments",
    price: "₹2,500",
    rating: 4.8,
    reviews: 124,
    distance: "2.3 km",
    owner: "Rajesh Kumar",
    ownerImage: "https://images.unsplash.com/photo-1554169951-178836cd6bc0",
    ownerImageAlt: "Professional headshot of middle-aged Indian man with mustache in white shirt",
    available: true,
    features: ["GPS Enabled", "Fuel Efficient", "Well Maintained"],
    category: "Tractor"
  },
  {
    id: 2,
    name: "Mahindra Harvester 575 DI",
    image: "https://images.unsplash.com/photo-1731603363718-9c74f6531a21",
    imageAlt: "Red Mahindra combine harvester working in golden wheat field during harvest season",
    price: "₹4,200",
    rating: 4.9,
    reviews: 89,
    distance: "1.8 km",
    owner: "Priya Sharma",
    ownerImage: "https://images.unsplash.com/photo-1631268088758-3e1fe5346e0c",
    ownerImageAlt: "Professional headshot of Indian woman with black hair in blue traditional dress",
    available: true,
    features: ["High Capacity", "Low Maintenance", "Expert Operator"],
    category: "Harvester"
  },
  {
    id: 3,
    name: "Rotary Tiller - Heavy Duty",
    image: "https://images.unsplash.com/photo-1596289396270-898cde8584b9",
    imageAlt: "Heavy duty rotary tiller attachment working in brown soil field preparing land for planting",
    price: "₹1,800",
    rating: 4.7,
    reviews: 156,
    distance: "3.1 km",
    owner: "Suresh Patel",
    ownerImage: "https://images.unsplash.com/photo-1640583818579-740430212d27",
    ownerImageAlt: "Professional headshot of elderly Indian man with gray beard in traditional white kurta",
    available: true,
    features: ["Deep Tillage", "Adjustable Depth", "Quick Setup"],
    category: "Tiller"
  },
  {
    id: 4,
    name: "Seed Drill Machine",
    image: "https://images.unsplash.com/photo-1619023283416-1929704fad97",
    imageAlt: "Modern seed drill machine with multiple rows working in prepared agricultural field",
    price: "₹2,100",
    rating: 4.6,
    reviews: 78,
    distance: "4.2 km",
    owner: "Anita Singh",
    ownerImage: "https://images.unsplash.com/photo-1733737272264-6af8f1aa41fc",
    ownerImageAlt: "Professional headshot of young Indian woman with long black hair in green saree",
    available: false,
    features: ["Precision Seeding", "Multiple Crops", "Fertilizer Compatible"],
    category: "Seeder"
  }];


  return (
    <section className="py-16 lg:py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 lg:px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-12">

          <div className="mb-6 lg:mb-0">
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4 font-accent">
              {getTranslatedText('title')}
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl">
              {getTranslatedText('subtitle')}
            </p>
          </div>
          
          <Link to="/marketplace">
            <Button
              variant="outline"
              size="lg"
              iconName="ArrowRight"
              iconPosition="right">

              {getTranslatedText('viewAll')}
            </Button>
          </Link>
        </motion.div>

        {/* Equipment Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredEquipment?.map((equipment, index) =>
          <motion.div
            key={equipment?.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            className="bg-card rounded-2xl overflow-hidden shadow-organic hover:shadow-organic-lg organic-transition group equipment-card">

              {/* Equipment Image */}
              <div className="relative overflow-hidden h-48">
                <Image
                src={equipment?.image}
                alt={equipment?.imageAlt}
                className="w-full h-full object-cover group-hover:scale-105 organic-transition" />

                
                {/* Availability Badge */}
                <div className={`absolute top-3 left-3 px-2 py-1 rounded-full text-xs font-medium ${
              equipment?.available ?
              'bg-success text-success-foreground' :
              'bg-muted text-muted-foreground'}`
              }>
                  {equipment?.available ? getTranslatedText('available') : 'Booked'}
                </div>

                {/* Category Badge */}
                <div className="absolute top-3 right-3 bg-background/90 backdrop-blur-sm px-2 py-1 rounded-full text-xs font-medium text-foreground">
                  {equipment?.category}
                </div>
              </div>

              {/* Equipment Details */}
              <div className="p-4 space-y-4">
                <div>
                  <h3 className="font-semibold text-foreground mb-1 line-clamp-1">
                    {equipment?.name}
                  </h3>
                  <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                    <Icon name="MapPin" size={14} />
                    <span>{equipment?.distance} {getTranslatedText('distance')}</span>
                  </div>
                </div>

                {/* Rating & Reviews */}
                <div className="flex items-center space-x-2">
                  <div className="flex items-center space-x-1">
                    <Icon name="Star" size={14} className="text-warning fill-current" />
                    <span className="text-sm font-medium">{equipment?.rating}</span>
                  </div>
                  <span className="text-sm text-muted-foreground">({equipment?.reviews})</span>
                </div>

                {/* Features */}
                <div className="flex flex-wrap gap-1">
                  {equipment?.features?.slice(0, 2)?.map((feature, idx) =>
                <span
                  key={idx}
                  className="text-xs bg-muted text-muted-foreground px-2 py-1 rounded-full">

                      {feature}
                    </span>
                )}
                </div>

                {/* Owner Info */}
                <div className="flex items-center space-x-2">
                  <div className="w-6 h-6 rounded-full overflow-hidden">
                    <Image
                    src={equipment?.ownerImage}
                    alt={equipment?.ownerImageAlt}
                    className="w-full h-full object-cover" />

                  </div>
                  <span className="text-sm text-muted-foreground">{equipment?.owner}</span>
                </div>

                {/* Price & Book Button */}
                <div className="flex items-center justify-between pt-2 border-t border-border">
                  <div>
                    <span className="text-lg font-bold text-foreground">{equipment?.price}</span>
                    <span className="text-sm text-muted-foreground ml-1">{getTranslatedText('perDay')}</span>
                  </div>
                  
                  <Link to="/equipment-detail">
                    <Button
                    variant={equipment?.available ? "default" : "outline"}
                    size="sm"
                    disabled={!equipment?.available}
                    className={equipment?.available ? "bg-conversion-cta hover:bg-conversion-cta/90" : ""}>

                      {equipment?.available ? getTranslatedText('bookNow') : 'Booked'}
                    </Button>
                  </Link>
                </div>
              </div>
            </motion.div>
          )}
        </div>

        {/* AI Recommendation Note */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-12 text-center">

          <div className="inline-flex items-center space-x-2 bg-primary/10 text-primary px-4 py-2 rounded-full">
            <Icon name="Sparkles" size={16} />
            <span className="text-sm font-medium">Powered by AI recommendations</span>
          </div>
        </motion.div>
      </div>
    </section>);

};

export default FeaturedEquipment;