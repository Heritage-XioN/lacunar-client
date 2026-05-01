import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { createServerClient } from '@supabase/ssr';

export async function proxy(request: NextRequest) {
	let response = NextResponse.next({
		request,
	});

	const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
	const publishableKey =
		process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ??
		process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

	if (!supabaseUrl || !publishableKey) {
		return NextResponse.redirect(new URL('/sign-in', request.url));
	}

	const supabase = createServerClient(supabaseUrl, publishableKey, {
		cookies: {
			getAll() {
				return request.cookies.getAll();
			},
			setAll(cookiesToSet) {
				cookiesToSet.forEach(({ name, value }) =>
					request.cookies.set(name, value),
				);
				response = NextResponse.next({
					request,
				});
				cookiesToSet.forEach(({ name, value, options }) =>
					response.cookies.set(name, value, options),
				);
			},
		},
	});

	const {
		data: { user },
	} = await supabase.auth.getUser();

	if (request.nextUrl.pathname.startsWith('/dashboard')) {
		if (!user) {
			return NextResponse.redirect(new URL('/sign-in', request.url));
		}
	}

	return response;
}

export const config = {
	matcher: ['/dashboard/:path*'],
};
