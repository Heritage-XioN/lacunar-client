# Lacunar Client

Lacunar Client is a Next.js app for Lacunar's public consultation intake, reviews, and internal consultant dashboard.

The app uses:

- Next.js App Router
- React 19
- Tailwind CSS
- Supabase Auth and Supabase SSR
- Supabase/Postgres row-level security
- Drizzle ORM and Drizzle Kit for schema and migrations
- TanStack Form and Zod for form validation
- SWR for client-side API fetching
- Sentry and Datadog RUM for error monitoring and observability

## App Surface

- `/` - public landing page
- `/consultation-categories` - public consultation category selection
- `/consultation-form/[slug]` - public intake forms
- `/review` - public review submission
- `/sign-in` and `/sign-up` - custom auth pages backed by Supabase Auth
- `/dashboard/clients` - protected client list
- `/dashboard/clients/[slug]` - protected client consultation sessions
- `/dashboard/summary/[id]` - protected summary workspace
- `/dashboard/consultants` - protected consultant management

## Environment

Create `.env` with the required values:

```env
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=
SUPABASE_SECRET_KEY=
DATABASE_URL=

ADMIN_EMAIL_ADDRESS=
ADMIN_PASSWORD=
ADMIN_FULL_NAME=
ADMIN_PHONE_NUMBER=
ADMIN_ROLE=admin

NEXT_PUBLIC_SENTRY_DSN=
SENTRY_AUTH_TOKEN=

NEXT_PUBLIC_DATADOG_APPLICATION_ID=
NEXT_PUBLIC_DATADOG_CLIENT_TOKEN=
NEXT_PUBLIC_DATADOG_SITE=
```

`NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` may be replaced by `NEXT_PUBLIC_SUPABASE_ANON_KEY` if the project still uses anon keys.

`SUPABASE_SECRET_KEY` is the server-only `sb_secret_...` API key from Supabase Settings > API Keys. Older projects may use the legacy `service_role` key as `SUPABASE_SERVICE_ROLE_KEY`, but new projects should prefer `SUPABASE_SECRET_KEY`.

The secret/service-role key is server-only. Do not expose it through `NEXT_PUBLIC_*`.

## Monitoring And Observability

Sentry is configured through `instrumentation.ts`, `instrumentation-client.ts`, `sentry.server.config.ts`, `sentry.edge.config.ts`, and `next.config.ts`. `NEXT_PUBLIC_SENTRY_DSN` enables browser-side reporting, while `SENTRY_AUTH_TOKEN` is used by the Sentry build plugin when uploading source maps.

Datadog RUM is initialized from `instrumentation-client.ts` and uses:

- `NEXT_PUBLIC_DATADOG_APPLICATION_ID`
- `NEXT_PUBLIC_DATADOG_CLIENT_TOKEN`
- `NEXT_PUBLIC_DATADOG_SITE`

Because these values are consumed in the browser, use Datadog client credentials intended for public RUM usage.

## Auth And RLS

Supabase Auth is the identity source. The `consultants` table is an application profile table keyed by the Supabase user UUID.

Role checks use Supabase JWT app metadata:

```sql
auth.jwt() -> 'app_metadata' ->> 'user_role'
```

Expected roles:

- `admin`
- `consultant`

RLS is enabled on:

- `clients`
- `consultants`
- `consultation_sessions`
- `consultation_session_summary`
- `reviews`

The protected dashboard APIs use Supabase SSR clients so RLS policies can evaluate the current authenticated user. Public intake/review flows and admin-only user management use the server-only Supabase service-role client where needed.

## Database Schema

Schema lives in:

```text
lib/db-schema.ts
```

Primary keys and foreign keys use UUIDs. Keep table and column names aligned with the existing database naming conventions, including:

- `full_name`
- `phone_no`
- `created_at`
- `updated_at`
- `onBoarding_details`
- `consultation_session_id`
- `consultant_id`

Drizzle migrations are stored in:

```text
drizzle/
```

The current generated migration is a fresh-schema migration. If applying this change to an existing database that already has serial integer IDs, use a planned data migration/backfill instead of blindly applying the fresh migration to production.

## Development

Install dependencies:

```bash
pnpm install
```

Run the dev server:

```bash
pnpm run dev
```

Open:

```text
http://localhost:3000
```

## Database Commands

Generate migrations from `lib/db-schema.ts`:

```bash
pnpm run db:generate
```

Apply generated migrations:

```bash
pnpm run db:migrate
```

Push schema directly during local iteration:

```bash
pnpm run db:push
```

Seed or update the default admin user:

```bash
pnpm run db:seed
```

The seed script runs with `tsx` and imports the script-safe Supabase admin factory from `lib/supabase/admin-client.ts`. Next.js route handlers should continue importing `lib/supabase/admin.ts`, which keeps the `server-only` guard around privileged admin access.

Open Drizzle Studio:

```bash
pnpm run db:studio
```

## Verification

Type-check:

```bash
pnpm exec tsc --noEmit
```

Lint:

```bash
pnpm run lint
```

At the time of this update, the files touched by the Supabase/RLS migration pass targeted ESLint and TypeScript. Full-project lint still reports unrelated existing component/form lint issues.

## Project Structure

```text
app/                  Next.js routes and route handlers
components/           UI, page blocks, and templates
drizzle/              Generated Drizzle migrations and metadata
lib/db-schema.ts      Drizzle schema, UUID columns, and RLS policies
lib/db-seed.ts        Supabase-backed admin seed script
lib/session.ts        Supabase-backed session helper
lib/supabase/         Supabase server, admin, and admin-client
types/                Shared TypeScript data shapes
```
