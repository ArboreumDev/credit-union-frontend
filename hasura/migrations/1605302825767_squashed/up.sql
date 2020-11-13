
CREATE EXTENSION IF NOT EXISTS pgcrypto;
CREATE TABLE "public"."yazali"("id" uuid NOT NULL DEFAULT gen_random_uuid(), "data" jsonb NOT NULL DEFAULT jsonb_build_object(), "loan_amount" float8, "status" text NOT NULL DEFAULT 'initiated', "otp" text, "created_at" timestamptz NOT NULL DEFAULT now(), "updated_at" timestamptz NOT NULL DEFAULT now(), PRIMARY KEY ("id") );
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
CREATE TRIGGER "set_public_yazali_updated_at"
BEFORE UPDATE ON "public"."yazali"
FOR EACH ROW
EXECUTE PROCEDURE "public"."set_current_timestamp_updated_at"();
COMMENT ON TRIGGER "set_public_yazali_updated_at" ON "public"."yazali" 
IS 'trigger to set value of column "updated_at" to current timestamp on row update';

CREATE TABLE "public"."yazali_status"("value" text NOT NULL, "comment" text NOT NULL, PRIMARY KEY ("value") );

alter table "public"."yazali"
           add constraint "yazali_status_fkey"
           foreign key ("status")
           references "public"."yazali_status"
           ("value") on update restrict on delete restrict;

ALTER TABLE "public"."yazali" DROP COLUMN "loan_amount" CASCADE;

ALTER TABLE "public"."yazali" ALTER COLUMN "otp" SET NOT NULL;
ALTER TABLE "public"."yazali" ADD CONSTRAINT "yazali_otp_key" UNIQUE ("otp");
alter table "public"."yazali" rename column "otp" to "phone";
