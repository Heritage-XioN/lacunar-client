import { db } from '@/lib/db';
import { consultants, consultation_session_summary } from '@/lib/db-schema';
import { getSession } from '@/lib/session';
import { eq } from 'drizzle-orm';

export async function DELETE(
	request: Request,
	{ params }: { params: Promise<{ id: string }> },
) {
	try {
		const { id } = await params;
		const consultantId = parseInt(id);
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
				error: 'Only Admin can delete consultants',
			});
		}

		if (session.consultantId === consultantId) {
			return Response.json({
				success: false,
				status: 401,
				error: 'You cannot delete yourself',
			});
		}

		// // Delete related summaries by this consultant
		// await db.delete(consultation_session_summary).where(eq(consultation_session_summary.consultantId, consultantId));

		// Delete consultant
		await db.delete(consultants).where(eq(consultants.id, consultantId));

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
