-- Location: supabase/migrations/20251019175830_farmsetu_complete_schema.sql
-- Schema Analysis: Fresh project - no existing schema detected
-- Integration Type: Complete new schema for FarmSetu agricultural platform
-- Dependencies: None - creating complete schema from scratch

-- 1. CREATE TYPES (ENUMS)
CREATE TYPE public.user_role AS ENUM ('farmer', 'owner', 'admin', 'moderator');
CREATE TYPE public.user_status AS ENUM ('active', 'inactive', 'suspended');
CREATE TYPE public.equipment_status AS ENUM ('available', 'booked', 'maintenance', 'inactive');
CREATE TYPE public.equipment_condition AS ENUM ('excellent', 'good', 'fair', 'needs_repair');
CREATE TYPE public.booking_status AS ENUM ('pending', 'confirmed', 'ongoing', 'completed', 'cancelled');
CREATE TYPE public.payment_status AS ENUM ('pending', 'completed', 'failed', 'refunded');
CREATE TYPE public.notification_type AS ENUM ('booking', 'payment', 'equipment', 'community', 'system');
CREATE TYPE public.post_type AS ENUM ('question', 'tip', 'success_story', 'equipment_review', 'general');
CREATE TYPE public.content_type AS ENUM ('news', 'tutorial', 'guide', 'government_scheme');

-- 2. CORE TABLES (User Management)

-- Critical intermediary table for PostgREST compatibility
CREATE TABLE public.user_profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    email TEXT NOT NULL UNIQUE,
    full_name TEXT NOT NULL,
    phone TEXT,
    role public.user_role DEFAULT 'farmer'::public.user_role,
    status public.user_status DEFAULT 'active'::public.user_status,
    location JSONB, -- {address, city, state, country, coordinates}
    bio TEXT,
    profile_image_url TEXT,
    date_of_birth DATE,
    farming_experience INTEGER, -- years
    farm_size DECIMAL(10,2), -- in acres
    primary_crops TEXT[], -- array of crop names
    preferred_language TEXT DEFAULT 'en',
    is_verified BOOLEAN DEFAULT false,
    verification_documents JSONB, -- {type, url, status}
    settings JSONB DEFAULT '{"notifications": true, "privacy": "public"}'::jsonb,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- Equipment Categories
CREATE TABLE public.equipment_categories (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL UNIQUE,
    description TEXT,
    icon_name TEXT,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- Equipment Listings
CREATE TABLE public.equipment (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    owner_id UUID REFERENCES public.user_profiles(id) ON DELETE CASCADE,
    category_id UUID REFERENCES public.equipment_categories(id) ON DELETE SET NULL,
    name TEXT NOT NULL,
    description TEXT NOT NULL,
    brand TEXT,
    model TEXT,
    year_manufactured INTEGER,
    condition public.equipment_condition DEFAULT 'good'::public.equipment_condition,
    status public.equipment_status DEFAULT 'available'::public.equipment_status,
    price_per_day DECIMAL(10,2) NOT NULL,
    price_per_week DECIMAL(10,2),
    price_per_month DECIMAL(10,2),
    deposit_amount DECIMAL(10,2),
    location JSONB NOT NULL, -- {address, city, state, coordinates}
    specifications JSONB, -- {power, weight, dimensions, fuel_type, etc}
    features TEXT[], -- array of feature names
    images TEXT[], -- array of image URLs
    availability_schedule JSONB, -- {available_dates, blocked_dates}
    min_rental_duration INTEGER DEFAULT 1, -- minimum days
    max_rental_duration INTEGER DEFAULT 30, -- maximum days
    delivery_available BOOLEAN DEFAULT false,
    delivery_radius DECIMAL(5,2), -- in kilometers
    delivery_charge DECIMAL(8,2),
    insurance_required BOOLEAN DEFAULT true,
    operator_provided BOOLEAN DEFAULT false,
    is_featured BOOLEAN DEFAULT false,
    rating_average DECIMAL(3,2) DEFAULT 0.00,
    rating_count INTEGER DEFAULT 0,
    total_bookings INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- Equipment Bookings
CREATE TABLE public.equipment_bookings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    equipment_id UUID REFERENCES public.equipment(id) ON DELETE CASCADE,
    renter_id UUID REFERENCES public.user_profiles(id) ON DELETE CASCADE,
    owner_id UUID REFERENCES public.user_profiles(id) ON DELETE CASCADE,
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    total_days INTEGER NOT NULL,
    daily_rate DECIMAL(10,2) NOT NULL,
    subtotal DECIMAL(10,2) NOT NULL,
    delivery_charge DECIMAL(8,2) DEFAULT 0,
    deposit_amount DECIMAL(10,2) DEFAULT 0,
    total_amount DECIMAL(10,2) NOT NULL,
    status public.booking_status DEFAULT 'pending'::public.booking_status,
    payment_status public.payment_status DEFAULT 'pending'::public.payment_status,
    pickup_location JSONB,
    delivery_location JSONB,
    special_instructions TEXT,
    booking_notes TEXT,
    cancellation_reason TEXT,
    cancelled_at TIMESTAMPTZ,
    confirmed_at TIMESTAMPTZ,
    started_at TIMESTAMPTZ,
    completed_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- Equipment Reviews
CREATE TABLE public.equipment_reviews (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    equipment_id UUID REFERENCES public.equipment(id) ON DELETE CASCADE,
    booking_id UUID REFERENCES public.equipment_bookings(id) ON DELETE CASCADE,
    reviewer_id UUID REFERENCES public.user_profiles(id) ON DELETE CASCADE,
    owner_id UUID REFERENCES public.user_profiles(id) ON DELETE CASCADE,
    rating INTEGER CHECK (rating >= 1 AND rating <= 5),
    title TEXT,
    comment TEXT,
    pros TEXT[],
    cons TEXT[],
    would_recommend BOOLEAN DEFAULT true,
    images TEXT[], -- review images
    is_verified BOOLEAN DEFAULT false,
    helpful_count INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- Community Posts
CREATE TABLE public.community_posts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    author_id UUID REFERENCES public.user_profiles(id) ON DELETE CASCADE,
    type public.post_type DEFAULT 'general'::public.post_type,
    title TEXT,
    content TEXT NOT NULL,
    images TEXT[], -- array of image URLs
    tags TEXT[], -- array of tags
    location JSONB, -- optional location for location-specific posts
    is_featured BOOLEAN DEFAULT false,
    is_pinned BOOLEAN DEFAULT false,
    like_count INTEGER DEFAULT 0,
    comment_count INTEGER DEFAULT 0,
    share_count INTEGER DEFAULT 0,
    view_count INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- Post Comments
CREATE TABLE public.post_comments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    post_id UUID REFERENCES public.community_posts(id) ON DELETE CASCADE,
    author_id UUID REFERENCES public.user_profiles(id) ON DELETE CASCADE,
    parent_comment_id UUID REFERENCES public.post_comments(id) ON DELETE CASCADE,
    content TEXT NOT NULL,
    images TEXT[],
    like_count INTEGER DEFAULT 0,
    is_edited BOOLEAN DEFAULT false,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- Post Likes
CREATE TABLE public.post_likes (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    post_id UUID REFERENCES public.community_posts(id) ON DELETE CASCADE,
    user_id UUID REFERENCES public.user_profiles(id) ON DELETE CASCADE,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(post_id, user_id)
);

-- Comment Likes
CREATE TABLE public.comment_likes (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    comment_id UUID REFERENCES public.post_comments(id) ON DELETE CASCADE,
    user_id UUID REFERENCES public.user_profiles(id) ON DELETE CASCADE,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(comment_id, user_id)
);

-- Educational Content
CREATE TABLE public.educational_content (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    author_id UUID REFERENCES public.user_profiles(id) ON DELETE SET NULL,
    type public.content_type NOT NULL,
    title TEXT NOT NULL,
    slug TEXT UNIQUE,
    excerpt TEXT,
    content TEXT NOT NULL,
    featured_image TEXT,
    images TEXT[],
    video_url TEXT,
    difficulty_level TEXT, -- beginner, intermediate, advanced
    estimated_read_time INTEGER, -- in minutes
    tags TEXT[],
    category TEXT,
    region TEXT, -- specific to region/state
    language TEXT DEFAULT 'en',
    is_published BOOLEAN DEFAULT false,
    is_featured BOOLEAN DEFAULT false,
    view_count INTEGER DEFAULT 0,
    like_count INTEGER DEFAULT 0,
    bookmark_count INTEGER DEFAULT 0,
    published_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- Content Bookmarks
CREATE TABLE public.content_bookmarks (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES public.user_profiles(id) ON DELETE CASCADE,
    content_id UUID REFERENCES public.educational_content(id) ON DELETE CASCADE,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(user_id, content_id)
);

-- Government Schemes
CREATE TABLE public.government_schemes (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    description TEXT NOT NULL,
    benefits TEXT NOT NULL,
    eligibility_criteria TEXT NOT NULL,
    how_to_apply TEXT,
    required_documents TEXT[],
    application_deadline DATE,
    max_amount DECIMAL(12,2),
    scheme_type TEXT, -- subsidy, loan, insurance, etc
    target_beneficiary TEXT, -- small_farmers, all_farmers, women_farmers, etc
    state_specific TEXT[], -- array of applicable states
    department TEXT, -- agriculture, rural_development, etc
    official_website TEXT,
    helpline_number TEXT,
    status TEXT DEFAULT 'active', -- active, inactive, expired
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- Weather Data
CREATE TABLE public.weather_data (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    location_name TEXT NOT NULL,
    coordinates JSONB NOT NULL, -- {latitude, longitude}
    state TEXT,
    district TEXT,
    current_weather JSONB, -- {temperature, humidity, condition, wind_speed}
    forecast JSONB, -- array of forecast objects
    farming_recommendations TEXT[],
    alerts TEXT[],
    data_source TEXT,
    recorded_at TIMESTAMPTZ NOT NULL,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- Notifications
CREATE TABLE public.notifications (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES public.user_profiles(id) ON DELETE CASCADE,
    type public.notification_type NOT NULL,
    title TEXT NOT NULL,
    message TEXT NOT NULL,
    data JSONB, -- additional notification data
    is_read BOOLEAN DEFAULT false,
    action_url TEXT,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- Payment Transactions
CREATE TABLE public.payment_transactions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    booking_id UUID REFERENCES public.equipment_bookings(id) ON DELETE CASCADE,
    payer_id UUID REFERENCES public.user_profiles(id) ON DELETE CASCADE,
    recipient_id UUID REFERENCES public.user_profiles(id) ON DELETE CASCADE,
    amount DECIMAL(10,2) NOT NULL,
    payment_method TEXT, -- upi, card, wallet, bank_transfer
    transaction_id TEXT UNIQUE,
    gateway_response JSONB,
    status public.payment_status DEFAULT 'pending'::public.payment_status,
    payment_gateway TEXT, -- razorpay, payu, stripe, etc
    failure_reason TEXT,
    processed_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- User Follows (for community features)
CREATE TABLE public.user_follows (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    follower_id UUID REFERENCES public.user_profiles(id) ON DELETE CASCADE,
    following_id UUID REFERENCES public.user_profiles(id) ON DELETE CASCADE,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(follower_id, following_id),
    CHECK (follower_id != following_id)
);

-- 3. ESSENTIAL INDEXES
CREATE INDEX idx_user_profiles_email ON public.user_profiles(email);
CREATE INDEX idx_user_profiles_role ON public.user_profiles(role);
CREATE INDEX idx_user_profiles_location ON public.user_profiles USING GIN (location);

CREATE INDEX idx_equipment_owner_id ON public.equipment(owner_id);
CREATE INDEX idx_equipment_category_id ON public.equipment(category_id);
CREATE INDEX idx_equipment_status ON public.equipment(status);
CREATE INDEX idx_equipment_location ON public.equipment USING GIN (location);
CREATE INDEX idx_equipment_price ON public.equipment(price_per_day);
CREATE INDEX idx_equipment_rating ON public.equipment(rating_average);

CREATE INDEX idx_bookings_equipment_id ON public.equipment_bookings(equipment_id);
CREATE INDEX idx_bookings_renter_id ON public.equipment_bookings(renter_id);
CREATE INDEX idx_bookings_owner_id ON public.equipment_bookings(owner_id);
CREATE INDEX idx_bookings_status ON public.equipment_bookings(status);
CREATE INDEX idx_bookings_dates ON public.equipment_bookings(start_date, end_date);

CREATE INDEX idx_posts_author_id ON public.community_posts(author_id);
CREATE INDEX idx_posts_type ON public.community_posts(type);
CREATE INDEX idx_posts_created_at ON public.community_posts(created_at DESC);
CREATE INDEX idx_posts_tags ON public.community_posts USING GIN (tags);

CREATE INDEX idx_comments_post_id ON public.post_comments(post_id);
CREATE INDEX idx_comments_author_id ON public.post_comments(author_id);

CREATE INDEX idx_content_type ON public.educational_content(type);
CREATE INDEX idx_content_published ON public.educational_content(is_published, published_at);
CREATE INDEX idx_content_tags ON public.educational_content USING GIN (tags);

CREATE INDEX idx_notifications_user_id ON public.notifications(user_id);
CREATE INDEX idx_notifications_unread ON public.notifications(user_id, is_read);

-- 4. STORAGE BUCKETS

-- Public bucket for equipment images and content
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
    'equipment-images',
    'equipment-images', 
    true,
    10485760, -- 10MB limit
    ARRAY['image/jpeg', 'image/png', 'image/webp', 'image/jpg']
);

-- Private bucket for user documents and profile images
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
    'user-files',
    'user-files',
    false, 
    5242880, -- 5MB limit
    ARRAY['image/jpeg', 'image/png', 'image/webp', 'image/jpg', 'application/pdf']
);

-- 5. FUNCTIONS (MUST BE BEFORE RLS POLICIES)

-- Function for automatic profile creation
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
SECURITY DEFINER
LANGUAGE plpgsql
AS $$
BEGIN
  INSERT INTO public.user_profiles (id, email, full_name, role)
  VALUES (
    NEW.id, 
    NEW.email, 
    COALESCE(NEW.raw_user_meta_data->>'full_name', split_part(NEW.email, '@', 1)),
    COALESCE(NEW.raw_user_meta_data->>'role', 'farmer')::public.user_role
  );  
  RETURN NEW;
END;
$$;

-- Function to update post comment count
CREATE OR REPLACE FUNCTION public.update_post_comment_count()
RETURNS TRIGGER
SECURITY DEFINER
LANGUAGE plpgsql
AS $$
BEGIN
    IF TG_OP = 'INSERT' THEN
        UPDATE public.community_posts 
        SET comment_count = comment_count + 1 
        WHERE id = NEW.post_id;
        RETURN NEW;
    ELSIF TG_OP = 'DELETE' THEN
        UPDATE public.community_posts 
        SET comment_count = GREATEST(comment_count - 1, 0) 
        WHERE id = OLD.post_id;
        RETURN OLD;
    END IF;
    RETURN NULL;
END;
$$;

-- Function to update post like count
CREATE OR REPLACE FUNCTION public.update_post_like_count()
RETURNS TRIGGER
SECURITY DEFINER
LANGUAGE plpgsql
AS $$
BEGIN
    IF TG_OP = 'INSERT' THEN
        UPDATE public.community_posts 
        SET like_count = like_count + 1 
        WHERE id = NEW.post_id;
        RETURN NEW;
    ELSIF TG_OP = 'DELETE' THEN
        UPDATE public.community_posts 
        SET like_count = GREATEST(like_count - 1, 0) 
        WHERE id = OLD.post_id;
        RETURN OLD;
    END IF;
    RETURN NULL;
END;
$$;

-- Function to update equipment rating
CREATE OR REPLACE FUNCTION public.update_equipment_rating()
RETURNS TRIGGER
SECURITY DEFINER
LANGUAGE plpgsql
AS $$
BEGIN
    IF TG_OP = 'INSERT' THEN
        UPDATE public.equipment 
        SET 
            rating_average = (
                SELECT ROUND(AVG(rating)::numeric, 2)
                FROM public.equipment_reviews 
                WHERE equipment_id = NEW.equipment_id
            ),
            rating_count = rating_count + 1
        WHERE id = NEW.equipment_id;
        RETURN NEW;
    ELSIF TG_OP = 'UPDATE' THEN
        UPDATE public.equipment 
        SET rating_average = (
            SELECT ROUND(AVG(rating)::numeric, 2)
            FROM public.equipment_reviews 
            WHERE equipment_id = NEW.equipment_id
        )
        WHERE id = NEW.equipment_id;
        RETURN NEW;
    ELSIF TG_OP = 'DELETE' THEN
        UPDATE public.equipment 
        SET 
            rating_average = COALESCE((
                SELECT ROUND(AVG(rating)::numeric, 2)
                FROM public.equipment_reviews 
                WHERE equipment_id = OLD.equipment_id
            ), 0.00),
            rating_count = GREATEST(rating_count - 1, 0)
        WHERE id = OLD.equipment_id;
        RETURN OLD;
    END IF;
    RETURN NULL;
END;
$$;

-- 6. ENABLE RLS
ALTER TABLE public.user_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.equipment_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.equipment ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.equipment_bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.equipment_reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.community_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.post_comments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.post_likes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.comment_likes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.educational_content ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.content_bookmarks ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.government_schemes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.weather_data ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.payment_transactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_follows ENABLE ROW LEVEL SECURITY;

-- 7. RLS POLICIES

-- Pattern 1: Core user table (user_profiles) - Simple only, no functions
CREATE POLICY "users_manage_own_user_profiles"
ON public.user_profiles
FOR ALL
TO authenticated
USING (id = auth.uid())
WITH CHECK (id = auth.uid());

-- Pattern 4: Public read, private write for equipment categories
CREATE POLICY "public_can_read_equipment_categories"
ON public.equipment_categories
FOR SELECT
TO public
USING (true);

CREATE POLICY "admins_manage_equipment_categories"
ON public.equipment_categories
FOR ALL
TO authenticated
USING (
    EXISTS (
        SELECT 1 FROM auth.users au
        WHERE au.id = auth.uid() 
        AND (au.raw_user_meta_data->>'role' = 'admin')
    )
)
WITH CHECK (
    EXISTS (
        SELECT 1 FROM auth.users au
        WHERE au.id = auth.uid() 
        AND (au.raw_user_meta_data->>'role' = 'admin')
    )
);

-- Pattern 2: Simple user ownership for equipment
CREATE POLICY "users_manage_own_equipment"
ON public.equipment
FOR ALL
TO authenticated
USING (owner_id = auth.uid())
WITH CHECK (owner_id = auth.uid());

-- Pattern 4: Public can read active equipment
CREATE POLICY "public_can_read_equipment"
ON public.equipment
FOR SELECT
TO public
USING (status = 'available' OR status = 'booked');

-- Pattern 2: Booking policies for renters and owners
CREATE POLICY "renters_view_own_bookings"
ON public.equipment_bookings
FOR SELECT
TO authenticated
USING (renter_id = auth.uid() OR owner_id = auth.uid());

CREATE POLICY "renters_create_bookings"
ON public.equipment_bookings
FOR INSERT
TO authenticated
WITH CHECK (renter_id = auth.uid());

CREATE POLICY "owners_update_bookings"
ON public.equipment_bookings
FOR UPDATE
TO authenticated
USING (owner_id = auth.uid())
WITH CHECK (owner_id = auth.uid());

-- Pattern 2: Reviews for verified bookings
CREATE POLICY "users_manage_own_reviews"
ON public.equipment_reviews
FOR ALL
TO authenticated
USING (reviewer_id = auth.uid())
WITH CHECK (reviewer_id = auth.uid());

CREATE POLICY "public_can_read_reviews"
ON public.equipment_reviews
FOR SELECT
TO public
USING (true);

-- Pattern 2: Community posts
CREATE POLICY "users_manage_own_posts"
ON public.community_posts
FOR ALL
TO authenticated
USING (author_id = auth.uid())
WITH CHECK (author_id = auth.uid());

CREATE POLICY "public_can_read_posts"
ON public.community_posts
FOR SELECT
TO public
USING (true);

-- Pattern 2: Post comments
CREATE POLICY "users_manage_own_comments"
ON public.post_comments
FOR ALL
TO authenticated
USING (author_id = auth.uid())
WITH CHECK (author_id = auth.uid());

CREATE POLICY "public_can_read_comments"
ON public.post_comments
FOR SELECT
TO public
USING (true);

-- Pattern 2: Post and comment likes
CREATE POLICY "users_manage_own_post_likes"
ON public.post_likes
FOR ALL
TO authenticated
USING (user_id = auth.uid())
WITH CHECK (user_id = auth.uid());

CREATE POLICY "users_manage_own_comment_likes"
ON public.comment_likes
FOR ALL
TO authenticated
USING (user_id = auth.uid())
WITH CHECK (user_id = auth.uid());

-- Pattern 4: Educational content - public read, admin write
CREATE POLICY "public_can_read_published_content"
ON public.educational_content
FOR SELECT
TO public
USING (is_published = true);

CREATE POLICY "admins_manage_educational_content"
ON public.educational_content
FOR ALL
TO authenticated
USING (
    EXISTS (
        SELECT 1 FROM auth.users au
        WHERE au.id = auth.uid() 
        AND (au.raw_user_meta_data->>'role' IN ('admin', 'moderator'))
    )
)
WITH CHECK (
    EXISTS (
        SELECT 1 FROM auth.users au
        WHERE au.id = auth.uid() 
        AND (au.raw_user_meta_data->>'role' IN ('admin', 'moderator'))
    )
);

-- Pattern 2: Content bookmarks
CREATE POLICY "users_manage_own_bookmarks"
ON public.content_bookmarks
FOR ALL
TO authenticated
USING (user_id = auth.uid())
WITH CHECK (user_id = auth.uid());

-- Pattern 4: Government schemes - public read, admin write
CREATE POLICY "public_can_read_government_schemes"
ON public.government_schemes
FOR SELECT
TO public
USING (status = 'active');

CREATE POLICY "admins_manage_government_schemes"
ON public.government_schemes
FOR ALL
TO authenticated
USING (
    EXISTS (
        SELECT 1 FROM auth.users au
        WHERE au.id = auth.uid() 
        AND (au.raw_user_meta_data->>'role' = 'admin')
    )
)
WITH CHECK (
    EXISTS (
        SELECT 1 FROM auth.users au
        WHERE au.id = auth.uid() 
        AND (au.raw_user_meta_data->>'role' = 'admin')
    )
);

-- Pattern 4: Weather data - public read, admin write
CREATE POLICY "public_can_read_weather_data"
ON public.weather_data
FOR SELECT
TO public
USING (true);

CREATE POLICY "admins_manage_weather_data"
ON public.weather_data
FOR ALL
TO authenticated
USING (
    EXISTS (
        SELECT 1 FROM auth.users au
        WHERE au.id = auth.uid() 
        AND (au.raw_user_meta_data->>'role' = 'admin')
    )
)
WITH CHECK (
    EXISTS (
        SELECT 1 FROM auth.users au
        WHERE au.id = auth.uid() 
        AND (au.raw_user_meta_data->>'role' = 'admin')
    )
);

-- Pattern 2: User notifications
CREATE POLICY "users_manage_own_notifications"
ON public.notifications
FOR ALL
TO authenticated
USING (user_id = auth.uid())
WITH CHECK (user_id = auth.uid());

-- Pattern 2: Payment transactions - users can view their own transactions
CREATE POLICY "users_view_own_payments"
ON public.payment_transactions
FOR SELECT
TO authenticated
USING (payer_id = auth.uid() OR recipient_id = auth.uid());

CREATE POLICY "users_create_payments"
ON public.payment_transactions
FOR INSERT
TO authenticated
WITH CHECK (payer_id = auth.uid());

-- Pattern 2: User follows
CREATE POLICY "users_manage_own_follows"
ON public.user_follows
FOR ALL
TO authenticated
USING (follower_id = auth.uid())
WITH CHECK (follower_id = auth.uid());

CREATE POLICY "public_can_read_follows"
ON public.user_follows
FOR SELECT
TO public
USING (true);

-- Storage RLS Policies

-- Public equipment images - anyone can view, authenticated users can upload
CREATE POLICY "public_can_view_equipment_images"
ON storage.objects
FOR SELECT
TO public
USING (bucket_id = 'equipment-images');

CREATE POLICY "authenticated_users_upload_equipment_images"
ON storage.objects
FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'equipment-images');

CREATE POLICY "owners_manage_equipment_images"
ON storage.objects
FOR ALL
TO authenticated
USING (bucket_id = 'equipment-images' AND owner = auth.uid())
WITH CHECK (bucket_id = 'equipment-images' AND owner = auth.uid());

-- Private user files - only uploader can access
CREATE POLICY "users_view_own_files"
ON storage.objects
FOR SELECT
TO authenticated
USING (bucket_id = 'user-files' AND owner = auth.uid());

CREATE POLICY "users_upload_own_files"
ON storage.objects
FOR INSERT
TO authenticated
WITH CHECK (
    bucket_id = 'user-files' 
    AND owner = auth.uid()
    AND (storage.foldername(name))[1] = auth.uid()::text
);

CREATE POLICY "users_update_own_files"
ON storage.objects
FOR UPDATE
TO authenticated
USING (bucket_id = 'user-files' AND owner = auth.uid())
WITH CHECK (bucket_id = 'user-files' AND owner = auth.uid());

CREATE POLICY "users_delete_own_files"
ON storage.objects
FOR DELETE
TO authenticated
USING (bucket_id = 'user-files' AND owner = auth.uid());

-- 8. TRIGGERS

-- Trigger for new user creation
CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Trigger for updating post comment count
CREATE TRIGGER update_post_comment_count_trigger
    AFTER INSERT OR DELETE ON public.post_comments
    FOR EACH ROW EXECUTE FUNCTION public.update_post_comment_count();

-- Trigger for updating post like count  
CREATE TRIGGER update_post_like_count_trigger
    AFTER INSERT OR DELETE ON public.post_likes
    FOR EACH ROW EXECUTE FUNCTION public.update_post_like_count();

-- Trigger for updating equipment rating
CREATE TRIGGER update_equipment_rating_trigger
    AFTER INSERT OR UPDATE OR DELETE ON public.equipment_reviews
    FOR EACH ROW EXECUTE FUNCTION public.update_equipment_rating();

-- 9. MOCK DATA
DO $$
DECLARE
    admin_uuid UUID := gen_random_uuid();
    farmer1_uuid UUID := gen_random_uuid();
    farmer2_uuid UUID := gen_random_uuid();
    owner1_uuid UUID := gen_random_uuid();
    
    category1_id UUID := gen_random_uuid();
    category2_id UUID := gen_random_uuid();
    category3_id UUID := gen_random_uuid();
    category4_id UUID := gen_random_uuid();
    
    equipment1_id UUID := gen_random_uuid();
    equipment2_id UUID := gen_random_uuid();
    equipment3_id UUID := gen_random_uuid();
    
    post1_id UUID := gen_random_uuid();
    post2_id UUID := gen_random_uuid();
    
    content1_id UUID := gen_random_uuid();
    content2_id UUID := gen_random_uuid();
    
    scheme1_id UUID := gen_random_uuid();
    scheme2_id UUID := gen_random_uuid();
BEGIN
    -- Create auth users with required fields
    INSERT INTO auth.users (
        id, instance_id, aud, role, email, encrypted_password, email_confirmed_at,
        created_at, updated_at, raw_user_meta_data, raw_app_meta_data,
        is_sso_user, is_anonymous, confirmation_token, confirmation_sent_at,
        recovery_token, recovery_sent_at, email_change_token_new, email_change,
        email_change_sent_at, email_change_token_current, email_change_confirm_status,
        reauthentication_token, reauthentication_sent_at, phone, phone_change,
        phone_change_token, phone_change_sent_at
    ) VALUES
        (admin_uuid, '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated',
         'admin@farmsetu.com', crypt('admin123', gen_salt('bf', 10)), now(), now(), now(),
         '{"full_name": "FarmSetu Admin", "role": "admin"}'::jsonb, '{"provider": "email", "providers": ["email"]}'::jsonb,
         false, false, '', null, '', null, '', '', null, '', 0, '', null, null, '', '', null),
        (farmer1_uuid, '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated',
         'priya@farmer.com', crypt('farmer123', gen_salt('bf', 10)), now(), now(), now(),
         '{"full_name": "Priya Sharma", "role": "farmer"}'::jsonb, '{"provider": "email", "providers": ["email"]}'::jsonb,
         false, false, '', null, '', null, '', '', null, '', 0, '', null, null, '', '', null),
        (farmer2_uuid, '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated',
         'rajesh@farmer.com', crypt('farmer123', gen_salt('bf', 10)), now(), now(), now(),
         '{"full_name": "Rajesh Kumar", "role": "farmer"}'::jsonb, '{"provider": "email", "providers": ["email"]}'::jsonb,
         false, false, '', null, '', null, '', '', null, '', 0, '', null, null, '', '', null),
        (owner1_uuid, '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated',
         'suresh@owner.com', crypt('owner123', gen_salt('bf', 10)), now(), now(), now(),
         '{"full_name": "Suresh Patel", "role": "owner"}'::jsonb, '{"provider": "email", "providers": ["email"]}'::jsonb,
         false, false, '', null, '', null, '', '', null, '', 0, '', null, null, '', '', null);

    -- Insert equipment categories
    INSERT INTO public.equipment_categories (id, name, description, icon_name) VALUES
        (category1_id, 'Tractors', 'Agricultural tractors for farming operations', 'Tractor'),
        (category2_id, 'Harvesters', 'Combine harvesters and harvesting equipment', 'Wheat'),
        (category3_id, 'Tillers & Cultivators', 'Soil preparation and cultivation equipment', 'Shovel'),
        (category4_id, 'Sprayers', 'Pesticide and fertilizer application equipment', 'Droplets');

    -- Insert equipment listings
    INSERT INTO public.equipment (
        id, owner_id, category_id, name, description, brand, model, year_manufactured, 
        condition, price_per_day, deposit_amount, location, specifications, features, images
    ) VALUES
        (equipment1_id, owner1_uuid, category1_id, 'John Deere 5050D Tractor',
         'Powerful 50HP tractor perfect for medium-scale farming operations. Well-maintained and regularly serviced.',
         'John Deere', '5050D', 2020, 'excellent', 1200.00, 5000.00,
         '{"address": "Kolar Road", "city": "Bangalore", "state": "Karnataka", "coordinates": [12.9716, 77.5946]}'::jsonb,
         '{"power": "50 HP", "fuel_type": "Diesel", "transmission": "Manual", "weight": "2200 kg"}'::jsonb,
         ARRAY['GPS Navigation', 'Air Conditioning', 'Power Steering', 'Hydraulic Lift'],
         ARRAY['https://images.unsplash.com/photo-1734224384775-16eaf841c58f']),
         
        (equipment2_id, owner1_uuid, category3_id, 'Mahindra Rotary Tiller',
         'Heavy-duty rotary tiller for efficient soil preparation. Suitable for various soil types.',
         'Mahindra', 'RT-180', 2019, 'good', 800.00, 2000.00,
         '{"address": "Mysore Road", "city": "Bangalore", "state": "Karnataka", "coordinates": [12.9716, 77.5946]}'::jsonb,
         '{"working_width": "180 cm", "tilling_depth": "20 cm", "weight": "450 kg"}'::jsonb,
         ARRAY['Adjustable Depth', 'Heavy Duty Blades', 'Compact Design'],
         ARRAY['https://images.unsplash.com/photo-1621470549142-28627b7eed34']),
         
        (equipment3_id, farmer1_uuid, category2_id, 'Swaraj Combine Harvester',
         'Advanced combine harvester with auto-steering and GPS guidance. Perfect for large-scale harvesting.',
         'Swaraj', 'CS-9100', 2021, 'excellent', 2500.00, 10000.00,
         '{"address": "Hassan Highway", "city": "Hassan", "state": "Karnataka", "coordinates": [13.0067, 76.0994]}'::jsonb,
         '{"cutting_width": "3.5 m", "grain_tank": "4500 L", "engine": "100 HP"}'::jsonb,
         ARRAY['Auto Steering', 'Grain Tank', 'Chopper', 'Threshing Drum'],
         ARRAY['https://images.unsplash.com/photo-1726490144135-516f99c4f0ff']);

    -- Insert community posts
    INSERT INTO public.community_posts (id, author_id, type, title, content, images, tags) VALUES
        (post1_id, farmer1_uuid, 'success_story', 'Amazing Harvest with New Equipment',
         'Just completed my winter wheat harvest using the new combine harvester I rented through FarmSetu! The yield increased by 25% compared to last year. The AI-powered route optimization saved me 3 hours of work time. Highly recommend the John Deere S780 for medium-sized farms.',
         ARRAY['https://images.unsplash.com/photo-1705917015830-0a1afa6b6f52'],
         ARRAY['WinterWheat', 'Harvest2024', 'JohnDeere', 'Success']),
         
        (post2_id, farmer2_uuid, 'question', 'Organic Pest Control Methods',
         'Has anyone tried organic pest control methods for cotton crops? I am looking for alternatives to chemical pesticides. I have heard about neem oil and beneficial insects, but would love to hear real experiences from fellow farmers.',
         ARRAY[]::TEXT[],
         ARRAY['OrganicFarming', 'Cotton', 'PestControl', 'Question']);

    -- Insert post comments
    INSERT INTO public.post_comments (post_id, author_id, content) VALUES
        (post1_id, farmer2_uuid, 'Congratulations Priya! Which model did you use? I am planning to rent one next month.'),
        (post2_id, farmer1_uuid, 'I have been using neem oil for 3 seasons now. Works great for aphids and whiteflies!');

    -- Insert educational content
    INSERT INTO public.educational_content (
        id, author_id, type, title, slug, excerpt, content, featured_image, 
        tags, category, is_published, published_at
    ) VALUES
        (content1_id, admin_uuid, 'guide', 'Complete Guide to Soil pH Management',
         'soil-ph-management-guide',
         'Learn how to test, adjust, and maintain optimal soil pH levels for different crops to maximize your harvest.',
         'Soil pH is one of the most critical factors affecting crop productivity. Understanding and managing soil pH can increase your crop yield by 20-30% and improve nutrient uptake efficiency. This comprehensive guide covers testing methods, adjustment techniques, and crop-specific requirements.',
         'https://images.unsplash.com/photo-1416879595882-3373a0480b5b',
         ARRAY['SoilHealth', 'CropYield', 'Testing', 'Nutrients'],
         'Soil Management', true, now()),
         
        (content2_id, admin_uuid, 'tutorial', 'Smart Irrigation Techniques',
         'smart-irrigation-tutorial',
         'Advanced drip irrigation and sensor-based watering systems to reduce water usage by up to 40%.',
         'Smart irrigation combines technology with traditional farming wisdom to optimize water usage. This tutorial covers sensor installation, automated scheduling, and maintenance of modern irrigation systems.',
         'https://images.unsplash.com/photo-1546096940-8f20ae986be2',
         ARRAY['IrrigationTech', 'WaterConservation', 'SmartFarming', 'Tutorial'],
         'Water Management', true, now());

    -- Insert government schemes
    INSERT INTO public.government_schemes (
        id, name, description, benefits, eligibility_criteria, max_amount,
        scheme_type, target_beneficiary, state_specific, department
    ) VALUES
        (scheme1_id, 'PM-KISAN Samman Nidhi Yojana',
         'Direct income support scheme for small and marginal farmer families',
         'Direct income support of ₹6,000 per year to small and marginal farmer families across the country',
         'Small and marginal farmer families having combined land holding/ownership of up to 2 hectares',
         6000.00, 'Direct Benefit Transfer', 'Small and Marginal Farmers',
         ARRAY['All States'], 'Ministry of Agriculture'),
         
        (scheme2_id, 'Pradhan Mantri Fasal Bima Yojana',
         'Crop insurance scheme providing financial support to farmers',
         'Provides financial support to farmers suffering crop loss or damage arising out of unforeseen events',
         'All farmers growing notified crops in notified areas during the season',
         200000.00, 'Insurance', 'All Farmers',
         ARRAY['All States'], 'Ministry of Agriculture');

    -- Insert weather data
    INSERT INTO public.weather_data (
        location_name, coordinates, state, district, current_weather, 
        forecast, farming_recommendations, recorded_at
    ) VALUES
        ('Bangalore', '{"latitude": 12.9716, "longitude": 77.5946}'::jsonb,
         'Karnataka', 'Bangalore Urban',
         '{"temperature": 28, "humidity": 65, "condition": "Partly Cloudy", "wind_speed": 15}'::jsonb,
         '[
           {"day": "Today", "condition": "Partly Cloudy", "high": 30, "low": 22},
           {"day": "Tomorrow", "condition": "Rainy", "high": 26, "low": 20},
           {"day": "Wednesday", "condition": "Sunny", "high": 32, "low": 24}
         ]'::jsonb,
         ARRAY['Good day for irrigation - moderate humidity', 'Harvest before tomorrow rain', 'Apply fertilizer after rain stops'],
         now());

EXCEPTION
    WHEN foreign_key_violation THEN
        RAISE NOTICE 'Foreign key error: %', SQLERRM;
    WHEN unique_violation THEN
        RAISE NOTICE 'Unique constraint error: %', SQLERRM;
    WHEN OTHERS THEN
        RAISE NOTICE 'Unexpected error: %', SQLERRM;
END $$;

-- 10. CLEANUP FUNCTION (FOR TESTING)
CREATE OR REPLACE FUNCTION public.cleanup_farmsetu_test_data()
RETURNS VOID
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
    auth_user_ids_to_delete UUID[];
BEGIN
    -- Get auth user IDs first
    SELECT ARRAY_AGG(id) INTO auth_user_ids_to_delete
    FROM auth.users
    WHERE email LIKE '%@farmsetu.com' OR email LIKE '%@farmer.com' OR email LIKE '%@owner.com';

    -- Delete in dependency order (children first)
    DELETE FROM public.payment_transactions WHERE payer_id = ANY(auth_user_ids_to_delete);
    DELETE FROM public.user_follows WHERE follower_id = ANY(auth_user_ids_to_delete);
    DELETE FROM public.notifications WHERE user_id = ANY(auth_user_ids_to_delete);
    DELETE FROM public.content_bookmarks WHERE user_id = ANY(auth_user_ids_to_delete);
    DELETE FROM public.comment_likes WHERE user_id = ANY(auth_user_ids_to_delete);
    DELETE FROM public.post_likes WHERE user_id = ANY(auth_user_ids_to_delete);
    DELETE FROM public.post_comments WHERE author_id = ANY(auth_user_ids_to_delete);
    DELETE FROM public.equipment_reviews WHERE reviewer_id = ANY(auth_user_ids_to_delete);
    DELETE FROM public.equipment_bookings WHERE renter_id = ANY(auth_user_ids_to_delete);
    DELETE FROM public.community_posts WHERE author_id = ANY(auth_user_ids_to_delete);
    DELETE FROM public.equipment WHERE owner_id = ANY(auth_user_ids_to_delete);
    DELETE FROM public.educational_content WHERE author_id = ANY(auth_user_ids_to_delete);
    DELETE FROM public.equipment_categories;
    DELETE FROM public.government_schemes;
    DELETE FROM public.weather_data;
    DELETE FROM public.user_profiles WHERE id = ANY(auth_user_ids_to_delete);

    -- Delete auth.users last (after all references are removed)
    DELETE FROM auth.users WHERE id = ANY(auth_user_ids_to_delete);
EXCEPTION
    WHEN foreign_key_violation THEN
        RAISE NOTICE 'Foreign key constraint prevents deletion: %', SQLERRM;
    WHEN OTHERS THEN
        RAISE NOTICE 'Cleanup failed: %', SQLERRM;
END;
$$;