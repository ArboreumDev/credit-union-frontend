CREATE TABLE "public"."action_type"("value" text NOT NULL, "comment" text NOT NULL, PRIMARY KEY ("value") );

INSERT INTO action_type (value, comment) VALUES
  ('ADJUST_BALANCES', 'Change balance for users'),
  ('CONFIRM_LOAN', 'Adds supporters, generates the loan offer, and then accepts it'),
  ('REPAY_LOAN', 'Make repayment');