import React from 'react';
import Header from '../../components/ui/Header';
import HeroSection from './components/HeroSection';
import StatsSection from './components/StatsSection';
import FeaturedEquipment from './components/FeaturedEquipment';
import CommunityHighlights from './components/CommunityHighlights';
import WeatherInsights from './components/WeatherInsights';
import TrustSignals from './components/TrustSignals';
import CTASection from './components/CTASection';

const Homepage = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <HeroSection />
        <StatsSection />
        <FeaturedEquipment />
        <CommunityHighlights />
        <WeatherInsights />
        <TrustSignals />
        <CTASection />
      </main>
      {/* Footer */}
      <footer className="bg-foreground text-background py-12">
        <div className="max-w-7xl mx-auto px-4 lg:px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Brand */}
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                  <svg viewBox="0 0 24 24" className="w-6 h-6 text-primary-foreground" fill="currentColor">
                    <path d="M12 2L13.09 8.26L22 9L13.09 9.74L12 16L10.91 9.74L2 9L10.91 8.26L12 2Z" />
                  </svg>
                </div>
                <span className="text-xl font-bold font-accent">FarmSetu</span>
              </div>
              <p className="text-sm text-background/80">
                Bridging farmers to prosperity through smart technology and community-driven innovation.
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="/marketplace" className="text-background/80 hover:text-background organic-transition">Marketplace</a></li>
                <li><a href="/community-feed" className="text-background/80 hover:text-background organic-transition">Community</a></li>
                <li><a href="/news-and-education-hub" className="text-background/80 hover:text-background organic-transition">Learn</a></li>
                <li><a href="/farmer-dashboard" className="text-background/80 hover:text-background organic-transition">Dashboard</a></li>
              </ul>
            </div>

            {/* Support */}
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="text-background/80 hover:text-background organic-transition">Help Center</a></li>
                <li><a href="#" className="text-background/80 hover:text-background organic-transition">Contact Us</a></li>
                <li><a href="#" className="text-background/80 hover:text-background organic-transition">Privacy Policy</a></li>
                <li><a href="#" className="text-background/80 hover:text-background organic-transition">Terms of Service</a></li>
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4 className="font-semibold mb-4">Contact</h4>
              <div className="space-y-2 text-sm text-background/80">
                <p>📧 support@farmsetu.com</p>
                <p>📞 +91 98765 43210</p>
                <p>📍 Bangalore, Karnataka</p>
              </div>
            </div>
          </div>

          <div className="border-t border-background/20 mt-8 pt-8 text-center text-sm text-background/60">
            <p>&copy; {new Date()?.getFullYear()} FarmSetu. All rights reserved. Made with ❤️ for Indian farmers.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Homepage;