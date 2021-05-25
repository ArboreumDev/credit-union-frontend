ALTER TABLE "public"."loan" ADD COLUMN "next_payment_due_date" float8;
ALTER TABLE "public"."loan" ALTER COLUMN "next_payment_due_date" DROP NOT NULL;
