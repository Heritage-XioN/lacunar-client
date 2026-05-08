import { mapReview } from '@/lib/db-row-mappers';
import { createSupabaseServerClient } from '@/lib/supabase/server';
import * as Sentry from '@sentry/nextjs';

export async function GET() {
	try {
		const supabase = await createSupabaseServerClient();
		const { data, error } = await supabase
			.from('reviews')
			.select('*')
			.order('created_at', { ascending: false })
			.limit(6);

		if (error) {
			Sentry.captureException(new Error(error.message));
			return Response.json({
				success: false,
				status: 500,
				error: 'An internal server error occurred.',
			});
		}

		return Response.json({ data: data.map(mapReview), success: true });
	} catch (error) {
		console.error('Error fetching editorial reviews:', error);
		Sentry.captureException(error);
		return Response.json({
			success: false,
			status: 500,
			error: 'An unexpected application error occurred.',
		});
	}
}

export async function POST(request: Request) {
	try {
		const formData = await request.json();
		const supabase = await createSupabaseServerClient();
		const { error } = await supabase.from('reviews').insert({
			engagement_quality: formData.engagementQuality,
			fullName: formData.fullName,
			role: formData.role,
			organisation: formData.organisation,
			social: formData.social,
			feedback: formData.feedback,
		});

		if (error) {
			Sentry.captureException(new Error(error.message));
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
