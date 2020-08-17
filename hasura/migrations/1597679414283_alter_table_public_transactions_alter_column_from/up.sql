ALTER TABLE "public"."transactions" ALTER COLUMN "from" TYPE text;
ALTER TABLE "public"."transactions" ADD CONSTRAINT "transactions_from_key" UNIQUE ("from");
alter table "public"."transactions" rename column "from" to "tx_name";
