import 'server-only';
import { getSession } from '@/lib/session';
import { redirect } from 'next/navigation';

//use this to verify if a user is authenticated
//use this in addition with the proxy.ts file

export const verifySession = async () => {
	const session = await getSession();

	//rediects to login if user is not authenticated
	if (!session.isLoggedin) {
		redirect('/login');
	}

	return session;
};
