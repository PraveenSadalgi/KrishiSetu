import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import EquipmentGallery from './components/EquipmentGallery';
import EquipmentSpecs from './components/EquipmentSpecs';
import BookingCard from './components/BookingCard';
import OwnerProfile from './components/OwnerProfile';
import AIInsights from './components/AIInsights';
import ReviewsSection from './components/ReviewsSection';
import LocationMap from './components/LocationMap';

const EquipmentDetail = () => {
  const navigate = useNavigate();
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);

  useEffect(() => {
    const savedLanguage = localStorage.getItem('selectedLanguage') || 'en';
    setCurrentLanguage(savedLanguage);
  }, []);

  // Mock equipment data
  const equipmentData = {
    id: "eq_001",
    name: "John Deere 5050D Tractor",
    category: "Tractors",
    subcategory: "Medium Tractors",
    description: `Professional-grade 50 HP tractor perfect for medium-scale farming operations. This reliable machine features advanced hydraulics, comfortable operator cabin, and fuel-efficient engine. Ideal for plowing, tilling, harvesting, and transportation tasks across various crop types.\n\nEquipped with modern safety features and ergonomic controls for extended operation comfort. Regular maintenance ensures optimal performance and longevity.`,
    condition: "Excellent",
    year: 2021,
    hoursUsed: 1250,
    availability: "Available",
    lastMaintenance: "2025-09-15",
    nextMaintenance: "2025-12-15",
    pricing: {
      hourly: 800,
      daily: 5500,
      weekly: 35000,
      monthly: 120000,
      deliveryFee: 1500,
      securityDeposit: 25000
    },
    location: {
      address: "Village Kothrud, Near Cooperative Society",
      city: "Pune",
      state: "Maharashtra",
      pincode: "411038",
      lat: 18.5074,
      lng: 73.8077,
      availableHours: "6:00 AM - 8:00 PM"
    },
    images: [
    {
      url: "https://images.unsplash.com/photo-1714177236333-37da9d520bf5",
      alt: "John Deere 5050D tractor in green color parked in agricultural field with clear blue sky background"
    },
    {
      url: "https://images.unsplash.com/photo-1651933080759-ae8e1ade95c6",
      alt: "Close-up view of tractor cabin interior showing steering wheel, dashboard controls and comfortable operator seat"
    },
    {
      url: "https://images.unsplash.com/photo-1619999024107-03754fe15127",
      alt: "Side profile of green tractor showing large rear wheels, hydraulic system and attached farming implement"
    },
    {
      url: "https://images.unsplash.com/photo-1676358359430-48f1cc5dd570",
      alt: "Tractor engine compartment showing diesel engine, air filter and maintenance access points"
    }]

  };

  const specifications = [
  { label: "Engine Power", value: "50 HP" },
  { label: "Engine Type", value: "4-Cylinder Diesel" },
  { label: "Transmission", value: "8 Forward + 2 Reverse" },
  { label: "Hydraulic Capacity", value: "2000 kg" },
  { label: "PTO Speed", value: "540/750 RPM" },
  { label: "Fuel Tank", value: "65 Liters" },
  { label: "Weight", value: "2800 kg" },
  { label: "Wheelbase", value: "2100 mm" }];


  const features = [
  "Advanced hydraulic system with position control",
  "Comfortable operator cabin with AC",
  "Power steering for easy maneuverability",
  "Dual clutch for smooth operation",
  "LED headlights for night operations",
  "Digital instrument cluster",
  "Ergonomic controls and seating",
  "Low fuel consumption engine"];


  const maintenance = [
  {
    title: "Daily Checks",
    description: "Check engine oil, coolant levels, and tire pressure before operation"
  },
  {
    title: "Weekly Maintenance",
    description: "Clean air filter, grease all fittings, and inspect hydraulic hoses"
  },
  {
    title: "Monthly Service",
    description: "Change engine oil, check transmission fluid, and inspect belts"
  },
  {
    title: "Seasonal Care",
    description: "Complete engine service, hydraulic system check, and safety inspection"
  }];


  const ownerData = {
    name: "Rajesh Patil",
    avatar: "https://images.unsplash.com/photo-1563107428-b15d093dfca8",
    avatarAlt: "Professional headshot of middle-aged Indian farmer with mustache wearing white shirt and smiling",
    location: "Pune, Maharashtra",
    rating: 4.8,
    reviewCount: 127,
    equipmentCount: 8,
    yearsExperience: 15,
    totalBookings: 450,
    responseTime: "< 2 hrs",
    isVerified: true,
    recentReviews: [
    {
      rating: 5,
      reviewerName: "Suresh Kumar",
      comment: "Excellent tractor, well-maintained and powerful. Owner is very cooperative."
    },
    {
      rating: 5,
      reviewerName: "Amit Sharma",
      comment: "Great experience! Tractor performed perfectly for my wheat harvesting."
    },
    {
      rating: 4,
      reviewerName: "Priya Devi",
      comment: "Good equipment, timely delivery. Recommended for medium farming operations."
    }]

  };

  const aiInsights = {
    usageTips: [
    {
      title: "Optimal Field Conditions",
      description: "Best performance achieved in dry to moderately moist soil conditions. Avoid waterlogged fields to prevent soil compaction."
    },
    {
      title: "Fuel Efficiency Tips",
      description: "Maintain steady RPM between 1800-2000 for optimal fuel consumption. Use appropriate gear for field conditions."
    },
    {
      title: "Implement Compatibility",
      description: "Compatible with most standard 3-point hitch implements. Ensure proper weight distribution for stability."
    },
    {
      title: "Maintenance Schedule",
      description: "Follow manufacturer's maintenance schedule strictly. Regular servicing extends equipment life and maintains performance."
    }]

  };

  const weatherData = {
    current: "Clear skies, 28°C, low humidity - Perfect conditions for field operations",
    recommendation: "Next 5 days ideal for farming activities. No rain expected.",
    alert: "High temperatures expected next week. Plan operations for early morning or evening hours."
  };

  const cropRecommendations = [
  {
    name: "Wheat Cultivation",
    compatibility: 5,
    description: "Excellent for wheat plowing, sowing, and harvesting operations. Optimal power for medium-scale wheat farming.",
    season: "Rabi",
    efficiency: "95%"
  },
  {
    name: "Cotton Farming",
    compatibility: 4,
    description: "Well-suited for cotton field preparation and inter-cultivation. Good power-to-weight ratio for cotton operations.",
    season: "Kharif",
    efficiency: "88%"
  },
  {
    name: "Sugarcane Operations",
    compatibility: 4,
    description: "Suitable for sugarcane field preparation and transportation. May need additional implements for specialized tasks.",
    season: "Year-round",
    efficiency: "82%"
  },
  {
    name: "Vegetable Farming",
    compatibility: 5,
    description: "Perfect for vegetable cultivation with precise control and maneuverability in smaller plots.",
    season: "All seasons",
    efficiency: "92%"
  }];


  const reviews = [
  {
    id: 1,
    reviewer: {
      name: "Suresh Kumar Sharma",
      avatar: "https://images.unsplash.com/photo-1660221909243-77b638807872",
      avatarAlt: "Professional headshot of middle-aged Indian man with beard wearing blue shirt and smiling confidently",
      location: "Nashik, Maharashtra"
    },
    rating: 5,
    date: "2025-10-15",
    comment: "Outstanding tractor! Used it for my 10-acre wheat field and the performance was exceptional. The owner Rajesh is very professional and the equipment was delivered on time. Fuel efficiency is excellent and the hydraulic system works perfectly. Highly recommended for medium-scale farming operations.",
    rentalDuration: "7 days",
    equipmentCondition: "Excellent",
    helpfulCount: 12,
    images: [
    {
      url: "https://images.unsplash.com/photo-1716445867588-105a60770e1d",
      alt: "Tractor working in wheat field during harvest season with golden crops in background"
    }],

    ownerResponse: "Thank you Suresh! It was a pleasure working with you. Your field was well-prepared and you took excellent care of the equipment."
  },
  {
    id: 2,
    reviewer: {
      name: "Priya Devi Patel",
      avatar: "https://images.unsplash.com/photo-1652396944757-ad27b62b33f6",
      avatarAlt: "Professional headshot of young Indian woman with long black hair wearing traditional kurta and smiling warmly",
      location: "Aurangabad, Maharashtra"
    },
    rating: 4,
    date: "2025-10-10",
    comment: "Very good experience overall. The tractor is powerful and well-maintained. Used it for cotton field preparation and it handled the job perfectly. Only minor issue was slight delay in delivery due to traffic, but owner compensated with extended rental time. Would definitely rent again.",
    rentalDuration: "3 days",
    equipmentCondition: "Very Good",
    helpfulCount: 8,
    images: []
  },
  {
    id: 3,
    reviewer: {
      name: "Amit Singh Rajput",
      avatar: "https://images.unsplash.com/photo-1618499607072-622f1eec6194",
      avatarAlt: "Professional headshot of young Indian man with clean shave wearing white shirt and confident smile",
      location: "Solapur, Maharashtra"
    },
    rating: 5,
    date: "2025-10-05",
    comment: "Excellent service and equipment quality! The tractor performed flawlessly during my sugarcane harvesting season. Rajesh provided detailed instructions and was available for support throughout the rental period. The pricing is very reasonable compared to other options in the market.",
    rentalDuration: "14 days",
    equipmentCondition: "Excellent",
    helpfulCount: 15,
    images: [
    {
      url: "https://images.unsplash.com/photo-1640941900493-386f3be7f0ba",
      alt: "Green tractor working in sugarcane field with tall green crops and clear blue sky"
    },
    {
      url: "https://images.unsplash.com/photo-1724041483764-9bcbc39ea67e",
      alt: "Close-up of tractor hydraulic system lifting heavy sugarcane harvesting equipment"
    }]

  }];


  const deliveryOptions = [
  {
    id: "pickup",
    title: "Self Pickup",
    description: "Collect equipment from owner\'s location",
    price: "Free",
    duration: "Immediate"
  },
  {
    id: "delivery",
    title: "Home Delivery",
    description: "Equipment delivered to your farm",
    price: "₹1,500",
    duration: "2-4 hours"
  },
  {
    id: "operator",
    title: "With Operator",
    description: "Includes experienced operator service",
    price: "₹2,500/day",
    duration: "2-4 hours"
  }];


  const handleBooking = (bookingDetails) => {
    console.log('Booking Details:', bookingDetails);
    setIsBookingModalOpen(true);
    // Simulate booking success
    setTimeout(() => {
      setIsBookingModalOpen(false);
      alert('Booking confirmed! You will receive confirmation details shortly.');
    }, 2000);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: equipmentData?.name,
        text: `Check out this ${equipmentData?.name} available for rent on FarmSetu`,
        url: window.location?.href
      });
    } else {
      navigator.clipboard?.writeText(window.location?.href);
      alert('Link copied to clipboard!');
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-16">
        {/* Breadcrumb Navigation */}
        <div className="bg-muted/30 border-b border-border">
          <div className="max-w-7xl mx-auto px-4 lg:px-6 py-4">
            <nav className="flex items-center space-x-2 text-sm">
              <button
                onClick={() => navigate('/homepage')}
                className="text-muted-foreground hover:text-foreground organic-transition">

                Home
              </button>
              <Icon name="ChevronRight" size={16} className="text-muted-foreground" />
              <button
                onClick={() => navigate('/marketplace')}
                className="text-muted-foreground hover:text-foreground organic-transition">

                Marketplace
              </button>
              <Icon name="ChevronRight" size={16} className="text-muted-foreground" />
              <span className="text-foreground font-medium">{equipmentData?.category}</span>
              <Icon name="ChevronRight" size={16} className="text-muted-foreground" />
              <span className="text-foreground">{equipmentData?.name}</span>
            </nav>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 lg:px-6 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Equipment Header */}
              <div className="space-y-4">
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center space-x-2 mb-2">
                      <span className="text-sm bg-primary/10 text-primary px-2 py-1 rounded-full">
                        {equipmentData?.category}
                      </span>
                      <span className="text-sm bg-success/10 text-success px-2 py-1 rounded-full flex items-center">
                        <div className="w-2 h-2 bg-success rounded-full mr-1"></div>
                        {equipmentData?.availability}
                      </span>
                    </div>
                    <h1 className="text-3xl font-bold mb-2">{equipmentData?.name}</h1>
                    <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                      <div className="flex items-center space-x-1">
                        <Icon name="Calendar" size={16} />
                        <span>Year: {equipmentData?.year}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Icon name="Clock" size={16} />
                        <span>{equipmentData?.hoursUsed} hours used</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Icon name="MapPin" size={16} />
                        <span>{equipmentData?.location?.city}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Button variant="outline" size="sm" onClick={handleShare}>
                      <Icon name="Share2" size={16} />
                    </Button>
                    <Button variant="outline" size="sm">
                      <Icon name="Heart" size={16} />
                    </Button>
                  </div>
                </div>

                <p className="text-muted-foreground leading-relaxed">
                  {equipmentData?.description}
                </p>
              </div>

              {/* Equipment Gallery */}
              <EquipmentGallery
                images={equipmentData?.images}
                equipmentName={equipmentData?.name} />


              {/* AI Insights */}
              <AIInsights
                insights={aiInsights}
                weatherData={weatherData}
                cropRecommendations={cropRecommendations} />


              {/* Equipment Specifications */}
              <EquipmentSpecs
                specifications={specifications}
                features={features}
                maintenance={maintenance} />


              {/* Location & Map */}
              <LocationMap
                location={equipmentData?.location}
                deliveryRadius={10}
                deliveryOptions={deliveryOptions} />


              {/* Reviews Section */}
              <ReviewsSection
                reviews={reviews}
                averageRating={4.8}
                totalReviews={127} />

            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Booking Card */}
              <BookingCard
                equipment={equipmentData}
                onBooking={handleBooking} />


              {/* Owner Profile */}
              <OwnerProfile owner={ownerData} />

              {/* Safety Information */}
              <div className="bg-card border border-border rounded-lg p-6">
                <h3 className="font-semibold mb-4 flex items-center">
                  <Icon name="Shield" size={20} className="mr-2 text-success" />
                  Safety & Insurance
                </h3>
                <div className="space-y-3 text-sm">
                  <div className="flex items-start space-x-2">
                    <Icon name="CheckCircle" size={16} className="text-success mt-0.5" />
                    <span>Equipment covered under comprehensive insurance</span>
                  </div>
                  <div className="flex items-start space-x-2">
                    <Icon name="CheckCircle" size={16} className="text-success mt-0.5" />
                    <span>24/7 technical support during rental period</span>
                  </div>
                  <div className="flex items-start space-x-2">
                    <Icon name="CheckCircle" size={16} className="text-success mt-0.5" />
                    <span>Safety training provided before handover</span>
                  </div>
                  <div className="flex items-start space-x-2">
                    <Icon name="CheckCircle" size={16} className="text-success mt-0.5" />
                    <span>Emergency contact available</span>
                  </div>
                </div>
              </div>

              {/* Similar Equipment */}
              <div className="bg-card border border-border rounded-lg p-6">
                <h3 className="font-semibold mb-4">Similar Equipment</h3>
                <div className="space-y-3">
                  {[
                  {
                    name: "Mahindra 575 DI Tractor",
                    price: "₹5,200/day",
                    rating: 4.6,
                    image: "https://images.unsplash.com/photo-1708417134916-234bb4b33881",
                    imageAlt: "Red Mahindra tractor in agricultural field with farming equipment attached"
                  },
                  {
                    name: "Swaraj 744 FE Tractor",
                    price: "₹4,800/day",
                    rating: 4.4,
                    image: "https://images.unsplash.com/photo-1571749135264-d35a02f57705",
                    imageAlt: "Blue Swaraj tractor parked in farm yard with clear sky background"
                  }]?.
                  map((item, index) =>
                  <div key={index} className="flex items-center space-x-3 p-2 rounded-lg hover:bg-muted/50 organic-transition cursor-pointer">
                      <img
                      src={item?.image}
                      alt={item?.imageAlt}
                      className="w-12 h-10 rounded object-cover" />

                      <div className="flex-1">
                        <p className="font-medium text-sm">{item?.name}</p>
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-primary font-medium">{item?.price}</span>
                          <div className="flex items-center space-x-1">
                            <Icon name="Star" size={12} className="text-warning fill-current" />
                            <span className="text-xs">{item?.rating}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      {/* Booking Success Modal */}
      {isBookingModalOpen &&
      <div className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-card border border-border rounded-lg p-6 max-w-md w-full">
            <div className="text-center">
              <div className="w-16 h-16 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Icon name="CheckCircle" size={32} className="text-success" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Booking Confirmed!</h3>
              <p className="text-muted-foreground mb-4">
                Your booking request has been sent to the owner. You will receive confirmation details shortly.
              </p>
              <Button
              variant="default"
              onClick={() => setIsBookingModalOpen(false)}
              className="bg-conversion-cta hover:bg-conversion-cta/90">

                Continue
              </Button>
            </div>
          </div>
        </div>
      }
    </div>);

};

export default EquipmentDetail;