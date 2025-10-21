import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const CreatePostModal = ({ isOpen, onClose, onSubmit }) => {
  const [postContent, setPostContent] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);
  const [tags, setTags] = useState([]);
  const [currentTag, setCurrentTag] = useState('');

  const handleSubmit = (e) => {
    e?.preventDefault();
    if (postContent?.trim()) {
      onSubmit({
        content: postContent,
        image: selectedImage,
        tags: tags
      });
      setPostContent('');
      setSelectedImage(null);
      setTags([]);
      onClose();
    }
  };

  const addTag = () => {
    if (currentTag?.trim() && !tags?.includes(currentTag?.trim())) {
      setTags([...tags, currentTag?.trim()]);
      setCurrentTag('');
    }
  };

  const removeTag = (tagToRemove) => {
    setTags(tags?.filter((tag) => tag !== tagToRemove));
  };

  const handleImageUpload = (e) => {
    const file = e?.target?.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => setSelectedImage(e?.target?.result);
      reader?.readAsDataURL(file);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-card rounded-lg shadow-organic-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <h2 className="text-xl font-semibold text-foreground">Create Post</h2>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <Icon name="X" size={20} />
          </Button>
        </div>

        {/* Content */}
        <form onSubmit={handleSubmit} className="p-6">
          {/* User Info */}
          <div className="flex items-center space-x-3 mb-4">
            <Image
              src="https://images.unsplash.com/photo-1684860143334-a9099bc3cf1e"
              alt="Current user profile photo showing man with beard in casual shirt"
              className="w-10 h-10 rounded-full object-cover" />

            <div>
              <p className="font-medium text-foreground">Rajesh Kumar</p>
              <p className="text-sm text-muted-foreground">Posting to Community</p>
            </div>
          </div>

          {/* Post Content */}
          <textarea
            value={postContent}
            onChange={(e) => setPostContent(e?.target?.value)}
            placeholder="What's happening in your farm today? Share your experience, tips, or questions..."
            className="w-full h-32 p-3 bg-muted rounded-lg border-0 focus:ring-2 focus:ring-primary/20 resize-none text-foreground placeholder-muted-foreground"
            required />


          {/* Image Preview */}
          {selectedImage &&
          <div className="mt-4 relative">
              <Image
              src={selectedImage}
              alt="Selected image for post upload"
              className="w-full h-48 object-cover rounded-lg" />

              <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => setSelectedImage(null)}
              className="absolute top-2 right-2 bg-black/50 text-white hover:bg-black/70">

                <Icon name="X" size={16} />
              </Button>
            </div>
          }

          {/* Tags */}
          <div className="mt-4">
            <div className="flex items-center space-x-2 mb-2">
              <input
                type="text"
                value={currentTag}
                onChange={(e) => setCurrentTag(e?.target?.value)}
                placeholder="Add tags (e.g., wheat, irrigation, harvest)"
                className="flex-1 px-3 py-2 bg-muted rounded-lg border-0 focus:ring-2 focus:ring-primary/20 text-sm"
                onKeyPress={(e) => e?.key === 'Enter' && (e?.preventDefault(), addTag())} />

              <Button type="button" variant="outline" size="sm" onClick={addTag}>
                Add Tag
              </Button>
            </div>
            
            {tags?.length > 0 &&
            <div className="flex flex-wrap gap-2">
                {tags?.map((tag, index) =>
              <span
                key={index}
                className="inline-flex items-center space-x-1 px-3 py-1 bg-primary/10 text-primary text-sm rounded-full">

                    <span>#{tag}</span>
                    <button
                  type="button"
                  onClick={() => removeTag(tag)}
                  className="hover:text-primary/70">

                      <Icon name="X" size={12} />
                    </button>
                  </span>
              )}
              </div>
            }
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-between mt-6 pt-4 border-t border-border">
            <div className="flex items-center space-x-4">
              <label className="cursor-pointer">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden" />

                <div className="flex items-center space-x-2 text-muted-foreground hover:text-foreground organic-transition">
                  <Icon name="Image" size={20} />
                  <span className="text-sm">Photo</span>
                </div>
              </label>
              
              <div className="flex items-center space-x-2 text-muted-foreground">
                <Icon name="MapPin" size={20} />
                <span className="text-sm">Location</span>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <Button type="button" variant="outline" onClick={onClose}>
                Cancel
              </Button>
              <Button type="submit" variant="default" disabled={!postContent?.trim()}>
                Post
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>);

};

export default CreatePostModal;