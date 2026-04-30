import { db } from '@/lib/db';

export async function GET(request: Request) {
	try {
		const clientData = await db.query.clients.findMany();
		return Response.json(clientData);
	} catch (error) {
		return Response.json({
			error:
				error instanceof Error ? error.cause : 'An unexpected error occurred.',
			status: 500,
		});
	}
}
