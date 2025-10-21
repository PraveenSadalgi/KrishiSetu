import React, { useState } from 'react';
import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const EducationCard = ({ course, onBookmark, isBookmarked }) => {
  const [imageLoaded, setImageLoaded] = useState(false);

  const getDifficultyColor = (level) => {
    switch (level) {
      case 'Beginner': return 'bg-green-100 text-green-800';
      case 'Intermediate': return 'bg-yellow-100 text-yellow-800';
      case 'Advanced': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const formatDuration = (minutes) => {
    if (minutes < 60) return `${minutes}m`;
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    return remainingMinutes > 0 ? `${hours}h ${remainingMinutes}m` : `${hours}h`;
  };

  return (
    <div className="bg-card border border-border rounded-lg overflow-hidden shadow-organic hover:shadow-organic-lg organic-transition group">
      {/* Thumbnail Section */}
      <div className="relative h-40 overflow-hidden">
        <Image
          src={course?.thumbnail}
          alt={course?.thumbnailAlt}
          className={`w-full h-full object-cover group-hover:scale-105 organic-transition ${
            imageLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          onLoad={() => setImageLoaded(true)}
        />
        {!imageLoaded && (
          <div className="absolute inset-0 bg-muted animate-pulse flex items-center justify-center">
            <Icon name="Play" size={32} className="text-muted-foreground" />
          </div>
        )}

        {/* Play Button Overlay */}
        <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 group-hover:opacity-100 organic-transition">
          <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center">
            <Icon name="Play" size={20} className="text-primary-foreground ml-1" />
          </div>
        </div>

        {/* Duration Badge */}
        <div className="absolute bottom-2 right-2 bg-black/70 text-white px-2 py-1 rounded text-xs font-medium">
          {formatDuration(course?.duration)}
        </div>

        {/* Bookmark Button */}
        <button
          onClick={() => onBookmark(course?.id)}
          className="absolute top-2 right-2 w-8 h-8 bg-background/80 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-background organic-transition"
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
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(course?.difficulty)}`}>
            {course?.difficulty}
          </span>
          <div className="flex items-center space-x-1">
            <Icon name="Users" size={12} className="text-muted-foreground" />
            <span className="text-xs text-muted-foreground">{course?.enrolledCount?.toLocaleString()}</span>
          </div>
        </div>

        <h3 className="font-semibold text-foreground mb-2 line-clamp-2 group-hover:text-primary organic-transition">
          {course?.title}
        </h3>

        <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
          {course?.description}
        </p>

        {/* Instructor Info */}
        <div className="flex items-center space-x-2 mb-3">
          <Image
            src={course?.instructor?.avatar}
            alt={course?.instructor?.avatarAlt}
            className="w-6 h-6 rounded-full object-cover"
          />
          <span className="text-xs text-muted-foreground">{course?.instructor?.name}</span>
          <div className="flex items-center space-x-1">
            <Icon name="Star" size={12} className="text-yellow-500 fill-current" />
            <span className="text-xs text-muted-foreground">{course?.rating}</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-between">
          <Button variant="default" size="sm" className="flex-1 mr-2">
            <Icon name="Play" size={14} className="mr-1" />
            Start Learning
          </Button>
          <Button variant="outline" size="sm">
            <Icon name="Download" size={14} />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default EducationCard;