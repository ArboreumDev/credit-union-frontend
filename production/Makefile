# Makefile

SHELL := /bin/bash

db:
	echo "setting up hasura"
	yarn migrate apply --envfile ../production/.env
	yarn metadata apply --envfile ../production/.env

status:
	hasura migrate status --envfile ../production/.env