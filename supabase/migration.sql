-- ============================================================
-- Run this in your Supabase Dashboard → SQL Editor
-- ============================================================

-- 1. Add clerk_id + email to profiles (Clerk auth support)
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS clerk_id text UNIQUE;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS email text;

-- 2. Add missing columns to communities
ALTER TABLE public.communities ADD COLUMN IF NOT EXISTS slug text UNIQUE;
ALTER TABLE public.communities ADD COLUMN IF NOT EXISTS type text DEFAULT 'public' CHECK (type IN ('public', 'private'));
ALTER TABLE public.communities ADD COLUMN IF NOT EXISTS category text DEFAULT 'general';
ALTER TABLE public.communities ADD COLUMN IF NOT EXISTS rules text;
ALTER TABLE public.communities ADD COLUMN IF NOT EXISTS avatar_url text;
ALTER TABLE public.communities ADD COLUMN IF NOT EXISTS banner_url text;

-- 3. Update community_members role values to include super_admin / moderator
ALTER TABLE public.community_members DROP CONSTRAINT IF EXISTS community_members_role_check;
ALTER TABLE public.community_members ADD CONSTRAINT community_members_role_check
  CHECK (role IN ('super_admin', 'moderator', 'member'));
-- Migrate old 'admin' → 'super_admin'
UPDATE public.community_members SET role = 'super_admin' WHERE role = 'admin';

-- 4. Create organizations table
CREATE TABLE IF NOT EXISTS public.organizations (
  id          uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
  name        text NOT NULL,
  slug        text UNIQUE NOT NULL,
  type        text NOT NULL CHECK (type IN ('school', 'university', 'company', 'nonprofit', 'other')),
  description text,
  website_url text,
  email       text,
  phone       text,
  location    text,
  is_verified boolean DEFAULT false,
  avatar_url  text,
  banner_url  text,
  creator_id  uuid REFERENCES public.profiles(id) ON DELETE SET NULL,
  created_at  timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 5. Create organization_members table
CREATE TABLE IF NOT EXISTS public.organization_members (
  id         uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
  org_id     uuid REFERENCES public.organizations(id) ON DELETE CASCADE NOT NULL,
  profile_id uuid REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  role       text DEFAULT 'member' CHECK (role IN ('owner', 'admin', 'moderator', 'member')),
  joined_at  timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
  UNIQUE(org_id, profile_id)
);

-- 6. RLS for new tables
ALTER TABLE public.organizations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.organization_members ENABLE ROW LEVEL SECURITY;

-- Public read
CREATE POLICY IF NOT EXISTS "Organizations viewable by everyone"
  ON public.organizations FOR SELECT USING (true);
CREATE POLICY IF NOT EXISTS "Org members viewable by everyone"
  ON public.organization_members FOR SELECT USING (true);

-- Any authenticated user can insert (server actions do auth checks)
CREATE POLICY IF NOT EXISTS "Authenticated users can create organizations"
  ON public.organizations FOR INSERT WITH CHECK (true);
CREATE POLICY IF NOT EXISTS "Authenticated users can manage org members"
  ON public.organization_members FOR ALL USING (true);

-- Community RLS (allow inserts/updates from server actions)
CREATE POLICY IF NOT EXISTS "Authenticated users can create communities"
  ON public.communities FOR INSERT WITH CHECK (true);
CREATE POLICY IF NOT EXISTS "Authenticated users can update communities"
  ON public.communities FOR UPDATE USING (true);
CREATE POLICY IF NOT EXISTS "Authenticated users can manage community members"
  ON public.community_members FOR ALL USING (true);
CREATE POLICY IF NOT EXISTS "Authenticated users can insert messages"
  ON public.messages FOR INSERT WITH CHECK (true);
