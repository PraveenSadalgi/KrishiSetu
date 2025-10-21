import React, { useState } from 'react';
import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const PostCard = ({ post, onLike, onComment, onShare }) => {
  const [showComments, setShowComments] = useState(false);
  const [newComment, setNewComment] = useState('');

  const formatTimeAgo = (timestamp) => {
    const now = new Date();
    const postTime = new Date(timestamp);
    const diffInMinutes = Math.floor((now - postTime) / (1000 * 60));

    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`;
    return `${Math.floor(diffInMinutes / 1440)}d ago`;
  };

  const handleCommentSubmit = (e) => {
    e?.preventDefault();
    if (newComment?.trim()) {
      onComment(post?.id, newComment);
      setNewComment('');
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg shadow-organic p-6 mb-4 organic-transition hover:shadow-organic-lg">
      {/* Post Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="relative">
            <Image
              src={post?.author?.avatar}
              alt={post?.author?.avatarAlt}
              className="w-12 h-12 rounded-full object-cover" />

            {post?.author?.isVerified &&
            <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-success rounded-full flex items-center justify-center">
                <Icon name="Check" size={12} className="text-white" />
              </div>
            }
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h3 className="font-semibold text-foreground">{post?.author?.name}</h3>
              <span className="text-xs text-muted-foreground">•</span>
              <span className="text-xs text-muted-foreground">{formatTimeAgo(post?.timestamp)}</span>
            </div>
            <p className="text-sm text-muted-foreground">{post?.author?.location}</p>
          </div>
        </div>
        <Button variant="ghost" size="sm">
          <Icon name="MoreHorizontal" size={16} />
        </Button>
      </div>
      {/* Post Content */}
      <div className="mb-4">
        <p className="text-foreground mb-3 leading-relaxed">{post?.content}</p>
        
        {post?.image &&
        <div className="rounded-lg overflow-hidden mb-3">
            <Image
            src={post?.image}
            alt={post?.imageAlt}
            className="w-full h-64 object-cover" />

          </div>
        }

        {post?.tags && post?.tags?.length > 0 &&
        <div className="flex flex-wrap gap-2 mb-3">
            {post?.tags?.map((tag, index) =>
          <span
            key={index}
            className="px-3 py-1 bg-primary/10 text-primary text-sm rounded-full">

                #{tag}
              </span>
          )}
          </div>
        }
      </div>
      {/* Post Actions */}
      <div className="flex items-center justify-between pt-3 border-t border-border">
        <div className="flex items-center space-x-6">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onLike(post?.id)}
            className={`${post?.isLiked ? 'text-red-500' : 'text-muted-foreground'} hover:text-red-500`}>

            <Icon name={post?.isLiked ? "Heart" : "Heart"} size={18} className={post?.isLiked ? "fill-current" : ""} />
            <span className="ml-2">{post?.likes}</span>
          </Button>
          
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowComments(!showComments)}
            className="text-muted-foreground hover:text-foreground">

            <Icon name="MessageCircle" size={18} />
            <span className="ml-2">{post?.comments?.length}</span>
          </Button>
          
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onShare(post?.id)}
            className="text-muted-foreground hover:text-foreground">

            <Icon name="Share2" size={18} />
            <span className="ml-2">Share</span>
          </Button>
        </div>
        
        <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
          <Icon name="Bookmark" size={18} />
        </Button>
      </div>
      {/* Comments Section */}
      {showComments &&
      <div className="mt-4 pt-4 border-t border-border">
          {/* Comment Form */}
          <form onSubmit={handleCommentSubmit} className="mb-4">
            <div className="flex space-x-3">
              <Image
              src="https://images.unsplash.com/photo-1684860143334-a9099bc3cf1e"
              alt="Current user profile photo showing man with beard in casual shirt"
              className="w-8 h-8 rounded-full object-cover flex-shrink-0" />

              <div className="flex-1">
                <input
                type="text"
                value={newComment}
                onChange={(e) => setNewComment(e?.target?.value)}
                placeholder="Write a comment..."
                className="w-full px-3 py-2 bg-muted rounded-lg border-0 focus:ring-2 focus:ring-primary/20 text-sm" />

              </div>
            </div>
          </form>

          {/* Comments List */}
          <div className="space-y-3">
            {post?.comments?.map((comment) =>
          <div key={comment?.id} className="flex space-x-3">
                <Image
              src={comment?.author?.avatar}
              alt={comment?.author?.avatarAlt}
              className="w-8 h-8 rounded-full object-cover flex-shrink-0" />

                <div className="flex-1">
                  <div className="bg-muted rounded-lg px-3 py-2">
                    <div className="flex items-center space-x-2 mb-1">
                      <span className="font-medium text-sm text-foreground">{comment?.author?.name}</span>
                      <span className="text-xs text-muted-foreground">{formatTimeAgo(comment?.timestamp)}</span>
                    </div>
                    <p className="text-sm text-foreground">{comment?.content}</p>
                  </div>
                </div>
              </div>
          )}
          </div>
        </div>
      }
    </div>);

};

export default PostCard;