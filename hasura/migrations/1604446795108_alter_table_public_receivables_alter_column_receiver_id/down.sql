ALTER TABLE "public"."receivables" ALTER COLUMN "receiver_id" TYPE uuid;
alter table "public"."receivables" rename column "receiver" to "receiver_id";
