-- COMMUNITIES
create table public.communities (
  id uuid default uuid_generate_v4() primary key,
  name text not null,
  description text,
  creator_id uuid references public.profiles(id) on delete cascade not null,
  is_private boolean default false,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- COMMUNITY MEMBERS
create table public.community_members (
  community_id uuid references public.communities(id) on delete cascade not null,
  profile_id uuid references public.profiles(id) on delete cascade not null,
  role text default 'member' check (role in ('admin', 'member')),
  joined_at timestamp with time zone default timezone('utc'::text, now()) not null,
  primary key (community_id, profile_id)
);

-- MESSAGES
create table public.messages (
  id uuid default uuid_generate_v4() primary key,
  community_id uuid references public.communities(id) on delete cascade not null,
  sender_id uuid references public.profiles(id) on delete cascade not null,
  content text not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- RLS
alter table public.communities enable row level security;
alter table public.community_members enable row level security;
alter table public.messages enable row level security;

-- Policies (Simplified)
create policy "Communities viewable by everyone" on public.communities for select using (true);
create policy "Members viewable by members" on public.community_members for select using (true);
create policy "Messages viewable by members" on public.messages for select using (
  exists (
    select 1 from community_members cm 
    where cm.community_id = messages.community_id 
    and cm.profile_id = auth.uid()
  )
);
create policy "Members can insert messages" on public.messages for insert with check (
  exists (
    select 1 from community_members cm 
    where cm.community_id = messages.community_id 
    and cm.profile_id = auth.uid()
  )
);
