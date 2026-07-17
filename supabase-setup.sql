-- JE SOCCER - Supabase Database Setup
-- Run this in your Supabase SQL Editor

-- Profiles table (extends auth.users)
create table if not exists public.profiles (
  id uuid references auth.users on delete cascade primary key,
  username text unique not null,
  display_name text not null,
  avatar_url text,
  position text,
  location text,
  bio text,
  favorite_team text,
  twitter_url text default 'https://x.com/JEsoccerr',
  tiktok_url text default 'https://www.tiktok.com/@jesoccerr',
  telegram_url text default 'https://t.me/+zR6WL6MCW8tiOGM8',
  matches_played int default 0,
  goals_scored int default 0,
  assists int default 0,
  rating float default 5.0,
  created_at timestamptz default timezone('utc'::text, now()) not null
);

-- Friends table
create table if not exists public.friends (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references public.profiles(id) on delete cascade not null,
  friend_id uuid references public.profiles(id) on delete cascade not null,
  status text check (status in ('pending', 'accepted', 'blocked')) default 'pending',
  created_at timestamptz default timezone('utc'::text, now()) not null,
  unique(user_id, friend_id)
);

-- Private messages table
create table if not exists public.private_messages (
  id uuid default gen_random_uuid() primary key,
  sender_id uuid references public.profiles(id) on delete cascade not null,
  receiver_id uuid references public.profiles(id) on delete cascade not null,
  content text not null,
  read boolean default false,
  created_at timestamptz default timezone('utc'::text, now()) not null
);

-- Predictions table
create table if not exists public.predictions (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references public.profiles(id) on delete cascade not null,
  match_id text not null,
  home_score int,
  away_score int,
  points int default 0,
  created_at timestamptz default timezone('utc'::text, now()) not null
);

-- Fantasy teams table
create table if not exists public.fantasy_teams (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references public.profiles(id) on delete cascade not null,
  name text not null,
  players text[] default '{}',
  total_points int default 0,
  gameweek_points int default 0,
  budget float default 100.0,
  created_at timestamptz default timezone('utc'::text, now()) not null
);

-- Enable RLS
alter table profiles enable row level security;
alter table friends enable row level security;
alter table private_messages enable row level security;
alter table predictions enable row level security;
alter table fantasy_teams enable row level security;

-- RLS Policies for profiles
create policy "Public profiles are viewable by everyone" on profiles for select using (true);
create policy "Users can insert their own profile" on profiles for insert with check (auth.uid() = id);
create policy "Users can update own profile" on profiles for update using (auth.uid() = id);

-- RLS Policies for friends
create policy "Users can view their own friends" on friends for select using (auth.uid() = user_id or auth.uid() = friend_id);
create policy "Users can insert friend requests" on friends for insert with check (auth.uid() = user_id);
create policy "Users can update their friend status" on friends for update using (auth.uid() = user_id or auth.uid() = friend_id);
create policy "Users can delete their friends" on friends for delete using (auth.uid() = user_id or auth.uid() = friend_id);

-- RLS Policies for private messages
create policy "Users can view messages they're involved in" on private_messages for select using (auth.uid() = sender_id or auth.uid() = receiver_id);
create policy "Users can send messages" on private_messages for insert with check (auth.uid() = sender_id);
create policy "Users can update read status" on private_messages for update using (auth.uid() = receiver_id);

-- RLS Policies for predictions
create policy "Users can view all predictions" on predictions for select using (true);
create policy "Users can insert their predictions" on predictions for insert with check (auth.uid() = user_id);

-- RLS Policies for fantasy teams
create policy "Users can view all fantasy teams" on fantasy_teams for select using (true);
create policy "Users can manage their team" on fantasy_teams for all using (auth.uid() = user_id);

-- Function to create profile on signup
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, username, display_name)
  values (new.id, split_part(new.email, '@', 1), split_part(new.email, '@', 1));
  return new;
end;
$$ language plpgsql security definer;

-- Trigger for new user signup
drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- Indexes for performance
create index if not exists idx_friends_user_id on friends(user_id);
create index if not exists idx_friends_friend_id on friends(friend_id);
create index if not exists idx_messages_sender on private_messages(sender_id);
create index if not exists idx_messages_receiver on private_messages(receiver_id);
create index if not exists idx_messages_created on private_messages(created_at desc);
create index if not exists idx_predictions_user on predictions(user_id);
create index if not exists idx_fantasy_user on fantasy_teams(user_id);
