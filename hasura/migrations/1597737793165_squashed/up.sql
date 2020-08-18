

ALTER TABLE ONLY "public"."receivables" ALTER COLUMN "receive_frequency" SET DEFAULT 1;

ALTER TABLE "public"."receivables" ALTER COLUMN "due_date" DROP NOT NULL;

ALTER TABLE ONLY "public"."receivables" ALTER COLUMN "status" SET DEFAULT 'outstanding';

ALTER TABLE "public"."receivables" ALTER COLUMN "encumbrance_id" DROP NOT NULL;

ALTER TABLE ONLY "public"."payables" ALTER COLUMN "payable_type" SET DEFAULT 'cash';

ALTER TABLE ONLY "public"."payables" ALTER COLUMN "pay_priority" SET DEFAULT 1;

ALTER TABLE "public"."payables" ALTER COLUMN "due_date" DROP NOT NULL;

alter table "public"."payables" drop constraint "payables_payable_type_fkey",
             add constraint "payables_payable_type_fkey"
             foreign key ("payable_type")
             references "public"."payable_type"
             ("value") on update restrict on delete restrict;

alter table "public"."payables" drop constraint "payables_payable_type_fkey";

ALTER TABLE "public"."receivables" ALTER COLUMN "last_received" DROP NOT NULL;

alter table "public"."guarantors" rename column "amount" to "guarantor_amount";

ALTER TABLE "public"."payables" ADD COLUMN "pay_frequency" integer NULL DEFAULT 1;

ALTER TABLE "public"."payables" ALTER COLUMN "amount_total" TYPE float8;

ALTER TABLE "public"."payables" ALTER COLUMN "amount_paid" TYPE float8;

ALTER TABLE "public"."payables" ALTER COLUMN "amount_remain" TYPE float8;

ALTER TABLE "public"."receivables" ALTER COLUMN "amount_total" TYPE numeric;

ALTER TABLE "public"."receivables" ALTER COLUMN "amount_total" TYPE float8;

ALTER TABLE "public"."receivables" ALTER COLUMN "amount_received" TYPE numeric;

ALTER TABLE "public"."receivables" ALTER COLUMN "amount_received" TYPE numeric;

ALTER TABLE "public"."receivables" ALTER COLUMN "amount_received" TYPE float8;

ALTER TABLE "public"."receivables" ALTER COLUMN "amount_remain" TYPE float8;

ALTER TABLE "public"."loan_participants" ALTER COLUMN "lender_amount" TYPE float8;

CREATE EXTENSION IF NOT EXISTS pgcrypto;
CREATE TABLE "public"."transactions"("tx_id" uuid NOT NULL DEFAULT gen_random_uuid(), "from" uuid NOT NULL, "to" uuid NOT NULL, "loan_id" uuid NOT NULL, "amount" float8 NOT NULL, "status" text NOT NULL DEFAULT 'initiated', "comment" text, "data" jsonb DEFAULT jsonb_build_object(), PRIMARY KEY ("tx_id") , FOREIGN KEY ("from") REFERENCES "public"."user"("id") ON UPDATE restrict ON DELETE restrict, FOREIGN KEY ("to") REFERENCES "public"."user"("id") ON UPDATE restrict ON DELETE restrict, FOREIGN KEY ("loan_id") REFERENCES "public"."loan_requests"("request_id") ON UPDATE restrict ON DELETE restrict);

alter table "public"."transactions" drop constraint "transactions_to_fkey";

alter table "public"."transactions" drop constraint "transactions_from_fkey";

ALTER TABLE "public"."transactions" DROP COLUMN "to" CASCADE;

ALTER TABLE "public"."transactions" ALTER COLUMN "from" TYPE text;
ALTER TABLE "public"."transactions" ADD CONSTRAINT "transactions_from_key" UNIQUE ("from");
alter table "public"."transactions" rename column "from" to "tx_name";

alter table "public"."transactions" rename column "tx_name" to "name";

ALTER TABLE "public"."transactions" DROP COLUMN "amount" CASCADE;

ALTER TABLE "public"."transactions" ALTER COLUMN "tx_id" TYPE text;

alter table "public"."transactions" drop constraint "transactions_pkey";

ALTER TABLE "public"."transactions" ALTER COLUMN "tx_id" TYPE bpchar;
alter table "public"."transactions" rename column "tx_id" to "tx_number";

ALTER TABLE "public"."transactions" DROP COLUMN "tx_number" CASCADE;

ALTER TABLE "public"."transactions" ADD COLUMN "tx_nonce" serial NOT NULL UNIQUE;
