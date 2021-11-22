ALTER TABLE "public"."loan" ADD COLUMN "wallet_id" text;
ALTER TABLE "public"."loan" ALTER COLUMN "wallet_id" DROP NOT NULL;
ALTER TABLE "public"."loan" ADD CONSTRAINT loan_walletId_key UNIQUE (wallet_id);
