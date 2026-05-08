import { createSupabaseServerClient } from '@/lib/supabase/server';
import * as Sentry from '@sentry/nextjs';

export async function POST(request: Request) {
	try {
		const formData = await request.json();
		const supabase = await createSupabaseServerClient();
		const { error } = await supabase.auth.signInWithPassword({
			email: formData.email,
			password: formData.password,
		});

		if (error) {
			return Response.json({
				success: false,
				error: 'Invalid credentials.',
				status: 401,
			});
		}

		return Response.json({ success: true });
	} catch (error) {
		Sentry.captureException(error);
		return Response.json({
			success: false,
			status: 500,
			error: 'An unexpected application error occurred.',
		});
	}
}
