import { relations, sql } from 'drizzle-orm';
import {
	pgTable,
	text,
	varchar,
	timestamp,
	jsonb,
	uuid,
	pgPolicy,
} from 'drizzle-orm/pg-core';

const isAdmin = sql`(auth.jwt() -> 'app_metadata' ->> 'user_role') = 'admin'`;
const isStaff = sql`(auth.jwt() -> 'app_metadata' ->> 'user_role') in ('admin', 'consultant')`;
const publicAccess = sql`true`;

export const clients = pgTable(
	'clients',
	{
		id: uuid('id').defaultRandom().primaryKey(),
		fullName: text('full_name').notNull(),
		email: varchar('email', { length: 256 }).unique(),
		phoneNumber: text('phone_no').notNull(),
		createdAt: timestamp('created_at').defaultNow(),
	},
	() => [
		pgPolicy('staff_select_clients', {
			for: 'select',
			to: 'authenticated',
			using: isStaff,
		}),
		pgPolicy('staff_insert_clients', {
			for: 'insert',
			to: 'authenticated',
			withCheck: isStaff,
		}),
		pgPolicy('staff_update_clients', {
			for: 'update',
			to: 'authenticated',
			using: isStaff,
			withCheck: isStaff,
		}),
		pgPolicy('admin_delete_clients', {
			for: 'delete',
			to: 'authenticated',
			using: isAdmin,
		}),
	],
).enableRLS();

export const consultation_sessions = pgTable(
	'consultation_sessions',
	{
		id: uuid('id').defaultRandom().primaryKey(),
		clientId: uuid('client_id')
			.notNull()
			.references(() => clients.id, {
				onDelete: 'cascade',
			}),
		category: varchar('category', { length: 256 }).notNull(),
		status: varchar('status', { length: 256 }).notNull().default('pending'),
		onBoardingDetails: jsonb('onBoarding_details').notNull(),
		createdAt: timestamp('created_at').defaultNow(),
		updatedAt: timestamp('updated_at').defaultNow(),
	},
	() => [
		pgPolicy('staff_select_consultation_sessions', {
			for: 'select',
			to: 'authenticated',
			using: isStaff,
		}),
		pgPolicy('staff_insert_consultation_sessions', {
			for: 'insert',
			to: 'authenticated',
			withCheck: isStaff,
		}),
		pgPolicy('staff_update_consultation_sessions', {
			for: 'update',
			to: 'authenticated',
			using: isStaff,
			withCheck: isStaff,
		}),
		pgPolicy('admin_delete_consultation_sessions', {
			for: 'delete',
			to: 'authenticated',
			using: isAdmin,
		}),
	],
).enableRLS();

export const consultation_session_summary = pgTable(
	'consultation_session_summary',
	{
		id: uuid('id').defaultRandom().primaryKey(),
		consultationSessionId: uuid('consultation_session_id')
			.notNull()
			.references(() => consultation_sessions.id, { onDelete: 'cascade' }),
		consultantId: uuid('consultant_id')
			.notNull()
			.references(() => consultants.id),
		title: text('title').notNull(),
		summary: text('summary').notNull(),
		createdAt: timestamp('created_at').defaultNow(),
		updatedAt: timestamp('updated_at').defaultNow(),
	},
	() => [
		pgPolicy('staff_select_consultation_session_summary', {
			for: 'select',
			to: 'authenticated',
			using: isStaff,
		}),
		pgPolicy('staff_insert_consultation_session_summary', {
			for: 'insert',
			to: 'authenticated',
			withCheck: isStaff,
		}),
		pgPolicy('staff_update_consultation_session_summary', {
			for: 'update',
			to: 'authenticated',
			using: isStaff,
			withCheck: isStaff,
		}),
		pgPolicy('admin_delete_consultation_session_summary', {
			for: 'delete',
			to: 'authenticated',
			using: isAdmin,
		}),
	],
).enableRLS();

export const reviews = pgTable(
	'reviews',
	{
		id: uuid('id').defaultRandom().primaryKey(),
		engagementQuality: varchar('engagement_quality', { length: 10 }).notNull(),
		fullName: text('fullName').notNull(),
		role: text('role').notNull(),
		organisation: text('organisation').notNull(),
		social: text('social').notNull(),
		feedback: text('feedback').notNull(),
		createdAt: timestamp('created_at').defaultNow(),
	},
	() => [
		pgPolicy('public_select_reviews', {
			for: 'select',
			to: ['anon', 'authenticated'],
			using: publicAccess,
		}),
		pgPolicy('public_insert_reviews', {
			for: 'insert',
			to: ['anon', 'authenticated'],
			withCheck: publicAccess,
		}),
		pgPolicy('admin_delete_reviews', {
			for: 'delete',
			to: 'authenticated',
			using: isAdmin,
		}),
	],
).enableRLS();

export const consultants = pgTable(
	'consultants',
	{
		id: uuid('id').primaryKey(),
		fullName: text('full_name').notNull(),
		email: varchar('email', { length: 256 }).unique().notNull(),
		role: varchar('role', { length: 256 }).notNull().default('consultant'),
		phoneNumber: text('phone_no').notNull(),
		createdAt: timestamp('created_at').defaultNow(),
		updatedAt: timestamp('updated_at').defaultNow(),
	},
	() => [
		pgPolicy('staff_select_consultants', {
			for: 'select',
			to: 'authenticated',
			using: isStaff,
		}),
		pgPolicy('admin_insert_consultants', {
			for: 'insert',
			to: 'authenticated',
			withCheck: isAdmin,
		}),
		pgPolicy('admin_update_consultants', {
			for: 'update',
			to: 'authenticated',
			using: isAdmin,
			withCheck: isAdmin,
		}),
		pgPolicy('admin_delete_consultants', {
			for: 'delete',
			to: 'authenticated',
			using: isAdmin,
		}),
	],
).enableRLS();

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
