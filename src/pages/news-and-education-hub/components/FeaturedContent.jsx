import React from 'react';
import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const FeaturedContent = ({ featuredArticle }) => {
  const formatTimeAgo = (timestamp) => {
    const now = new Date();
    const articleTime = new Date(timestamp);
    const diffInHours = Math.floor((now - articleTime) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours}h ago`;
    const diffInDays = Math.floor(diffInHours / 24);
    return `${diffInDays}d ago`;
  };

  return (
    <div className="relative bg-gradient-to-r from-primary to-primary/80 rounded-xl overflow-hidden shadow-organic-lg">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <Image
          src={featuredArticle?.image}
          alt={featuredArticle?.imageAlt}
          className="w-full h-full object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/90 to-primary/70"></div>
      </div>
      {/* Content */}
      <div className="relative p-6 lg:p-8">
        <div className="flex items-center space-x-2 mb-4">
          <span className="px-3 py-1 bg-primary-foreground/20 text-primary-foreground rounded-full text-sm font-medium">
            Featured
          </span>
          <span className="px-3 py-1 bg-secondary text-secondary-foreground rounded-full text-sm font-medium">
            {featuredArticle?.category}
          </span>
        </div>

        <h1 className="text-2xl lg:text-3xl font-bold text-primary-foreground mb-3 leading-tight">
          {featuredArticle?.title}
        </h1>

        <p className="text-primary-foreground/90 mb-4 text-lg leading-relaxed max-w-2xl">
          {featuredArticle?.summary}
        </p>

        {/* Meta Information */}
        <div className="flex items-center space-x-4 mb-6 text-primary-foreground/80">
          <div className="flex items-center space-x-1">
            <Icon name="Clock" size={16} />
            <span className="text-sm">{formatTimeAgo(featuredArticle?.timestamp)}</span>
          </div>
          <div className="flex items-center space-x-1">
            <Icon name="MapPin" size={16} />
            <span className="text-sm">{featuredArticle?.region}</span>
          </div>
          <div className="flex items-center space-x-1">
            <Icon name="Eye" size={16} />
            <span className="text-sm">{featuredArticle?.views?.toLocaleString()} views</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3">
          <Button 
            variant="secondary" 
            size="lg"
            className="bg-primary-foreground text-primary hover:bg-primary-foreground/90"
          >
            <Icon name="BookOpen" size={18} className="mr-2" />
            Read Full Article
          </Button>
          <Button 
            variant="outline" 
            size="lg"
            className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10"
          >
            <Icon name="Share2" size={18} className="mr-2" />
            Share Article
          </Button>
        </div>
      </div>
      {/* AI Badge */}
      {featuredArticle?.aiGenerated && (
        <div className="absolute top-4 right-4 flex items-center space-x-1 bg-accent/20 backdrop-blur-sm px-3 py-1 rounded-full">
          <Icon name="Sparkles" size={14} className="text-accent" />
          <span className="text-xs text-accent font-medium">AI Enhanced</span>
        </div>
      )}
    </div>
  );
};

export default FeaturedContent;