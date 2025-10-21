import React, { useState, useEffect } from 'react';
import Header from '../../components/ui/Header';
import PostCard from './components/PostCard';
import CreatePostModal from './components/CreatePostModal';
import TrendingTopics from './components/TrendingTopics';
import CommunityStats from './components/CommunityStats';
import QuickActions from './components/QuickActions';
import FilterTabs from './components/FilterTabs';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

const CommunityFeed = () => {
  const [posts, setPosts] = useState([]);
  const [activeFilter, setActiveFilter] = useState('all');
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  // Mock posts data
  const mockPosts = [
  {
    id: 1,
    author: {
      name: "Priya Sharma",
      avatar: "https://images.unsplash.com/photo-1676288785587-0d4398fbf38e",
      avatarAlt: "Professional woman with long dark hair in white blouse smiling at camera",
      location: "Punjab, India",
      isVerified: true
    },
    content: `Just completed my winter wheat harvest using the new combine harvester I rented through FarmSetu! The yield increased by 25% compared to last year. The AI-powered route optimization saved me 3 hours of work time.\n\nHighly recommend the John Deere S780 for medium-sized farms. The fuel efficiency is excellent and the grain quality is outstanding.`,
    image: "https://images.unsplash.com/photo-1705917015830-0a1afa6b6f52",
    imageAlt: "Golden wheat field during harvest with combine harvester working in background under blue sky",
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
    likes: 47,
    isLiked: false,
    tags: ["WinterWheat", "Harvest2024", "JohnDeere", "AIFarming"],
    comments: [
    {
      id: 1,
      author: {
        name: "Rajesh Kumar",
        avatar: "https://images.unsplash.com/photo-1623967484275-7d59e4b9f151",
        avatarAlt: "Middle-aged man with beard wearing blue shirt in outdoor setting"
      },
      content: "Congratulations Priya! Which model did you use? I\'m planning to rent one next month.",
      timestamp: new Date(Date.now() - 1 * 60 * 60 * 1000)
    },
    {
      id: 2,
      author: {
        name: "Amit Patel",
        avatar: "https://images.unsplash.com/photo-1500677404910-8a5f28009d75",
        avatarAlt: "Young man with short black hair in white t-shirt smiling outdoors"
      },
      content: "Great results! The AI optimization feature is really game-changing for productivity.",
      timestamp: new Date(Date.now() - 30 * 60 * 1000)
    }]

  },
  {
    id: 2,
    author: {
      name: "Suresh Reddy",
      avatar: "https://images.unsplash.com/photo-1631266342426-999bc86d8050",
      avatarAlt: "Mature man with graying hair in checkered shirt standing in agricultural field",
      location: "Andhra Pradesh, India",
      isVerified: true
    },
    content: `Question for the community: Has anyone tried organic pest control methods for cotton crops? I'm looking for alternatives to chemical pesticides.\n\nI've heard about neem oil and beneficial insects, but would love to hear real experiences from fellow farmers.`,
    timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000),
    likes: 23,
    isLiked: true,
    tags: ["OrganicFarming", "Cotton", "PestControl", "Sustainable"],
    comments: [
    {
      id: 3,
      author: {
        name: "Meera Singh",
        avatar: "https://images.unsplash.com/flagged/photo-1565939627066-aff72b006535",
        avatarAlt: "Young woman with long black hair in traditional Indian attire smiling"
      },
      content: "I\'ve been using neem oil for 3 seasons now. Works great for aphids and whiteflies!",
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000)
    }]

  },
  {
    id: 3,
    author: {
      name: "Vikram Singh",
      avatar: "https://images.unsplash.com/photo-1638166268174-31bb5ad463a9",
      avatarAlt: "Young man with turban and beard in traditional Punjabi attire in rural setting",
      location: "Haryana, India",
      isVerified: false
    },
    content: `Drone spraying update: Completed pesticide application on 50 acres in just 4 hours using the DJI Agras T40. The precision is incredible - 90% reduction in chemical usage compared to traditional methods.\n\nThe weather monitoring integration helped us spray at optimal conditions. ROI achieved in just 2 seasons!`,
    image: "https://images.unsplash.com/photo-1713952160156-bb59cac789a9",
    imageAlt: "Agricultural drone flying over green crop field spraying pesticides with mountains in background",
    timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000),
    likes: 89,
    isLiked: false,
    tags: ["DroneSpray", "Precision", "Technology", "Efficiency"],
    comments: [
    {
      id: 4,
      author: {
        name: "Anita Desai",
        avatar: "https://images.unsplash.com/photo-1734456611474-13245d164868",
        avatarAlt: "Professional woman with short hair in business attire in office environment"
      },
      content: "Amazing results! What\'s the cost per acre for drone spraying?",
      timestamp: new Date(Date.now() - 3 * 60 * 60 * 1000)
    },
    {
      id: 5,
      author: {
        name: "Kiran Joshi",
        avatar: "https://images.unsplash.com/photo-1669642550301-bbba2d5f09c8",
        avatarAlt: "Middle-aged man with mustache in casual shirt standing in agricultural setting"
      },
      content: "I\'m interested in renting this drone. Is it available in Maharashtra?",
      timestamp: new Date(Date.now() - 1 * 60 * 60 * 1000)
    }]

  },
  {
    id: 4,
    author: {
      name: "Lakshmi Nair",
      avatar: "https://images.unsplash.com/photo-1628587258520-7daab3d431a8",
      avatarAlt: "Young woman with curly hair in casual attire smiling in outdoor natural setting",
      location: "Kerala, India",
      isVerified: true
    },
    content: `Soil health update from my organic farm: After 2 years of implementing cover crops and composting, our soil organic matter increased from 1.2% to 3.8%!\n\nThe microbial activity is thriving, and we're seeing better water retention. Sharing my soil test results in the comments.`,
    timestamp: new Date(Date.now() - 8 * 60 * 60 * 1000),
    likes: 156,
    isLiked: true,
    tags: ["SoilHealth", "OrganicFarming", "Sustainability", "CoverCrops"],
    comments: [
    {
      id: 6,
      author: {
        name: "Dr. Ramesh Gupta",
        avatar: "https://images.unsplash.com/photo-1735651705945-64bc6d18d555",
        avatarAlt: "Elderly man with glasses and white hair in formal shirt in academic setting"
      },
      content: "Excellent progress! Which cover crops worked best in Kerala\'s climate?",
      timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000)
    }]

  },
  {
    id: 5,
    author: {
      name: "Arjun Mehta",
      avatar: "https://images.unsplash.com/photo-1580662912098-0a28570b42d6",
      avatarAlt: "Young man with short dark hair in casual blue shirt in modern office setting",
      location: "Gujarat, India",
      isVerified: false
    },
    content: `Smart irrigation success story: Installed drip irrigation with soil moisture sensors last month. Water usage reduced by 40% while crop yield increased by 15%.\n\nThe automated system adjusts watering based on real-time soil conditions. Best investment I've made for my farm!`,
    image: "https://images.unsplash.com/photo-1640677117376-573b9dbb8ea8",
    imageAlt: "Modern drip irrigation system with water droplets on green plants in organized agricultural rows",
    timestamp: new Date(Date.now() - 12 * 60 * 60 * 1000),
    likes: 78,
    isLiked: false,
    tags: ["IrrigationTech", "WaterConservation", "SmartFarming", "Automation"],
    comments: [
    {
      id: 7,
      author: {
        name: "Sunita Rao",
        avatar: "https://images.unsplash.com/photo-1734178491612-098cd27712e4",
        avatarAlt: "Professional woman with shoulder-length hair in business attire in corporate environment"
      },
      content: "Which brand of sensors are you using? Looking to upgrade my system.",
      timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000)
    }]

  }];


  useEffect(() => {
    // Simulate loading
    setTimeout(() => {
      setPosts(mockPosts);
      setLoading(false);
    }, 1000);
  }, []);

  const handleLike = (postId) => {
    setPosts(posts?.map((post) =>
    post?.id === postId ?
    {
      ...post,
      isLiked: !post?.isLiked,
      likes: post?.isLiked ? post?.likes - 1 : post?.likes + 1
    } :
    post
    ));
  };

  const handleComment = (postId, commentText) => {
    const newComment = {
      id: Date.now(),
      author: {
        name: "You",
        avatar: "https://images.unsplash.com/photo-1684860143334-a9099bc3cf1e",
        avatarAlt: "Current user profile photo showing man with beard in casual shirt"
      },
      content: commentText,
      timestamp: new Date()
    };

    setPosts(posts?.map((post) =>
    post?.id === postId ?
    { ...post, comments: [...post?.comments, newComment] } :
    post
    ));
  };

  const handleShare = (postId) => {
    // Implement share functionality
    console.log('Sharing post:', postId);
  };

  const handleCreatePost = (postData) => {
    const newPost = {
      id: Date.now(),
      author: {
        name: "Rajesh Kumar",
        avatar: "https://images.unsplash.com/photo-1684860143334-a9099bc3cf1e",
        avatarAlt: "Current user profile photo showing man with beard in casual shirt",
        location: "Maharashtra, India",
        isVerified: true
      },
      content: postData?.content,
      image: postData?.image,
      imageAlt: postData?.image ? "User uploaded image for community post" : null,
      timestamp: new Date(),
      likes: 0,
      isLiked: false,
      tags: postData?.tags,
      comments: []
    };

    setPosts([newPost, ...posts]);
  };

  const filteredPosts = posts?.filter((post) => {
    switch (activeFilter) {
      case 'questions':
        return post?.content?.includes('?') || post?.tags?.includes('Question');
      case 'tips':
        return post?.tags?.some((tag) => ['Tips', 'Advice', 'SoilHealth', 'OrganicFarming']?.includes(tag));
      case 'equipment':
        return post?.tags?.some((tag) => ['Equipment', 'DroneSpray', 'IrrigationTech', 'JohnDeere']?.includes(tag));
      case 'success':
        return post?.content?.toLowerCase()?.includes('success') || post?.tags?.includes('Success');
      case 'following':
        return post?.author?.isVerified; // Mock: show verified users as "following"
      default:
        return true;
    }
  });

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Left Sidebar */}
            <div className="lg:col-span-1 space-y-6">
              <QuickActions onCreatePost={() => setIsCreateModalOpen(true)} />
              <CommunityStats />
            </div>

            {/* Main Content */}
            <div className="lg:col-span-2">
              <FilterTabs
                activeFilter={activeFilter}
                onFilterChange={setActiveFilter} />


              {/* Create Post Button - Mobile */}
              <div className="lg:hidden mb-6">
                <Button
                  variant="default"
                  fullWidth
                  onClick={() => setIsCreateModalOpen(true)}
                  iconName="Plus"
                  iconPosition="left"
                  className="bg-conversion-cta hover:bg-conversion-cta/90">

                  Share with Community
                </Button>
              </div>

              {/* Posts Feed */}
              {loading ?
              <div className="space-y-6">
                  {[1, 2, 3]?.map((i) =>
                <div key={i} className="bg-card border border-border rounded-lg p-6 animate-pulse">
                      <div className="flex items-center space-x-3 mb-4">
                        <div className="w-12 h-12 bg-muted rounded-full"></div>
                        <div className="space-y-2">
                          <div className="h-4 bg-muted rounded w-32"></div>
                          <div className="h-3 bg-muted rounded w-24"></div>
                        </div>
                      </div>
                      <div className="space-y-2 mb-4">
                        <div className="h-4 bg-muted rounded"></div>
                        <div className="h-4 bg-muted rounded w-3/4"></div>
                      </div>
                      <div className="h-48 bg-muted rounded"></div>
                    </div>
                )}
                </div> :

              <div className="space-y-6">
                  {filteredPosts?.length > 0 ?
                filteredPosts?.map((post) =>
                <PostCard
                  key={post?.id}
                  post={post}
                  onLike={handleLike}
                  onComment={handleComment}
                  onShare={handleShare} />

                ) :

                <div className="text-center py-12">
                      <Icon name="MessageSquare" size={48} className="text-muted-foreground mx-auto mb-4" />
                      <h3 className="text-lg font-semibold text-foreground mb-2">No posts found</h3>
                      <p className="text-muted-foreground mb-4">
                        Be the first to share something with this filter!
                      </p>
                      <Button
                    variant="default"
                    onClick={() => setIsCreateModalOpen(true)}
                    iconName="Plus"
                    iconPosition="left">

                        Create Post
                      </Button>
                    </div>
                }
                </div>
              }
            </div>

            {/* Right Sidebar */}
            <div className="lg:col-span-1 space-y-6">
              <TrendingTopics />
              
              {/* Community Guidelines */}
              <div className="bg-card border border-border rounded-lg shadow-organic p-6">
                <div className="flex items-center space-x-2 mb-4">
                  <Icon name="Shield" size={20} className="text-primary" />
                  <h3 className="text-lg font-semibold text-foreground">Community Guidelines</h3>
                </div>
                <div className="space-y-3 text-sm text-muted-foreground">
                  <p>• Be respectful and supportive to fellow farmers</p>
                  <p>• Share accurate and helpful information</p>
                  <p>• Use relevant tags for better discoverability</p>
                  <p>• Report inappropriate content</p>
                  <p>• Celebrate farming achievements together</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      {/* Create Post Modal */}
      <CreatePostModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onSubmit={handleCreatePost} />

    </div>);

};

export default CommunityFeed;