import 'server-only';
import { getIronSession } from 'iron-session';
import { cookies } from 'next/headers';
import { SessionData } from '@/types/session';

const sessionOptions = {
	password: process.env.RAND_KEY as string, //run openssl rand -base64 32 to generate a random pasaword
	cookieName: 'session',
	cookieOptions: {
		httpOnly: process.env.COOKIE_HTTP_ONLY,
		secure: process.env.NODE_ENV === 'production',
		sameSite: process.env.COOKIE_SAME_SITE as 'lax' | 'strict' | 'none',
		maxAge: Number(process.env.COOKIE_MAX_AGE),
	},
};

//handles creating the session
export async function getSession() {
	const session = await getIronSession<SessionData>(
		await cookies(),
		sessionOptions
	);
	return session;
}

//this should be used for logout
export async function destroySession() {
	'use server';
	const session = await getSession();
	session.destroy();
}
