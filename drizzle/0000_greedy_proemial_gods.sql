CREATE TABLE "clients" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"full_name" text NOT NULL,
	"email" varchar(256),
	"phone_no" text NOT NULL,
	"created_at" timestamp DEFAULT now(),
	CONSTRAINT "clients_email_unique" UNIQUE("email")
);
--> statement-breakpoint
ALTER TABLE "clients" ENABLE ROW LEVEL SECURITY;--> statement-breakpoint
CREATE TABLE "consultants" (
	"id" uuid PRIMARY KEY NOT NULL,
	"full_name" text NOT NULL,
	"email" varchar(256) NOT NULL,
	"role" varchar(256) DEFAULT 'consultant' NOT NULL,
	"phone_no" text NOT NULL,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now(),
	CONSTRAINT "consultants_email_unique" UNIQUE("email")
);
--> statement-breakpoint
ALTER TABLE "consultants" ENABLE ROW LEVEL SECURITY;--> statement-breakpoint
CREATE TABLE "consultation_session_summary" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"consultation_session_id" uuid NOT NULL,
	"consultant_id" uuid NOT NULL,
	"title" text NOT NULL,
	"summary" text NOT NULL,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
ALTER TABLE "consultation_session_summary" ENABLE ROW LEVEL SECURITY;--> statement-breakpoint
CREATE TABLE "consultation_sessions" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"client_id" uuid NOT NULL,
	"category" varchar(256) NOT NULL,
	"status" varchar(256) DEFAULT 'pending' NOT NULL,
	"onBoarding_details" jsonb NOT NULL,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
ALTER TABLE "consultation_sessions" ENABLE ROW LEVEL SECURITY;--> statement-breakpoint
CREATE TABLE "reviews" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"engagement_quality" varchar(10) NOT NULL,
	"fullName" text NOT NULL,
	"role" text NOT NULL,
	"organisation" text NOT NULL,
	"social" text NOT NULL,
	"feedback" text NOT NULL,
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
ALTER TABLE "reviews" ENABLE ROW LEVEL SECURITY;--> statement-breakpoint
ALTER TABLE "consultation_session_summary" ADD CONSTRAINT "consultation_session_summary_consultation_session_id_consultation_sessions_id_fk" FOREIGN KEY ("consultation_session_id") REFERENCES "public"."consultation_sessions"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "consultation_session_summary" ADD CONSTRAINT "consultation_session_summary_consultant_id_consultants_id_fk" FOREIGN KEY ("consultant_id") REFERENCES "public"."consultants"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "consultation_sessions" ADD CONSTRAINT "consultation_sessions_client_id_clients_id_fk" FOREIGN KEY ("client_id") REFERENCES "public"."clients"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE POLICY "staff_select_clients" ON "clients" AS PERMISSIVE FOR SELECT TO "authenticated" USING ((auth.jwt() -> 'app_metadata' ->> 'user_role') in ('admin', 'consultant'));--> statement-breakpoint
CREATE POLICY "staff_insert_clients" ON "clients" AS PERMISSIVE FOR INSERT TO "authenticated" WITH CHECK ((auth.jwt() -> 'app_metadata' ->> 'user_role') in ('admin', 'consultant'));--> statement-breakpoint
CREATE POLICY "staff_update_clients" ON "clients" AS PERMISSIVE FOR UPDATE TO "authenticated" USING ((auth.jwt() -> 'app_metadata' ->> 'user_role') in ('admin', 'consultant')) WITH CHECK ((auth.jwt() -> 'app_metadata' ->> 'user_role') in ('admin', 'consultant'));--> statement-breakpoint
CREATE POLICY "admin_delete_clients" ON "clients" AS PERMISSIVE FOR DELETE TO "authenticated" USING ((auth.jwt() -> 'app_metadata' ->> 'user_role') = 'admin');--> statement-breakpoint
CREATE POLICY "staff_select_consultants" ON "consultants" AS PERMISSIVE FOR SELECT TO "authenticated" USING ((auth.jwt() -> 'app_metadata' ->> 'user_role') in ('admin', 'consultant'));--> statement-breakpoint
CREATE POLICY "admin_insert_consultants" ON "consultants" AS PERMISSIVE FOR INSERT TO "authenticated" WITH CHECK ((auth.jwt() -> 'app_metadata' ->> 'user_role') = 'admin');--> statement-breakpoint
CREATE POLICY "admin_update_consultants" ON "consultants" AS PERMISSIVE FOR UPDATE TO "authenticated" USING ((auth.jwt() -> 'app_metadata' ->> 'user_role') = 'admin') WITH CHECK ((auth.jwt() -> 'app_metadata' ->> 'user_role') = 'admin');--> statement-breakpoint
CREATE POLICY "admin_delete_consultants" ON "consultants" AS PERMISSIVE FOR DELETE TO "authenticated" USING ((auth.jwt() -> 'app_metadata' ->> 'user_role') = 'admin');--> statement-breakpoint
CREATE POLICY "staff_select_consultation_session_summary" ON "consultation_session_summary" AS PERMISSIVE FOR SELECT TO "authenticated" USING ((auth.jwt() -> 'app_metadata' ->> 'user_role') in ('admin', 'consultant'));--> statement-breakpoint
CREATE POLICY "staff_insert_consultation_session_summary" ON "consultation_session_summary" AS PERMISSIVE FOR INSERT TO "authenticated" WITH CHECK ((auth.jwt() -> 'app_metadata' ->> 'user_role') in ('admin', 'consultant'));--> statement-breakpoint
CREATE POLICY "staff_update_consultation_session_summary" ON "consultation_session_summary" AS PERMISSIVE FOR UPDATE TO "authenticated" USING ((auth.jwt() -> 'app_metadata' ->> 'user_role') in ('admin', 'consultant')) WITH CHECK ((auth.jwt() -> 'app_metadata' ->> 'user_role') in ('admin', 'consultant'));--> statement-breakpoint
CREATE POLICY "admin_delete_consultation_session_summary" ON "consultation_session_summary" AS PERMISSIVE FOR DELETE TO "authenticated" USING ((auth.jwt() -> 'app_metadata' ->> 'user_role') = 'admin');--> statement-breakpoint
CREATE POLICY "staff_select_consultation_sessions" ON "consultation_sessions" AS PERMISSIVE FOR SELECT TO "authenticated" USING ((auth.jwt() -> 'app_metadata' ->> 'user_role') in ('admin', 'consultant'));--> statement-breakpoint
CREATE POLICY "staff_insert_consultation_sessions" ON "consultation_sessions" AS PERMISSIVE FOR INSERT TO "authenticated" WITH CHECK ((auth.jwt() -> 'app_metadata' ->> 'user_role') in ('admin', 'consultant'));--> statement-breakpoint
CREATE POLICY "staff_update_consultation_sessions" ON "consultation_sessions" AS PERMISSIVE FOR UPDATE TO "authenticated" USING ((auth.jwt() -> 'app_metadata' ->> 'user_role') in ('admin', 'consultant')) WITH CHECK ((auth.jwt() -> 'app_metadata' ->> 'user_role') in ('admin', 'consultant'));--> statement-breakpoint
CREATE POLICY "admin_delete_consultation_sessions" ON "consultation_sessions" AS PERMISSIVE FOR DELETE TO "authenticated" USING ((auth.jwt() -> 'app_metadata' ->> 'user_role') = 'admin');--> statement-breakpoint
CREATE POLICY "public_select_reviews" ON "reviews" AS PERMISSIVE FOR SELECT TO "anon", "authenticated" USING (true);--> statement-breakpoint
CREATE POLICY "public_insert_reviews" ON "reviews" AS PERMISSIVE FOR INSERT TO "anon", "authenticated" WITH CHECK (true);--> statement-breakpoint
CREATE POLICY "admin_delete_reviews" ON "reviews" AS PERMISSIVE FOR DELETE TO "authenticated" USING ((auth.jwt() -> 'app_metadata' ->> 'user_role') = 'admin');