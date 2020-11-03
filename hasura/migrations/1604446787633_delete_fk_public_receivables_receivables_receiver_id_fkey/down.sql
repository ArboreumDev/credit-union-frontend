alter table "public"."receivables" add foreign key ("receiver_id") references "public"."user"("id") on update restrict on delete restrict;
