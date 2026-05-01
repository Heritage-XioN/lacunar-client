import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getIronSession } from 'iron-session';
import { sessionOptions } from '@/lib/session';
import { SessionData } from '@/types/session';

export async function proxy(request: NextRequest) {
	const response = NextResponse.next();
	const session = await getIronSession<SessionData>(request, response, sessionOptions);

	// Check if the route is /dashboard/*
	if (request.nextUrl.pathname.startsWith('/dashboard')) {
		if (!session.isLoggedin) {
			// Redirect to sign-in if not logged in
			return NextResponse.redirect(new URL('/sign-in', request.url));
		}
	}

	return response;
}

export const config = {
	matcher: ['/dashboard/:path*'],
};
