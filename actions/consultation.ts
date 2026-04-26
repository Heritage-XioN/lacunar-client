'use server';

import { db } from '@/lib/db';
import { users, consultation_sessions } from '@/lib/db-schema';
import { eq } from 'drizzle-orm';

/**
 * Server action to save consultation form data.
 * This handles both finding/creating a user by email and saving the form details.
 */
export async function submitConsultationForm(category: string, formData: any) {
	try {
		// 1. Extract basic user info from form data
		// Different forms use different field names, so we try a few common ones
		const email =
			formData.emailAddress || formData.secureEmail || formData.email;
		const fullName = formData.fullName || formData.legalName || formData.name;

		if (!email) {
			return {
				success: false,
				error: 'Email is required for form submission.',
			};
		}

		// 2. Find or Create User
		let userId: number;
		const existingUser = await db.query.users.findFirst({
			where: eq(users.email, email),
		});

		if (existingUser) {
			userId = existingUser.id;
		} else {
			const [newUser] = await db
				.insert(users)
				.values({
					email,
					fullName: fullName || 'Anonymous Client',
				})
				.returning({ id: users.id });
			userId = newUser.id;
		}

		// 3. Save Consultation Session
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
