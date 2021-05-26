CREATE TABLE "public"."user_type"("value" text NOT NULL, "comment" text NOT NULL, PRIMARY KEY ("value") );

INSERT INTO user_type (value, comment) VALUES
  ('LENDER', 'invests money'),
  ('BORROWER', 'receives loans');
 