import React, { useState } from 'react';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const ReviewsSection = ({ reviews, averageRating, totalReviews }) => {
  const [showAllReviews, setShowAllReviews] = useState(false);
  const [sortBy, setSortBy] = useState('recent');

  const displayedReviews = showAllReviews ? reviews : reviews?.slice(0, 3);

  const ratingDistribution = [
    { stars: 5, count: 45, percentage: 75 },
    { stars: 4, count: 12, percentage: 20 },
    { stars: 3, count: 2, percentage: 3 },
    { stars: 2, count: 1, percentage: 2 },
    { stars: 1, count: 0, percentage: 0 }
  ];

  const formatDate = (dateString) => {
    return new Date(dateString)?.toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="space-y-6">
      {/* Rating Overview */}
      <div className="bg-card border border-border rounded-lg p-6">
        <h3 className="text-lg font-semibold mb-4">Customer Reviews</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Overall Rating */}
          <div className="text-center">
            <div className="text-4xl font-bold text-primary mb-2">{averageRating}</div>
            <div className="flex justify-center mb-2">
              {[...Array(5)]?.map((_, i) => (
                <Icon
                  key={i}
                  name="Star"
                  size={20}
                  className={i < Math.floor(averageRating) ? 'text-warning fill-current' : 'text-muted-foreground'}
                />
              ))}
            </div>
            <p className="text-sm text-muted-foreground">Based on {totalReviews} reviews</p>
          </div>

          {/* Rating Distribution */}
          <div className="space-y-2">
            {ratingDistribution?.map((rating) => (
              <div key={rating?.stars} className="flex items-center space-x-3">
                <div className="flex items-center space-x-1 w-12">
                  <span className="text-sm">{rating?.stars}</span>
                  <Icon name="Star" size={12} className="text-warning fill-current" />
                </div>
                <div className="flex-1 bg-muted rounded-full h-2">
                  <div
                    className="bg-warning rounded-full h-2 transition-all duration-500"
                    style={{ width: `${rating?.percentage}%` }}
                  ></div>
                </div>
                <span className="text-sm text-muted-foreground w-8">{rating?.count}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* Sort Options */}
      <div className="flex items-center justify-between">
        <h4 className="font-semibold">Reviews ({totalReviews})</h4>
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e?.target?.value)}
          className="px-3 py-1 border border-border rounded-lg text-sm bg-background"
        >
          <option value="recent">Most Recent</option>
          <option value="helpful">Most Helpful</option>
          <option value="rating">Highest Rating</option>
        </select>
      </div>
      {/* Reviews List */}
      <div className="space-y-4">
        {displayedReviews?.map((review) => (
          <div key={review?.id} className="bg-card border border-border rounded-lg p-6">
            <div className="flex items-start space-x-4">
              {/* Reviewer Avatar */}
              <Image
                src={review?.reviewer?.avatar}
                alt={review?.reviewer?.avatarAlt}
                className="w-12 h-12 rounded-full object-cover"
              />

              <div className="flex-1">
                {/* Reviewer Info */}
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <h5 className="font-medium">{review?.reviewer?.name}</h5>
                    <p className="text-sm text-muted-foreground">{review?.reviewer?.location}</p>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center space-x-1 mb-1">
                      {[...Array(5)]?.map((_, i) => (
                        <Icon
                          key={i}
                          name="Star"
                          size={14}
                          className={i < review?.rating ? 'text-warning fill-current' : 'text-muted-foreground'}
                        />
                      ))}
                    </div>
                    <p className="text-xs text-muted-foreground">{formatDate(review?.date)}</p>
                  </div>
                </div>

                {/* Review Content */}
                <p className="text-sm mb-3">{review?.comment}</p>

                {/* Review Images */}
                {review?.images && review?.images?.length > 0 && (
                  <div className="flex space-x-2 mb-3">
                    {review?.images?.map((image, index) => (
                      <Image
                        key={index}
                        src={image?.url}
                        alt={image?.alt}
                        className="w-16 h-16 rounded-lg object-cover"
                      />
                    ))}
                  </div>
                )}

                {/* Review Metadata */}
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <div className="flex items-center space-x-4">
                    <span>Rental Duration: {review?.rentalDuration}</span>
                    <span>Equipment Condition: {review?.equipmentCondition}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button className="flex items-center space-x-1 hover:text-foreground organic-transition">
                      <Icon name="ThumbsUp" size={12} />
                      <span>{review?.helpfulCount}</span>
                    </button>
                    <button className="hover:text-foreground organic-transition">
                      <Icon name="Flag" size={12} />
                    </button>
                  </div>
                </div>

                {/* Owner Response */}
                {review?.ownerResponse && (
                  <div className="mt-3 p-3 bg-muted/50 rounded-lg border-l-4 border-primary">
                    <div className="flex items-center space-x-2 mb-1">
                      <Icon name="User" size={14} className="text-primary" />
                      <span className="text-sm font-medium">Owner Response</span>
                    </div>
                    <p className="text-sm text-muted-foreground">{review?.ownerResponse}</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
      {/* Load More Reviews */}
      {!showAllReviews && reviews?.length > 3 && (
        <div className="text-center">
          <Button
            variant="outline"
            onClick={() => setShowAllReviews(true)}
          >
            Show All {totalReviews} Reviews
          </Button>
        </div>
      )}
    </div>
  );
};

export default ReviewsSection;