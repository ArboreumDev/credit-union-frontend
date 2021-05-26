CREATE TABLE "public"."loan_request_state"("value" text NOT NULL, "comment" text NOT NULL, PRIMARY KEY ("value") );

INSERT INTO loan_request_state (value, comment) VALUES
  ('FULFILLED', 'final state: has been accepted and money was given to borrower'),
  ('REJECTED', 'final state: will not be funded'),
  ('WITHDRAWN', 'inactive'),
  ('ACTIVE', 'is waiting for lender/s to be funded'),
  ('EXPIRED', 'final state: no longer waiting for lender/s to be funded');