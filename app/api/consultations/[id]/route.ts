import { db } from '@/lib/db';
import {
	consultation_session_summary,
	consultation_sessions,
} from '@/lib/db-schema';
import { getSession } from '@/lib/session';
import { eq } from 'drizzle-orm';

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

		const consultationData = await db.query.consultation_sessions.findMany({
			where: eq(consultation_sessions.clientId, parseInt(id)),
		});
		return Response.json({ data: consultationData, success: true });
	} catch (error) {
		return Response.json({
			success: false,
			status: 500,
			error:
				error instanceof Error ? error.cause : 'An unexpected error occurred.',
		});
	}
}

export async function PUT(
	request: Request,
	{ params }: { params: Promise<{ id: string }> },
) {
	try {
		const { id } = await params;
		const { status } = await request.json();
		const session = await getSession();
		if (!session.isLoggedin) {
			return Response.json({
				success: false,
				status: 401,
				error: 'Unauthorized',
			});
		}

		await db
			.update(consultation_sessions)
			.set({ status, updatedAt: new Date() })
			.where(eq(consultation_sessions.id, parseInt(id)));

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

export async function DELETE(
	request: Request,
	{ params }: { params: Promise<{ id: string }> },
) {
	try {
		const { id } = await params;
		const sessionId = parseInt(id);

		const session = await getSession();
		if (!session.isLoggedin) {
			return Response.json({
				success: false,
				status: 401,
				error: 'Unauthorized',
			});
		}

		if (session.consultantRole !== 'admin') {
			return Response.json({
				success: false,
				status: 401,
				error: 'Only Admin can delete consultations',
			});
		}

		// First delete related summaries
		await db
			.delete(consultation_session_summary)
			.where(eq(consultation_session_summary.consultationSessionId, sessionId));

		// Then delete the consultation session
		await db
			.delete(consultation_sessions)
			.where(eq(consultation_sessions.id, sessionId));

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
