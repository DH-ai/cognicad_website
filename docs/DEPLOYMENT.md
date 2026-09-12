# JusCAD platform deployment

The application builds without service credentials, but authentication, forms, blog administration, retention cleanup, and Turnstile require the following production setup.

## 1. Supabase

1. Create a Supabase project and run `supabase/migrations/20260912000000_platform.sql` in the SQL editor or through the Supabase CLI.
2. In Authentication settings, set the site URL to `https://juscad.com` and add `https://juscad.com/auth/callback` plus the explicit local and Vercel preview callback URLs used by the team.
3. Enable email/password authentication with email confirmation.
4. Enable Google authentication and provide its OAuth client ID and secret. Register `https://juscad.com/auth/callback` in the Google OAuth configuration.
5. After the first administrator has signed up and verified their email, promote only that account:

```sql
update public.profiles
set role = 'admin'
where id = (select id from auth.users where email = 'ADMIN_EMAIL_HERE');
```

Never expose the service-role key or allow role updates from account metadata.

## 2. Vercel environment

Copy the names from `.env.example` into Preview and Production project settings. Public keys may use the `NEXT_PUBLIC_` prefix; every other value must remain server-only.

Required for the complete production flow:

- `NEXT_PUBLIC_SITE_URL=https://juscad.com`
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`
- `NEXT_PUBLIC_TURNSTILE_SITE_KEY`
- `TURNSTILE_SECRET_KEY`
- `RATE_LIMIT_SALT` — generate a long random value
- `CRON_SECRET` — generate a separate long random value
- `RESEND_API_KEY`
- `JUSCAD_NOTIFICATION_EMAIL=enquire@juscad.com`
- `GOOGLE_SHEETS_SPREADSHEET_ID` and `GOOGLE_SHEETS_API_KEY` while dual-writing remains enabled

Enable Web Analytics and Speed Insights in the Vercel project dashboard. `vercel.json` invokes the retention endpoint daily; Vercel sends `CRON_SECRET` as its bearer credential.

## 3. Cloudflare Turnstile and email

Create a Turnstile widget for `juscad.com` and the preview hosts. The forms use managed, interaction-only presentation but always validate tokens on the server in production.

Verify `juscad.com` in Resend and ensure `noreply@juscad.com` can send. Google Sheets is a temporary secondary delivery; Supabase is the source of truth.

## 4. Release checks

```bash
npm run typecheck
npm run lint
npm run build
npm run test:e2e
npm audit --omit=dev
```

Review the Privacy Policy and Terms with qualified Indian counsel before the production release. After deployment, verify an email signup, Google signup, normal-user access, administrator blog publishing, all three forms, the retention cron, Analytics, and Speed Insights.
