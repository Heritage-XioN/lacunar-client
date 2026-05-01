import 'server-only';
import { SessionData } from '@/types/session';
import { createSupabaseServerClient } from './supabase/server';

export async function getSession() {
	const supabase = await createSupabaseServerClient();
	const {
		data: { user },
	} = await supabase.auth.getUser();

	if (!user) {
		return {
			isLoggedin: false,
			consultantId: '',
			consultantRole: '',
		} satisfies SessionData;
	}

	return {
		isLoggedin: true,
		consultantId: user.id,
		consultantRole:
			typeof user.app_metadata.user_role === 'string'
				? user.app_metadata.user_role
				: 'consultant',
	} satisfies SessionData;
}

export async function destroySession() {
	'use server';
	const supabase = await createSupabaseServerClient();
	await supabase.auth.signOut();
}
