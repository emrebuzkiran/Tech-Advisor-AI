-- Enable the necessary extensions
create extension if not exists "uuid-ossp";

-- Create profiles table
create table public.profiles (
    id uuid references auth.users on delete cascade not null primary key,
    email text unique not null,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null,
    updated_at timestamp with time zone default timezone('utc'::text, now()) not null,
    constraint profiles_pkey primary key (id)
);

-- Create subscriptions table
create table public.subscriptions (
    id uuid default uuid_generate_v4() primary key,
    user_id uuid references public.profiles(id) on delete cascade not null,
    stripe_customer_id text,
    stripe_subscription_id text,
    plan_id text not null,
    status text not null,
    current_period_start timestamp with time zone,
    current_period_end timestamp with time zone,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null,
    updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Create recommendations table
create table public.recommendations (
    id uuid default uuid_generate_v4() primary key,
    user_id uuid references public.profiles(id) on delete cascade not null,
    project_requirements jsonb not null,
    recommendations jsonb not null,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Create usage_limits table
create table public.usage_limits (
    id uuid default uuid_generate_v4() primary key,
    user_id uuid references public.profiles(id) on delete cascade not null,
    monthly_recommendations_count integer default 0,
    last_reset_date timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Create RLS policies
alter table public.profiles enable row level security;
alter table public.subscriptions enable row level security;
alter table public.recommendations enable row level security;
alter table public.usage_limits enable row level security;

-- Profiles policies
create policy "Users can view their own profile"
    on public.profiles for select
    using (auth.uid() = id);

create policy "Users can update their own profile"
    on public.profiles for update
    using (auth.uid() = id);

-- Subscriptions policies
create policy "Users can view their own subscriptions"
    on public.subscriptions for select
    using (auth.uid() = user_id);

-- Recommendations policies
create policy "Users can view their own recommendations"
    on public.recommendations for select
    using (auth.uid() = user_id);

create policy "Users can create their own recommendations"
    on public.recommendations for insert
    with check (auth.uid() = user_id);

-- Usage limits policies
create policy "Users can view their own usage limits"
    on public.usage_limits for select
    using (auth.uid() = user_id);

create policy "Users can update their own usage limits"
    on public.usage_limits for update
    using (auth.uid() = user_id);

-- Functions
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
    insert into public.profiles (id, email)
    values (new.id, new.email);

    insert into public.usage_limits (user_id)
    values (new.id);

    return new;
end;
$$;

-- Triggers
create trigger on_auth_user_created
    after insert on auth.users
    for each row execute procedure public.handle_new_user();