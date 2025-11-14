import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const HeroSection = () => {
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
  const [currentLanguage, setCurrentLanguage] = useState('en');

  const heroMessages = [
  { en: "Smart Farming", hi: "स्मार्ट खेती", kn: "ಸ್ಮಾರ್ಟ್ ಕೃಷಿ" },
  { en: "Equipment Sharing", hi: "उपकरण साझाकरण", kn: "ಉಪಕರಣ ಹಂಚಿಕೆ" },
  { en: "Community Growth", hi: "समुदायिक विकास", kn: "ಸಮುದಾಯ ಬೆಳವಣಿಗೆ" }];


  const languages = [
  { code: 'en', name: 'English', flag: '🇮🇳' },
  { code: 'hi', name: 'हिंदी', flag: '🇮🇳' },
  { code: 'kn', name: 'ಕನ್ನಡ', flag: '🇮🇳' },
  { code: 'ta', name: 'தமிழ்', flag: '🇮🇳' },
  { code: 'te', name: 'తెలుగు', flag: '🇮🇳' },
  { code: 'mr', name: 'मराठी', flag: '🇮🇳' },
  { code: 'gu', name: 'ગુજરાતી', flag: '🇮🇳' },
  { code: 'pa', name: 'ਪੰਜਾਬੀ', flag: '🇮🇳' },
  { code: 'bn', name: 'বাংলা', flag: '🇮🇳' }];


  useEffect(() => {
    const savedLanguage = localStorage.getItem('farmSetu_language') || 'en';
    setCurrentLanguage(savedLanguage);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentMessageIndex((prev) => (prev + 1) % heroMessages?.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const handleLanguageChange = (langCode) => {
    setCurrentLanguage(langCode);
    localStorage.setItem('farmSetu_language', langCode);
  };

  const getTranslatedText = (key) => {
    const translations = {
      en: {
        welcome: "Welcome to FarmSetu",
        subtitle: "Your AI-Powered Farming Companion",
        description: "Bridging farmers to prosperity through smart technology. Share equipment, grow together, and harvest success with our intelligent agricultural platform.",
        getStarted: "Get Started",
        learnMore: "Learn More",
        watchVideo: "Watch Demo"
      },
      hi: {
        welcome: "फार्मसेतु में आपका स्वागत है",
        subtitle: "आपका AI-संचालित कृषि साथी",
        description: "स्मार्ट तकनीक के माध्यम से किसानों को समृद्धि से जोड़ना। उपकरण साझा करें, एक साथ बढ़ें, और हमारे बुद्धिमान कृषि मंच के साथ सफलता की फसल काटें।",
        getStarted: "शुरू करें",
        learnMore: "और जानें",
        watchVideo: "डेमो देखें"
      },
      kn: {
        welcome: "ಫಾರ್ಮ್‌ಸೇತುಗೆ ಸ್ವಾಗತ",
        subtitle: "ನಿಮ್ಮ AI-ಚಾಲಿತ ಕೃಷಿ ಸಹಾಯಕ",
        description: "ಸ್ಮಾರ್ಟ್ ತಂತ್ರಜ್ಞಾನದ ಮೂಲಕ ರೈತರನ್ನು ಸಮೃದ್ಧಿಗೆ ಸೇತುವೆ ಮಾಡುವುದು। ಉಪಕರಣಗಳನ್ನು ಹಂಚಿಕೊಳ್ಳಿ, ಒಟ್ಟಿಗೆ ಬೆಳೆಯಿರಿ ಮತ್ತು ನಮ್ಮ ಬುದ್ಧಿವಂತ ಕೃಷಿ ವೇದಿಕೆಯೊಂದಿಗೆ ಯಶಸ್ಸನ್ನು ಕೊಯ್ಲು ಮಾಡಿ।",
        getStarted: "ಪ್ರಾರಂಭಿಸಿ",
        learnMore: "ಇನ್ನಷ್ಟು ತಿಳಿಯಿರಿ",
        watchVideo: "ಡೆಮೋ ನೋಡಿ"
      }
    };
    return translations?.[currentLanguage]?.[key] || translations?.en?.[key];
  };

  return (
    <section className="relative min-h-screen bg-gradient-to-br from-primary/5 via-background to-harvest-orange/5 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-10 w-32 h-32 bg-primary rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-harvest-orange rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-success rounded-full blur-3xl opacity-30"></div>
      </div>
      <div className="relative z-10 pt-20 pb-16 px-4 lg:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[80vh]">
            {/* Left Content */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="space-y-8">

              {/* Language Selector */}
              <div className="flex flex-wrap gap-2 mb-6">
                {languages?.slice(0, 6)?.map((lang) =>
                <button
                  key={lang?.code}
                  onClick={() => handleLanguageChange(lang?.code)}
                  className={`px-3 py-1 rounded-full text-sm font-medium organic-transition ${
                  currentLanguage === lang?.code ?
                  'bg-primary text-primary-foreground' :
                  'bg-muted text-muted-foreground hover:bg-primary/10'}`
                  }>

                    {lang?.flag} {lang?.name}
                  </button>
                )}
              </div>

              {/* Welcome Text */}
              <div className="space-y-4">
                <motion.h1
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.6 }}
                  className="text-4xl lg:text-6xl font-bold text-foreground font-accent">

                  {getTranslatedText('welcome')}
                </motion.h1>
                
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 0.6 }}
                  className="text-xl lg:text-2xl text-primary font-semibold">

                  {getTranslatedText('subtitle')}
                </motion.p>
              </div>

              {/* Animated Hero Messages */}
              <div className="h-16 flex items-center">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentMessageIndex}
                    initial={{ opacity: 0, y: 20, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -20, scale: 0.9 }}
                    transition={{ duration: 0.5, ease: "easeInOut" }}
                    className="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-primary via-harvest-orange to-success bg-clip-text text-transparent">

                    {heroMessages?.[currentMessageIndex]?.[currentLanguage] || heroMessages?.[currentMessageIndex]?.en}
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Description */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.6 }}
                className="text-lg text-muted-foreground leading-relaxed max-w-2xl">

                {getTranslatedText('description')}
              </motion.p>

              {/* CTA Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.6 }}
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
                  iconName="Play"
                  iconPosition="left"
                  className="text-primary hover:text-primary/80">

                  {getTranslatedText('watchVideo')}
                </Button>
              </motion.div>
            </motion.div>

            {/* Right Content - Hero Image */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 }}
              className="relative">

              <div className="relative overflow-hidden rounded-3xl shadow-organic-lg">
                <Image
                  src="https://images.unsplash.com/photo-1614977645540-7abd88ba8e56?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1973"
                  alt="Modern Indian farmer using smartphone in green agricultural field with advanced farming equipment in background"
                  className="w-full h-[500px] lg:h-[600px] object-cover" />

                
                {/* Overlay Cards */}
                <div className="absolute top-6 left-6 bg-background/95 backdrop-blur-sm rounded-xl p-4 shadow-organic">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-success rounded-full flex items-center justify-center">
                      <Icon name="Tractor" size={20} className="text-success-foreground" />
                    </div>
                    {/* <div>
                      <p className="font-semibold text-sm">Equipment Available</p>
                      <p className="text-xs text-muted-foreground">2.5km away</p>
                    </div> */}
                  </div>
                </div>

                <div className="absolute bottom-6 right-6 bg-background/95 backdrop-blur-sm rounded-xl p-4 shadow-organic">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-harvest-orange rounded-full flex items-center justify-center">
                      <Icon name="Users" size={20} className="text-harvest-orange-foreground" />
                    </div>
                    {/* <div>
                      <p className="font-semibold text-sm">Active Farmers</p>
                      <p className="text-xs text-muted-foreground">1,247 online</p>
                    </div> */}
                  </div>
                </div>
              </div>

              {/* Floating Elements */}
              <motion.div
                animate={{ y: [-10, 10, -10] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -top-4 -right-4 w-20 h-20 bg-primary/20 rounded-full blur-xl">
              </motion.div>
              
              <motion.div
                animate={{ y: [10, -10, 10] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -bottom-4 -left-4 w-16 h-16 bg-harvest-orange/20 rounded-full blur-xl">
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>);

};

export default HeroSection;