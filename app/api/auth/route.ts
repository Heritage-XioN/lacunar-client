import { db } from '@/lib/db';
import { consultants } from '@/lib/db-schema';
import bcrypt from 'bcryptjs';
import { eq } from 'drizzle-orm';

export async function GET(request: Request) {
	try {
		const formData = await request.json();

		const consultant = await db.query.consultants.findFirst({
			where: eq(consultants.email, formData.email),
		});

		if (!consultant) {
			return Response.json({
				error: 'Consultant not found.',
				status: 404,
			});
		}
		const isPasswordValid = await bcrypt.compare(
			formData.password,
			consultant.passwordHash,
		);
		if (!isPasswordValid) {
			return Response.json({
				error: 'Invalid credentials.',
				status: 401,
			});
		}
		return Response.json({ success: true });
	} catch (error) {
		return Response.json({
			error:
				error instanceof Error ? error.cause : 'An unexpected error occurred.',
			status: 500,
		});
	}
}

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
