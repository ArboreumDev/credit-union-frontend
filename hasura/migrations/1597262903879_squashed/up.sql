
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
