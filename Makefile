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