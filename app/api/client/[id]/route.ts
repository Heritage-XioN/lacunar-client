import { mapClient } from '@/lib/db-row-mappers';
import { getSession } from '@/lib/session';
import { createSupabaseServerClient } from '@/lib/supabase/server';

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

		const supabase = await createSupabaseServerClient();
		const { data, error } = await supabase
			.from('clients')
			.select('*')
			.eq('id', id)
			.single();

		if (error) {
			return Response.json({
				success: false,
				status: 500,
				error: error.message,
			});
		}

		return Response.json({
			success: true,
			data: mapClient(data),
		});
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

		const supabase = await createSupabaseServerClient();
		const { error } = await supabase.from('clients').delete().eq('id', id);

		if (error) {
			return Response.json({
				success: false,
				status: 500,
				error: error.message,
			});
		}

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
