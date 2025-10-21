import { supabase } from '../lib/supabase';

// Community service for FarmSetu platform
export const communityService = {
  // Get all community posts with optional filters
  async getPosts(filters = {}) {
    try {
      let query = supabase?.from('community_posts')?.select(`
          *,
          author:user_profiles!community_posts_author_id_fkey(
            id,
            full_name,
            profile_image_url,
            is_verified,
            location
          ),
          _count_comments:post_comments(count),
          _count_likes:post_likes(count)
        `)?.order('created_at', { ascending: false });

      // Apply filters
      if (filters?.type) {
        query = query?.eq('type', filters?.type);
      }
      
      if (filters?.author_id) {
        query = query?.eq('author_id', filters?.author_id);
      }
      
      if (filters?.tags && filters?.tags?.length > 0) {
        query = query?.overlaps('tags', filters?.tags);
      }

      const { data, error } = await query;
      if (error) throw error;
      
      return { data, error: null };
    } catch (error) {
      return { data: null, error };
    }
  },

  // Get single post by ID with comments
  async getPostById(id) {
    try {
      const { data, error } = await supabase?.from('community_posts')?.select(`
          *,
          author:user_profiles!community_posts_author_id_fkey(
            id,
            full_name,
            profile_image_url,
            is_verified,
            location
          ),
          comments:post_comments(
            *,
            author:user_profiles!post_comments_author_id_fkey(
              full_name,
              profile_image_url,
              is_verified
            )
          )
        `)?.eq('id', id)?.single();

      if (error) throw error;
      return { data, error: null };
    } catch (error) {
      return { data: null, error };
    }
  },

  // Create new post
  async createPost(postData) {
    try {
      const { data, error } = await supabase?.from('community_posts')?.insert([postData])?.select(`
          *,
          author:user_profiles!community_posts_author_id_fkey(
            id,
            full_name,
            profile_image_url,
            is_verified
          )
        `)?.single();

      if (error) throw error;
      return { data, error: null };
    } catch (error) {
      return { data: null, error };
    }
  },

  // Update post
  async updatePost(id, updates) {
    try {
      const { data, error } = await supabase?.from('community_posts')?.update({
          ...updates,
          updated_at: new Date()?.toISOString()
        })?.eq('id', id)?.select()?.single();

      if (error) throw error;
      return { data, error: null };
    } catch (error) {
      return { data: null, error };
    }
  },

  // Delete post
  async deletePost(id) {
    try {
      const { error } = await supabase?.from('community_posts')?.delete()?.eq('id', id);

      if (error) throw error;
      return { error: null };
    } catch (error) {
      return { error };
    }
  },

  // Add comment to post
  async addComment(commentData) {
    try {
      const { data, error } = await supabase?.from('post_comments')?.insert([commentData])?.select(`
          *,
          author:user_profiles!post_comments_author_id_fkey(
            full_name,
            profile_image_url,
            is_verified
          )
        `)?.single();

      if (error) throw error;
      return { data, error: null };
    } catch (error) {
      return { data: null, error };
    }
  },

  // Get comments for a post
  async getPostComments(postId) {
    try {
      const { data, error } = await supabase?.from('post_comments')?.select(`
          *,
          author:user_profiles!post_comments_author_id_fkey(
            id,
            full_name,
            profile_image_url,
            is_verified
          )
        `)?.eq('post_id', postId)?.order('created_at', { ascending: true });

      if (error) throw error;
      return { data, error: null };
    } catch (error) {
      return { data: null, error };
    }
  },

  // Like/unlike a post
  async togglePostLike(postId, userId) {
    try {
      // Check if like already exists
      const { data: existingLike } = await supabase?.from('post_likes')?.select('id')?.eq('post_id', postId)?.eq('user_id', userId)?.single();

      if (existingLike) {
        // Unlike - remove the like
        const { error } = await supabase?.from('post_likes')?.delete()?.eq('post_id', postId)?.eq('user_id', userId);
        
        if (error) throw error;
        return { liked: false, error: null };
      } else {
        // Like - add the like
        const { error } = await supabase?.from('post_likes')?.insert([{ post_id: postId, user_id: userId }]);
        
        if (error) throw error;
        return { liked: true, error: null };
      }
    } catch (error) {
      return { liked: false, error };
    }
  },

  // Check if user has liked a post
  async checkPostLike(postId, userId) {
    try {
      const { data, error } = await supabase?.from('post_likes')?.select('id')?.eq('post_id', postId)?.eq('user_id', userId)?.single();

      if (error && error?.code !== 'PGRST116') {
        throw error;
      }
      
      return { liked: !!data, error: null };
    } catch (error) {
      return { liked: false, error };
    }
  },

  // Search posts
  async searchPosts(searchQuery, filters = {}) {
    try {
      let query = supabase?.from('community_posts')?.select(`
          *,
          author:user_profiles!community_posts_author_id_fkey(
            id,
            full_name,
            profile_image_url,
            is_verified
          )
        `);

      // Add text search
      if (searchQuery) {
        query = query?.or(`title.ilike.%${searchQuery}%,content.ilike.%${searchQuery}%`);
      }

      // Apply filters
      if (filters?.type) {
        query = query?.eq('type', filters?.type);
      }

      if (filters?.tags && filters?.tags?.length > 0) {
        query = query?.overlaps('tags', filters?.tags);
      }

      const { data, error } = await query?.order('created_at', { ascending: false });
      if (error) throw error;
      
      return { data, error: null };
    } catch (error) {
      return { data: null, error };
    }
  },

  // Get trending posts (by like count)
  async getTrendingPosts(limit = 10) {
    try {
      const { data, error } = await supabase?.from('community_posts')?.select(`
          *,
          author:user_profiles!community_posts_author_id_fkey(
            id,
            full_name,
            profile_image_url,
            is_verified
          )
        `)?.order('like_count', { ascending: false })?.limit(limit);

      if (error) throw error;
      return { data, error: null };
    } catch (error) {
      return { data: null, error };
    }
  },

  // Get user's posts
  async getUserPosts(userId) {
    try {
      const { data, error } = await supabase?.from('community_posts')?.select(`
          *,
          author:user_profiles!community_posts_author_id_fkey(
            full_name,
            profile_image_url,
            is_verified
          )
        `)?.eq('author_id', userId)?.order('created_at', { ascending: false });

      if (error) throw error;
      return { data, error: null };
    } catch (error) {
      return { data: null, error };
    }
  }
};

export default communityService;