alter table "public"."loan" drop constraint "loan_loan_request_fkey",
             add constraint "loan_loan_request_fkey"
             foreign key ("loan_request")
             references "public"."loan_request"
             ("request_id") on update restrict on delete cascade;
