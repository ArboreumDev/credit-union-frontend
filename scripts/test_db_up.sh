#!/bin/bash

cd ./tests
docker-compose up -d

cd ../hasura
hasura migrate apply
hasura metadata apply

echo done