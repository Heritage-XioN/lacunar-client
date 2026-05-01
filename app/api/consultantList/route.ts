import { db } from '@/lib/db';
import { getSession } from '@/lib/session';

export async function GET(request: Request) {
	try {
		const session = await getSession();
		if (!session.isLoggedin) {
			return Response.json({
				success: false,
				status: 401,
				error: 'Unauthorized',
			});
		}

		const consultantData = await db.query.consultants.findMany();
		return Response.json({
			success: true,
			data: consultantData,
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
