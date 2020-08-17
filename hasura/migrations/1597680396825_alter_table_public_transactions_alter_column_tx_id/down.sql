ALTER TABLE "public"."transactions" ALTER COLUMN "tx_id" TYPE text;
alter table "public"."transactions" rename column "tx_number" to "tx_id";
