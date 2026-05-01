import { db } from '@/lib/db';

export async function GET(request: Request) {
	try {
		const consultantData = await db.query.consultants.findMany();
		return Response.json(consultantData);
	} catch (error) {
		return Response.json({
			error:
				error instanceof Error ? error.cause : 'An unexpected error occurred.',
			status: 500,
		});
	}
}
