import { db } from '@/lib/db'; // Your drizzle instance
import { consultants } from '@/lib/db-schema';
import bcrypt from 'bcryptjs';
import { eq } from 'drizzle-orm';

const EMAIL_ADDRESS = process.env.ADMIN_EMAIL_ADDRESS;
const PASSWORD = process.env.ADMIN_PASSWORD;
const DEFAULT_FULL_NAME = process.env.ADMIN_FULL_NAME;
const DEFAULT_PHONE_NUMBER = process.env.ADMIN_PHONE_NUMBER;
const DEFAULT_ROLE = process.env.ADMIN_ROLE;

async function seed() {
	if (
		!PASSWORD ||
		!DEFAULT_FULL_NAME ||
		!DEFAULT_PHONE_NUMBER ||
		!DEFAULT_ROLE ||
		!EMAIL_ADDRESS
	) {
		console.log('Please set all the ADMIN environment variables');
		return;
	}
	try {
		console.log('Seeding default user...');
		const hashedPassword = await bcrypt.hash(PASSWORD, 10);
		await db
			.insert(consultants)
			.values({
				fullName: DEFAULT_FULL_NAME,
				email: EMAIL_ADDRESS,
				phoneNumber: DEFAULT_PHONE_NUMBER,
				passwordHash: hashedPassword,
				role: DEFAULT_ROLE,
			})
			.onConflictDoUpdate({
				target: consultants.email,
				set: {
					email: EMAIL_ADDRESS,
				},
			});
		console.log('Default user created/updated');
	} catch (error) {
		console.error('failed to seed default user!:', error);
		process.exit(1);
	}
}

seed();
