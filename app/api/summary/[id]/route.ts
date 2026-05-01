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
		const session = await getSession();
		if (!session.isLoggedin) {
			return Response.json({
				success: false,
				status: 401,
				error: 'Unauthorized',
			});
		}

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
		return Response.json({ data: summaryData, success: true });
	} catch (error) {
		return Response.json({
			success: false,
			status: 500,
			error:
				error instanceof Error ? error.cause : 'An unexpected error occurred.',
		});
	}
}

export async function POST(
	request: Request,
	{ params }: { params: Promise<{ id: string }> },
) {
	try {
		const { id } = await params;
		const formData = await request.json();

		const session = await getSession();
		if (!session.isLoggedin) {
			return Response.json({
				success: false,
				status: 401,
				error: 'Unauthorized',
			});
		}

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

export async function DELETE(
	request: Request,
	{ params }: { params: Promise<{ id: string }> },
) {
	try {
		const { id } = await params;
		const summaryId = parseInt(id);

		const session = await getSession();
		if (!session.isLoggedin) {
			return Response.json({
				success: false,
				status: 401,
				error: 'Unauthorized',
			});
		}

		if (session.consultantRole !== 'admin') {
			// You could also check if this summary belongs to the consultant:
			// const summary = await db.query.consultation_session_summary.findFirst({where: eq(consultation_session_summary.id, summaryId)});
			// if (summary?.consultantId !== session.consultantId) ...
			// For now, i'll just restrict to admin. You can adjust as needed.
			return Response.json({
				success: false,
				status: 401,
				error: 'Only Admin can delete summaries',
			});
		}

		await db
			.delete(consultation_session_summary)
			.where(eq(consultation_session_summary.id, summaryId));

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
