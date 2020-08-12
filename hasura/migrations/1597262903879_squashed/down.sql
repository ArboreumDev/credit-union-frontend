
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
