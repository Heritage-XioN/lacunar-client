import { db } from '@/lib/db';
import { clients } from '@/lib/db-schema';
import { eq } from 'drizzle-orm';

export async function GET(
	request: Request,
	{ params }: { params: Promise<{ id: string }> },
) {
	try {
		const { id } = await params;
		const clientData = await db.query.clients.findFirst({
			where: eq(clients.id, parseInt(id)),
		});
		return Response.json(clientData);
	} catch (error) {
		return Response.json({
			error:
				error instanceof Error ? error.cause : 'An unexpected error occurred.',
			status: 500,
		});
	}
}
