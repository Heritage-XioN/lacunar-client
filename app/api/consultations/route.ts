import { db } from '@/lib/db';
import { clients, consultation_sessions } from '@/lib/db-schema';
import { eq, and } from 'drizzle-orm';

export async function POST(request: Request) {
	try {
		const { category, formData } = await request.json();
		// Find or Create User
		let clientId: number;
		const existingUser = await db.query.clients.findFirst({
			where: eq(clients.email, formData.email),
		});

		if (existingUser) {
			clientId = existingUser.id;
		} else {
			const [newUser] = await db
				.insert(clients)
				.values({
					email: formData.email,
					fullName: formData.fullName,
					phoneNumber: formData.phoneNumber,
				})
				.returning({ id: clients.id });
			clientId = newUser.id;
		}

		delete formData['fullName'];
		delete formData['email'];
		delete formData['phoneNumber'];

		const existingConsultation = await db.query.consultation_sessions.findFirst(
			{
				where: and(
					eq(consultation_sessions.clientId, clientId),
					eq(consultation_sessions.category, category),
				),
			},
		);

		if (existingConsultation) {
			await db
				.update(consultation_sessions)
				.set({
					onBoardingDetails: formData,
					updatedAt: new Date(),
				})
				.where(
					and(
						eq(consultation_sessions.id, existingConsultation.id),
						eq(consultation_sessions.clientId, clientId),
					),
				);
		} else {
			// Save new Consultation Session
			await db.insert(consultation_sessions).values({
				clientId: clientId,
				category: category,
				onBoardingDetails: formData,
				status: 'pending',
			});
		}
		return Response.json({ success: true });
	} catch (error) {
		return Response.json({
			success: false,
			status: 500,
			error:
				error instanceof Error ? error.cause : 'An unexpected error occurred.',
		});
	}
}
