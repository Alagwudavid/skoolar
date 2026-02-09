-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- PROFILES
create table public.profiles (
  id uuid references auth.users on delete cascade not null primary key,
  username text unique,
  full_name text,
  avatar_url text,
  is_student boolean default false,
  bio text,
  updated_at timestamp with time zone,
  
  constraint username_length check (char_length(username) >= 3)
);

-- SCHOOLS (Organization)
create table public.schools (
  id uuid default uuid_generate_v4() primary key,
  name text not null,
  slug text unique not null,
  website_url text,
  is_verified boolean default false,
  logo_url text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- ENROLLMENTS
create type enrollment_role as enum ('student', 'admin', 'faculty');
create type enrollment_status as enum ('pending', 'verified', 'rejected');

create table public.enrollments (
  id uuid default uuid_generate_v4() primary key,
  profile_id uuid references public.profiles(id) on delete cascade not null,
  school_id uuid references public.schools(id) on delete cascade not null,
  role enrollment_role not null default 'student',
  status enrollment_status not null default 'pending',
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  
  unique(profile_id, school_id)
);

-- OPPORTUNITIES
create type opportunity_type as enum ('scholarship', 'job', 'placement');

create table public.opportunities (
  id uuid default uuid_generate_v4() primary key,
  creator_id uuid references public.profiles(id) on delete cascade not null,
  school_id uuid references public.schools(id) on delete cascade, -- Optional, if posted by a school
  type opportunity_type not null,
  title text not null,
  content text,
  expires_at timestamp with time zone,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- RLS POLICIES (Basic Setup)
alter table public.profiles enable row level security;
alter table public.schools enable row level security;
alter table public.enrollments enable row level security;
alter table public.opportunities enable row level security;

-- Profiles: Public read, Self modification
create policy "Public profiles are viewable by everyone." on public.profiles for select using (true);
create policy "Users can insert their own profile." on public.profiles for insert with check (auth.uid() = id);
create policy "Users can update own profile." on public.profiles for update using (auth.uid() = id);

-- Schools: Public read, Admin modification (TODO: refine admin check)
create policy "Schools are viewable by everyone." on public.schools for select using (true);
create policy "Authenticated users can create schools." on public.schools for insert with check (auth.role() = 'authenticated'); 

-- Enrollments: Public read? Maybe specific to school admins/own user.
create policy "Enrollments viewable by own user or school admins." on public.enrollments for select using (
  auth.uid() = profile_id 
  -- OR exists (select 1 from enrollments where profile_id = auth.uid() and school_id = enrollments.school_id and role = 'admin')
);

-- Opportunities: Public read
create policy "Opportunities are viewable by everyone." on public.opportunities for select using (true);
