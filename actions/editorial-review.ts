'use server';

import { db } from '@/lib/db';
import { editorial_reviews } from '@/lib/db-schema';

export async function submitEditorialReview(formData: {
	engagementQuality: string;
	fullLegalName: string;
	executiveTitle: string;
	organization: string;
	socials: string;
	strategicFeedback: string;
}) {
	try {
		await db.insert(editorial_reviews).values({
			engagementQuality: formData.engagementQuality,
			fullLegalName: formData.fullLegalName,
			executiveTitle: formData.executiveTitle,
			organization: formData.organization,
			socials: formData.socials,
			strategicFeedback: formData.strategicFeedback,
		});

		return { success: true };
	} catch (error) {
		console.error('Editorial Review Submission Error:', error);
		return {
			success: false,
			error:
				error instanceof Error ? error.cause : 'An unexpected error occurred.',
		};
	}
}
