'use server';

import { db } from '@/lib/db';
import { clients, consultation_sessions } from '@/lib/db-schema';
import { consultationTypes } from '@/lib/types';
import { eq } from 'drizzle-orm';

/**
 * Server action to save consultation form data.
 * This handles both finding/creating a user by email and saving the form details.
 */
export async function submitConsultationForm(
	category: string,
	formData: consultationTypes,
) {
	try {
		// Find or Create User
		let userId: number;
		const existingUser = await db.query.clients.findFirst({
			where: eq(clients.email, formData.email),
		});

		if (existingUser) {
			userId = existingUser.id;
		} else {
			const [newUser] = await db
				.insert(clients)
				.values({
					email: formData.email,
					fullName: formData.fullName,
					phoneNumber: formData.phoneNumber,
				})
				.returning({ id: clients.id });
			userId = newUser.id;
		}

		// Save Consultation Session
		await db.insert(consultation_sessions).values({
			userId,
			category,
			onBoardingDetails: formData,
			status: 'pending',
		});

		// check if user already has consultation with the same title
		// db.update(consultation_sessions)
		// 	.set({})
		// 	.where(eq(consultation_sessions.id, 1) && eq(clients.id, 1));

		return {
			success: true,
		};
	} catch (error) {
		console.error('Consultation Submission Error:', error);
		return {
			success: false,
			error:
				error instanceof Error ? error.cause : 'An unexpected error occurred.',
		};
	}
}
