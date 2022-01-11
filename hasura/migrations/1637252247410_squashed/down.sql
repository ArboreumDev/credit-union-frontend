
alter table "public"."repayment" rename column "algorand_tx_id" to "algo_tx_id";

ALTER TABLE "public"."repayment" DROP COLUMN "algo_tx_id";

ALTER TABLE "public"."loan" DROP COLUMN "asset_id";
