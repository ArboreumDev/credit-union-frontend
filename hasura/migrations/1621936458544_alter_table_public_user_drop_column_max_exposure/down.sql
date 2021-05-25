ALTER TABLE "public"."user" ADD COLUMN "max_exposure" float4;
ALTER TABLE "public"."user" ALTER COLUMN "max_exposure" DROP NOT NULL;
