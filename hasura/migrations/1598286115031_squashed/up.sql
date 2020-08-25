alter table "public"."transactions" drop constraint "transactions_pkey";
alter table "public"."transactions"
    add constraint "transactions_pkey" 
    primary key ( "tx_nonce" );

ALTER TABLE "public"."transactions" ADD COLUMN "user_id" uuid NULL;

ALTER TABLE "public"."transactions" ALTER COLUMN "loan_id" DROP NOT NULL;

ALTER TABLE "public"."transactions" ADD COLUMN "created_at" timestamptz NULL DEFAULT now();

ALTER TABLE "public"."transactions" ADD COLUMN "updated_at" timestamptz NULL DEFAULT now();

CREATE OR REPLACE FUNCTION "public"."set_current_timestamp_updated_at"()
RETURNS TRIGGER AS $$
DECLARE
  _new record;
BEGIN
  _new := NEW;
  _new."updated_at" = NOW();
  RETURN _new;
END;
$$ LANGUAGE plpgsql;
CREATE TRIGGER "set_public_transactions_updated_at"
BEFORE UPDATE ON "public"."transactions"
FOR EACH ROW
EXECUTE PROCEDURE "public"."set_current_timestamp_updated_at"();
COMMENT ON TRIGGER "set_public_transactions_updated_at" ON "public"."transactions" 
IS 'trigger to set value of column "updated_at" to current timestamp on row update';

ALTER TABLE "public"."transactions" ADD COLUMN "total_amount" float8 NOT NULL;

alter table "public"."transactions" rename column "description" to "type";

ALTER TABLE "public"."transactions" ADD COLUMN "description" text NULL;

alter table "public"."transactions"
           add constraint "transactions_user_id_fkey"
           foreign key ("user_id")
           references "public"."user"
           ("id") on update restrict on delete restrict;

alter table "public"."transactions" rename column "total_amount" to "amount";
