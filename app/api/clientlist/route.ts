import { mapClient } from '@/lib/db-row-mappers';
import { getSession } from '@/lib/session';
import { createSupabaseServerClient } from '@/lib/supabase/server';

export async function GET() {
	try {
		const session = await getSession();
		if (!session.isLoggedin) {
			return Response.json({
				success: false,
				status: 401,
				error: 'Unauthorized',
			});
		}

		const supabase = await createSupabaseServerClient();
		const { data, error } = await supabase
			.from('clients')
			.select('*')
			.order('created_at', { ascending: false });

		if (error) {
			return Response.json({
				success: false,
				status: 500,
				error: error.message,
			});
		}

		return Response.json({
			success: true,
			data: data.map(mapClient),
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
