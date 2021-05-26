CREATE TABLE "public"."loan_state"("value" text NOT NULL, "comment" text NOT NULL, PRIMARY KEY ("value") );
INSERT INTO loan_state (value, comment) VALUES
  ('LIVE', 'is currently being repaid'),
  ('REPAID', 'final state: fully repaid'),
  ('DEFAULT', 'final state: will not be repaid');
