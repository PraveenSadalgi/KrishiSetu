import { supabase } from '../lib/supabase';

// Equipment service for FarmSetu platform
export const equipmentService = {
  // Get all equipment with optional filters
  async getEquipment(filters = {}) {
    try {
      let query = supabase?.from('equipment')?.select(`
          *,
          owner:user_profiles!equipment_owner_id_fkey(
            id,
            full_name,
            profile_image_url,
            is_verified,
            location
          ),
          category:equipment_categories(
            id,
            name,
            icon_name
          )
        `)?.order('created_at', { ascending: false });

      // Apply filters
      if (filters?.status) {
        query = query?.eq('status', filters?.status);
      }

      // Handle category filtering - if category is a string name, get the UUID first
      if (filters?.category) {
        if (typeof filters.category === 'string' && filters.category.length > 0) {
          // Check if it's already a UUID or a category name
          const isUUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(filters.category);

          if (!isUUID) {
            // It's a category name, get the UUID
            const { data: categoryData, error: categoryError } = await supabase
              ?.from('equipment_categories')
              ?.select('id')
              ?.eq('name', filters.category)
              ?.single();

            if (categoryError) {
              console.warn('Category not found:', filters.category);
            } else if (categoryData) {
              query = query?.eq('category_id', categoryData.id);
            }
          } else {
            // It's already a UUID
            query = query?.eq('category_id', filters?.category);
          }
        }
      }

      if (filters?.location) {
        // Add location-based filtering logic here
      }

      if (filters?.priceRange) {
        if (filters?.priceRange?.min !== undefined) {
          query = query?.gte('price_per_day', filters?.priceRange?.min);
        }
        if (filters?.priceRange?.max !== undefined) {
          query = query?.lte('price_per_day', filters?.priceRange?.max);
        }
      }

      // Add search query filter
      if (filters?.searchQuery) {
        query = query?.or(`name.ilike.%${filters.searchQuery}%,description.ilike.%${filters.searchQuery}%,brand.ilike.%${filters.searchQuery}%`);
      }

      // Add rating filter
      if (filters?.rating) {
        query = query?.gte('rating_average', parseFloat(filters.rating));
      }

      // Add availability filter (assuming availability is based on status)
      if (filters?.availability) {
        // This would need to be implemented based on your booking system
        // For now, we'll filter by status
        if (filters.availability === 'today') {
          query = query?.eq('status', 'available');
        }
      }

      const { data, error } = await query;
      if (error) throw error;

      return { data, error: null };
    } catch (error) {
      return { data: null, error };
    }
  },

  // Get single equipment by ID
  async getEquipmentById(id) {
    try {
      const { data, error } = await supabase?.from('equipment')?.select(`
          *,
          owner:user_profiles!equipment_owner_id_fkey(
            id,
            full_name,
            profile_image_url,
            is_verified,
            location,
            phone
          ),
          category:equipment_categories(
            id,
            name,
            description,
            icon_name
          ),
          reviews:equipment_reviews(
            id,
            rating,
            title,
            comment,
            reviewer:user_profiles!equipment_reviews_reviewer_id_fkey(
              full_name,
              profile_image_url
            ),
            created_at
          )
        `)?.eq('id', id)?.single();

      if (error) throw error;
      return { data, error: null };
    } catch (error) {
      return { data: null, error };
    }
  },

  // Create new equipment listing
  async createEquipment(equipmentData) {
    try {
      const { data, error } = await supabase?.from('equipment')?.insert([equipmentData])?.select()?.single();

      if (error) throw error;
      return { data, error: null };
    } catch (error) {
      return { data: null, error };
    }
  },

  // Update equipment
  async updateEquipment(id, updates) {
    try {
      const { data, error } = await supabase?.from('equipment')?.update({
          ...updates,
          updated_at: new Date()?.toISOString()
        })?.eq('id', id)?.select()?.single();

      if (error) throw error;
      return { data, error: null };
    } catch (error) {
      return { data: null, error };
    }
  },

  // Delete equipment
  async deleteEquipment(id) {
    try {
      const { error } = await supabase?.from('equipment')?.delete()?.eq('id', id);

      if (error) throw error;
      return { error: null };
    } catch (error) {
      return { error };
    }
  },

  // Get equipment categories
  async getCategories() {
    try {
      const { data, error } = await supabase?.from('equipment_categories')?.select('*')?.eq('is_active', true)?.order('name');

      if (error) throw error;
      return { data, error: null };
    } catch (error) {
      return { data: null, error };
    }
  },

  // Search equipment
  async searchEquipment(searchQuery, filters = {}) {
    try {
      let query = supabase?.from('equipment')?.select(`
          *,
          owner:user_profiles!equipment_owner_id_fkey(
            id,
            full_name,
            profile_image_url,
            is_verified
          ),
          category:equipment_categories(
            name,
            icon_name
          )
        `);

      // Add text search
      if (searchQuery) {
        query = query?.or(`name.ilike.%${searchQuery}%,description.ilike.%${searchQuery}%,brand.ilike.%${searchQuery}%`);
      }

      // Apply additional filters
      Object.keys(filters)?.forEach(key => {
        if (filters?.[key] !== null && filters?.[key] !== undefined) {
          query = query?.eq(key, filters?.[key]);
        }
      });

      const { data, error } = await query?.order('rating_average', { ascending: false });
      if (error) throw error;

      return { data, error: null };
    } catch (error) {
      return { data: null, error };
    }
  },

  // Get user's equipment
  async getUserEquipment(userId) {
    try {
      const { data, error } = await supabase?.from('equipment')?.select(`
          *,
          category:equipment_categories(name, icon_name),
          bookings:equipment_bookings!equipment_bookings_equipment_id_fkey(
            id,
            status,
            start_date,
            end_date
          )
        `)?.eq('owner_id', userId)?.order('created_at', { ascending: false });

      if (error) throw error;
      return { data, error: null };
    } catch (error) {
      return { data: null, error };
    }
  }
};

export default equipmentService;
