
CREATE EXTENSION IF NOT EXISTS pgcrypto;
CREATE TABLE "public"."events"("id" uuid NOT NULL DEFAULT gen_random_uuid(), "created_at" timestamptz NOT NULL DEFAULT now(), "headers" jsonb, "event" jsonb, PRIMARY KEY ("id") , UNIQUE ("id"));
