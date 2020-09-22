CREATE EXTENSION IF NOT EXISTS pgcrypto WITH SCHEMA public;


create schema api;


create table api.events (
    "id" uuid NOT NULL DEFAULT gen_random_uuid(), 
    "created_at" timestamptz NOT NULL DEFAULT now(), 
    "data" jsonb, 
    PRIMARY KEY ("id") , UNIQUE ("id"));


insert into api.events (data)
values ('{"title": "Sleeping Beauties", "genres": ["Fiction", "Thriller", "Horror"], "published": false}');


create role web_anon nologin;

grant usage on schema api to web_anon;
grant select on api.events to web_anon;


create role authenticator noinherit login password 'mysecretpassword';
grant web_anon to authenticator;