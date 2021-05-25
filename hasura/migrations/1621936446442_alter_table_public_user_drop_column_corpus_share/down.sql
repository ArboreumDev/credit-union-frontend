ALTER TABLE "public"."user" ADD COLUMN "corpus_share" float8;
ALTER TABLE "public"."user" ALTER COLUMN "corpus_share" DROP NOT NULL;
ALTER TABLE "public"."user" ALTER COLUMN "corpus_share" SET DEFAULT 0;
