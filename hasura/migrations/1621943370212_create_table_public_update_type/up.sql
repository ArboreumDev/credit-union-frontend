CREATE TABLE "public"."update_type"("value" text NOT NULL, "comment" text NOT NULL, PRIMARY KEY ("value") );

INSERT INTO update_type (value, comment) VALUES
  ('COMPOUND', 'whenever the compoungind period ends'),
  ('REPAYMENT', 'when a repayment is made'),
  ('PENALTY', 'when a penalty condition was true'),
  ('DEFAULT', 'when the loan is set to default');
