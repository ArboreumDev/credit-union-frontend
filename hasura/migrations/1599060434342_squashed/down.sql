
alter table "public"."recommendation_risk" rename column "recommender_id" to "neighbor_id";

alter table "public"."recommendation_risk" rename column "risk_params" to "recommendation_risk";

ALTER TABLE "public"."recommendation_risk" ALTER COLUMN "agent_id" SET NOT NULL;

ALTER TABLE ONLY "public"."recommendation_risk" ALTER COLUMN "recommendation_risk" SET DEFAULT jsonb_build_array();
ALTER TABLE "public"."recommendation_risk" ALTER COLUMN "recommendation_risk" SET NOT NULL;

alter table "public"."recommendation_risk" drop constraint "recommendation_risk_pkey";
alter table "public"."recommendation_risk"
    add constraint "risk_pkey" 
    primary key ( "neighbor_id", "agent_id" );


ALTER TABLE ONLY "public"."supporters" ALTER COLUMN "status" DROP DEFAULT;

ALTER TABLE ONLY "public"."supporters" ALTER COLUMN "participation_request_time" DROP DEFAULT;

ALTER TABLE ONLY "public"."supporters" ALTER COLUMN "invest_in_corpus" DROP DEFAULT;

ALTER TABLE "public"."supporters" ALTER COLUMN "pledge_amount" TYPE integer;

alter table "public"."supporters" rename column "pledge_amount" to "amount";

alter table "public"."supporters" rename column "supporter_id" to "guarantor_id";

alter table "public"."supporters" rename to "guarantors";

DROP TABLE public.edges CASCADE;
DROP TABLE public.encumbrance_participants CASCADE;
DROP TABLE public.encumbrances CASCADE;
DROP TABLE public.guarantors CASCADE;
DROP TABLE public.loan_participants CASCADE;
DROP TABLE public.loan_requests CASCADE;
DROP TABLE public.loan_risk CASCADE;
DROP TABLE public.payable_type CASCADE;
DROP TABLE public.payables CASCADE;
DROP TABLE public.receivables CASCADE;
DROP TABLE public.recommendation_risk CASCADE;
DROP TABLE public.user CASCADE;

DROP TYPE public.user_t CASCADE;
DROP TYPE public.edge_status CASCADE;
DROP TYPE public.loan_request_status CASCADE;

DROP FUNCTION public.set_current_timestamp_updated_at CASCADE;