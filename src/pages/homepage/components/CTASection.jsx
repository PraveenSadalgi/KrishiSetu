import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const CTASection = () => {
  const [currentLanguage, setCurrentLanguage] = useState('en');

  useEffect(() => {
    const savedLanguage = localStorage.getItem('farmSetu_language') || 'en';
    setCurrentLanguage(savedLanguage);
  }, []);

  const getTranslatedText = (key) => {
    const translations = {
      en: {
        title: "Ready to Transform Your Farming?",
        subtitle: "Join thousands of farmers who are already benefiting from smart agriculture",
        description: "Get started with FarmSetu today and experience the future of farming. Access equipment, connect with community, and grow your agricultural success with AI-powered insights.",
        getStarted: "Get Started Free",
        learnMore: "Learn More",
        downloadApp: "Download App",
        features: {
          equipment: "Access 15,000+ Equipment",
          community: "Join 8,934 Farmers",
          ai: "AI-Powered Insights",
          support: "24/7 Support"
        },
        benefits: {
          title: "Why Choose FarmSetu?",
          cost: "Reduce Costs by 40%",
          yield: "Increase Yield by 25%",
          time: "Save 60% Time",
          network: "Expand Your Network"
        }
      },
      hi: {
        title: "अपनी खेती को बदलने के लिए तैयार हैं?",
        subtitle: "हजारों किसानों से जुड़ें जो पहले से ही स्मार्ट कृषि से लाभ उठा रहे हैं",
        description: "आज ही FarmSetu के साथ शुरुआत करें और खेती के भविष्य का अनुभव करें। उपकरणों तक पहुंच प्राप्त करें, समुदाय से जुड़ें, और AI-संचालित अंतर्दृष्टि के साथ अपनी कृषि सफलता बढ़ाएं।",
        getStarted: "मुफ्त में शुरू करें",
        learnMore: "और जानें",
        downloadApp: "ऐप डाउनलोड करें",
        features: {
          equipment: "15,000+ उपकरणों तक पहुंच",
          community: "8,934 किसानों से जुड़ें",
          ai: "AI-संचालित अंतर्दृष्टि",
          support: "24/7 सहायता"
        },
        benefits: {
          title: "FarmSetu क्यों चुनें?",
          cost: "लागत में 40% कमी",
          yield: "उत्पादन में 25% वृद्धि",
          time: "60% समय की बचत",
          network: "अपना नेटवर्क बढ़ाएं"
        }
      },
      kn: {
        title: "ನಿಮ್ಮ ಕೃಷಿಯನ್ನು ಪರಿವರ್ತಿಸಲು ಸಿದ್ಧರಿದ್ದೀರಾ?",
        subtitle: "ಸ್ಮಾರ್ಟ್ ಕೃಷಿಯಿಂದ ಈಗಾಗಲೇ ಪ್ರಯೋಜನ ಪಡೆಯುತ್ತಿರುವ ಸಾವಿರಾರು ರೈತರೊಂದಿಗೆ ಸೇರಿ",
        description: "ಇಂದೇ FarmSetu ನೊಂದಿಗೆ ಪ್ರಾರಂಭಿಸಿ ಮತ್ತು ಕೃಷಿಯ ಭವಿಷ್ಯವನ್ನು ಅನುಭವಿಸಿ। ಉಪಕರಣಗಳನ್ನು ಪ್ರವೇಶಿಸಿ, ಸಮುದಾಯದೊಂದಿಗೆ ಸಂಪರ್ಕ ಸಾಧಿಸಿ ಮತ್ತು AI-ಚಾಲಿತ ಒಳನೋಟಗಳೊಂದಿಗೆ ನಿಮ್ಮ ಕೃಷಿ ಯಶಸ್ಸನ್ನು ಬೆಳೆಸಿ।",
        getStarted: "ಉಚಿತವಾಗಿ ಪ್ರಾರಂಭಿಸಿ",
        learnMore: "ಇನ್ನಷ್ಟು ತಿಳಿಯಿರಿ",
        downloadApp: "ಆ್ಯಪ್ ಡೌನ್‌ಲೋಡ್ ಮಾಡಿ",
        features: {
          equipment: "15,000+ ಉಪಕರಣಗಳ ಪ್ರವೇಶ",
          community: "8,934 ರೈತರೊಂದಿಗೆ ಸೇರಿ",
          ai: "AI-ಚಾಲಿತ ಒಳನೋಟಗಳು",
          support: "24/7 ಬೆಂಬಲ"
        },
        benefits: {
          title: "FarmSetu ಅನ್ನು ಏಕೆ ಆಯ್ಕೆ ಮಾಡಬೇಕು?",
          cost: "ವೆಚ್ಚವನ್ನು 40% ಕಡಿಮೆ ಮಾಡಿ",
          yield: "ಇಳುವರಿಯನ್ನು 25% ಹೆಚ್ಚಿಸಿ",
          time: "60% ಸಮಯ ಉಳಿಸಿ",
          network: "ನಿಮ್ಮ ನೆಟ್‌ವರ್ಕ್ ವಿಸ್ತರಿಸಿ"
        }
      }
    };
    return translations?.[currentLanguage]?.[key] || translations?.en?.[key];
  };

  const features = [
  {
    icon: "Tractor",
    title: getTranslatedText('features')?.equipment,
    color: "text-primary bg-primary/10"
  },
  {
    icon: "Users",
    title: getTranslatedText('features')?.community,
    color: "text-success bg-success/10"
  },
  {
    icon: "Sparkles",
    title: getTranslatedText('features')?.ai,
    color: "text-harvest-orange bg-harvest-orange/10"
  },
  {
    icon: "Headphones",
    title: getTranslatedText('features')?.support,
    color: "text-trust-blue bg-trust-blue/10"
  }];


  const benefits = [
  {
    icon: "TrendingDown",
    title: getTranslatedText('benefits')?.cost,
    color: "text-success"
  },
  {
    icon: "TrendingUp",
    title: getTranslatedText('benefits')?.yield,
    color: "text-primary"
  },
  {
    icon: "Clock",
    title: getTranslatedText('benefits')?.time,
    color: "text-harvest-orange"
  },
  {
    icon: "Network",
    title: getTranslatedText('benefits')?.network,
    color: "text-trust-blue"
  }];


  return (
    <section className="py-16 lg:py-24 bg-gradient-to-br from-primary/5 via-background to-harvest-orange/5 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-10 left-10 w-32 h-32 bg-primary rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-40 h-40 bg-harvest-orange rounded-full blur-3xl"></div>
      </div>
      <div className="relative z-10 max-w-7xl mx-auto px-4 lg:px-6">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-8">

            {/* Main CTA */}
            <div className="space-y-6">
              <h2 className="text-3xl lg:text-5xl font-bold text-foreground font-accent">
                {getTranslatedText('title')}
              </h2>
              
              <p className="text-xl text-primary font-semibold">
                {getTranslatedText('subtitle')}
              </p>
              
              <p className="text-lg text-muted-foreground leading-relaxed">
                {getTranslatedText('description')}
              </p>
            </div>

            {/* Features Grid */}
            <div className="grid grid-cols-2 gap-4">
              {features?.map((feature, index) =>
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="flex items-center space-x-3 p-3 rounded-lg bg-card/50 backdrop-blur-sm">

                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${feature?.color}`}>
                    <Icon name={feature?.icon} size={16} />
                  </div>
                  <span className="text-sm font-medium text-foreground">{feature?.title}</span>
                </motion.div>
              )}
            </div>

            {/* Benefits */}
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-foreground">
                {getTranslatedText('benefits')?.title}
              </h3>
              <div className="grid grid-cols-2 gap-3">
                {benefits?.map((benefit, index) =>
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="flex items-center space-x-2">

                    <Icon name={benefit?.icon} size={16} className={benefit?.color} />
                    <span className="text-sm font-medium text-foreground">{benefit?.title}</span>
                  </motion.div>
                )}
              </div>
            </div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-4 pt-4">

              <Link to="/marketplace">
                <Button
                  variant="default"
                  size="lg"
                  className="bg-conversion-cta hover:bg-conversion-cta/90 shadow-organic-lg"
                  iconName="ArrowRight"
                  iconPosition="right">

                  {getTranslatedText('getStarted')}
                </Button>
              </Link>
              
              <Link to="/news-and-education-hub">
                <Button
                  variant="outline"
                  size="lg"
                  iconName="BookOpen"
                  iconPosition="left">

                  {getTranslatedText('learnMore')}
                </Button>
              </Link>
              
              <Button
                variant="ghost"
                size="lg"
                iconName="Smartphone"
                iconPosition="left"
                className="text-primary hover:text-primary/80">

                {getTranslatedText('downloadApp')}
              </Button>
            </motion.div>
          </motion.div>

          {/* Right Content - Visual */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative">

            <div className="relative">
              {/* Main Image */}
              <div className="relative overflow-hidden rounded-3xl shadow-organic-lg">
                <Image
                  src="https://images.unsplash.com/photo-1695653422715-991ec3a0db7a"
                  alt="Modern agricultural scene with farmers using smartphones and advanced farming equipment in green field"
                  className="w-full h-[500px] object-cover" />

                
                {/* Overlay Stats */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                
                <div className="absolute bottom-6 left-6 right-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-background/95 backdrop-blur-sm rounded-xl p-4 text-center">
                      <div className="text-2xl font-bold text-primary">15K+</div>
                      <div className="text-xs text-muted-foreground">Equipment</div>
                    </div>
                    <div className="bg-background/95 backdrop-blur-sm rounded-xl p-4 text-center">
                      <div className="text-2xl font-bold text-success">8.9K+</div>
                      <div className="text-xs text-muted-foreground">Farmers</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating Elements */}
              <motion.div
                animate={{ y: [-10, 10, -10] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -top-6 -right-6 bg-success/20 w-24 h-24 rounded-full blur-xl">
              </motion.div>
              
              <motion.div
                animate={{ y: [10, -10, 10] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -bottom-6 -left-6 bg-primary/20 w-20 h-20 rounded-full blur-xl">
              </motion.div>

              {/* Success Indicators */}
              <div className="absolute top-6 right-6 bg-background/95 backdrop-blur-sm rounded-xl p-3 shadow-organic">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
                  <span className="text-xs font-medium text-success">Live Success Stories</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Bottom Trust Indicators */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-16 text-center">

          <div className="flex flex-wrap justify-center items-center gap-8 opacity-60">
            <div className="flex items-center space-x-2">
              <Icon name="Shield" size={20} className="text-success" />
              <span className="text-sm font-medium">Secure & Trusted</span>
            </div>
            <div className="flex items-center space-x-2">
              <Icon name="Award" size={20} className="text-primary" />
              <span className="text-sm font-medium">Award Winning</span>
            </div>
            <div className="flex items-center space-x-2">
              <Icon name="Users" size={20} className="text-harvest-orange" />
              <span className="text-sm font-medium">8,934+ Happy Farmers</span>
            </div>
            <div className="flex items-center space-x-2">
              <Icon name="Headphones" size={20} className="text-trust-blue" />
              <span className="text-sm font-medium">24/7 Support</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>);

};

export default CTASection;