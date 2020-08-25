docker-up:
	docker-compose up -d

docker-down:
	docker-compose down --remove-orphans

sleep:
	@sleep 5

setup-db:
	echo "setting up hasura"
	# TODO: handle this within a docker container, so hasura command works without any setup
	yarn migrate
	yarn metadata

jest-test:
    # Use this to reset the DB when in dev mode
	yarn test:ci

dev: docker-down docker-up sleep setup-db 
	yarn dev

test: dev jest-test docker-down

test-watch: docker-up setup-db
	yarn test

