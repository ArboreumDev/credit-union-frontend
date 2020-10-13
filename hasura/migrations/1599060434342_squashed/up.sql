

CREATE TYPE public.edge_status AS ENUM (
    'active',
    'awaiting_lender_confirmation',
    'awaiting_lender_signup',
    'awaiting_borrower_signup',
    'historic'
);
CREATE TYPE public.loan_request_status AS ENUM (
    'initiated',
    'awaiting_borrower_confirmation',
    'live',
    'in_payback',
    'defaulted',
    'settled'
);
CREATE TYPE public.user_t AS ENUM (
    'lender',
    'borrower'
);
CREATE TYPE public.supporter_status AS ENUM ( 
    'unknown',
    'rejected',
    'confirmed'
);
CREATE FUNCTION public.set_current_timestamp_updated_at() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
DECLARE
  _new record;
BEGIN
  _new := NEW;
  _new."updated_at" = NOW();
  RETURN _new;
END;
$$;
CREATE TABLE public.edges (
    edge_id uuid DEFAULT public.gen_random_uuid() NOT NULL,
    trust_amount integer DEFAULT 0,
    status public.edge_status,
    borrower_id uuid,
    lender_id uuid,
    other_user_email text
);
CREATE TABLE public.encumbrance_participants (
    encumbrance_id uuid NOT NULL,
    recipient_id uuid NOT NULL,
    percentage numeric NOT NULL
);
CREATE TABLE public.encumbrances (
    loan_id uuid NOT NULL,
    supporter_id uuid NOT NULL,
    encumbered_asset_type text NOT NULL,
    amount_total numeric NOT NULL,
    amount_paid numeric NOT NULL,
    amount_remain numeric NOT NULL,
    due_date date NOT NULL,
    pay_frequency integer NOT NULL,
    expected_dissolve_amount numeric NOT NULL,
    status text NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL,
    encumbrance_id uuid DEFAULT public.gen_random_uuid() NOT NULL
);
CREATE TABLE public.supporters (
    request_id uuid NOT NULL,
    supporter_id uuid NOT NULL,
    pledge_amount float8 NOT NULL,
    status text DEFAULT 'unknown' NOT NULL,
    invest_in_corpus boolean DEFAULT True NOT NULL,
    participation_request_time timestamp with time zone DEFAULT now() NOT NULL,
    guarantee_division jsonb DEFAULT jsonb_build_object(),
    info jsonb DEFAULT jsonb_build_object()
);
CREATE TABLE public.loan_participants (
    loan_id uuid NOT NULL,
    lender_id uuid NOT NULL,
    lender_amount integer NOT NULL,
    percentage integer
);
CREATE TABLE public.loan_requests (
    borrower_id uuid NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    amount integer NOT NULL,
    status public.loan_request_status DEFAULT 'initiated'::public.loan_request_status,
    request_id uuid DEFAULT public.gen_random_uuid() NOT NULL,
    purpose text,
    risk_calc_result jsonb,
    confirmation_date timestamp with time zone,
    payback_status text
);
CREATE TABLE public.loan_risk (
    request_id uuid NOT NULL,
    agent_id uuid NOT NULL,
    subjective_borrower_risk jsonb NOT NULL,
    demand_function jsonb NOT NULL,
    status text NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL
);
CREATE TABLE public.payable_type (
    value text NOT NULL,
    comment text
);
CREATE TABLE public.payables (
    loan_id uuid NOT NULL,
    pay_priority integer DEFAULT 1 NOT NULL,
    amount_total double precision NOT NULL,
    amount_paid double precision DEFAULT 0 NOT NULL,
    due_date time with time zone,
    last_paid time with time zone,
    created_at timestamp with time zone DEFAULT now(),
    updated_at timestamp with time zone DEFAULT now(),
    amount_remain double precision,
    pay_frequency integer DEFAULT 1
);
CREATE TABLE public.receivables (
    loan_id uuid NOT NULL,
    receiver_id uuid,
    encumbrance_id uuid,
    amount_total double precision NOT NULL,
    amount_received double precision DEFAULT 0 NOT NULL,
    amount_remain double precision NOT NULL,
    receive_frequency integer,
    due_date date,
    last_received timestamp with time zone,
    status text,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL
);
CREATE TABLE public.recommendation_risk (
    agent_id uuid NOT NULL,
    neighbor_id uuid NOT NULL,
    recommendation_risk jsonb DEFAULT jsonb_build_array() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL
);
CREATE TABLE public."user" (
    id uuid DEFAULT public.gen_random_uuid() NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL,
    name character varying(40) NOT NULL,
    email character varying(40) NOT NULL,
    min_interest_rate real,
    max_exposure real,
    user_type public.user_t NOT NULL,
    balance double precision DEFAULT 0,
    demographic_info jsonb DEFAULT jsonb_build_object(),
    phone character varying DEFAULT '+91-1231345432'::character varying NOT NULL,
    user_number integer NOT NULL,
    corpus_share double precision DEFAULT 0,
    kyc_approved boolean DEFAULT false
);
CREATE SEQUENCE public.user_user_number_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
ALTER SEQUENCE public.user_user_number_seq OWNED BY public."user".user_number;
ALTER TABLE ONLY public."user" ALTER COLUMN user_number SET DEFAULT nextval('public.user_user_number_seq'::regclass);
ALTER TABLE ONLY public.edges
    ADD CONSTRAINT edges_pkey PRIMARY KEY (edge_id);
ALTER TABLE ONLY public.encumbrances
    ADD CONSTRAINT encumbrances_pkey PRIMARY KEY (encumbrance_id);
ALTER TABLE ONLY public.encumbrance_participants
    ADD CONSTRAINT guarantee_participants_pkey PRIMARY KEY (encumbrance_id, recipient_id);
ALTER TABLE ONLY public.supporters
    ADD CONSTRAINT supporters_pkey PRIMARY KEY (request_id, supporter_id);
ALTER TABLE ONLY public.loan_participants
    ADD CONSTRAINT loan_participants_pkey PRIMARY KEY (loan_id, lender_id);
ALTER TABLE ONLY public.loan_requests
    ADD CONSTRAINT loan_requests_pkey PRIMARY KEY (request_id);
ALTER TABLE ONLY public.loan_risk
    ADD CONSTRAINT loan_risk_pkey PRIMARY KEY (request_id, agent_id);
ALTER TABLE ONLY public.payable_type
    ADD CONSTRAINT payable_type_pkey PRIMARY KEY (value);
ALTER TABLE ONLY public.payables
    ADD CONSTRAINT payables_pkey PRIMARY KEY (loan_id);
ALTER TABLE ONLY public.receivables
    ADD CONSTRAINT receivables_pkey PRIMARY KEY (loan_id);
ALTER TABLE ONLY public.recommendation_risk
    ADD CONSTRAINT risk_pkey PRIMARY KEY (agent_id, neighbor_id);
ALTER TABLE ONLY public."user"
    ADD CONSTRAINT user_email_key UNIQUE (email);
ALTER TABLE ONLY public."user"
    ADD CONSTRAINT user_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public."user"
    ADD CONSTRAINT user_user_number_key UNIQUE (user_number);
CREATE TRIGGER set_public_encumbrances_updated_at BEFORE UPDATE ON public.encumbrances FOR EACH ROW EXECUTE FUNCTION public.set_current_timestamp_updated_at();
COMMENT ON TRIGGER set_public_encumbrances_updated_at ON public.encumbrances IS 'trigger to set value of column "updated_at" to current timestamp on row update';
CREATE TRIGGER set_public_loan_risk_updated_at BEFORE UPDATE ON public.loan_risk FOR EACH ROW EXECUTE FUNCTION public.set_current_timestamp_updated_at();
COMMENT ON TRIGGER set_public_loan_risk_updated_at ON public.loan_risk IS 'trigger to set value of column "updated_at" to current timestamp on row update';
CREATE TRIGGER set_public_payables_updated_at BEFORE UPDATE ON public.payables FOR EACH ROW EXECUTE FUNCTION public.set_current_timestamp_updated_at();
COMMENT ON TRIGGER set_public_payables_updated_at ON public.payables IS 'trigger to set value of column "updated_at" to current timestamp on row update';
CREATE TRIGGER set_public_receivables_updated_at BEFORE UPDATE ON public.receivables FOR EACH ROW EXECUTE FUNCTION public.set_current_timestamp_updated_at();
COMMENT ON TRIGGER set_public_receivables_updated_at ON public.receivables IS 'trigger to set value of column "updated_at" to current timestamp on row update';
CREATE TRIGGER set_public_risk_updated_at BEFORE UPDATE ON public.recommendation_risk FOR EACH ROW EXECUTE FUNCTION public.set_current_timestamp_updated_at();
COMMENT ON TRIGGER set_public_risk_updated_at ON public.recommendation_risk IS 'trigger to set value of column "updated_at" to current timestamp on row update';
CREATE TRIGGER set_public_user_updated_at BEFORE UPDATE ON public."user" FOR EACH ROW EXECUTE FUNCTION public.set_current_timestamp_updated_at();
COMMENT ON TRIGGER set_public_user_updated_at ON public."user" IS 'trigger to set value of column "updated_at" to current timestamp on row update';
ALTER TABLE ONLY public.edges
    ADD CONSTRAINT edges_borrower_id_fkey FOREIGN KEY (borrower_id) REFERENCES public."user"(id);
ALTER TABLE ONLY public.edges
    ADD CONSTRAINT edges_lender_id_fkey FOREIGN KEY (lender_id) REFERENCES public."user"(id) ON UPDATE RESTRICT ON DELETE RESTRICT;
ALTER TABLE ONLY public.encumbrances
    ADD CONSTRAINT encumbrances_supporter_id_fkey FOREIGN KEY (supporter_id) REFERENCES public."user"(id) ON UPDATE RESTRICT ON DELETE RESTRICT;
ALTER TABLE ONLY public.encumbrances
    ADD CONSTRAINT encumbrances_loan_id_fkey FOREIGN KEY (loan_id) REFERENCES public.loan_requests(request_id) ON UPDATE RESTRICT ON DELETE RESTRICT;
ALTER TABLE ONLY public.encumbrance_participants
    ADD CONSTRAINT guarantee_participants_encumbrance_id_fkey FOREIGN KEY (encumbrance_id) REFERENCES public.encumbrances(encumbrance_id) ON UPDATE RESTRICT ON DELETE RESTRICT;
ALTER TABLE ONLY public.supporters
    ADD CONSTRAINT supporters_supporter_id_fkey FOREIGN KEY (supporter_id) REFERENCES public."user"(id) ON UPDATE RESTRICT ON DELETE RESTRICT;
ALTER TABLE ONLY public.supporters
    ADD CONSTRAINT supporters_request_id_fkey FOREIGN KEY (request_id) REFERENCES public.loan_requests(request_id) ON UPDATE RESTRICT ON DELETE RESTRICT;
ALTER TABLE ONLY public.loan_participants
    ADD CONSTRAINT loan_participants_lender_id_fkey FOREIGN KEY (lender_id) REFERENCES public."user"(id) ON UPDATE RESTRICT ON DELETE RESTRICT;
ALTER TABLE ONLY public.loan_participants
    ADD CONSTRAINT loan_participants_loan_id_fkey FOREIGN KEY (loan_id) REFERENCES public.loan_requests(request_id) ON UPDATE RESTRICT ON DELETE RESTRICT;
ALTER TABLE ONLY public.loan_requests
    ADD CONSTRAINT loan_requests_borrower_id_fkey FOREIGN KEY (borrower_id) REFERENCES public."user"(id) ON UPDATE RESTRICT ON DELETE RESTRICT;
ALTER TABLE ONLY public.loan_risk
    ADD CONSTRAINT loan_risk_agent_id_fkey FOREIGN KEY (agent_id) REFERENCES public."user"(id) ON UPDATE RESTRICT ON DELETE RESTRICT;
ALTER TABLE ONLY public.loan_risk
    ADD CONSTRAINT loan_risk_request_id_fkey FOREIGN KEY (request_id) REFERENCES public.loan_requests(request_id) ON UPDATE RESTRICT ON DELETE RESTRICT;
ALTER TABLE ONLY public.payables
    ADD CONSTRAINT payables_loan_id_fkey FOREIGN KEY (loan_id) REFERENCES public.loan_requests(request_id) ON UPDATE RESTRICT ON DELETE RESTRICT;
ALTER TABLE ONLY public.receivables
    ADD CONSTRAINT receivables_loan_id_fkey FOREIGN KEY (loan_id) REFERENCES public.loan_requests(request_id) ON UPDATE RESTRICT ON DELETE RESTRICT;
ALTER TABLE ONLY public.receivables
    ADD CONSTRAINT receivables_receiver_id_fkey FOREIGN KEY (receiver_id) REFERENCES public."user"(id) ON UPDATE RESTRICT ON DELETE RESTRICT;
ALTER TABLE ONLY public.recommendation_risk
    ADD CONSTRAINT risk_agent_id_fkey FOREIGN KEY (agent_id) REFERENCES public."user"(id) ON UPDATE RESTRICT ON DELETE RESTRICT;
ALTER TABLE ONLY public.recommendation_risk
    ADD CONSTRAINT risk_neighbor_id_fkey FOREIGN KEY (neighbor_id) REFERENCES public."user"(id) ON UPDATE RESTRICT ON DELETE RESTRICT;

alter table "public"."recommendation_risk" drop constraint "risk_pkey";
alter table "public"."recommendation_risk"
    add constraint "recommendation_risk_pkey" 
    primary key ( "neighbor_id" );

ALTER TABLE ONLY "public"."recommendation_risk" ALTER COLUMN "recommendation_risk" SET DEFAULT jsonb_build_object();
ALTER TABLE "public"."recommendation_risk" ALTER COLUMN "recommendation_risk" DROP NOT NULL;

ALTER TABLE "public"."recommendation_risk" ALTER COLUMN "agent_id" DROP NOT NULL;

alter table "public"."recommendation_risk" rename column "recommendation_risk" to "risk_params";

alter table "public"."recommendation_risk" rename column "neighbor_id" to "recommender_id";
