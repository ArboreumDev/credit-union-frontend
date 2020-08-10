docker-up:
	docker-compose up -d

docker-down:
	docker-compose down --remove-orphans

setup_db:
	# TODO handle this within a docker container, so hasura command works without any setup
	cd ../hasura; hasura migrate apply
	cd ../hasura; hasura metadata apply

jest-test:
	jest test:ci

jest-watch:
	jest --watch

test: docker-up	setup_db jest-test docker-down

lint:
	echo TODO

lint-format:
	echo TODO