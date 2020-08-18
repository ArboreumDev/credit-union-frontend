
ALTER TABLE "public"."transactions" DROP COLUMN "tx_nonce";

ALTER TABLE "public"."transactions" ADD COLUMN "tx_number" bpchar;
ALTER TABLE "public"."transactions" ALTER COLUMN "tx_number" DROP NOT NULL;
ALTER TABLE "public"."transactions" ALTER COLUMN "tx_number" SET DEFAULT gen_random_uuid();

ALTER TABLE "public"."transactions" ALTER COLUMN "tx_id" TYPE text;
alter table "public"."transactions" rename column "tx_number" to "tx_id";

alter table "public"."transactions"
    add constraint "transactions_pkey" 
    primary key ( "tx_id" );

ALTER TABLE "public"."transactions" ALTER COLUMN "tx_id" TYPE uuid;

ALTER TABLE "public"."transactions" ADD COLUMN "amount" float8;
ALTER TABLE "public"."transactions" ALTER COLUMN "amount" DROP NOT NULL;

alter table "public"."transactions" rename column "name" to "tx_name";

ALTER TABLE "public"."transactions" ALTER COLUMN "from" TYPE uuid;
ALTER TABLE "public"."transactions" DROP CONSTRAINT "transactions_from_key";
alter table "public"."transactions" rename column "tx_name" to "from";

ALTER TABLE "public"."transactions" ADD COLUMN "to" uuid;
ALTER TABLE "public"."transactions" ALTER COLUMN "to" DROP NOT NULL;

alter table "public"."transactions" add foreign key ("from") references "public"."user"("id") on update restrict on delete restrict;

alter table "public"."transactions" add foreign key ("to") references "public"."user"("id") on update restrict on delete restrict;

DROP TABLE "public"."transactions";

ALTER TABLE "public"."loan_participants" ALTER COLUMN "lender_amount" TYPE integer;

ALTER TABLE "public"."receivables" ALTER COLUMN "amount_remain" TYPE integer;

ALTER TABLE "public"."receivables" ALTER COLUMN "amount_received" TYPE numeric;

ALTER TABLE "public"."receivables" ALTER COLUMN "amount_received" TYPE money;

ALTER TABLE "public"."receivables" ALTER COLUMN "amount_received" TYPE money;

ALTER TABLE "public"."receivables" ALTER COLUMN "amount_total" TYPE numeric;

ALTER TABLE "public"."receivables" ALTER COLUMN "amount_total" TYPE money;

ALTER TABLE "public"."payables" ALTER COLUMN "amount_remain" TYPE integer;

ALTER TABLE "public"."payables" ALTER COLUMN "amount_paid" TYPE integer;

ALTER TABLE "public"."payables" ALTER COLUMN "amount_total" TYPE numeric;

ALTER TABLE "public"."payables" DROP COLUMN "pay_frequency";

alter table "public"."guarantors" rename column "guarantor_amount" to "amount";


ALTER TABLE "public"."receivables" ALTER COLUMN "last_received" SET NOT NULL;

alter table "public"."payables" add foreign key ("payable_type") references "public"."payable_type"("value") on update restrict on delete restrict;

alter table "public"."payables" drop constraint "payables_payable_type_fkey",
          add constraint "payables_payable_type_fkey"
          foreign key ("payable_type")
          references "public"."payable_type"
          ("value")
          on update restrict
          on delete restrict;

ALTER TABLE "public"."payables" ALTER COLUMN "due_date" SET NOT NULL;

ALTER TABLE ONLY "public"."payables" ALTER COLUMN "pay_priority" DROP DEFAULT;

ALTER TABLE ONLY "public"."payables" ALTER COLUMN "payable_type" DROP DEFAULT;

ALTER TABLE "public"."receivables" ALTER COLUMN "encumbrance_id" SET NOT NULL;

ALTER TABLE ONLY "public"."receivables" ALTER COLUMN "status" DROP DEFAULT;

ALTER TABLE "public"."receivables" ALTER COLUMN "due_date" SET NOT NULL;

ALTER TABLE ONLY "public"."receivables" ALTER COLUMN "receive_frequency" DROP DEFAULT;
