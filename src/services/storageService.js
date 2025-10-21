import { supabase } from '../lib/supabase';

// Storage service for FarmSetu platform
export const storageService = {
  // Upload file to equipment images bucket (public)
  async uploadEquipmentImage(file, equipmentId) {
    try {
      const fileExt = file?.name?.split('.')?.pop();
      const fileName = `${equipmentId}/${Date.now()}.${fileExt}`;
      
      const { data, error } = await supabase?.storage?.from('equipment-images')?.upload(fileName, file, {
          cacheControl: '3600',
          upsert: false
        });

      if (error) throw error;

      // Get public URL
      const { data: { publicUrl } } = supabase?.storage?.from('equipment-images')?.getPublicUrl(fileName);

      return { data: { ...data, publicUrl }, error: null };
    } catch (error) {
      return { data: null, error };
    }
  },

  // Upload multiple equipment images
  async uploadEquipmentImages(files, equipmentId) {
    try {
      const uploadPromises = files?.map(file => 
        this.uploadEquipmentImage(file, equipmentId)
      );
      
      const results = await Promise.allSettled(uploadPromises);
      
      const successfulUploads = results?.filter(result => result?.status === 'fulfilled' && !result?.value?.error)?.map(result => result?.value?.data);
      
      const failedUploads = results?.filter(result => result?.status === 'rejected' || result?.value?.error)?.map(result => result?.reason || result?.value?.error);

      return {
        data: {
          successful: successfulUploads,
          failed: failedUploads,
          urls: successfulUploads?.map(upload => upload?.publicUrl)
        },
        error: failedUploads?.length > 0 ? failedUploads : null
      };
    } catch (error) {
      return { data: null, error };
    }
  },

  // Upload user profile image (private)
  async uploadProfileImage(file, userId) {
    try {
      const fileExt = file?.name?.split('.')?.pop();
      const fileName = `${userId}/profile.${fileExt}`;
      
      const { data, error } = await supabase?.storage?.from('user-files')?.upload(fileName, file, {
          cacheControl: '3600',
          upsert: true // Allow overwriting existing profile image
        });

      if (error) throw error;

      // Get signed URL for private bucket
      const { data: signedUrlData, error: urlError } = await supabase?.storage?.from('user-files')?.createSignedUrl(fileName, 60 * 60 * 24); // 24 hour expiry

      if (urlError) throw urlError;

      return { 
        data: { 
          ...data, 
          signedUrl: signedUrlData?.signedUrl,
          path: fileName
        }, 
        error: null 
      };
    } catch (error) {
      return { data: null, error };
    }
  },

  // Get signed URL for private file
  async getSignedUrl(bucketName, filePath, expiresIn = 3600) {
    try {
      const { data, error } = await supabase?.storage?.from(bucketName)?.createSignedUrl(filePath, expiresIn);

      if (error) throw error;
      return { data, error: null };
    } catch (error) {
      return { data: null, error };
    }
  },

  // List files in user's folder
  async listUserFiles(userId, folder = '') {
    try {
      const folderPath = folder ? `${userId}/${folder}` : userId;
      
      const { data, error } = await supabase?.storage?.from('user-files')?.list(folderPath, {
          limit: 100,
          offset: 0,
          sortBy: { column: 'name', order: 'asc' }
        });

      if (error) throw error;

      // Generate signed URLs for each file
      const filesWithUrls = await Promise.all(
        data?.map(async (file) => {
          const filePath = `${folderPath}/${file?.name}`;
          const { data: urlData } = await supabase?.storage?.from('user-files')?.createSignedUrl(filePath, 3600);

          return {
            ...file,
            fullPath: filePath,
            signedUrl: urlData?.signedUrl
          };
        })
      );

      return { data: filesWithUrls?.filter(f => f?.signedUrl), error: null };
    } catch (error) {
      return { data: null, error };
    }
  },

  // Delete file
  async deleteFile(bucketName, filePath) {
    try {
      const { data, error } = await supabase?.storage?.from(bucketName)?.remove([filePath]);

      if (error) throw error;
      return { data, error: null };
    } catch (error) {
      return { data: null, error };
    }
  },

  // Delete multiple files
  async deleteFiles(bucketName, filePaths) {
    try {
      const { data, error } = await supabase?.storage?.from(bucketName)?.remove(filePaths);

      if (error) throw error;
      return { data, error: null };
    } catch (error) {
      return { data: null, error };
    }
  },

  // Upload community post images
  async uploadPostImage(file, userId) {
    try {
      const fileExt = file?.name?.split('.')?.pop();
      const fileName = `posts/${userId}/${Date.now()}.${fileExt}`;
      
      const { data, error } = await // Using public bucket for post images
      supabase?.storage?.from('equipment-images')?.upload(fileName, file, {
          cacheControl: '3600',
          upsert: false
        });

      if (error) throw error;

      // Get public URL
      const { data: { publicUrl } } = supabase?.storage?.from('equipment-images')?.getPublicUrl(fileName);

      return { data: { ...data, publicUrl }, error: null };
    } catch (error) {
      return { data: null, error };
    }
  },

  // Download file from private bucket
  async downloadFile(bucketName, filePath) {
    try {
      const { data, error } = await supabase?.storage?.from(bucketName)?.download(filePath);

      if (error) throw error;

      // Create download link
      const url = URL.createObjectURL(data);
      const link = document.createElement('a');
      link.href = url;
      link.download = filePath?.split('/')?.pop();
      document.body?.appendChild(link);
      link?.click();
      document.body?.removeChild(link);
      URL.revokeObjectURL(url);

      return { success: true, error: null };
    } catch (error) {
      return { success: false, error };
    }
  },

  // Get public URL for public bucket files
  getPublicUrl(bucketName, filePath) {
    const { data } = supabase?.storage?.from(bucketName)?.getPublicUrl(filePath);
    
    return data?.publicUrl;
  },

  // Validate file before upload
  validateFile(file, options = {}) {
    const {
      maxSize = 10 * 1024 * 1024, // 10MB default
      allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/jpg']
    } = options;

    const errors = [];

    if (file?.size > maxSize) {
      errors?.push(`File size must be less than ${maxSize / 1024 / 1024}MB`);
    }

    if (!allowedTypes?.includes(file?.type)) {
      errors?.push(`File type must be one of: ${allowedTypes?.join(', ')}`);
    }

    return {
      isValid: errors?.length === 0,
      errors
    };
  }
};

export default storageService;