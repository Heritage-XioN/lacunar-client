import { db } from '@/lib/db';
import { consultation_session_summary } from '@/lib/db-schema';
import { getSession } from '@/lib/session';
import { desc, eq } from 'drizzle-orm';

export async function GET(
	request: Request,
	{ params }: { params: Promise<{ id: string }> },
) {
	try {
		const { id } = await params;
		const summaryData = await db.query.consultation_session_summary.findMany({
			where: eq(
				consultation_session_summary.consultationSessionId,
				parseInt(id),
			),
			orderBy: desc(consultation_session_summary.createdAt),
			with: {
				consultant: true,
			},
		});
		return Response.json(summaryData);
	} catch (error) {
		return Response.json({
			error:
				error instanceof Error ? error.cause : 'An unexpected error occurred.',
			status: 500,
		});
	}
}

export async function POST(
	request: Request,
	{ params }: { params: Promise<{ id: string }> },
) {
	try {
		const formData = await request.json();
		const session = await getSession();
		if (!session.isLoggedin) {
			return Response.json({
				status: 401,
				error: 'Unauthorized',
			});
		}
		const { id } = await params;
		await db.insert(consultation_session_summary).values({
			consultationSessionId: parseInt(id),
			consultantId: session.consultantId,
			title: formData.title,
			summary: formData.summary,
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
