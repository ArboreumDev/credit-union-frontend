
CREATE TABLE "public"."creditLine"("borrower" uuid NOT NULL, "investor" uuid NOT NULL, PRIMARY KEY ("borrower","investor") , FOREIGN KEY ("borrower") REFERENCES "public"."user"("id") ON UPDATE restrict ON DELETE restrict, FOREIGN KEY ("investor") REFERENCES "public"."user"("id") ON UPDATE restrict ON DELETE restrict);

alter table "public"."creditLine" rename column "borrower" to "borrower_id";

alter table "public"."creditLine" rename column "investor" to "investor_id";

DROP TABLE "public"."supporters";

DROP TABLE "public"."recommendation_risk";

DROP TABLE "public"."loan_participants";

DROP TABLE "public"."loan_requests";

alter table "public"."user" rename column "name" to "first_name";

ALTER TABLE "public"."user" DROP COLUMN "roi" CASCADE;

ALTER TABLE "public"."user" DROP COLUMN "user_number" CASCADE;

ALTER TABLE "public"."user" DROP COLUMN "corpus_share" CASCADE;

ALTER TABLE "public"."user" DROP COLUMN "max_exposure" CASCADE;

ALTER TABLE "public"."user" DROP COLUMN "min_interest_rate" CASCADE;

CREATE TABLE "public"."user_type"("value" text NOT NULL, "comment" text NOT NULL, PRIMARY KEY ("value") );

INSERT INTO user_type (value, comment) VALUES
  ('LENDER', 'invests money'),
  ('BORROWER', 'receives loans');
 
ALTER TABLE "public"."user" ADD COLUMN "last_name" text NULL;

CREATE TABLE "public"."loan_request"("request_id" uuid NOT NULL, "borrower" uuid NOT NULL, "amount" float8 NOT NULL, "state" text NOT NULL, PRIMARY KEY ("request_id") , FOREIGN KEY ("borrower") REFERENCES "public"."user"("id") ON UPDATE restrict ON DELETE restrict);

CREATE TABLE "public"."loan_request_state"("value" text NOT NULL, "comment" text NOT NULL, PRIMARY KEY ("value") );

INSERT INTO loan_request_state (value, comment) VALUES
  ('FULFILLED', 'final state: has been accepted and money was given to borrower'),
  ('REJECTED', 'final state: will not be funded'),
  ('WITHDRAWN', 'inactive'),
  ('ACTIVE', 'is waiting for lender/s to be funded'),
  ('EXPIRED', 'final state: no longer waiting for lender/s to be funded');
alter table "public"."loan_request"
           add constraint "loan_request_state_fkey"
           foreign key ("state")
           references "public"."loan_request_state"
           ("value") on update restrict on delete restrict;

CREATE EXTENSION IF NOT EXISTS pgcrypto;
CREATE TABLE "public"."loan"("loan_id" uuid NOT NULL DEFAULT gen_random_uuid(), "borrower" uuid NOT NULL, "state" text NOT NULL, "principal" float8 NOT NULL, "apr" float8 NOT NULL, "tenor" numeric NOT NULL, "compounding_frequency" numeric NOT NULL, "principal_remaining" float8 NOT NULL, "interest_paid" float8 NOT NULL, "interest_remaining" float8 NOT NULL, "penalty_apr" float8 NOT NULL, "loan_request" uuid NOT NULL, PRIMARY KEY ("loan_id") , FOREIGN KEY ("borrower") REFERENCES "public"."user"("id") ON UPDATE restrict ON DELETE restrict, FOREIGN KEY ("loan_request") REFERENCES "public"."loan_request"("request_id") ON UPDATE restrict ON DELETE restrict);

CREATE TABLE "public"."loan_state"("value" text NOT NULL, "comment" text NOT NULL, PRIMARY KEY ("value") );
INSERT INTO loan_state (value, comment) VALUES
  ('LIVE', 'is currently being repaid'),
  ('REPAID', 'final state: fully repaid'),
  ('DEFAULT', 'final state: will not be repaid');

alter table "public"."loan"
           add constraint "loan_state_fkey"
           foreign key ("state")
           references "public"."loan_state"
           ("value") on update restrict on delete restrict;

CREATE TABLE "public"."lender_amount"("loan_id" uuid NOT NULL, "lender_id" uuid NOT NULL, "amount_lent" float8 NOT NULL, PRIMARY KEY ("loan_id","lender_id") , FOREIGN KEY ("loan_id") REFERENCES "public"."loan"("loan_id") ON UPDATE restrict ON DELETE restrict, FOREIGN KEY ("lender_id") REFERENCES "public"."user"("id") ON UPDATE restrict ON DELETE restrict);

ALTER TABLE ONLY "public"."loan_request" ALTER COLUMN "request_id" SET DEFAULT gen_random_uuid();

alter table "public"."loan" rename column "interest_remaining" to "interest_accrued";

ALTER TABLE "public"."loan" ADD COLUMN "next_payment_amount" float8 NULL;

ALTER TABLE "public"."loan" ADD COLUMN "next_payment_due_date" float8 NULL;

CREATE EXTENSION IF NOT EXISTS pgcrypto;
CREATE TABLE "public"."update_log"("type" text NOT NULL, "date" timestamptz NOT NULL DEFAULT now(), "update_id" uuid NOT NULL DEFAULT gen_random_uuid(), "loan_id" uuid NOT NULL, "new_principal_remain" float8 NOT NULL, "new_interest_accrued" float8 NOT NULL, "new_penalty_accrued" float8 NOT NULL, "new_state" text NOT NULL, "new_next_payment_due_date" date NOT NULL, "new_next_payment_amount" float8 NOT NULL, "repayment_id" uuid NOT NULL, PRIMARY KEY ("update_id") , FOREIGN KEY ("loan_id") REFERENCES "public"."loan"("loan_id") ON UPDATE restrict ON DELETE restrict);

CREATE TABLE "public"."update_type"("value" text NOT NULL, "comment" text NOT NULL, PRIMARY KEY ("value") );

INSERT INTO update_type (value, comment) VALUES
  ('COMPOUND', 'whenever the compoungind period ends'),
  ('REPAYMENT', 'when a repayment is made'),
  ('PENALTY', 'when a penalty condition was true'),
  ('DEFAULT', 'when the loan is set to default');

alter table "public"."update_log"
           add constraint "update_log_type_fkey"
           foreign key ("type")
           references "public"."update_type"
           ("value") on update restrict on delete restrict;

CREATE EXTENSION IF NOT EXISTS pgcrypto;
CREATE TABLE "public"."repayment"("repayment_id" uuid NOT NULL DEFAULT gen_random_uuid(), "loan_id" uuid NOT NULL, "repaid_principal" float8 NOT NULL, "repaid_interest" float8 NOT NULL, "date" date NOT NULL, PRIMARY KEY ("repayment_id") , FOREIGN KEY ("loan_id") REFERENCES "public"."loan"("loan_id") ON UPDATE restrict ON DELETE restrict);

ALTER TABLE "public"."loan_request" ADD COLUMN "purpose" text NULL;

ALTER TABLE ONLY "public"."loan_request" ALTER COLUMN "state" SET DEFAULT 'ACTIVE';

alter table "public"."loan_request" rename column "borrower" to "borrower_id";

ALTER TABLE "public"."loan" DROP COLUMN "next_payment_due_date" CASCADE;

ALTER TABLE "public"."loan" ADD COLUMN "next_payment_due_date" timestamptz NULL;

ALTER TABLE "public"."loan_request" ADD COLUMN "created_at" timestamptz NULL DEFAULT now();

alter table "public"."loan" drop constraint "loan_loan_request_fkey",
             add constraint "loan_loan_request_fkey"
             foreign key ("loan_request")
             references "public"."loan_request"
             ("request_id") on update restrict on delete cascade;

alter table "public"."lender_amount" drop constraint "lender_amount_loan_id_fkey",
             add constraint "lender_amount_loan_id_fkey"
             foreign key ("loan_id")
             references "public"."loan"
             ("loan_id") on update restrict on delete cascade;

ALTER TABLE ONLY "public"."repayment" ALTER COLUMN "date" SET DEFAULT now();

ALTER TABLE "public"."repayment" ALTER COLUMN "date" DROP DEFAULT;

ALTER TABLE "public"."update_log" ALTER COLUMN "new_principal_remain" DROP NOT NULL;

ALTER TABLE "public"."update_log" ALTER COLUMN "new_interest_accrued" DROP NOT NULL;

ALTER TABLE "public"."update_log" ALTER COLUMN "new_penalty_accrued" DROP NOT NULL;

ALTER TABLE "public"."update_log" ALTER COLUMN "new_state" DROP NOT NULL;

ALTER TABLE "public"."update_log" ALTER COLUMN "new_next_payment_due_date" DROP NOT NULL;

ALTER TABLE "public"."update_log" ALTER COLUMN "new_next_payment_amount" DROP NOT NULL;

alter table "public"."update_log" drop constraint "update_log_loan_id_fkey",
             add constraint "update_log_loan_id_fkey"
             foreign key ("loan_id")
             references "public"."loan"
             ("loan_id") on update restrict on delete cascade;

alter table "public"."repayment" drop constraint "repayment_loan_id_fkey",
             add constraint "repayment_loan_id_fkey"
             foreign key ("loan_id")
             references "public"."loan"
             ("loan_id") on update restrict on delete cascade;

ALTER TABLE "public"."loan" ADD COLUMN "principal_overdue" float8 NULL DEFAULT 0;

ALTER TABLE ONLY "public"."loan" ALTER COLUMN "interest_paid" SET DEFAULT 0;

ALTER TABLE ONLY "public"."loan" ALTER COLUMN "principal_remaining" SET DEFAULT 0;

ALTER TABLE "public"."update_log" ADD COLUMN "new_principal_overdue" float8 NULL;

alter table "public"."creditLine" rename to "credit_line";

ALTER TABLE "public"."loan" ADD COLUMN "walletId" uuid NOT NULL UNIQUE;

alter table "public"."loan" rename column "walletId" to "wallet_id";

ALTER TABLE "public"."loan" ADD COLUMN "created_at" timestamptz NULL DEFAULT now();

ALTER TABLE "public"."update_log" ADD COLUMN "new_interest_paid" float8 NULL;

ALTER TABLE "public"."loan" ALTER COLUMN "wallet_id" TYPE text;

ALTER TABLE "public"."update_log" ALTER COLUMN "repayment_id" DROP NOT NULL;

ALTER TABLE "public"."update_log" ADD COLUMN "created_at" timestamptz NULL DEFAULT now();

ALTER TABLE "public"."update_log" DROP COLUMN "created_at" CASCADE;

ALTER TABLE "public"."update_log" ADD COLUMN "updated_at" timestamptz NULL DEFAULT now();

CREATE OR REPLACE FUNCTION "public"."set_current_timestamp_updated_at"()
RETURNS TRIGGER AS $$
DECLARE
  _new record;
BEGIN
  _new := NEW;
  _new."updated_at" = NOW();
  RETURN _new;
END;
$$ LANGUAGE plpgsql;
CREATE TRIGGER "set_public_update_log_updated_at"
BEFORE UPDATE ON "public"."update_log"
FOR EACH ROW
EXECUTE PROCEDURE "public"."set_current_timestamp_updated_at"();
COMMENT ON TRIGGER "set_public_update_log_updated_at" ON "public"."update_log" 
IS 'trigger to set value of column "updated_at" to current timestamp on row update';
