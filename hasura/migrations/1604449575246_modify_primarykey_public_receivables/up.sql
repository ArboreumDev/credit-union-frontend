alter table "public"."receivables" drop constraint "receivables_pkey";
alter table "public"."receivables"
    add constraint "receivables_pkey" 
    primary key ( "loan_id", "receiver" );
