ALTER TABLE "public"."user" ADD COLUMN "min_interest_rate" float4;
ALTER TABLE "public"."user" ALTER COLUMN "min_interest_rate" DROP NOT NULL;
