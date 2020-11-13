
ALTER TABLE "public"."yazali" ALTER COLUMN "otp" DROP NOT NULL;
ALTER TABLE "public"."yazali" DROP CONSTRAINT "yazali_otp_key";
alter table "public"."yazali" rename column "phone" to "otp";

ALTER TABLE "public"."yazali" ADD COLUMN "loan_amount" float8;
ALTER TABLE "public"."yazali" ALTER COLUMN "loan_amount" DROP NOT NULL;

alter table "public"."yazali" drop constraint "yazali_status_fkey";

DROP TABLE "public"."yazali_status";

DROP TABLE "public"."yazali";
