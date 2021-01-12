DROP TABLE public.edges CASCADE;
DROP TABLE public.encumbrances CASCADE;
DROP TABLE public.supporters CASCADE;
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
DROP TYPE public.supporter_status CASCADE;

DROP FUNCTION public.set_current_timestamp_updated_at CASCADE;