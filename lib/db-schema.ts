import { relations } from 'drizzle-orm';
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
	phoneNumber: text('phone_no').notNull(),
	createdAt: timestamp('created_at').defaultNow(),
});

export const consultation_sessions = pgTable('consultation_sessions', {
	id: serial('id').primaryKey(),
	clientId: integer('client_id').references(() => clients.id),
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
		consultantId: serial('consultant_id').references(() => consultants.id),
		title: text('title').notNull(),
		summary: text('summary').notNull(),
		createdAt: timestamp('created_at').defaultNow(),
		updatedAt: timestamp('updated_at').defaultNow(),
	},
);

export const reviews = pgTable('reviews', {
	id: serial('id').primaryKey(),
	engagementQuality: varchar('engagement_quality', { length: 10 }).notNull(),
	fullName: text('fullName').notNull(),
	role: text('role').notNull(),
	organisation: text('organisation').notNull(),
	social: text('social').notNull(),
	feedback: text('feedback').notNull(),
	createdAt: timestamp('created_at').defaultNow(),
});

export const consultants = pgTable('consultants', {
	id: serial('id').primaryKey(),
	fullName: text('full_name').notNull(),
	email: varchar('email', { length: 256 }).unique().notNull(),
	role: varchar('role', { length: 256 }).notNull().default('consultant'),
	phoneNumber: text('phone_no').notNull(),
	passwordHash: text('password').notNull(),
	createdAt: timestamp('created_at').defaultNow(),
	updatedAt: timestamp('updated_at').defaultNow(),
});

// Table relationships
export const consultantRelations = relations(consultants, ({ many }) => ({
	summaries: many(consultation_session_summary),
}));

export const summaryRelations = relations(
	consultation_session_summary,
	({ one }) => ({
		consultant: one(consultants, {
			fields: [consultation_session_summary.consultantId],
			references: [consultants.id],
		}),
	}),
);
