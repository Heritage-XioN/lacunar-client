import 'server-only';
import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const publishableKey =
	process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ??
	process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl) {
	throw new Error('Missing NEXT_PUBLIC_SUPABASE_URL');
}

if (!publishableKey) {
	throw new Error(
		'Missing NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY or NEXT_PUBLIC_SUPABASE_ANON_KEY',
	);
}

export async function createSupabaseServerClient() {
	const cookieStore = await cookies();

	return createServerClient(supabaseUrl!, publishableKey!, {
		cookies: {
			getAll() {
				return cookieStore.getAll();
			},
			setAll(
				cookiesToSet: {
					name: string;
					value: string;
					options?: Parameters<typeof cookieStore.set>[2];
				}[],
			) {
				try {
					cookiesToSet.forEach(({ name, value, options }) => {
						cookieStore.set(name, value, options);
					});
				} catch {
					// Server Components cannot set cookies. Route handlers can.
				}
			},
		},
	});
}
