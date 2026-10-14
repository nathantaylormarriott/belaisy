CREATE TABLE "bookings" (
	"id" serial PRIMARY KEY,
	"client_name" varchar(160) NOT NULL,
	"phone" varchar(40) DEFAULT '' NOT NULL,
	"service" varchar(160) DEFAULT '' NOT NULL,
	"staff_id" varchar(40),
	"starts_at" timestamp with time zone,
	"duration_minutes" integer DEFAULT 60 NOT NULL,
	"status" varchar(20) DEFAULT 'requested' NOT NULL,
	"notes" text DEFAULT '' NOT NULL,
	"source" varchar(20) DEFAULT 'calendar' NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE INDEX "bookings_starts_at_idx" ON "bookings" ("starts_at");