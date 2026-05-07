import { getSession } from '@/lib/session';
import { supabaseAdmin } from '@/lib/supabase/admin';
import * as Sentry from '@sentry/nextjs';

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
			Sentry.captureException(new Error(profileError.message));
			return Response.json({
				success: false,
				status: 500,
				error: 'An internal server error occurred.',
			});
		}

		const { error: authError } = await supabaseAdmin.auth.admin.deleteUser(id);

		if (authError) {
			Sentry.captureException(new Error(authError.message));
			return Response.json({
				success: false,
				status: 500,
				error: 'An internal server error occurred.',
			});
		}

		return Response.json({ success: true });
	} catch (error) {
		Sentry.captureException(error);
		return Response.json({
			success: false,
			status: 500,
			error: 'An unexpected application error occurred.',
		});
	}
}
