import { supabaseAdmin } from '@/lib/supabase/admin';

export async function POST(request: Request) {
	try {
		const { category, formData } = await request.json();
		let clientId: string;
		const { data: existingUser, error: existingUserError } = await supabaseAdmin
			.from('clients')
			.select('id')
			.eq('email', formData.email)
			.maybeSingle();

		if (existingUserError) {
			return Response.json({
				success: false,
				status: 500,
				error: existingUserError.message,
			});
		}

		if (existingUser) {
			clientId = existingUser.id;
		} else {
			const { data: newUser, error: newUserError } = await supabaseAdmin
				.from('clients')
				.insert({
					email: formData.email,
					full_name: formData.fullName,
					phone_no: formData.phoneNumber,
				})
				.select('id')
				.single();

			if (newUserError) {
				return Response.json({
					success: false,
					status: 500,
					error: newUserError.message,
				});
			}

			clientId = newUser.id;
		}

		delete formData['fullName'];
		delete formData['email'];
		delete formData['phoneNumber'];

		const { data: existingConsultation, error: existingConsultationError } =
			await supabaseAdmin
				.from('consultation_sessions')
				.select('id')
				.eq('client_id', clientId)
				.eq('category', category)
				.maybeSingle();

		if (existingConsultationError) {
			return Response.json({
				success: false,
				status: 500,
				error: existingConsultationError.message,
			});
		}

		if (existingConsultation) {
			const { error } = await supabaseAdmin
				.from('consultation_sessions')
				.update({
					onBoarding_details: formData,
					updated_at: new Date().toISOString(),
				})
				.eq('id', existingConsultation.id)
				.eq('client_id', clientId);

			if (error) {
				return Response.json({
					success: false,
					status: 500,
					error: error.message,
				});
			}
		} else {
			const { error } = await supabaseAdmin
				.from('consultation_sessions')
				.insert({
					client_id: clientId,
					category: category,
					onBoarding_details: formData,
					status: 'pending',
				});

			if (error) {
				return Response.json({
					success: false,
					status: 500,
					error: error.message,
				});
			}
		}
		return Response.json({ success: true });
	} catch (error) {
		return Response.json({
			success: false,
			status: 500,
			error:
				error instanceof Error ? error.cause : 'An unexpected error occurred.',
		});
	}
}
