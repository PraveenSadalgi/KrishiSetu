import React, { useState, useEffect } from 'react';
import Header from '../../components/ui/Header';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import NewsCard from './components/NewsCard';
import EducationCard from './components/EducationCard';
import WeatherWidget from './components/WeatherWidget';
import CategoryFilter from './components/CategoryFilter';
import SearchBar from './components/SearchBar';
import FeaturedContent from './components/FeaturedContent';
import GovernmentSchemes from './components/GovernmentSchemes';

const NewsAndEducationHub = () => {
  const [activeTab, setActiveTab] = useState('news');
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [bookmarkedItems, setBookmarkedItems] = useState(new Set());
  const [currentLanguage, setCurrentLanguage] = useState('English');

  // Load language preference on mount
  useEffect(() => {
    const savedLanguage = localStorage.getItem('preferredLanguage') || 'English';
    setCurrentLanguage(savedLanguage);
  }, []);

  // Mock data for news articles
  const newsArticles = [
  {
    id: 1,
    title: "Revolutionary AI-Powered Crop Monitoring System Launched in Maharashtra",
    summary: "New satellite-based monitoring system helps farmers detect crop diseases 15 days earlier than traditional methods, potentially saving millions in crop losses.",
    image: "https://images.unsplash.com/photo-1579102380580-6830f6ae854f",
    imageAlt: "Farmer using tablet device in green wheat field with satellite technology overlay",
    category: "Technology",
    region: "Maharashtra",
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
    aiGenerated: true,
    views: 15420
  },
  {
    id: 2,
    title: "Monsoon Update: Heavy Rainfall Expected in North India This Week",
    summary: "IMD forecasts significant rainfall across Punjab, Haryana, and UP. Farmers advised to prepare for harvesting and storage of standing crops.",
    image: "https://images.unsplash.com/photo-1664489833969-d50617b8283d",
    imageAlt: "Dark monsoon clouds gathering over green agricultural fields with farmers working",
    category: "Weather",
    region: "North India",
    timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000),
    aiGenerated: false,
    views: 8930
  },
  {
    id: 3,
    title: "Wheat Prices Surge 12% Following Export Policy Changes",
    summary: "Government's new export guidelines boost domestic wheat prices. Market analysts predict continued upward trend through Q4 2024.",
    image: "https://images.unsplash.com/photo-1710149468014-3d0eb40caaeb",
    imageAlt: "Golden wheat grains in farmer\'s hands with market price charts in background",
    category: "Market",
    region: "Pan India",
    timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000),
    aiGenerated: true,
    views: 12750
  },
  {
    id: 4,
    title: "New Organic Certification Scheme Simplifies Process for Small Farmers",
    summary: "Government launches digital platform reducing organic certification time from 6 months to 45 days, making it accessible for smallholder farmers.",
    image: "https://images.unsplash.com/photo-1602692875228-a2f382599d65",
    imageAlt: "Organic vegetables and certification documents on wooden table with farmer's hands",
    category: "Policy",
    region: "All States",
    timestamp: new Date(Date.now() - 8 * 60 * 60 * 1000),
    aiGenerated: false,
    views: 6840
  }];


  // Mock data for educational content
  const educationalContent = [
  {
    id: 1,
    title: "Smart Irrigation Techniques for Water Conservation",
    description: "Learn advanced drip irrigation and sensor-based watering systems to reduce water usage by up to 40% while maintaining crop yield.",
    thumbnail: "https://images.unsplash.com/photo-1546096940-8f20ae986be2",
    thumbnailAlt: "Modern drip irrigation system in vegetable farm with water droplets on plants",
    difficulty: "Intermediate",
    duration: 45,
    enrolledCount: 2340,
    rating: 4.8,
    instructor: {
      name: "Dr. Priya Sharma",
      avatar: "https://images.unsplash.com/photo-1670371325848-9f462d5615f7",
      avatarAlt: "Professional headshot of Indian woman agricultural scientist in white lab coat"
    }
  },
  {
    id: 2,
    title: "Organic Pest Management: Natural Solutions",
    description: "Comprehensive guide to managing pests using organic methods, beneficial insects, and companion planting techniques.",
    thumbnail: "https://images.unsplash.com/photo-1709632992325-88d754a46e93",
    thumbnailAlt: "Close-up of beneficial ladybug on green plant leaf in organic garden setting",
    difficulty: "Beginner",
    duration: 30,
    enrolledCount: 1890,
    rating: 4.6,
    instructor: {
      name: "Rajesh Kumar",
      avatar: "https://images.unsplash.com/photo-1558450508-15c61265fa1b",
      avatarAlt: "Professional headshot of middle-aged Indian man in green farming shirt"
    }
  },
  {
    id: 3,
    title: "Soil Health Assessment and Improvement",
    description: "Master soil testing techniques, nutrient management, and organic matter enhancement for optimal crop production.",
    thumbnail: "https://images.unsplash.com/photo-1638429611224-84a71b809b96",
    thumbnailAlt: "Hands holding rich dark soil with visible earthworms and organic matter",
    difficulty: "Advanced",
    duration: 75,
    enrolledCount: 1560,
    rating: 4.9,
    instructor: {
      name: "Dr. Anita Patel",
      avatar: "https://images.unsplash.com/photo-1562789233-495f52b583dd",
      avatarAlt: "Professional headshot of young Indian woman soil scientist with microscope"
    }
  },
  {
    id: 4,
    title: "Climate-Smart Agriculture Practices",
    description: "Adapt your farming practices to climate change with resilient crop varieties and sustainable farming techniques.",
    thumbnail: "https://images.unsplash.com/photo-1591714345924-9957eb4014e0",
    thumbnailAlt: "Diverse crop field with climate monitoring equipment and solar panels",
    difficulty: "Intermediate",
    duration: 60,
    enrolledCount: 2100,
    rating: 4.7,
    instructor: {
      name: "Prof. Vikram Singh",
      avatar: "https://images.unsplash.com/photo-1722650753918-c7b84cd7239e",
      avatarAlt: "Professional headshot of Indian professor in blue shirt with agricultural background"
    }
  }];


  // Mock weather data
  const weatherData = {
    location: "Pune, Maharashtra",
    current: {
      temperature: 28,
      condition: "Partly Cloudy",
      humidity: 65
    },
    forecast: [
    { day: "Today", condition: "Partly Cloudy", high: 30, low: 22 },
    { day: "Tomorrow", condition: "Rainy", high: 26, low: 20 },
    { day: "Wed", condition: "Sunny", high: 32, low: 24 }],

    recommendations: [
    { type: "irrigation", message: "Good day for irrigation - moderate humidity" },
    { type: "harvesting", message: "Harvest before tomorrow\'s rain" },
    { type: "fertilizer", message: "Apply fertilizer after rain stops" }]

  };

  // Mock government schemes data
  const governmentSchemes = [
  {
    id: 1,
    title: "PM-KISAN Samman Nidhi Yojana",
    description: "Direct income support of ₹6,000 per year to small and marginal farmer families across the country.",
    status: "Active",
    maxAmount: 6000,
    deadline: "2024-12-31",
    state: "All States"
  },
  {
    id: 2,
    title: "Pradhan Mantri Fasal Bima Yojana",
    description: "Crop insurance scheme providing financial support to farmers suffering crop loss or damage arising out of unforeseen events.",
    status: "Active",
    maxAmount: 200000,
    deadline: "2024-11-15",
    state: "All States"
  },
  {
    id: 3,
    title: "Kisan Credit Card Scheme",
    description: "Provides adequate and timely credit support from the banking system to farmers for their cultivation and other needs.",
    status: "Ending Soon",
    maxAmount: 300000,
    deadline: "2024-10-30",
    state: "Maharashtra"
  }];


  // Featured article
  const featuredArticle = newsArticles?.[0];

  // Categories for filtering
  const newsCategories = ['All', 'Weather', 'Market', 'Technology', 'Policy'];
  const educationCategories = ['All', 'Tutorials', 'Government Schemes', 'Sustainable Farming', 'Equipment'];

  // Filter content based on category and search
  const filteredNews = newsArticles?.filter((article) => {
    const matchesCategory = activeCategory === 'All' || article?.category === activeCategory;
    const matchesSearch = searchQuery === '' ||
    article?.title?.toLowerCase()?.includes(searchQuery?.toLowerCase()) ||
    article?.summary?.toLowerCase()?.includes(searchQuery?.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const filteredEducation = educationalContent?.filter((course) => {
    const matchesCategory = activeCategory === 'All' ||
    activeCategory === 'Tutorials' && course?.difficulty ||
    activeCategory === 'Sustainable Farming' && course?.title?.toLowerCase()?.includes('organic') ||
    activeCategory === 'Equipment' && course?.title?.toLowerCase()?.includes('irrigation');
    const matchesSearch = searchQuery === '' ||
    course?.title?.toLowerCase()?.includes(searchQuery?.toLowerCase()) ||
    course?.description?.toLowerCase()?.includes(searchQuery?.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleBookmark = (itemId) => {
    const newBookmarks = new Set(bookmarkedItems);
    if (newBookmarks?.has(itemId)) {
      newBookmarks?.delete(itemId);
    } else {
      newBookmarks?.add(itemId);
    }
    setBookmarkedItems(newBookmarks);
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  const handleCategoryChange = (category) => {
    setActiveCategory(category);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-16">
        {/* Hero Section with Featured Content */}
        <section className="px-4 lg:px-6 py-8">
          <div className="max-w-7xl mx-auto">
            <FeaturedContent featuredArticle={featuredArticle} />
          </div>
        </section>

        {/* Search and Navigation */}
        <section className="px-4 lg:px-6 py-6 border-b border-border">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-6">
              <div className="flex-1 max-w-2xl">
                <SearchBar onSearch={handleSearch} />
              </div>
              
              {/* Language Selector */}
              <div className="flex items-center space-x-2">
                <Icon name="Globe" size={16} className="text-muted-foreground" />
                <select
                  value={currentLanguage}
                  onChange={(e) => {
                    setCurrentLanguage(e?.target?.value);
                    localStorage.setItem('preferredLanguage', e?.target?.value);
                  }}
                  className="bg-background border border-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary">

                  <option value="English">English</option>
                  <option value="Hindi">हिंदी</option>
                  <option value="Marathi">मराठी</option>
                  <option value="Gujarati">ગુજરાતી</option>
                </select>
              </div>
            </div>

            {/* Tab Navigation */}
            <div className="flex space-x-1 bg-muted p-1 rounded-lg mb-6">
              <button
                onClick={() => setActiveTab('news')}
                className={`flex-1 flex items-center justify-center space-x-2 px-4 py-2 rounded-md text-sm font-medium organic-transition ${
                activeTab === 'news' ? 'bg-background text-foreground shadow-sm' : 'text-muted-foreground hover:text-foreground'}`
                }>

                <Icon name="Newspaper" size={16} />
                <span>News & Updates</span>
              </button>
              <button
                onClick={() => setActiveTab('education')}
                className={`flex-1 flex items-center justify-center space-x-2 px-4 py-2 rounded-md text-sm font-medium organic-transition ${
                activeTab === 'education' ? 'bg-background text-foreground shadow-sm' : 'text-muted-foreground hover:text-foreground'}`
                }>

                <Icon name="GraduationCap" size={16} />
                <span>Learning Hub</span>
              </button>
            </div>

            {/* Category Filter */}
            <CategoryFilter
              categories={activeTab === 'news' ? newsCategories : educationCategories}
              activeCategory={activeCategory}
              onCategoryChange={handleCategoryChange} />

          </div>
        </section>

        {/* Main Content */}
        <section className="px-4 lg:px-6 py-8">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
              {/* Content Grid */}
              <div className="lg:col-span-3">
                {activeTab === 'news' ?
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {filteredNews?.map((article) =>
                  <NewsCard
                    key={article?.id}
                    article={article}
                    onBookmark={handleBookmark}
                    isBookmarked={bookmarkedItems?.has(article?.id)} />

                  )}
                  </div> :

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {filteredEducation?.map((course) =>
                  <EducationCard
                    key={course?.id}
                    course={course}
                    onBookmark={handleBookmark}
                    isBookmarked={bookmarkedItems?.has(course?.id)} />

                  )}
                  </div>
                }

                {/* No Results */}
                {(activeTab === 'news' && filteredNews?.length === 0 ||
                activeTab === 'education' && filteredEducation?.length === 0) &&
                <div className="text-center py-12">
                    <Icon name="Search" size={48} className="text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-foreground mb-2">No content found</h3>
                    <p className="text-muted-foreground">Try adjusting your search or category filters</p>
                  </div>
                }
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                {/* Weather Widget */}
                <WeatherWidget weatherData={weatherData} />

                {/* Government Schemes */}
                <GovernmentSchemes schemes={governmentSchemes} />

                {/* Quick Actions */}
                <div className="bg-card border border-border rounded-lg p-6">
                  <h3 className="font-semibold text-foreground mb-4">Quick Actions</h3>
                  <div className="space-y-3">
                    <Button variant="outline" fullWidth className="justify-start">
                      <Icon name="Bookmark" size={16} className="mr-2" />
                      My Bookmarks ({bookmarkedItems?.size})
                    </Button>
                    <Button variant="outline" fullWidth className="justify-start">
                      <Icon name="Download" size={16} className="mr-2" />
                      Offline Content
                    </Button>
                    <Button variant="outline" fullWidth className="justify-start">
                      <Icon name="Bell" size={16} className="mr-2" />
                      Notification Settings
                    </Button>
                  </div>
                </div>

                {/* AI Assistant */}
                <div className="bg-gradient-to-br from-accent/10 to-accent/5 border border-accent/20 rounded-lg p-6">
                  <div className="flex items-center space-x-2 mb-3">
                    <Icon name="Sparkles" size={20} className="text-accent" />
                    <h3 className="font-semibold text-foreground">AI Assistant</h3>
                  </div>
                  <p className="text-sm text-muted-foreground mb-4">
                    Get personalized farming advice and content recommendations
                  </p>
                  <Button variant="default" fullWidth className="bg-accent hover:bg-accent/90">
                    <Icon name="MessageCircle" size={16} className="mr-2" />
                    Ask AI Assistant
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      {/* Footer */}
      <footer className="bg-muted/50 border-t border-border py-8 px-4 lg:px-6">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-sm text-muted-foreground">
            © {new Date()?.getFullYear()} FarmSetu. Empowering farmers with knowledge and technology.
          </p>
        </div>
      </footer>
    </div>);

};

export default NewsAndEducationHub;