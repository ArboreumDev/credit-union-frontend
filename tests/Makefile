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
	yarn test:ci

test: docker-down docker-up sleep setup-db jest-test docker-down

test-watch: docker-up setup-db
	yarn test

dev: docker-down docker-up sleep setup-db