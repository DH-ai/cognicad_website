create type public.app_role as enum ('user', 'admin');
create type public.blog_post_status as enum ('draft', 'published', 'archived');

create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  display_name text check (char_length(display_name) <= 100),
  role public.app_role not null default 'user',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.blog_posts (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique check (slug ~ '^[a-z0-9]+(?:-[a-z0-9]+)*$'),
  title text not null check (char_length(title) between 3 and 140),
  excerpt text not null check (char_length(excerpt) between 10 and 320),
  content_markdown text not null,
  cover_image_path text,
  cover_image_alt text check (char_length(cover_image_alt) <= 180),
  seo_title text check (char_length(seo_title) <= 70),
  seo_description text check (char_length(seo_description) <= 180),
  status public.blog_post_status not null default 'draft',
  author_id uuid not null references public.profiles(id) on delete restrict,
  published_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint published_posts_have_date check (status <> 'published' or published_at is not null)
);

create index blog_posts_public_index
  on public.blog_posts (published_at desc)
  where status = 'published';

create table public.beta_submissions (
  id uuid primary key default gen_random_uuid(), name text not null, email text not null,
  role text, organization text, operating_system text, feature_requests text,
  what_you_build text, frustration text, email_sent_at timestamptz,
  sheet_synced_at timestamptz, delivery_error text,
  expires_at timestamptz not null default (now() + interval '24 months'),
  created_at timestamptz not null default now()
);

create table public.contact_submissions (
  id uuid primary key default gen_random_uuid(), name text not null, email text not null,
  inquiry_type text, message text not null, email_sent_at timestamptz,
  sheet_synced_at timestamptz, delivery_error text,
  expires_at timestamptz not null default (now() + interval '24 months'),
  created_at timestamptz not null default now()
);

create table public.job_applications (
  id uuid primary key default gen_random_uuid(), name text not null, email text not null,
  role text not null, portfolio text, why_juscad text, favorite_problem text,
  email_sent_at timestamptz, sheet_synced_at timestamptz, delivery_error text,
  expires_at timestamptz not null default (now() + interval '12 months'),
  created_at timestamptz not null default now()
);

create table public.form_rate_limits (
  id bigint generated always as identity primary key,
  key_hash text not null,
  form_type text not null,
  created_at timestamptz not null default now()
);

create index form_rate_limits_lookup
  on public.form_rate_limits (key_hash, form_type, created_at desc);

alter table public.profiles enable row level security;
alter table public.blog_posts enable row level security;
alter table public.beta_submissions enable row level security;
alter table public.contact_submissions enable row level security;
alter table public.job_applications enable row level security;
alter table public.form_rate_limits enable row level security;

create or replace function public.is_admin()
returns boolean language sql stable security definer set search_path = '' as $$
  select exists (
    select 1 from public.profiles
    where id = (select auth.uid()) and role = 'admin'
  );
$$;

revoke all on function public.is_admin() from public;
grant execute on function public.is_admin() to authenticated;

create policy "profiles_read_own" on public.profiles for select to authenticated
  using (id = (select auth.uid()) or (select public.is_admin()));
create policy "profiles_update_own" on public.profiles for update to authenticated
  using (id = (select auth.uid())) with check (id = (select auth.uid()));
create policy "published_posts_are_public" on public.blog_posts for select
  using (status = 'published');
create policy "admins_read_all_posts" on public.blog_posts for select to authenticated
  using ((select public.is_admin()));
create policy "admins_insert_posts" on public.blog_posts for insert to authenticated
  with check ((select public.is_admin()) and author_id = (select auth.uid()));
create policy "admins_update_posts" on public.blog_posts for update to authenticated
  using ((select public.is_admin())) with check ((select public.is_admin()));
create policy "admins_delete_posts" on public.blog_posts for delete to authenticated
  using ((select public.is_admin()));

create or replace function public.handle_new_user()
returns trigger language plpgsql security definer set search_path = '' as $$
begin
  insert into public.profiles (id, display_name, role)
  values (new.id, coalesce(new.raw_user_meta_data ->> 'full_name', split_part(new.email, '@', 1)), 'user');
  return new;
end;
$$;

create trigger on_auth_user_created after insert on auth.users
  for each row execute procedure public.handle_new_user();

insert into public.profiles (id, display_name, role)
select id, coalesce(raw_user_meta_data ->> 'full_name', split_part(email, '@', 1)), 'user'
from auth.users
on conflict (id) do nothing;

create or replace function public.set_updated_at()
returns trigger language plpgsql set search_path = '' as $$
begin new.updated_at = now(); return new; end;
$$;

create trigger profiles_set_updated_at before update on public.profiles
  for each row execute procedure public.set_updated_at();
create trigger blog_posts_set_updated_at before update on public.blog_posts
  for each row execute procedure public.set_updated_at();

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('blog-media', 'blog-media', true, 5242880, array['image/jpeg', 'image/png', 'image/webp'])
on conflict (id) do update set public = excluded.public,
  file_size_limit = excluded.file_size_limit,
  allowed_mime_types = excluded.allowed_mime_types;

create policy "admins_upload_blog_media" on storage.objects for insert to authenticated
  with check (bucket_id = 'blog-media' and (select public.is_admin()));
create policy "admins_update_blog_media" on storage.objects for update to authenticated
  using (bucket_id = 'blog-media' and (select public.is_admin()))
  with check (bucket_id = 'blog-media' and (select public.is_admin()));
create policy "admins_delete_blog_media" on storage.objects for delete to authenticated
  using (bucket_id = 'blog-media' and (select public.is_admin()));

comment on table public.form_rate_limits is 'Stores salted request hashes only. Delete entries older than 24 hours.';
comment on column public.profiles.role is 'Never writable from browser-facing profile update operations.';

revoke all on public.profiles from anon, authenticated;
grant select on public.profiles to authenticated;
grant update (display_name) on public.profiles to authenticated;
revoke all on public.blog_posts from anon, authenticated;
grant select on public.blog_posts to anon, authenticated;
grant insert, update, delete on public.blog_posts to authenticated;
revoke all on public.beta_submissions from anon, authenticated;
revoke all on public.contact_submissions from anon, authenticated;
revoke all on public.job_applications from anon, authenticated;
revoke all on public.form_rate_limits from anon, authenticated;
