alter table "public"."update_log"
           add constraint "update_log_type_fkey"
           foreign key ("type")
           references "public"."update_type"
           ("value") on update restrict on delete restrict;
