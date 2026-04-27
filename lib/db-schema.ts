import {
	pgTable,
	serial,
	text,
	varchar,
	timestamp,
	jsonb,
	integer,
} from 'drizzle-orm/pg-core';

export const clients = pgTable('clients', {
	id: serial('id').primaryKey(),
	fullName: text('full_name').notNull(),
	email: varchar('email', { length: 256 }).unique(),
	createdAt: timestamp('created_at').defaultNow(),
});

export const consultation_sessions = pgTable('consultation_sessions', {
	id: serial('id').primaryKey(),
	userId: integer('user_id').references(() => clients.id),
	category: varchar('category', { length: 256 }).notNull(),
	status: varchar('status', { length: 256 }).notNull().default('pending'),
	onBoardingDetails: jsonb('onBoarding_details').notNull(),
	createdAt: timestamp('created_at').defaultNow(),
	updatedAt: timestamp('updated_at').defaultNow(),
});

export const consultation_session_summary = pgTable(
	'consultation_session_summary',
	{
		id: serial('id').primaryKey(),
		consultationSessionId: serial('consultation_session_id').references(
			() => consultation_sessions.id,
		),
		summary: text('summary').notNull(),
		createdAt: timestamp('created_at').defaultNow(),
		updatedAt: timestamp('updated_at').defaultNow(),
	},
);

export const editorial_reviews = pgTable('editorial_reviews', {
	id: serial('id').primaryKey(),
	engagementQuality: varchar('engagement_quality', { length: 10 }).notNull(),
	fullLegalName: text('full_legal_name').notNull(),
	executiveTitle: text('executive_title'),
	organization: text('organization'),
	socials: text('socials').notNull(),
	strategicFeedback: text('strategic_feedback').notNull(),
	createdAt: timestamp('created_at').defaultNow(),
});
