CREATE EXTENSION IF NOT EXISTS pgcrypto;
CREATE TABLE "public"."repayment"("repayment_id" uuid NOT NULL DEFAULT gen_random_uuid(), "loan_id" uuid NOT NULL, "repaid_principal" float8 NOT NULL, "repaid_interest" float8 NOT NULL, "date" date NOT NULL, PRIMARY KEY ("repayment_id") , FOREIGN KEY ("loan_id") REFERENCES "public"."loan"("loan_id") ON UPDATE restrict ON DELETE restrict);
