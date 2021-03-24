
ALTER TABLE "public"."user" ADD COLUMN "roi" jsonb NULL DEFAULT jsonb_build_object();

ALTER TABLE "public"."user" ADD COLUMN "account_details" jsonb NULL;
