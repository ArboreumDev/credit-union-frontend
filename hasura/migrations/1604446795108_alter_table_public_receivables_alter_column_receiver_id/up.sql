ALTER TABLE "public"."receivables" ALTER COLUMN "receiver_id" TYPE text;
alter table "public"."receivables" rename column "receiver_id" to "receiver";
