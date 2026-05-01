import { db } from '@/lib/db';
import {
	clients,
	consultation_sessions,
	consultation_session_summary,
} from '@/lib/db-schema';
import { getSession } from '@/lib/session';
import { eq, inArray } from 'drizzle-orm';

export async function GET(
	request: Request,
	{ params }: { params: Promise<{ id: string }> },
) {
	try {
		const { id } = await params;
		const clientData = await db.query.clients.findFirst({
			where: eq(clients.id, parseInt(id)),
		});
		return Response.json({
			success: true,
			data: clientData,
		});
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
		const clientId = parseInt(id);

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
				error: 'Only Admin can delete clients',
			});
		}

		// First, find all consultation sessions for this client
		const sessions = await db
			.select()
			.from(consultation_sessions)
			.where(eq(consultation_sessions.clientId, clientId));

		const sessionIds = sessions.map((s) => s.id);
		if (sessionIds.length > 0) {
			// Delete related summaries
			await db
				.delete(consultation_session_summary)
				.where(
					inArray(
						consultation_session_summary.consultationSessionId,
						sessionIds,
					),
				);
			// Delete related sessions
			await db
				.delete(consultation_sessions)
				.where(eq(consultation_sessions.clientId, clientId));
		}

		// Delete client
		await db.delete(clients).where(eq(clients.id, clientId));

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
