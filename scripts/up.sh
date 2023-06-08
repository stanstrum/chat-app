#!/bin/bash

docker compose \
  --env-file=env/${ENVIRONMENT}.env \
  -f docker-compose.yml \
  up
