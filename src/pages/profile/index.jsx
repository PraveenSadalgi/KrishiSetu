import React, { useState, useEffect, useRef } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { profileService } from '../../services/profileService';
import Header from '../../components/ui/Header';
import Icon from '../../components/AppIcon';
import Image from '../../components/AppImage';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import Select from '../../components/ui/Select';

const Profile = () => {
  const { user, userProfile, updateProfile } = useAuth();
  const [activeTab, setActiveTab] = useState('profile');
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [bookings, setBookings] = useState([]);
  const [bookingStats, setBookingStats] = useState(null);
  const [formData, setFormData] = useState({
    full_name: '',
    phone: '',
    bio: '',
    location: '',
    farming_experience: '',
    farm_size: '',
    primary_crops: []
  });
  const fileInputRef = useRef(null);

  useEffect(() => {
    if (userProfile) {
      setFormData({
        full_name: userProfile.full_name || '',
        phone: userProfile.phone || '',
        bio: userProfile.bio || '',
        location: userProfile.location?.address || '',
        farming_experience: userProfile.farming_experience?.toString() || '',
        farm_size: userProfile.farm_size?.toString() || '',
        primary_crops: userProfile.primary_crops || []
      });
    }
  }, [userProfile]);

  useEffect(() => {
    if (user?.id) {
      loadProfileData();
    }
  }, [user]);

  const loadProfileData = async () => {
    if (!user?.id) return;

    setLoading(true);
    try {
      const [profileResult, statsResult] = await Promise.all([
        profileService.getProfileWithBookings(user.id),
        profileService.getBookingStats(user.id)
      ]);

      if (profileResult.bookings) {
        setBookings(profileResult.bookings);
      }

      if (statsResult.data) {
        setBookingStats(statsResult.data);
      }
    } catch (error) {
      console.error('Error loading profile data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSaveProfile = async () => {
    if (!user?.id) return;

    setLoading(true);
    try {
      const updates = {
        full_name: formData.full_name,
        phone: formData.phone,
        bio: formData.bio,
        location: formData.location ? { address: formData.location } : null,
        farming_experience: formData.farming_experience ? parseInt(formData.farming_experience) : null,
        farm_size: formData.farm_size ? parseFloat(formData.farm_size) : null,
        primary_crops: formData.primary_crops
      };

      const result = await updateProfile(updates);
      if (result.error) {
        console.error('Error updating profile:', result.error);
      } else {
        setIsEditing(false);
      }
    } catch (error) {
      console.error('Error saving profile:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleProfilePictureUpload = async (event) => {
    const file = event.target.files[0];
    if (!file || !user?.id) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      alert('Please select an image file');
      return;
    }

    // Validate file size (5MB limit)
    if (file.size > 5 * 1024 * 1024) {
      alert('File size must be less than 5MB');
      return;
    }

    setLoading(true);
    try {
      // Convert file to base64
      const reader = new FileReader();
      reader.onload = () => {
        const base64String = reader.result;
        // Store in localStorage with user-specific key
        localStorage.setItem(`profileImage_${user.id}`, base64String);
        // Force re-render by updating state (optional, since localStorage change will trigger re-render)
        setLoading(false);
      };
      reader.onerror = () => {
        alert('Failed to process image');
        setLoading(false);
      };
      reader.readAsDataURL(file);
    } catch (error) {
      console.error('Error processing profile picture:', error);
      alert('Failed to process profile picture');
      setLoading(false);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'active':
        return 'bg-success/10 text-success border-success/20';
      case 'pending':
        return 'bg-warning/10 text-warning border-warning/20';
      case 'completed':
        return 'bg-muted text-muted-foreground border-border';
      case 'cancelled':
        return 'bg-destructive/10 text-destructive border-destructive/20';
      default:
        return 'bg-muted text-muted-foreground border-border';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'active':
        return 'Play';
      case 'pending':
        return 'Clock';
      case 'completed':
        return 'CheckCircle';
      case 'cancelled':
        return 'X';
      default:
        return 'Circle';
    }
  };

  const tabs = [
    { id: 'profile', label: 'Profile', icon: 'User' },
    { id: 'bookings', label: 'Booking History', icon: 'Calendar' },
    { id: 'settings', label: 'Settings', icon: 'Settings' }
  ];

  if (!user) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="pt-16 flex items-center justify-center min-h-[calc(100vh-4rem)]">
          <div className="text-center">
            <Icon name="UserX" size={48} className="text-muted-foreground mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-foreground mb-2">Please sign in to view your profile</h2>
            <Button onClick={() => window.location.href = '/auth/login'}>
              Sign In
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Profile Header */}
          <div className="bg-card border border-border rounded-lg shadow-organic p-6 mb-6">
            <div className="flex items-start space-x-6">
              <div className="relative">
                <div className="w-24 h-24 rounded-full overflow-hidden bg-muted">
                  <Image
                    src={localStorage.getItem(`profileImage_${user.id}`) || userProfile?.profile_image_url || '/assets/images/no_image.png'}
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                </div>
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="absolute bottom-0 right-0 w-8 h-8 bg-primary rounded-full flex items-center justify-center text-primary-foreground hover:bg-primary/90 organic-transition"
                  disabled={loading}
                >
                  <Icon name="Camera" size={16} />
                </button>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleProfilePictureUpload}
                  className="hidden"
                />
              </div>

              <div className="flex-1">
                <div className="flex items-start justify-between">
                  <div>
                    <h1 className="text-2xl font-bold text-foreground">
                      {userProfile?.full_name || 'User'}
                    </h1>
                    <p className="text-muted-foreground">{user?.email}</p>
                    <div className="flex items-center space-x-4 mt-2">
                      <span className="text-sm text-muted-foreground capitalize">
                        {userProfile?.role || 'farmer'}
                      </span>
                      {userProfile?.is_verified && (
                        <div className="flex items-center space-x-1 text-success">
                          <Icon name="ShieldCheck" size={14} />
                          <span className="text-sm">Verified</span>
                        </div>
                      )}
                    </div>
                  </div>

                  <Button
                    variant={isEditing ? "default" : "outline"}
                    onClick={() => setIsEditing(!isEditing)}
                    disabled={loading}
                  >
                    {isEditing ? 'Cancel' : 'Edit Profile'}
                  </Button>
                </div>

                {bookingStats && (
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-foreground">{bookingStats.totalBookings}</div>
                      <div className="text-sm text-muted-foreground">Total Bookings</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-success">{bookingStats.activeBookings}</div>
                      <div className="text-sm text-muted-foreground">Active</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-primary">₹{bookingStats.totalSpent.toLocaleString()}</div>
                      <div className="text-sm text-muted-foreground">Total Spent</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-secondary">₹{bookingStats.totalEarned.toLocaleString()}</div>
                      <div className="text-sm text-muted-foreground">Total Earned</div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="mb-6">
            <div className="flex space-x-1 bg-muted rounded-lg p-1">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 px-4 py-2 text-sm font-medium rounded-md organic-transition ${
                    activeTab === tab.id
                      ? 'bg-background text-foreground shadow-sm'
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  <Icon name={tab.icon} size={16} />
                  <span>{tab.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Tab Content */}
          {activeTab === 'profile' && (
            <div className="space-y-6">
              {/* Personal Information */}
              <div className="bg-card border border-border rounded-lg shadow-organic">
                <div className="p-6 border-b border-border">
                  <h2 className="text-xl font-semibold text-foreground">Personal Information</h2>
                </div>
                <div className="p-6 space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Input
                      label="Full Name"
                      value={formData.full_name}
                      onChange={(value) => handleInputChange('full_name', value)}
                      disabled={!isEditing || loading}
                    />
                    <Input
                      label="Phone"
                      value={formData.phone}
                      onChange={(value) => handleInputChange('phone', value)}
                      disabled={!isEditing || loading}
                    />
                  </div>

                  <Input
                    label="Bio"
                    value={formData.bio}
                    onChange={(value) => handleInputChange('bio', value)}
                    disabled={!isEditing || loading}
                    multiline
                    rows={3}
                  />

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Input
                      label="Location"
                      value={formData.location}
                      onChange={(value) => handleInputChange('location', value)}
                      disabled={!isEditing || loading}
                    />
                    <Input
                      label="Farming Experience (years)"
                      type="number"
                      value={formData.farming_experience}
                      onChange={(value) => handleInputChange('farming_experience', value)}
                      disabled={!isEditing || loading}
                    />
                  </div>

                  <Input
                    label="Farm Size (acres)"
                    type="number"
                    step="0.1"
                    value={formData.farm_size}
                    onChange={(value) => handleInputChange('farm_size', value)}
                    disabled={!isEditing || loading}
                  />
                </div>

                {isEditing && (
                  <div className="p-6 border-t border-border">
                    <div className="flex justify-end space-x-3">
                      <Button
                        variant="outline"
                        onClick={() => setIsEditing(false)}
                        disabled={loading}
                      >
                        Cancel
                      </Button>
                      <Button
                        onClick={handleSaveProfile}
                        disabled={loading}
                      >
                        {loading ? 'Saving...' : 'Save Changes'}
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {activeTab === 'bookings' && (
            <div className="bg-card border border-border rounded-lg shadow-organic">
              <div className="p-6 border-b border-border">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-semibold text-foreground">Booking History</h2>
                  <Button variant="outline" size="sm">
                    <Icon name="Download" size={16} />
                    Export
                  </Button>
                </div>
              </div>

              <div className="divide-y divide-border">
                {loading ? (
                  <div className="p-6 text-center">
                    <Icon name="Loader2" size={24} className="animate-spin text-muted-foreground mx-auto mb-2" />
                    <p className="text-muted-foreground">Loading bookings...</p>
                  </div>
                ) : bookings.length === 0 ? (
                  <div className="p-6 text-center">
                    <Icon name="Calendar" size={48} className="text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-foreground mb-2">No bookings yet</h3>
                    <p className="text-muted-foreground">Your booking history will appear here once you start renting equipment.</p>
                  </div>
                ) : (
                  bookings.map((booking) => (
                    <div key={booking.id} className="p-6 hover:bg-muted/50 organic-transition">
                      <div className="flex items-start space-x-4">
                        <div className="flex-shrink-0">
                          <Image
                            src={booking.equipment?.images?.[0] || '/assets/images/no_image.png'}
                            alt={booking.equipment?.name || 'Equipment'}
                            className="w-16 h-16 rounded-lg object-cover"
                          />
                        </div>

                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between mb-2">
                            <div>
                              <h3 className="text-lg font-medium text-foreground truncate">
                                {booking.equipment?.name || 'Unknown Equipment'}
                              </h3>
                              <div className="flex items-center space-x-2 mt-1">
                                <Image
                                  src={booking.renter?.profile_image_url || booking.owner?.profile_image_url || '/assets/images/no_image.png'}
                                  alt="User"
                                  className="w-6 h-6 rounded-full object-cover"
                                />
                                <span className="text-sm text-muted-foreground">
                                  {booking.renter_id === user.id ? `Owner: ${booking.owner?.full_name}` : `Renter: ${booking.renter?.full_name}`}
                                </span>
                              </div>
                            </div>

                            <div className="flex items-center space-x-3">
                              <span className="text-lg font-semibold text-foreground">₹{booking.total_amount}</span>
                              <div className={`px-3 py-1 rounded-full border text-xs font-medium ${getStatusColor(booking.status)}`}>
                                <div className="flex items-center space-x-1">
                                  <Icon name={getStatusIcon(booking.status)} size={12} />
                                  <span className="capitalize">{booking.status}</span>
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="flex items-center justify-between text-sm text-muted-foreground">
                            <div className="flex items-center space-x-4">
                              <div className="flex items-center space-x-1">
                                <Icon name="Calendar" size={14} />
                                <span>{booking.start_date} to {booking.end_date}</span>
                              </div>
                              {booking.equipment?.location && (
                                <div className="flex items-center space-x-1">
                                  <Icon name="MapPin" size={14} />
                                  <span>{booking.equipment.location.address || 'Location not specified'}</span>
                                </div>
                              )}
                            </div>

                            <div className="flex items-center space-x-2">
                              <Button variant="ghost" size="sm">
                                <Icon name="MessageCircle" size={16} />
                              </Button>
                              <Button variant="ghost" size="sm">
                                <Icon name="Phone" size={16} />
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {bookings.length > 0 && (
                <div className="p-6 border-t border-border">
                  <Button variant="outline" fullWidth>
                    View All Bookings
                  </Button>
                </div>
              )}
            </div>
          )}

          {activeTab === 'settings' && (
            <div className="space-y-6">
              {/* Account Settings */}
              <div className="bg-card border border-border rounded-lg shadow-organic">
                <div className="p-6 border-b border-border">
                  <h2 className="text-xl font-semibold text-foreground">Account Settings</h2>
                </div>
                <div className="p-6 space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium text-foreground">Email Notifications</h3>
                      <p className="text-sm text-muted-foreground">Receive email updates about your bookings and account</p>
                    </div>
                    <Button variant="outline" size="sm">
                      Manage
                    </Button>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium text-foreground">Privacy Settings</h3>
                      <p className="text-sm text-muted-foreground">Control who can see your profile and booking history</p>
                    </div>
                    <Button variant="outline" size="sm">
                      Manage
                    </Button>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium text-foreground">Change Password</h3>
                      <p className="text-sm text-muted-foreground">Update your account password</p>
                    </div>
                    <Button variant="outline" size="sm">
                      Change
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Profile;
