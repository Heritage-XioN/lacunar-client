import { mapSummary } from '@/lib/db-row-mappers';
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
			.from('consultation_session_summary')
			.select('*, consultants(*)')
			.eq('consultation_session_id', id)
			.order('created_at', { ascending: false });

		if (error) {
			Sentry.captureException(new Error(error.message));
			return Response.json({
				success: false,
				status: 500,
				error: 'An internal server error occurred.',
			});
		}

		return Response.json({ data: data.map(mapSummary), success: true });
	} catch (error) {
		Sentry.captureException(error);
		return Response.json({
			success: false,
			status: 500,
			error: 'An unexpected application error occurred.',
		});
	}
}

export async function POST(
	request: Request,
	{ params }: { params: Promise<{ id: string }> },
) {
	try {
		const { id } = await params;
		const formData = await request.json();

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
			.from('consultation_session_summary')
			.insert({
				consultation_session_id: id,
				consultant_id: session.consultantId,
				title: formData.title,
				summary: formData.summary,
			});

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
			// You could also check if this summary belongs to the consultant:
			// const summary = await db.query.consultation_session_summary.findFirst({where: eq(consultation_session_summary.id, summaryId)});
			// if (summary?.consultantId !== session.consultantId) ...
			// For now, i'll just restrict to admin. You can adjust as needed.
			return Response.json({
				success: false,
				status: 401,
				error: 'Only Admin can delete summaries',
			});
		}

		const supabase = await createSupabaseServerClient();
		const { error } = await supabase
			.from('consultation_session_summary')
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
