import { supabaseAdmin } from '@/lib/supabase/admin';

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
			return Response.json({
				success: false,
				status: 500,
				error: profileError.message,
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
