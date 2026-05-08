import { supabaseAdmin } from '@/lib/supabase/admin';
import * as Sentry from '@sentry/nextjs';

export async function POST(request: Request) {
	try {
		const formData = await request.json();

		const { data, error: authError } =
			await supabaseAdmin.auth.admin.createUser({
				email: formData.email,
				password: formData.password,
				email_confirm: true,
				app_metadata: {
					user_role: 'consultant',
				},
			});

		if (authError || !data.user) {
			return Response.json({
				success: false,
				status: 400,
				error: authError?.message ?? 'Could not create user.',
			});
		}

		const { error: profileError } = await supabaseAdmin
			.from('consultants')
			.upsert(
				{
					id: data.user.id,
					full_name: formData.fullName,
					email: formData.email,
					phone_no: formData.phoneNumber,
					role: 'consultant',
				},
				{ onConflict: 'email' },
			);

		if (profileError) {
			await supabaseAdmin.auth.admin.deleteUser(data.user.id);
			Sentry.captureException(new Error(profileError.message));
			return Response.json({
				success: false,
				status: 500,
				error: 'An internal server error occurred.',
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
