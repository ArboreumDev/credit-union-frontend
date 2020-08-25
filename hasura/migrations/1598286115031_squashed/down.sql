
alter table "public"."transactions" rename column "amount" to "total_amount";

alter table "public"."transactions" drop constraint "transactions_user_id_fkey";


ALTER TABLE "public"."transactions" DROP COLUMN "description";

alter table "public"."transactions" rename column "type" to "description";


ALTER TABLE "public"."transactions" DROP COLUMN "total_amount";

DROP TRIGGER IF EXISTS "set_public_transactions_updated_at" ON "public"."transactions";
ALTER TABLE "public"."transactions" DROP COLUMN "updated_at";

ALTER TABLE "public"."transactions" DROP COLUMN "created_at";

ALTER TABLE "public"."transactions" ALTER COLUMN "loan_id" SET NOT NULL;

ALTER TABLE "public"."transactions" DROP COLUMN "user_id";

alter table "public"."transactions" drop constraint "transactions_pkey";
alter table "public"."transactions"
    add constraint "transactions_pkey" 
    primary key ( "loan_id", "tx_nonce" );