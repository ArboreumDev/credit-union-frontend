
ALTER TABLE "public"."loan_participants" ALTER COLUMN "lender_amount" TYPE float8;

ALTER TABLE "public"."loan_participants" DROP COLUMN "percentage" CASCADE;
