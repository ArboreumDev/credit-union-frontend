



ALTER TABLE "public"."payables" ADD COLUMN "pay_frequency" integer NULL DEFAULT 1;

ALTER TABLE "public"."user" ADD COLUMN "corpus_share" float8 NULL;

ALTER TABLE "public"."user" ALTER COLUMN "balance" TYPE float8;

ALTER TABLE "public"."receivables" ALTER COLUMN "amount_total" TYPE float8;

ALTER TABLE "public"."receivables" ALTER COLUMN "amount_remain" TYPE float8;

ALTER TABLE "public"."receivables" ALTER COLUMN "amount_received" TYPE float8;

alter table "public"."receivables" drop constraint "receivables_pkey";
alter table "public"."receivables"
    add constraint "receivables_pkey" 
    primary key ( "loan_id" );

ALTER TABLE "public"."receivables" ALTER COLUMN "receiver_id" DROP NOT NULL;

ALTER TABLE "public"."receivables" ALTER COLUMN "receive_frequency" DROP NOT NULL;

ALTER TABLE "public"."receivables" ALTER COLUMN "due_date" DROP NOT NULL;

ALTER TABLE "public"."receivables" ALTER COLUMN "last_received" DROP NOT NULL;

ALTER TABLE "public"."receivables" ALTER COLUMN "status" DROP NOT NULL;

ALTER TABLE "public"."payables" ALTER COLUMN "amount_total" TYPE float8;

ALTER TABLE ONLY "public"."payables" ALTER COLUMN "pay_priority" SET DEFAULT 1;

ALTER TABLE "public"."payables" ALTER COLUMN "due_date" DROP NOT NULL;

ALTER TABLE "public"."payables" ALTER COLUMN "amount_remain" TYPE float8;

ALTER TABLE "public"."payables" ALTER COLUMN "amount_paid" TYPE float8;

alter table "public"."payables" drop constraint "payables_payable_type_fkey";

ALTER TABLE "public"."payables" DROP COLUMN "payable_type" CASCADE;

ALTER TABLE "public"."receivables" ALTER COLUMN "encumbrance_id" DROP NOT NULL;

ALTER TABLE ONLY "public"."user" ALTER COLUMN "corpus_share" SET DEFAULT 0;

alter table "public"."transactions" drop constraint "transactions_pkey";
alter table "public"."transactions"
    add constraint "transactions_pkey" 
    primary key ( "tx_nonce" );

ALTER TABLE "public"."transactions" ADD COLUMN "user_id" uuid NULL;

ALTER TABLE "public"."transactions" ALTER COLUMN "loan_id" DROP NOT NULL;

ALTER TABLE "public"."transactions" ADD COLUMN "created_at" timestamptz NULL DEFAULT now();

ALTER TABLE "public"."transactions" ADD COLUMN "updated_at" timestamptz NULL DEFAULT now();

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
CREATE TRIGGER "set_public_transactions_updated_at"
BEFORE UPDATE ON "public"."transactions"
FOR EACH ROW
EXECUTE PROCEDURE "public"."set_current_timestamp_updated_at"();
COMMENT ON TRIGGER "set_public_transactions_updated_at" ON "public"."transactions" 
IS 'trigger to set value of column "updated_at" to current timestamp on row update';

ALTER TABLE "public"."transactions" ADD COLUMN "total_amount" float8 NOT NULL;

alter table "public"."transactions" rename column "description" to "type";

ALTER TABLE "public"."transactions" ADD COLUMN "description" text NULL;
