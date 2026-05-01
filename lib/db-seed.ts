import { createSupabaseAdminClient } from '@/lib/supabase/admin-client';

const supabaseAdmin = createSupabaseAdminClient();

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

		const { data: existingProfile, error: existingProfileError } =
			await supabaseAdmin
				.from('consultants')
				.select('id')
				.eq('email', EMAIL_ADDRESS)
				.maybeSingle();

		if (existingProfileError) {
			throw existingProfileError;
		}

		let userId = existingProfile?.id as string | undefined;

		if (!userId) {
			const { data: createdUser, error: createUserError } =
				await supabaseAdmin.auth.admin.createUser({
					email: EMAIL_ADDRESS,
					password: PASSWORD,
					email_confirm: true,
					app_metadata: {
						user_role: DEFAULT_ROLE,
					},
				});

			if (createUserError || !createdUser.user) {
				throw createUserError ?? new Error('Failed to create admin auth user');
			}

			userId = createdUser.user.id;
		} else {
			const { error: updateUserError } =
				await supabaseAdmin.auth.admin.updateUserById(userId, {
					email: EMAIL_ADDRESS,
					password: PASSWORD,
					app_metadata: {
						user_role: DEFAULT_ROLE,
					},
				});

			if (updateUserError) {
				throw updateUserError;
			}
		}

		const { error: upsertProfileError } = await supabaseAdmin
			.from('consultants')
			.upsert(
				{
					id: userId,
					full_name: DEFAULT_FULL_NAME,
					email: EMAIL_ADDRESS,
					phone_no: DEFAULT_PHONE_NUMBER,
					role: DEFAULT_ROLE,
				},
				{ onConflict: 'email' },
			);

		if (upsertProfileError) {
			throw upsertProfileError;
		}

		console.log('Default user created/updated');
	} catch (error) {
		console.error('failed to seed default user!:', error);
		process.exit(1);
	}
}

seed();
