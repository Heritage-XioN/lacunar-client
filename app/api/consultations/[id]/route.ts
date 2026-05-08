import { mapConsultationSession } from '@/lib/db-row-mappers';
import { getSession } from '@/lib/session';
import { createSupabaseServerClient } from '@/lib/supabase/server';
import * as Sentry from '@sentry/nextjs';

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
			.from('consultation_sessions')
			.select('*')
			.eq('client_id', id)
			.order('created_at', { ascending: false });

		if (error) {
			Sentry.captureException(new Error(error.message));
			return Response.json({
				success: false,
				status: 500,
				error: 'An internal server error occurred.',
			});
		}

		return Response.json({
			data: data.map(mapConsultationSession),
			success: true,
		});
	} catch (error) {
		Sentry.captureException(error);
		return Response.json({
			success: false,
			status: 500,
			error: 'An unexpected application error occurred.',
		});
	}
}

export async function PUT(
	request: Request,
	{ params }: { params: Promise<{ id: string }> },
) {
	try {
		const { id } = await params;
		const { status } = await request.json();
		const session = await getSession();
		if (!session.isLoggedin) {
			return Response.json({
				success: false,
				status: 401,
				error: 'Unauthorized',
			});
		}

		const supabase = await createSupabaseServerClient();
		const { error } = await supabase
			.from('consultation_sessions')
			.update({ status, updated_at: new Date().toISOString() })
			.eq('id', id);

		if (error) {
			Sentry.captureException(new Error(error.message));
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
				error: 'Only Admin can delete consultations',
			});
		}

		const supabase = await createSupabaseServerClient();
		const { error } = await supabase
			.from('consultation_sessions')
			.delete()
			.eq('id', id);

		if (error) {
			Sentry.captureException(new Error(error.message));
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
