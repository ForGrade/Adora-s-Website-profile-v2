-- ============================================================
-- FIX: contact_submissions permission denied (Postgres error 42501)
--
-- RUN THIS in the Supabase SQL Editor:
--   Dashboard → SQL Editor → New query → paste → Run
--
-- Why this is needed:
--   Tables created via the Supabase Table Editor UI do not
--   automatically grant privileges to the service_role or anon
--   roles. The service_role JWT bypasses RLS but still needs
--   the underlying PostgreSQL GRANT on the table.
-- ============================================================

-- 1. Grant full access to service_role (used by the admin client
--    in contact.repository.ts to write submissions)
grant select, insert, update, delete
  on table public.contact_submissions
  to service_role;

-- 2. Grant insert-only to anon (used by browser clients if you
--    ever call the table directly — currently not used but
--    consistent with the RLS policy)
grant insert
  on table public.contact_submissions
  to anon;

-- 3. Grant read to authenticated (future use)
grant select
  on table public.contact_submissions
  to authenticated;

-- 4. Make sure RLS is enabled (idempotent)
alter table public.contact_submissions enable row level security;

-- 5. Drop and re-create the RLS policies cleanly
--    (safe to run multiple times)
drop policy if exists "Service role can manage contact_submissions"
  on public.contact_submissions;

drop policy if exists "Anon can insert contact_submissions"
  on public.contact_submissions;

create policy "Service role can manage contact_submissions"
  on public.contact_submissions
  for all
  to service_role
  using (true)
  with check (true);

create policy "Anon can insert contact_submissions"
  on public.contact_submissions
  for insert
  to anon
  with check (true);

-- ============================================================
-- Verify: run this SELECT to confirm grants were applied.
-- You should see service_role and anon in the results.
-- ============================================================
select grantee, privilege_type
from information_schema.role_table_grants
where table_name = 'contact_submissions'
  and table_schema = 'public'
order by grantee, privilege_type;
