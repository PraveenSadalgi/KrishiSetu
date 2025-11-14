import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from './components/ScrollToTop';
import ErrorBoundary from './components/ErrorBoundary';
import NotFound from "./pages/NotFound";
import NewsAndEducationHub from './pages/news-and-education-hub';
import EquipmentDetail from './pages/equipment-detail';
import Marketplace from './pages/marketplace';
import FarmerDashboard from './pages/farmer-dashboard';
import CommunityFeed from './pages/community-feed';
import Homepage from './pages/homepage';
import Profile from './pages/profile';
import LoginPage from './pages/auth/LoginPage';
import SignUpPage from './pages/auth/SignUpPage';

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
      <ScrollToTop />
      <RouterRoutes>
        {/* Define your route here */}
        <Route path="/" element={<Homepage />} />
        <Route path="/news-and-education-hub" element={<NewsAndEducationHub />} />
        <Route path="/equipment-detail" element={<EquipmentDetail />} />
        <Route path="/marketplace" element={<Marketplace />} />
        <Route path="/farmer-dashboard" element={<FarmerDashboard />} />
        <Route path="/community-feed" element={<CommunityFeed />} />
        <Route path="/homepage" element={<Homepage />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/auth/login" element={<LoginPage />} />
        <Route path="/auth/signup" element={<SignUpPage />} />
        <Route path="*" element={<NotFound />} />
      </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;
