-- ============================================================
-- Adora Portfolio — Supabase PostgreSQL Schema
-- ============================================================
-- Run this in the Supabase SQL Editor to create all tables.
-- Tables use UUID primary keys, Row Level Security (RLS),
-- and automatic timestamps via triggers.
-- ============================================================

-- Enable the pgcrypto extension for gen_random_uuid()
create extension if not exists "pgcrypto";

-- ============================================================
-- Enums
-- ============================================================

create type skill_category as enum (
  'programming',
  'databases',
  'web',
  'tools'
);

create type insight_category as enum (
  'career',
  'technology',
  'learning',
  'industry'
);

-- ============================================================
-- Helper: updated_at trigger function
-- ============================================================

create or replace function set_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

-- ============================================================
-- Table: contact_submissions
-- ============================================================

create table if not exists contact_submissions (
  id          uuid primary key default gen_random_uuid(),
  name        text not null check (char_length(name) between 1 and 100),
  email       text not null check (email ~* '^[^@\s]+@[^@\s]+\.[^@\s]+$'),
  subject     text not null check (char_length(subject) between 1 and 200),
  message     text not null check (char_length(message) >= 20),
  created_at  timestamptz not null default now()
);

-- RLS: only the service-role key can read submissions (admin only)
alter table contact_submissions enable row level security;

create policy "Service role can manage contact_submissions"
  on contact_submissions
  for all
  to service_role
  using (true)
  with check (true);

create policy "Anon can insert contact_submissions"
  on contact_submissions
  for insert
  to anon
  with check (true);

-- ============================================================
-- Table: projects
-- ============================================================

create table if not exists projects (
  id           uuid primary key default gen_random_uuid(),
  title        text not null check (char_length(title) between 1 and 200),
  summary      text not null,
  type         text not null,
  technologies text[] not null default '{}',
  github_url   text,
  showcase_url text,
  featured     boolean not null default false,
  created_at   timestamptz not null default now(),
  updated_at   timestamptz not null default now()
);

create trigger projects_updated_at
  before update on projects
  for each row execute function set_updated_at();

-- RLS: public read, service-role write
alter table projects enable row level security;

create policy "Public can read projects"
  on projects
  for select
  to anon, authenticated
  using (true);

create policy "Service role can manage projects"
  on projects
  for all
  to service_role
  using (true)
  with check (true);

-- ============================================================
-- Table: skills
-- ============================================================

create table if not exists skills (
  id           uuid primary key default gen_random_uuid(),
  category     skill_category not null,
  name         text not null check (char_length(name) between 1 and 100),
  proficiency  smallint check (proficiency between 1 and 100),
  created_at   timestamptz not null default now()
);

-- RLS: public read, service-role write
alter table skills enable row level security;

create policy "Public can read skills"
  on skills
  for select
  to anon, authenticated
  using (true);

create policy "Service role can manage skills"
  on skills
  for all
  to service_role
  using (true)
  with check (true);

-- ============================================================
-- Table: career_insights
-- ============================================================

create table if not exists career_insights (
  id          uuid primary key default gen_random_uuid(),
  title       text not null check (char_length(title) between 1 and 300),
  content     text not null,
  category    insight_category not null,
  tags        text[] not null default '{}',
  published   boolean not null default false,
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);

create trigger career_insights_updated_at
  before update on career_insights
  for each row execute function set_updated_at();

-- RLS: public can only read published rows; service-role manages all
alter table career_insights enable row level security;

create policy "Public can read published insights"
  on career_insights
  for select
  to anon, authenticated
  using (published = true);

create policy "Service role can manage insights"
  on career_insights
  for all
  to service_role
  using (true)
  with check (true);

-- ============================================================
-- Seed data (optional — mirrors existing static data)
-- ============================================================

-- Projects
insert into projects (title, summary, type, technologies, featured) values
(
  'Stack n Stock',
  'A mobile inventory and stock management application developed as a team project. The application helps users manage inventory records, monitor stock levels, track product movement, and improve inventory organization through a user-friendly mobile experience.',
  'Team Project | Mobile Application',
  array['Dart', 'Flutter', 'Firebase'],
  true
);

-- Skills
insert into skills (category, name) values
  ('programming', 'JavaScript'),
  ('programming', 'TypeScript'),
  ('programming', 'Python'),
  ('programming', 'Java'),
  ('programming', 'C++'),
  ('programming', 'C#'),
  ('databases',   'PostgreSQL'),
  ('databases',   'Supabase'),
  ('web',         'HTML'),
  ('web',         'CSS'),
  ('web',         'JavaScript'),
  ('web',         'TypeScript'),
  ('tools',       'XAMPP'),
  ('tools',       'Git'),
  ('tools',       'GitHub'),
  ('tools',       'Cursor');
