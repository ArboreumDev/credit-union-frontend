alter table "public"."lender_amount" drop constraint "lender_amount_loan_id_fkey",
          add constraint "lender_amount_loan_id_fkey"
          foreign key ("loan_id")
          references "public"."loan"
          ("loan_id")
          on update restrict
          on delete restrict;
