
ALTER TABLE "public"."loan_participants" ALTER COLUMN "lender_amount" TYPE float8;

ALTER TABLE "public"."loan_participants" ALTER COLUMN "percentage" TYPE float8;

alter table "public"."receivables" drop constraint "receivables_receiver_id_fkey";

ALTER TABLE "public"."receivables" ALTER COLUMN "receiver_id" TYPE text;
alter table "public"."receivables" rename column "receiver_id" to "receiver";

alter table "public"."receivables" drop constraint "receivables_pkey";
alter table "public"."receivables"
    add constraint "receivables_pkey" 
    primary key ( "loan_id", "receiver" );
