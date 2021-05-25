ALTER TABLE "public"."user" ADD COLUMN "roi" jsonb;
ALTER TABLE "public"."user" ALTER COLUMN "roi" DROP NOT NULL;
ALTER TABLE "public"."user" ALTER COLUMN "roi" SET DEFAULT jsonb_build_object();
