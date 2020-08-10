test:
	cd ./tests; docker-compose up -d; cd ..
	./scripts/test_db_up.sh
	# yarn test:ci
	cd ./tests; docker-compose down --remove-orphans

up:
	cd ./tests; \
	docker-compose up -d

setup_test_db:
	./scripts/test_db_up.sh

down:
	cd ./tests; \
	docker-compose down --remove-orphans

# somehow I cant make the one command wait for the other too finish :(
# setup_and_test:
# 	make setup_test_db
#   yarn test:ci


lint:
	echo TODO

lint-format:
	echo TODO