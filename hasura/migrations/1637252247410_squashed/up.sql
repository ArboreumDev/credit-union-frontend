
ALTER TABLE "public"."loan" ADD COLUMN "asset_id" integer NULL;

ALTER TABLE "public"."repayment" ADD COLUMN "algo_tx_id" text NULL;

alter table "public"."repayment" rename column "algo_tx_id" to "algorand_tx_id";
