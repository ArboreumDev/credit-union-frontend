ALTER TABLE "public"."user" ADD COLUMN "user_number" int4;
ALTER TABLE "public"."user" ALTER COLUMN "user_number" DROP NOT NULL;
ALTER TABLE "public"."user" ADD CONSTRAINT user_user_number_key UNIQUE (user_number);
ALTER TABLE "public"."user" ALTER COLUMN "user_number" SET DEFAULT nextval('user_user_number_seq'::regclass);
