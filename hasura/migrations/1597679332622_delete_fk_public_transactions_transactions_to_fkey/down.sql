alter table "public"."transactions" add foreign key ("to") references "public"."user"("id") on update restrict on delete restrict;
