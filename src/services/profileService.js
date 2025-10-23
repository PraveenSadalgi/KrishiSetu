import { supabase } from '../lib/supabase';

export const profileService = {
  // Get user profile with booking history
  async getProfileWithBookings(userId) {
    try {
      // Get user profile
      const { data: profile, error: profileError } = await supabase
        .from('user_profiles')
        .select('*')
        .eq('id', userId)
        .single();

      if (profileError) throw profileError;

      // Get booking history (both as renter and owner)
      const { data: bookings, error: bookingsError } = await supabase
        .from('equipment_bookings')
        .select(`
          *,
          equipment:equipment_id (
            id,
            name,
            images,
            location
          ),
          renter:user_profiles!renter_id (
            id,
            full_name,
            profile_image_url
          ),
          owner:user_profiles!owner_id (
            id,
            full_name,
            profile_image_url
          )
        `)
        .or(`renter_id.eq.${userId},owner_id.eq.${userId}`)
        .order('created_at', { ascending: false })
        .limit(20);

      if (bookingsError) throw bookingsError;

      return {
        profile,
        bookings: bookings || [],
        error: null
      };
    } catch (error) {
      console.error('Profile service error:', error);
      return {
        profile: null,
        bookings: [],
        error
      };
    }
  },

  // Update user profile
  async updateProfile(userId, updates) {
    try {
      const { data, error } = await supabase
        .from('user_profiles')
        .update({
          ...updates,
          updated_at: new Date().toISOString()
        })
        .eq('id', userId)
        .select()
        .single();

      if (error) throw error;

      return { data, error: null };
    } catch (error) {
      console.error('Update profile error:', error);
      return { data: null, error };
    }
  },

  // Upload profile picture
  async uploadProfilePicture(userId, file) {
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${userId}/profile.${fileExt}`;
      const filePath = `user-files/${fileName}`;

      // Upload file to storage
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('user-files')
        .upload(filePath, file, {
          cacheControl: '3600',
          upsert: true
        });

      if (uploadError) throw uploadError;

      // Get public URL
      const { data: { publicUrl } } = supabase.storage
        .from('user-files')
        .getPublicUrl(filePath);

      // Update profile with new image URL
      const { data, error } = await supabase
        .from('user_profiles')
        .update({
          profile_image_url: publicUrl,
          updated_at: new Date().toISOString()
        })
        .eq('id', userId)
        .select()
        .single();

      if (error) throw error;

      return { data, error: null };
    } catch (error) {
      console.error('Upload profile picture error:', error);
      return { data: null, error };
    }
  },

  // Get booking statistics
  async getBookingStats(userId) {
    try {
      // Get stats as renter
      const { data: renterStats, error: renterError } = await supabase
        .from('equipment_bookings')
        .select('status, total_amount')
        .eq('renter_id', userId);

      // Get stats as owner
      const { data: ownerStats, error: ownerError } = await supabase
        .from('equipment_bookings')
        .select('status, total_amount')
        .eq('owner_id', userId);

      if (renterError || ownerError) throw renterError || ownerError;

      const stats = {
        totalBookings: (renterStats?.length || 0) + (ownerStats?.length || 0),
        activeBookings: [...(renterStats || []), ...(ownerStats || [])].filter(b => b.status === 'active').length,
        completedBookings: [...(renterStats || []), ...(ownerStats || [])].filter(b => b.status === 'completed').length,
        totalSpent: renterStats?.reduce((sum, b) => sum + (b.total_amount || 0), 0) || 0,
        totalEarned: ownerStats?.reduce((sum, b) => sum + (b.total_amount || 0), 0) || 0
      };

      return { data: stats, error: null };
    } catch (error) {
      console.error('Get booking stats error:', error);
      return { data: null, error };
    }
  }
};
