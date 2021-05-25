ALTER TABLE ONLY "public"."loan_request" ALTER COLUMN "request_id" SET DEFAULT gen_random_uuid();
