# Makefile

SHELL := /bin/bash

db:
	echo "setting up hasura"
	yarn migrate --envfile ../production/.env
	yarn metadata --envfile ../production/.env

status:
	yarn run hasura migrate status --envfile ../production/.env

hasura:
	docker-compose up