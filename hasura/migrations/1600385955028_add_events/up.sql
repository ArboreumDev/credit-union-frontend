CREATE TABLE "public"."events"(
    "id" uuid NOT NULL DEFAULT gen_random_uuid(), 
    "created_at" timestamptz NOT NULL DEFAULT now(),
    "user_id" uuid, 
    "headers" jsonb, 
    "event" jsonb, 
    PRIMARY KEY ("id") , 
    UNIQUE ("id"));

ALTER TABLE ONLY public.events
    ADD CONSTRAINT user_id_fkey FOREIGN KEY (user_id) REFERENCES public."user"(id);