docker-up:
	docker-compose up -d

docker-down:
	docker-compose down --remove-orphans

setup-db:
	@sleep 5 && echo "setting up hasura"
	# TODO: handle this within a docker container, so hasura command works without any setup
	yarn migrate
	yarn metadata

jest-test:
	yarn test:ci

test: docker-down docker-up	setup-db jest-test docker-down

test-watch: docker-up setup-db
	yarn test
