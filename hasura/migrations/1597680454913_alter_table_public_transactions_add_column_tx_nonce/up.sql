ALTER TABLE "public"."transactions" ADD COLUMN "tx_nonce" serial NOT NULL UNIQUE;
