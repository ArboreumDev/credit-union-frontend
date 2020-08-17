ALTER TABLE "public"."transactions" ADD COLUMN "tx_number" bpchar;
ALTER TABLE "public"."transactions" ALTER COLUMN "tx_number" DROP NOT NULL;
ALTER TABLE "public"."transactions" ALTER COLUMN "tx_number" SET DEFAULT gen_random_uuid();
