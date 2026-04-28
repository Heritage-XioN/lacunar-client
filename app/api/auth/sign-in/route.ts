import { db } from '@/lib/db';
import { consultants } from '@/lib/db-schema';
import { getSession } from '@/lib/session';
import bcrypt from 'bcryptjs';
import { eq } from 'drizzle-orm';
import { SignJWT } from 'jose';

const secret = new TextEncoder().encode(process.env.JWT_SECRET);

export async function POST(request: Request) {
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

		// Create JWT
		const token = await new SignJWT({
			consultantId: consultant.id,
			email: consultant.email,
		})
			.setProtectedHeader({ alg: 'HS256' })
			.setIssuedAt()
			.setExpirationTime('2h')
			.sign(secret);

		// Create session
		const session = await getSession();
		session.isLoggedin = true;
		session.token = token;
		session.consultantId = consultant.id;
		await session.save();

		return Response.json({ success: true });
	} catch (error) {
		return Response.json({
			success: false,
			error:
				error instanceof Error ? error.cause : 'An unexpected error occurred.',
			status: 500,
		});
	}
}
