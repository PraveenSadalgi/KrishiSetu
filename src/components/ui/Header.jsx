import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import Icon from '../AppIcon';
import Button from './Button';

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const location = useLocation();
  const { user, userProfile, logout } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navigationItems = [
    { path: '/marketplace', label: 'Marketplace', icon: 'ShoppingCart' },
    { path: '/farmer-dashboard', label: 'Dashboard', icon: 'BarChart3' },
    { path: '/community-feed', label: 'Community', icon: 'Users' },
    { path: '/news-and-education-hub', label: 'Learn', icon: 'BookOpen' },
  ];

  const moreMenuItems = [
    { path: '/equipment-detail', label: 'Equipment Details', icon: 'Wrench' },
  ];

  const isActivePath = (path) => {
    return location?.pathname === path || location?.pathname?.startsWith(path);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-background/95 backdrop-blur-md shadow-organic border-b border-border'
          : 'bg-background/80 backdrop-blur-sm'
      }`}
    >
      <div className="w-full">
        <div className="flex items-center justify-between h-16 px-4 lg:px-6">
          {/* Logo Section */}
          <Link
            to="/homepage"
            className="flex items-center space-x-3 organic-transition hover:opacity-80"
          >
            <div className="relative">
              <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center shadow-organic">
                <svg
                  viewBox="0 0 24 24"
                  className="w-6 h-6 text-primary-foreground"
                  fill="currentColor"
                >
                  <path d="M12 2L13.09 8.26L22 9L13.09 9.74L12 16L10.91 9.74L2 9L10.91 8.26L12 2Z" />
                  <path d="M12 16L13.09 22.26L22 23L13.09 23.74L12 30L10.91 23.74L2 23L10.91 22.26L12 16Z" opacity="0.6" />
                </svg>
              </div>
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-harvest-orange rounded-full animate-pulse"></div>
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-bold text-primary font-accent">FarmSetu</span>
              <span className="text-xs text-muted-foreground -mt-1">Smart Agriculture</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1">
            {navigationItems?.map((item) => (
              <Link
                key={item?.path}
                to={item?.path}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg organic-transition ${
                  isActivePath(item?.path)
                    ? 'bg-primary/10 text-primary border border-primary/20' :'text-muted-foreground hover:text-foreground hover:bg-muted'
                }`}
              >
                <Icon name={item?.icon} size={18} />
                <span className="font-medium">{item?.label}</span>
              </Link>
            ))}

            {/* More Menu */}
            <div className="relative group">
              <button className="flex items-center space-x-2 px-4 py-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted organic-transition">
                <Icon name="MoreHorizontal" size={18} />
                <span className="font-medium">More</span>
              </button>

              <div className="absolute top-full right-0 mt-2 w-48 bg-popover border border-border rounded-lg shadow-organic-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                <div className="py-2">
                  {moreMenuItems?.map((item) => (
                    <Link
                      key={item?.path}
                      to={item?.path}
                      className="flex items-center space-x-3 px-4 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-muted organic-transition"
                    >
                      <Icon name={item?.icon} size={16} />
                      <span>{item?.label}</span>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </nav>

          {/* Desktop CTA */}
          <div className="hidden lg:flex items-center space-x-3">
            <Button variant="ghost" size="sm">
              <Icon name="Bell" size={18} />
            </Button>

            {user ? (
              <div className="relative">
                <button
                  onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
                  className="flex items-center space-x-2 p-2 rounded-lg hover:bg-muted organic-transition"
                >
                  <div className="w-8 h-8 rounded-full overflow-hidden bg-muted">
                    <img
                      src={localStorage.getItem(`profileImage_${user.id}`) || userProfile?.profile_image_url || '/assets/images/no_image.png'}
                      alt="Profile"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <span className="text-sm font-medium">{userProfile?.full_name || 'User'}</span>
                  <Icon name="ChevronDown" size={16} />
                </button>

                {isProfileMenuOpen && (
                  <div className="absolute top-full right-0 mt-2 w-48 bg-popover border border-border rounded-lg shadow-organic-lg z-50">
                    <div className="py-2">
                      <Link
                        to="/profile"
                        className="flex items-center space-x-3 px-4 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-muted organic-transition"
                        onClick={() => setIsProfileMenuOpen(false)}
                      >
                        <Icon name="User" size={16} />
                        <span>Profile</span>
                      </Link>
                      <Link
                        to="/farmer-dashboard"
                        className="flex items-center space-x-3 px-4 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-muted organic-transition"
                        onClick={() => setIsProfileMenuOpen(false)}
                      >
                        <Icon name="BarChart3" size={16} />
                        <span>Dashboard</span>
                      </Link>
                      <div className="border-t border-border my-1"></div>
                      <button
                        onClick={() => {
                          logout();
                          setIsProfileMenuOpen(false);
                        }}
                        className="flex items-center space-x-3 px-4 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-muted organic-transition w-full text-left"
                      >
                        <Icon name="LogOut" size={16} />
                        <span>Sign Out</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <>
                <Button variant="outline" size="sm" onClick={() => window.location.href = '/auth/login'}>
                  Sign In
                </Button>
                <Button variant="default" size="sm" className="bg-conversion-cta hover:bg-conversion-cta/90" onClick={() => window.location.href = '/auth/signup'}>
                  Get Started
                </Button>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMobileMenu}
            className="lg:hidden p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted organic-transition"
          >
            <Icon name={isMobileMenuOpen ? "X" : "Menu"} size={24} />
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="lg:hidden bg-background border-t border-border">
            <div className="px-4 py-4 space-y-2">
              {navigationItems?.map((item) => (
                <Link
                  key={item?.path}
                  to={item?.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`flex items-center space-x-3 px-4 py-3 rounded-lg organic-transition touch-target ${
                    isActivePath(item?.path)
                      ? 'bg-primary/10 text-primary border border-primary/20' :'text-muted-foreground hover:text-foreground hover:bg-muted'
                  }`}
                >
                  <Icon name={item?.icon} size={20} />
                  <span className="font-medium">{item?.label}</span>
                </Link>
              ))}

              {moreMenuItems?.map((item) => (
                <Link
                  key={item?.path}
                  to={item?.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center space-x-3 px-4 py-3 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted organic-transition touch-target"
                >
                  <Icon name={item?.icon} size={20} />
                  <span className="font-medium">{item?.label}</span>
                </Link>
              ))}

              <div className="pt-4 mt-4 border-t border-border space-y-2">
                <Button variant="outline" fullWidth onClick={() => window.location.href = '/auth/login'}>
                  Sign In
                </Button>
                <Button variant="default" fullWidth className="bg-conversion-cta hover:bg-conversion-cta/90" onClick={() => window.location.href = '/auth/signup'}>
                  Get Started
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
