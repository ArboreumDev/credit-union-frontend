CREATE TABLE public.user (
    id uuid DEFAULT public.gen_random_uuid() NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL,
    name character varying(40) NOT NULL,
    email character varying(40) NOT NULL,
    demographic_info jsonb DEFAULT jsonb_build_object(),
    phone character varying DEFAULT '+91-1231345432'::character varying NOT NULL
);

ALTER TABLE ONLY public."user"
    ADD CONSTRAINT user_email_key UNIQUE (email);
ALTER TABLE ONLY public."user"
    ADD CONSTRAINT user_pkey PRIMARY KEY (id);