ALTER TABLE "public"."transactions" ALTER COLUMN "tx_id" TYPE bpchar;
alter table "public"."transactions" rename column "tx_id" to "tx_number";
