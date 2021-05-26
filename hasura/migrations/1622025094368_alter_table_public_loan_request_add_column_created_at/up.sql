ALTER TABLE "public"."loan_request" ADD COLUMN "created_at" timestamptz NULL DEFAULT now();
