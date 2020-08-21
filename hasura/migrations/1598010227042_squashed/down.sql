
ALTER TABLE ONLY "public"."user" ALTER COLUMN "corpus_share" DROP DEFAULT;


ALTER TABLE "public"."receivables" ALTER COLUMN "encumbrance_id" SET NOT NULL;

ALTER TABLE "public"."payables" ADD COLUMN "payable_type" text;
ALTER TABLE "public"."payables" ALTER COLUMN "payable_type" DROP NOT NULL;

alter table "public"."payables" add foreign key ("payable_type") references "public"."payable_type"("value") on update restrict on delete restrict;

ALTER TABLE "public"."payables" ALTER COLUMN "amount_paid" TYPE integer;

ALTER TABLE "public"."payables" ALTER COLUMN "amount_remain" TYPE integer;

ALTER TABLE "public"."payables" ALTER COLUMN "due_date" SET NOT NULL;

ALTER TABLE ONLY "public"."payables" ALTER COLUMN "pay_priority" DROP DEFAULT;

ALTER TABLE "public"."payables" ALTER COLUMN "amount_total" TYPE integer;

ALTER TABLE "public"."receivables" ALTER COLUMN "status" SET NOT NULL;

ALTER TABLE "public"."receivables" ALTER COLUMN "last_received" SET NOT NULL;

ALTER TABLE "public"."receivables" ALTER COLUMN "due_date" SET NOT NULL;

ALTER TABLE "public"."receivables" ALTER COLUMN "receive_frequency" SET NOT NULL;

ALTER TABLE "public"."receivables" ALTER COLUMN "receiver_id" SET NOT NULL;

alter table "public"."receivables" drop constraint "receivables_pkey";
alter table "public"."receivables"
    add constraint "receivables_pkey" 
    primary key ( "loan_id", "receiver_id" );

ALTER TABLE "public"."receivables" ALTER COLUMN "amount_received" TYPE integer;

ALTER TABLE "public"."receivables" ALTER COLUMN "amount_remain" TYPE integer;

ALTER TABLE "public"."receivables" ALTER COLUMN "amount_total" TYPE integer;

ALTER TABLE "public"."user" ALTER COLUMN "balance" TYPE integer;

ALTER TABLE "public"."user" DROP COLUMN "corpus_share";

ALTER TABLE "public"."payables" DROP COLUMN "pay_frequency";
