
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
