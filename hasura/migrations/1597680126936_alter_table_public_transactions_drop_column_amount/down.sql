ALTER TABLE "public"."transactions" ADD COLUMN "amount" float8;
ALTER TABLE "public"."transactions" ALTER COLUMN "amount" DROP NOT NULL;
