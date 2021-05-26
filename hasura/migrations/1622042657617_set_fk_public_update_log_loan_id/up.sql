alter table "public"."update_log" drop constraint "update_log_loan_id_fkey",
             add constraint "update_log_loan_id_fkey"
             foreign key ("loan_id")
             references "public"."loan"
             ("loan_id") on update restrict on delete cascade;
