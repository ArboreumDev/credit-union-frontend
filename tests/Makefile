docker-up:
	docker-compose pull swarmai
	docker-compose up -d

docker-down:
	docker-compose down --remove-orphans

sleep:
	@sleep 5

db:
	yarn migrate
	yarn metadata
	yarn seeds

reset-db:
	yarn jest -i tests/src/api_log_handlers.test.ts

jest-test:
    # Use this to reset the DB when in dev mode
	yarn test:ci

dev: docker-down docker-up sleep db 
	yarn dev

test: docker-down docker-up sleep db jest-test docker-down

test-watch: docker-up db
	yarn test

seeds: reset-db
	yarn seeds
