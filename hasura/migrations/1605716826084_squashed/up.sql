
CREATE TABLE "public"."action_type"("value" text NOT NULL, "comment" text NOT NULL, PRIMARY KEY ("value") );

INSERT INTO action_type (value, comment) VALUES
  ('ADJUST_BALANCES', 'Change balance for users'),
  ('CONFIRM_LOAN', 'Adds supporters, generates the loan offer, and then accepts it'),
  ('REPAY_LOAN', 'Make repayment');
CREATE TABLE "public"."scenario_actions"("id" serial NOT NULL, "action_type" text NOT NULL, "payload" jsonb NOT NULL, PRIMARY KEY ("id") , FOREIGN KEY ("action_type") REFERENCES "public"."action_type"("value") ON UPDATE restrict ON DELETE restrict, UNIQUE ("id"));

ALTER TABLE "public"."loan_requests" ADD COLUMN "balance" float8 NULL DEFAULT 0;
