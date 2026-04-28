import { db } from '@/lib/db';
import { consultants } from '@/lib/db-schema';
import bcrypt from 'bcryptjs';

export async function POST(request: Request) {
	try {
		const formData = await request.json();
		const hashedPassword = await bcrypt.hash(formData.password, 10);

		await db.insert(consultants).values({
			fullName: formData.fullName,
			email: formData.email,
			phoneNumber: formData.phoneNumber,
			passwordHash: hashedPassword,
		});

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
