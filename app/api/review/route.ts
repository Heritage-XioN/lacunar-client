import { mapReview } from '@/lib/db-row-mappers';
import { createSupabaseServerClient } from '@/lib/supabase/server';

export async function GET() {
	try {
		const supabase = await createSupabaseServerClient();
		const { data, error } = await supabase
			.from('reviews')
			.select('*')
			.order('created_at', { ascending: false })
			.limit(6);

		if (error) {
			return Response.json({
				success: false,
				status: 500,
				error: error.message,
			});
		}

		return Response.json({ data: data.map(mapReview), success: true });
	} catch (error) {
		console.error('Error fetching editorial reviews:', error);
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
			return Response.json({
				success: false,
				status: 500,
				error: error.message,
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
