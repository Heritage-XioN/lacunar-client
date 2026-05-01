import { createSupabaseServerClient } from '@/lib/supabase/server';

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
		return Response.json({
			success: false,
			status: 500,
			error:
				error instanceof Error
					? error.message
					: 'An unexpected error occurred.',
		});
	}
}
