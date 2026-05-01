import { getSession } from '@/lib/session';
import { supabaseAdmin } from '@/lib/supabase/admin';

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
				error: 'Only Admin can delete consultants',
			});
		}

		if (session.consultantId === id) {
			return Response.json({
				success: false,
				status: 401,
				error: 'You cannot delete yourself',
			});
		}

		const { error: profileError } = await supabaseAdmin
			.from('consultants')
			.delete()
			.eq('id', id);

		if (profileError) {
			return Response.json({
				success: false,
				status: 500,
				error: profileError.message,
			});
		}

		const { error: authError } = await supabaseAdmin.auth.admin.deleteUser(id);

		if (authError) {
			return Response.json({
				success: false,
				status: 500,
				error: authError.message,
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
