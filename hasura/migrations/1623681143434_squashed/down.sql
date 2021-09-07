
DROP TRIGGER IF EXISTS "set_public_update_log_updated_at" ON "public"."update_log";
ALTER TABLE "public"."update_log" DROP COLUMN "updated_at";

ALTER TABLE "public"."update_log" ADD COLUMN "created_at" timestamptz;
ALTER TABLE "public"."update_log" ALTER COLUMN "created_at" DROP NOT NULL;
ALTER TABLE "public"."update_log" ALTER COLUMN "created_at" SET DEFAULT now();

ALTER TABLE "public"."update_log" DROP COLUMN "created_at";

ALTER TABLE "public"."update_log" ALTER COLUMN "repayment_id" SET NOT NULL;

ALTER TABLE "public"."loan" ALTER COLUMN "wallet_id" TYPE uuid;

ALTER TABLE "public"."update_log" DROP COLUMN "new_interest_paid";

ALTER TABLE "public"."loan" DROP COLUMN "created_at";

alter table "public"."loan" rename column "wallet_id" to "walletId";

ALTER TABLE "public"."loan" DROP COLUMN "walletId";

alter table "public"."credit_line" rename to "creditLine";

ALTER TABLE "public"."update_log" DROP COLUMN "new_principal_overdue";

ALTER TABLE ONLY "public"."loan" ALTER COLUMN "principal_remaining" DROP DEFAULT;

ALTER TABLE ONLY "public"."loan" ALTER COLUMN "interest_paid" DROP DEFAULT;

ALTER TABLE "public"."loan" DROP COLUMN "principal_overdue";

alter table "public"."repayment" drop constraint "repayment_loan_id_fkey",
          add constraint "repayment_loan_id_fkey"
          foreign key ("loan_id")
          references "public"."loan"
          ("loan_id")
          on update restrict
          on delete restrict;

alter table "public"."update_log" drop constraint "update_log_loan_id_fkey",
          add constraint "update_log_loan_id_fkey"
          foreign key ("loan_id")
          references "public"."loan"
          ("loan_id")
          on update restrict
          on delete restrict;

ALTER TABLE "public"."update_log" ALTER COLUMN "new_next_payment_amount" SET NOT NULL;

ALTER TABLE "public"."update_log" ALTER COLUMN "new_next_payment_due_date" SET NOT NULL;

ALTER TABLE "public"."update_log" ALTER COLUMN "new_state" SET NOT NULL;

ALTER TABLE "public"."update_log" ALTER COLUMN "new_penalty_accrued" SET NOT NULL;

ALTER TABLE "public"."update_log" ALTER COLUMN "new_interest_accrued" SET NOT NULL;

ALTER TABLE "public"."update_log" ALTER COLUMN "new_principal_remain" SET NOT NULL;

ALTER TABLE ONLY "public"."repayment" ALTER COLUMN "date" SET DEFAULT now();

ALTER TABLE ONLY "public"."repayment" ALTER COLUMN "date" DROP DEFAULT;

alter table "public"."lender_amount" drop constraint "lender_amount_loan_id_fkey",
          add constraint "lender_amount_loan_id_fkey"
          foreign key ("loan_id")
          references "public"."loan"
          ("loan_id")
          on update restrict
          on delete restrict;

alter table "public"."loan" drop constraint "loan_loan_request_fkey",
          add constraint "loan_loan_request_fkey"
          foreign key ("loan_request")
          references "public"."loan_request"
          ("request_id")
          on update restrict
          on delete restrict;

ALTER TABLE "public"."loan_request" DROP COLUMN "created_at";

ALTER TABLE "public"."loan" DROP COLUMN "next_payment_due_date";

ALTER TABLE "public"."loan" ADD COLUMN "next_payment_due_date" float8;
ALTER TABLE "public"."loan" ALTER COLUMN "next_payment_due_date" DROP NOT NULL;

alter table "public"."loan_request" rename column "borrower_id" to "borrower";

ALTER TABLE ONLY "public"."loan_request" ALTER COLUMN "state" DROP DEFAULT;

ALTER TABLE "public"."loan_request" DROP COLUMN "purpose";

DROP TABLE "public"."repayment";

alter table "public"."update_log" drop constraint "update_log_type_fkey";

DROP TABLE "public"."update_type";

DROP TABLE "public"."update_log";

ALTER TABLE "public"."loan" DROP COLUMN "next_payment_due_date";

ALTER TABLE "public"."loan" DROP COLUMN "next_payment_amount";

alter table "public"."loan" rename column "interest_accrued" to "interest_remaining";

ALTER TABLE ONLY "public"."loan_request" ALTER COLUMN "request_id" DROP DEFAULT;

DROP TABLE "public"."lender_amount";

alter table "public"."loan" drop constraint "loan_state_fkey";

DROP TABLE "public"."loan_state";

DROP TABLE "public"."loan";

alter table "public"."loan_request" drop constraint "loan_request_state_fkey";

DROP TABLE "public"."loan_request_state";

DROP TABLE "public"."loan_request";

ALTER TABLE "public"."user" DROP COLUMN "last_name";

DROP TABLE "public"."user_type";

ALTER TABLE "public"."user" ADD COLUMN "min_interest_rate" float4;
ALTER TABLE "public"."user" ALTER COLUMN "min_interest_rate" DROP NOT NULL;

ALTER TABLE "public"."user" ADD COLUMN "max_exposure" float4;
ALTER TABLE "public"."user" ALTER COLUMN "max_exposure" DROP NOT NULL;

ALTER TABLE "public"."user" ADD COLUMN "corpus_share" float8;
ALTER TABLE "public"."user" ALTER COLUMN "corpus_share" DROP NOT NULL;
ALTER TABLE "public"."user" ALTER COLUMN "corpus_share" SET DEFAULT 0;

ALTER TABLE "public"."user" ADD COLUMN "user_number" int4;
ALTER TABLE "public"."user" ALTER COLUMN "user_number" DROP NOT NULL;
ALTER TABLE "public"."user" ADD CONSTRAINT user_user_number_key UNIQUE (user_number);
ALTER TABLE "public"."user" ALTER COLUMN "user_number" SET DEFAULT nextval('user_user_number_seq'::regclass);

ALTER TABLE "public"."user" ADD COLUMN "roi" jsonb;
ALTER TABLE "public"."user" ALTER COLUMN "roi" DROP NOT NULL;
ALTER TABLE "public"."user" ALTER COLUMN "roi" SET DEFAULT jsonb_build_object();

alter table "public"."user" rename column "first_name" to "name";

alter table "public"."creditLine" rename column "investor_id" to "investor";

alter table "public"."creditLine" rename column "borrower_id" to "borrower";

DROP TABLE "public"."creditLine";
