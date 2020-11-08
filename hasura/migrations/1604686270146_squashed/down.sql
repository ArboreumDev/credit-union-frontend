
ALTER TABLE "public"."loan_participants" ADD COLUMN "percentage" float8;
ALTER TABLE "public"."loan_participants" ALTER COLUMN "percentage" DROP NOT NULL;

ALTER TABLE "public"."loan_participants" ALTER COLUMN "lender_amount" TYPE integer;
