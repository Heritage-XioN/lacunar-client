import { db } from '@/lib/db';
import { clients, consultation_sessions } from '@/lib/db-schema';
import { eq } from 'drizzle-orm';

export async function GET(
	request: Request,
	{ params }: { params: Promise<{ id: string }> },
) {
	try {
		const { id } = await params;
		const consultationData = await db.query.consultation_sessions.findMany({
			where: eq(consultation_sessions.userId, parseInt(id)),
		});
		return Response.json(consultationData);
	} catch (error) {
		console.error('Error fetching consultation:', error);
		return Response.json({
			error:
				error instanceof Error ? error.cause : 'An unexpected error occurred.',
			status: 500,
		});
	}
}
