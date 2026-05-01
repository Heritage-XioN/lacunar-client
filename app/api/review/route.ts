import { db } from '@/lib/db';
import { reviews } from '@/lib/db-schema';
import { desc } from 'drizzle-orm';

export async function GET(request: Request) {
	try {
		const reviewData = await db.query.reviews.findMany({
			limit: 6,
			orderBy: [desc(reviews.createdAt)],
		});
		return Response.json({ data: reviewData, success: true });
	} catch (error) {
		console.error('Error fetching editorial reviews:', error);
		return Response.json({
			success: false,
			status: 500,
			error:
				error instanceof Error ? error.cause : 'An unexpected error occurred.',
		});
	}
}

export async function POST(request: Request) {
	try {
		const formData = await request.json();
		await db.insert(reviews).values({
			engagementQuality: formData.engagementQuality,
			fullName: formData.fullName,
			role: formData.role,
			organisation: formData.organisation,
			social: formData.social,
			feedback: formData.feedback,
		});
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
