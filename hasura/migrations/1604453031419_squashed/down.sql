
alter table "public"."receivables" drop constraint "receivables_pkey";
alter table "public"."receivables"
    add constraint "receivables_pkey" 
    primary key ( "loan_id" );

ALTER TABLE "public"."receivables" ALTER COLUMN "receiver_id" TYPE uuid;
alter table "public"."receivables" rename column "receiver" to "receiver_id";

alter table "public"."receivables" add foreign key ("receiver_id") references "public"."user"("id") on update restrict on delete restrict;

ALTER TABLE "public"."loan_participants" ALTER COLUMN "percentage" TYPE integer;

ALTER TABLE "public"."loan_participants" ALTER COLUMN "lender_amount" TYPE integer;
