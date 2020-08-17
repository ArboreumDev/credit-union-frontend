ALTER TABLE "public"."transactions" ALTER COLUMN "from" TYPE uuid;
ALTER TABLE "public"."transactions" DROP CONSTRAINT "transactions_from_key";
alter table "public"."transactions" rename column "tx_name" to "from";
