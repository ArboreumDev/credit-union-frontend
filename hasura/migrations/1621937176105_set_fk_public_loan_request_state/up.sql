alter table "public"."loan_request"
           add constraint "loan_request_state_fkey"
           foreign key ("state")
           references "public"."loan_request_state"
           ("value") on update restrict on delete restrict;
