ALTER TABLE "public"."transactions" ADD COLUMN "to" uuid;
ALTER TABLE "public"."transactions" ALTER COLUMN "to" DROP NOT NULL;
