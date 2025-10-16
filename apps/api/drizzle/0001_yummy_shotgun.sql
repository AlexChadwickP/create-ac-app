ALTER TABLE "users" DROP CONSTRAINT "users_email_unique";--> statement-breakpoint
ALTER TABLE "users" ALTER COLUMN "name" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "users" ALTER COLUMN "created_at" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "authentik_id" text NOT NULL;--> statement-breakpoint
ALTER TABLE "users" DROP COLUMN IF EXISTS "password_hash";--> statement-breakpoint
ALTER TABLE "users" DROP COLUMN IF EXISTS "is_active";--> statement-breakpoint
ALTER TABLE "users" DROP COLUMN IF EXISTS "updated_at";--> statement-breakpoint
ALTER TABLE "users" ADD CONSTRAINT "users_authentik_id_unique" UNIQUE("authentik_id");