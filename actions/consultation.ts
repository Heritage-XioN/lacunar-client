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
		// Extract basic user info from form data
		const email = formData.email;
		const fullName = formData.fullName;

		if (!email) {
			return {
				success: false,
				error: 'Email is required for form submission.',
			};
		}

		// Find or Create User
		let userId: number;
		const existingUser = await db.query.clients.findFirst({
			where: eq(clients.email, email),
		});

		if (existingUser) {
			userId = existingUser.id;
		} else {
			const [newUser] = await db
				.insert(clients)
				.values({
					email,
					fullName: fullName || 'Anonymous Client',
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

		return {
			success: true,
		};
	} catch (error) {
		console.error('Consultation Submission Error:', error);
		return {
			success: false,
			error:
				error instanceof Error
					? error.message
					: 'An unexpected error occurred.',
		};
	}
}
