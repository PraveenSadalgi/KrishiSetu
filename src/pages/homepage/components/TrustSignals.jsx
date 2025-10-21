import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const TrustSignals = () => {
  const [currentLanguage, setCurrentLanguage] = useState('en');

  useEffect(() => {
    const savedLanguage = localStorage.getItem('farmSetu_language') || 'en';
    setCurrentLanguage(savedLanguage);
  }, []);

  const getTranslatedText = (key) => {
    const translations = {
      en: {
        title: "Trusted by Farmers Across India",
        subtitle: "Join thousands of farmers who have transformed their agricultural practices",
        testimonials: "What Farmers Say",
        partnerships: "Our Partners",
        certifications: "Certifications & Awards"
      },
      hi: {
        title: "भारत भर के किसानों द्वारा भरोसेमंद",
        subtitle: "हजारों किसानों से जुड़ें जिन्होंने अपनी कृषि प्रथाओं को बदल दिया है",
        testimonials: "किसान क्या कहते हैं",
        partnerships: "हमारे साझीदार",
        certifications: "प्रमाणपत्र और पुरस्कार"
      },
      kn: {
        title: "ಭಾರತದಾದ್ಯಂತ ರೈತರಿಂದ ವಿಶ್ವಾಸಾರ್ಹ",
        subtitle: "ತಮ್ಮ ಕೃಷಿ ಅಭ್ಯಾಸಗಳನ್ನು ಪರಿವರ್ತಿಸಿದ ಸಾವಿರಾರು ರೈತರೊಂದಿಗೆ ಸೇರಿ",
        testimonials: "ರೈತರು ಏನು ಹೇಳುತ್ತಾರೆ",
        partnerships: "ನಮ್ಮ ಪಾಲುದಾರರು",
        certifications: "ಪ್ರಮಾಣಪತ್ರಗಳು ಮತ್ತು ಪುರಸ್ಕಾರಗಳು"
      }
    };
    return translations?.[currentLanguage]?.[key] || translations?.en?.[key];
  };

  const testimonials = [
  {
    id: 1,
    name: "Rajesh Kumar",
    location: "Haryana",
    image: "https://images.unsplash.com/photo-1585081452922-c1739968cf00",
    imageAlt: "Professional headshot of middle-aged Indian farmer with turban and confident smile in rural setting",
    rating: 5,
    content: `FarmSetu has revolutionized my farming operations. The AI recommendations helped me increase my wheat yield by 30% while reducing costs. The equipment sharing feature is a game-changer for small farmers like me.`,
    crop: "Wheat & Rice",
    savings: "₹2.5L saved annually"
  },
  {
    id: 2,
    name: "Priya Sharma",
    location: "Maharashtra",
    image: "https://images.unsplash.com/photo-1708860544636-2f04463cb672",
    imageAlt: "Professional headshot of Indian woman farmer in traditional saree with warm smile in agricultural field",
    rating: 5,
    content: `The community support on FarmSetu is incredible. I learned modern techniques from experienced farmers and now my cotton farm is more productive than ever. The weather insights are spot-on!`,
    crop: "Cotton & Sugarcane",
    savings: "₹1.8L saved annually"
  },
  {
    id: 3,
    name: "Suresh Patel",
    location: "Gujarat",
    image: "https://images.unsplash.com/photo-1640583818579-740430212d27",
    imageAlt: "Professional headshot of elderly Indian farmer with white beard and traditional white kurta in farm setting",
    rating: 5,
    content: `As a progressive farmer, I appreciate how FarmSetu combines traditional wisdom with modern technology. The equipment rental system has made expensive machinery accessible to our entire village.`,
    crop: "Groundnut & Millet",
    savings: "₹3.2L saved annually"
  }];


  const partners = [
  {
    name: "Ministry of Agriculture",
    logo: "https://images.unsplash.com/photo-1583488965355-3763c7d110f7",
    logoAlt: "Government of India Ministry of Agriculture official emblem with national symbols"
  },
  {
    name: "NABARD",
    logo: "https://images.unsplash.com/photo-1644995809629-5aa60d524903",
    logoAlt: "NABARD National Bank for Agriculture and Rural Development official logo"
  },
  {
    name: "ICAR",
    logo: "https://images.unsplash.com/photo-1614023968559-b20a484ec2be",
    logoAlt: "Indian Council of Agricultural Research ICAR institutional logo with agricultural symbols"
  },
  {
    name: "State Cooperatives",
    logo: "https://images.unsplash.com/photo-1623622799182-32cfab7449a1",
    logoAlt: "State Agricultural Cooperative Society federation logo with farming equipment symbols"
  }];


  const certifications = [
  {
    title: "ISO 27001 Certified",
    description: "Information Security Management",
    icon: "Shield",
    color: "text-success bg-success/10"
  },
  {
    title: "Digital India Initiative",
    description: "Government Recognition",
    icon: "Award",
    color: "text-primary bg-primary/10"
  },
  {
    title: "Startup India",
    description: "Recognized Startup",
    icon: "Rocket",
    color: "text-harvest-orange bg-harvest-orange/10"
  },
  {
    title: "Best AgriTech Platform 2024",
    description: "Industry Excellence Award",
    icon: "Trophy",
    color: "text-warning bg-warning/10"
  }];


  return (
    <section className="py-16 lg:py-24 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 lg:px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16">

          <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4 font-accent">
            {getTranslatedText('title')}
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {getTranslatedText('subtitle')}
          </p>
        </motion.div>

        {/* Testimonials */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-16">

          <h3 className="text-2xl font-semibold text-foreground mb-8 text-center">
            {getTranslatedText('testimonials')}
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {testimonials?.map((testimonial, index) =>
            <motion.div
              key={testimonial?.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-card rounded-2xl p-6 shadow-organic hover:shadow-organic-lg organic-transition">

                {/* Rating */}
                <div className="flex items-center mb-4">
                  {[...Array(testimonial?.rating)]?.map((_, i) =>
                <Icon key={i} name="Star" size={16} className="text-warning fill-current" />
                )}
                </div>

                {/* Content */}
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  "{testimonial?.content}"
                </p>

                {/* Author */}
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-12 h-12 rounded-full overflow-hidden">
                    <Image
                    src={testimonial?.image}
                    alt={testimonial?.imageAlt}
                    className="w-full h-full object-cover" />

                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground">{testimonial?.name}</h4>
                    <p className="text-sm text-muted-foreground">{testimonial?.location}</p>
                  </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 gap-4 pt-4 border-t border-border">
                  <div>
                    <p className="text-xs text-muted-foreground">Crops</p>
                    <p className="text-sm font-medium text-foreground">{testimonial?.crop}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Savings</p>
                    <p className="text-sm font-medium text-success">{testimonial?.savings}</p>
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        </motion.div>

        {/* Partners */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mb-16">

          <h3 className="text-2xl font-semibold text-foreground mb-8 text-center">
            {getTranslatedText('partnerships')}
          </h3>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {partners?.map((partner, index) =>
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="flex items-center justify-center p-6 bg-card rounded-xl shadow-organic hover:shadow-organic-lg organic-transition">

                <div className="text-center">
                  <div className="w-16 h-16 bg-muted rounded-lg flex items-center justify-center mx-auto mb-3 overflow-hidden">
                    <Image
                    src={partner?.logo}
                    alt={partner?.logoAlt}
                    className="w-full h-full object-contain" />

                  </div>
                  <p className="text-sm font-medium text-foreground">{partner?.name}</p>
                </div>
              </motion.div>
            )}
          </div>
        </motion.div>

        {/* Certifications */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6 }}>

          <h3 className="text-2xl font-semibold text-foreground mb-8 text-center">
            {getTranslatedText('certifications')}
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {certifications?.map((cert, index) =>
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-card rounded-xl p-6 shadow-organic hover:shadow-organic-lg organic-transition text-center">

                <div className={`w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-4 ${cert?.color}`}>
                  <Icon name={cert?.icon} size={24} />
                </div>
                <h4 className="font-semibold text-foreground mb-2">{cert?.title}</h4>
                <p className="text-sm text-muted-foreground">{cert?.description}</p>
              </motion.div>
            )}
          </div>
        </motion.div>

        {/* Trust Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-12 text-center">

          <div className="inline-flex items-center space-x-2 bg-success/10 text-success px-6 py-3 rounded-full trust-glow">
            <Icon name="ShieldCheck" size={20} />
            <span className="font-medium">Trusted by 8,934+ farmers across India</span>
          </div>
        </motion.div>
      </div>
    </section>);

};

export default TrustSignals;