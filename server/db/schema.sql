-- =====================================================================
-- minniie - Full PostgreSQL & Supabase Database Schema
-- Run this script in the Supabase SQL Editor to initialize the project
-- =====================================================================

-- 1. Profiles
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE UNIQUE,
  email TEXT,
  avatar_url TEXT,
  active_color_analysis_id UUID,
  color_labels_enabled BOOLEAN DEFAULT true,
  style_preferences JSONB DEFAULT '[]'::jsonb,
  last_active_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- 2. User Roles
CREATE TABLE IF NOT EXISTS public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  role TEXT NOT NULL DEFAULT 'user',
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 3. User Selfies
CREATE TABLE IF NOT EXISTS public.user_selfies (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  image_url TEXT NOT NULL,
  label TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 4. Color Analyses
CREATE TABLE IF NOT EXISTS public.color_analyses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  season TEXT,
  sub_season TEXT,
  undertone TEXT,
  contrast TEXT,
  best_colors JSONB DEFAULT '[]'::jsonb,
  neutral_colors JSONB DEFAULT '[]'::jsonb,
  avoid_colors JSONB DEFAULT '[]'::jsonb,
  palette JSONB DEFAULT '[]'::jsonb,
  wardrobe_matches JSONB DEFAULT '[]'::jsonb,
  season_tryon_url TEXT,
  photo_urls JSONB DEFAULT '[]'::jsonb,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 5. Wardrobe Items
CREATE TABLE IF NOT EXISTS public.wardrobe_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  category TEXT DEFAULT 'other',
  color TEXT,
  style TEXT,
  image_url TEXT NOT NULL,
  source_url TEXT,
  ownership_type TEXT DEFAULT 'owned' CHECK (ownership_type IN ('owned', 'wishlist')),
  description TEXT,
  wear_frequency INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 6. Collages
CREATE TABLE IF NOT EXISTS public.collages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  title TEXT,
  result_image_url TEXT,
  status TEXT DEFAULT 'completed',
  style_preset TEXT DEFAULT 'editorial',
  aspect_ratio TEXT DEFAULT '3:4',
  use_selfie BOOLEAN DEFAULT false,
  selfie_url TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 7. Collage Items
CREATE TABLE IF NOT EXISTS public.collage_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  collage_id UUID NOT NULL REFERENCES public.collages(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  image_url TEXT NOT NULL,
  label TEXT,
  item_type TEXT,
  sort_order INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 8. Outfit Analyses
CREATE TABLE IF NOT EXISTS public.outfit_analyses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  source_image_url TEXT,
  image_url TEXT,
  detected_items JSONB DEFAULT '[]'::jsonb,
  matched_items JSONB DEFAULT '[]'::jsonb,
  missing_items JSONB DEFAULT '[]'::jsonb,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 9. Inspiration Images
CREATE TABLE IF NOT EXISTS public.inspiration_images (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  image_url TEXT NOT NULL,
  title TEXT,
  board_name TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 10. Style Profiles (AI Chat Sessions)
CREATE TABLE IF NOT EXISTS public.style_profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  conversation JSONB DEFAULT '[]'::jsonb,
  style_brief TEXT,
  style_keywords JSONB DEFAULT '[]'::jsonb,
  status TEXT DEFAULT 'in_progress',
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- 11. Subscribers
CREATE TABLE IF NOT EXISTS public.subscribers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE UNIQUE,
  tier TEXT DEFAULT 'free',
  subscribed BOOLEAN DEFAULT false,
  manual_override BOOLEAN DEFAULT false,
  trial_ends_at TIMESTAMPTZ,
  current_period_end TIMESTAMPTZ,
  cancel_at_period_end BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 12. Plan Limits
CREATE TABLE IF NOT EXISTS public.plan_limits (
  tier TEXT PRIMARY KEY,
  wardrobe_items INT NOT NULL,
  inspiration_saves INT NOT NULL,
  analyses_per_month INT NOT NULL,
  collages_per_month INT NOT NULL,
  consultations_per_month INT NOT NULL,
  consultation_messages_per_month INT NOT NULL,
  ai_edits_per_month INT NOT NULL,
  background_removals_per_month INT NOT NULL,
  color_analyses_per_month INT NOT NULL
);

-- 13. User Attribution
CREATE TABLE IF NOT EXISTS public.user_attribution (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  last_source TEXT,
  last_medium TEXT,
  last_campaign TEXT,
  last_referrer TEXT,
  last_landing_path TEXT,
  last_seen_at TIMESTAMPTZ
);

-- 14. Usage Logs
CREATE TABLE IF NOT EXISTS public.ai_usage_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  function_name TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.color_analysis_usage (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.bonus_credits (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  feature TEXT NOT NULL,
  amount INT DEFAULT 0,
  expires_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- =====================================================================
-- Row Level Security (RLS) Policies
-- =====================================================================
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_selfies ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.color_analyses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.wardrobe_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.collages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.collage_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.outfit_analyses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.inspiration_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.style_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.subscribers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.plan_limits ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_attribution ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage own profile" ON public.profiles FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Users can view own roles" ON public.user_roles FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can manage own selfies" ON public.user_selfies FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Users can manage own color analyses" ON public.color_analyses FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Users can manage own wardrobe" ON public.wardrobe_items FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Users can manage own collages" ON public.collages FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Users can manage own collage items" ON public.collage_items FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Users can manage own outfit analyses" ON public.outfit_analyses FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Users can manage own inspiration" ON public.inspiration_images FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Users can manage own style profiles" ON public.style_profiles FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Users can view own subscriber info" ON public.subscribers FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Plan limits are viewable by all" ON public.plan_limits FOR SELECT USING (true);
CREATE POLICY "Users can manage own attribution" ON public.user_attribution FOR ALL USING (auth.uid() = user_id);

-- =====================================================================
-- Auto User Trigger on Sign Up
-- =====================================================================
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.profiles (user_id, email)
  VALUES (new.id, new.email);

  INSERT INTO public.subscribers (user_id, tier, subscribed)
  VALUES (new.id, 'free', false);

  INSERT INTO public.user_roles (user_id, role)
  VALUES (new.id, 'user');

  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();

-- Seed initial plan limits
INSERT INTO public.plan_limits (tier, wardrobe_items, inspiration_saves, analyses_per_month, collages_per_month, consultations_per_month, consultation_messages_per_month, ai_edits_per_month, background_removals_per_month, color_analyses_per_month)
VALUES
  ('free', 20, 10, 5, 3, 2, 20, 2, 5, 1),
  ('studio', 200, -1, 30, 10, 5, 150, 15, 100, 2),
  ('pro', 500, -1, 100, 30, 20, 1000, 50, 300, 8)
ON CONFLICT (tier) DO UPDATE SET
  wardrobe_items = EXCLUDED.wardrobe_items,
  inspiration_saves = EXCLUDED.inspiration_saves,
  analyses_per_month = EXCLUDED.analyses_per_month,
  collages_per_month = EXCLUDED.collages_per_month,
  consultations_per_month = EXCLUDED.consultations_per_month,
  consultation_messages_per_month = EXCLUDED.consultation_messages_per_month,
  ai_edits_per_month = EXCLUDED.ai_edits_per_month,
  background_removals_per_month = EXCLUDED.background_removals_per_month,
  color_analyses_per_month = EXCLUDED.color_analyses_per_month;
