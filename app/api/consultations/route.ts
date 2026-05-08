import { supabaseAdmin } from '@/lib/supabase/admin';
import * as Sentry from '@sentry/nextjs';

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
			Sentry.captureException(new Error(existingUserError.message));
			return Response.json({
				success: false,
				status: 500,
				error: 'An internal server error occurred.',
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
				Sentry.captureException(new Error(newUserError.message));
				return Response.json({
					success: false,
					status: 500,
					error: 'An internal server error occurred.',
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
			Sentry.captureException(new Error(existingConsultationError.message));
			return Response.json({
				success: false,
				status: 500,
				error: 'An internal server error occurred.',
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
				Sentry.captureException(new Error(error.message));
				return Response.json({
					success: false,
					status: 500,
					error: 'An internal server error occurred.',
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
				Sentry.captureException(new Error(error.message));
				return Response.json({
					success: false,
					status: 500,
					error: 'An internal server error occurred.',
				});
			}
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
