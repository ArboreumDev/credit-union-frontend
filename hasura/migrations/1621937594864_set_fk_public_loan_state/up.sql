alter table "public"."loan"
           add constraint "loan_state_fkey"
           foreign key ("state")
           references "public"."loan_state"
           ("value") on update restrict on delete restrict;
