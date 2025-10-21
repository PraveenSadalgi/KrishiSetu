import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const CommunityHighlights = () => {
  const [currentLanguage, setCurrentLanguage] = useState('en');

  useEffect(() => {
    const savedLanguage = localStorage.getItem('farmSetu_language') || 'en';
    setCurrentLanguage(savedLanguage);
  }, []);

  const getTranslatedText = (key) => {
    const translations = {
      en: {
        title: "Community Highlights",
        subtitle: "Latest updates from our farming community",
        joinCommunity: "Join Community",
        viewPost: "View Post",
        likes: "likes",
        comments: "comments",
        shares: "shares",
        minutesAgo: "min ago",
        hoursAgo: "h ago",
        success: "Success Story",
        tip: "Farming Tip",
        news: "News Update"
      },
      hi: {
        title: "समुदायिक मुख्य बातें",
        subtitle: "हमारे कृषि समुदाय से नवीनतम अपडेट",
        joinCommunity: "समुदाय में शामिल हों",
        viewPost: "पोस्ट देखें",
        likes: "लाइक",
        comments: "टिप्पणियां",
        shares: "शेयर",
        minutesAgo: "मिनट पहले",
        hoursAgo: "घंटे पहले",
        success: "सफलता की कहानी",
        tip: "कृषि सुझाव",
        news: "समाचार अपडेट"
      },
      kn: {
        title: "ಸಮುದಾಯ ಮುಖ್ಯಾಂಶಗಳು",
        subtitle: "ನಮ್ಮ ಕೃಷಿ ಸಮುದಾಯದಿಂದ ಇತ್ತೀಚಿನ ಅಪ್‌ಡೇಟ್‌ಗಳು",
        joinCommunity: "ಸಮುದಾಯಕ್ಕೆ ಸೇರಿ",
        viewPost: "ಪೋಸ್ಟ್ ನೋಡಿ",
        likes: "ಲೈಕ್‌ಗಳು",
        comments: "ಕಾಮೆಂಟ್‌ಗಳು",
        shares: "ಹಂಚಿಕೆಗಳು",
        minutesAgo: "ನಿಮಿಷಗಳ ಹಿಂದೆ",
        hoursAgo: "ಗಂಟೆಗಳ ಹಿಂದೆ",
        success: "ಯಶಸ್ಸಿನ ಕಥೆ",
        tip: "ಕೃಷಿ ಸಲಹೆ",
        news: "ಸುದ್ದಿ ಅಪ್‌ಡೇಟ್"
      }
    };
    return translations?.[currentLanguage]?.[key] || translations?.en?.[key];
  };

  const communityPosts = [
  {
    id: 1,
    type: "success",
    author: "Ramesh Gupta",
    authorImage: "https://images.unsplash.com/photo-1697886224032-93d3085f46f7",
    authorImageAlt: "Professional headshot of middle-aged Indian farmer with turban and warm smile",
    location: "Pune, Maharashtra",
    timeAgo: "2h",
    content: `Just completed my wheat harvest using the John Deere tractor I rented through FarmSetu! \n\nIncreased my yield by 25% compared to last year. The AI recommendations for optimal timing were spot on. \n\nThank you to the amazing community for all the support and tips! 🌾`,
    image: "https://images.unsplash.com/photo-1719343640029-488fadc3219a",
    imageAlt: "Golden wheat field during harvest with combine harvester working in background under clear blue sky",
    likes: 234,
    comments: 45,
    shares: 12,
    tags: ["#WheatHarvest", "#Success", "#FarmSetu"]
  },
  {
    id: 2,
    type: "tip",
    author: "Dr. Priya Sharma",
    authorImage: "https://images.unsplash.com/photo-1733685372667-ede9360e57cb",
    authorImageAlt: "Professional headshot of Indian agricultural expert woman with glasses in white lab coat",
    location: "Agricultural University, Bangalore",
    timeAgo: "4h",
    content: `Pro Tip for Monsoon Season: 🌧️\n\nBefore using any heavy equipment in wet conditions:\n\n✅ Check soil moisture levels\n✅ Ensure proper tire pressure\n✅ Clean equipment after use\n✅ Store in dry conditions\n\nThis prevents soil compaction and extends equipment life!`,
    image: "https://images.unsplash.com/photo-1723531280350-fea869ed8651",
    imageAlt: "Agricultural machinery working in field during light rain with farmer monitoring soil conditions",
    likes: 189,
    comments: 67,
    shares: 34,
    tags: ["#MonsoonTips", "#Equipment", "#SoilCare"]
  },
  {
    id: 3,
    type: "news",
    author: "FarmSetu News",
    authorImage: "https://images.unsplash.com/photo-1716734352793-be7d755e8471",
    authorImageAlt: "Professional headshot of news reporter in blue shirt with microphone in agricultural setting",
    location: "National Update",
    timeAgo: "6h",
    content: `🚀 New Government Subsidy Alert!\n\nThe Ministry of Agriculture has announced a 40% subsidy on precision farming equipment for small and medium farmers.\n\nEligible equipment includes:\n• GPS-enabled tractors\n• Drone sprayers\n• Soil testing kits\n• Smart irrigation systems\n\nApplication deadline: December 31, 2024`,
    image: "https://images.unsplash.com/photo-1605334611951-1bcea1227abe",
    imageAlt: "Modern GPS-enabled tractor with precision farming technology working in green agricultural field",
    likes: 456,
    comments: 123,
    shares: 89,
    tags: ["#GovernmentScheme", "#Subsidy", "#PrecisionFarming"]
  }];


  const getPostTypeIcon = (type) => {
    switch (type) {
      case 'success':return 'Trophy';
      case 'tip':return 'Lightbulb';
      case 'news':return 'Newspaper';
      default:return 'MessageCircle';
    }
  };

  const getPostTypeColor = (type) => {
    switch (type) {
      case 'success':return 'text-success bg-success/10';
      case 'tip':return 'text-warning bg-warning/10';
      case 'news':return 'text-trust-blue bg-trust-blue/10';
      default:return 'text-primary bg-primary/10';
    }
  };

  const getPostTypeLabel = (type) => {
    switch (type) {
      case 'success':return getTranslatedText('success');
      case 'tip':return getTranslatedText('tip');
      case 'news':return getTranslatedText('news');
      default:return 'Post';
    }
  };

  return (
    <section className="py-16 lg:py-24 bg-muted/30">
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
          
          <Link to="/community-feed">
            <Button
              variant="default"
              size="lg"
              className="bg-conversion-cta hover:bg-conversion-cta/90"
              iconName="Users"
              iconPosition="left">

              {getTranslatedText('joinCommunity')}
            </Button>
          </Link>
        </motion.div>

        {/* Posts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {communityPosts?.map((post, index) =>
          <motion.div
            key={post?.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: index * 0.2 }}
            className="bg-card rounded-2xl overflow-hidden shadow-organic hover:shadow-organic-lg organic-transition group">

              {/* Post Header */}
              <div className="p-4 border-b border-border">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-full overflow-hidden">
                      <Image
                      src={post?.authorImage}
                      alt={post?.authorImageAlt}
                      className="w-full h-full object-cover" />

                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground">{post?.author}</h4>
                      <p className="text-sm text-muted-foreground">{post?.location}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className={`px-2 py-1 rounded-full text-xs font-medium ${getPostTypeColor(post?.type)}`}>
                      <Icon name={getPostTypeIcon(post?.type)} size={12} className="inline mr-1" />
                      {getPostTypeLabel(post?.type)}
                    </div>
                    <span className="text-sm text-muted-foreground">{post?.timeAgo} {getTranslatedText('hoursAgo')}</span>
                  </div>
                </div>
              </div>

              {/* Post Content */}
              <div className="p-4">
                <p className="text-foreground mb-4 leading-relaxed whitespace-pre-line">
                  {post?.content}
                </p>
                
                {/* Post Tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {post?.tags?.map((tag, idx) =>
                <span
                  key={idx}
                  className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">

                      {tag}
                    </span>
                )}
                </div>
              </div>

              {/* Post Image */}
              {post?.image &&
            <div className="relative overflow-hidden h-48">
                  <Image
                src={post?.image}
                alt={post?.imageAlt}
                className="w-full h-full object-cover group-hover:scale-105 organic-transition" />

                </div>
            }

              {/* Post Actions */}
              <div className="p-4 border-t border-border">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-6">
                    <button className="flex items-center space-x-1 text-muted-foreground hover:text-primary organic-transition">
                      <Icon name="Heart" size={18} />
                      <span className="text-sm">{post?.likes}</span>
                    </button>
                    <button className="flex items-center space-x-1 text-muted-foreground hover:text-primary organic-transition">
                      <Icon name="MessageCircle" size={18} />
                      <span className="text-sm">{post?.comments}</span>
                    </button>
                    <button className="flex items-center space-x-1 text-muted-foreground hover:text-primary organic-transition">
                      <Icon name="Share2" size={18} />
                      <span className="text-sm">{post?.shares}</span>
                    </button>
                  </div>
                  
                  <Link to="/community-feed">
                    <Button variant="ghost" size="sm">
                      {getTranslatedText('viewPost')}
                    </Button>
                  </Link>
                </div>
              </div>
            </motion.div>
          )}
        </div>

        {/* Community Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-6">

          {[
          { icon: "Users", value: "8,934", label: "Active Members" },
          { icon: "MessageSquare", value: "2,456", label: "Daily Posts" },
          { icon: "BookOpen", value: "1,247", label: "Knowledge Shared" },
          { icon: "Award", value: "567", label: "Success Stories" }]?.
          map((stat, index) =>
          <div key={index} className="text-center">
              <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-2">
                <Icon name={stat?.icon} size={24} className="text-primary" />
              </div>
              <div className="text-2xl font-bold text-foreground">{stat?.value}</div>
              <div className="text-sm text-muted-foreground">{stat?.label}</div>
            </div>
          )}
        </motion.div>
      </div>
    </section>);

};

export default CommunityHighlights;