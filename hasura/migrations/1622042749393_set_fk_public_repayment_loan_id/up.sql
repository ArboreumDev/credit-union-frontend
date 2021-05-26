alter table "public"."repayment" drop constraint "repayment_loan_id_fkey",
             add constraint "repayment_loan_id_fkey"
             foreign key ("loan_id")
             references "public"."loan"
             ("loan_id") on update restrict on delete cascade;
