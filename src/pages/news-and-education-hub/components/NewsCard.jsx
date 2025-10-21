import React, { useState } from 'react';
import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const NewsCard = ({ article, onBookmark, isBookmarked }) => {
  const [imageLoaded, setImageLoaded] = useState(false);

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
    <div className="bg-card border border-border rounded-lg overflow-hidden shadow-organic hover:shadow-organic-lg organic-transition group">
      {/* Image Section */}
      <div className="relative h-48 overflow-hidden">
        <Image
          src={article?.image}
          alt={article?.imageAlt}
          className={`w-full h-full object-cover group-hover:scale-105 organic-transition ${
            imageLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          onLoad={() => setImageLoaded(true)}
        />
        {!imageLoaded && (
          <div className="absolute inset-0 bg-muted animate-pulse flex items-center justify-center">
            <Icon name="Image" size={32} className="text-muted-foreground" />
          </div>
        )}
        
        {/* Category Badge */}
        <div className="absolute top-3 left-3">
          <span className={`px-3 py-1 rounded-full text-xs font-medium ${
            article?.category === 'Weather' ? 'bg-blue-100 text-blue-800' :
            article?.category === 'Market' ? 'bg-green-100 text-green-800' :
            article?.category === 'Technology' ? 'bg-purple-100 text-purple-800' :
            article?.category === 'Policy'? 'bg-orange-100 text-orange-800' : 'bg-gray-100 text-gray-800'
          }`}>
            {article?.category}
          </span>
        </div>

        {/* Bookmark Button */}
        <button
          onClick={() => onBookmark(article?.id)}
          className="absolute top-3 right-3 w-8 h-8 bg-background/80 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-background organic-transition"
        >
          <Icon 
            name={isBookmarked ? "Bookmark" : "BookmarkPlus"} 
            size={16} 
            className={isBookmarked ? "text-primary fill-current" : "text-muted-foreground"} 
          />
        </button>
      </div>
      {/* Content Section */}
      <div className="p-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs text-muted-foreground">{formatTimeAgo(article?.timestamp)}</span>
          <div className="flex items-center space-x-1">
            <Icon name="MapPin" size={12} className="text-muted-foreground" />
            <span className="text-xs text-muted-foreground">{article?.region}</span>
          </div>
        </div>

        <h3 className="font-semibold text-foreground mb-2 line-clamp-2 group-hover:text-primary organic-transition">
          {article?.title}
        </h3>

        <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
          {article?.summary}
        </p>

        {/* AI Summary Badge */}
        {article?.aiGenerated && (
          <div className="flex items-center space-x-1 mb-3">
            <Icon name="Sparkles" size={12} className="text-accent" />
            <span className="text-xs text-accent font-medium">AI Summary</span>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex items-center justify-between">
          <Button variant="ghost" size="sm" className="text-xs">
            Read More
          </Button>
          <div className="flex items-center space-x-2">
            <button className="flex items-center space-x-1 text-xs text-muted-foreground hover:text-foreground organic-transition">
              <Icon name="Share2" size={14} />
              <span>Share</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsCard;