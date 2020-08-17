alter table "public"."transactions" add foreign key ("from") references "public"."user"("id") on update restrict on delete restrict;
