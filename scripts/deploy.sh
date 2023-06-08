#!/bin/bash

# check docker-compose.yml
if [ ! -e docker-compose.yml ]
then
  echo "docker-compose.yml not found -- did you make sure to run"
  echo "this script from the project root?"
  exit 1
fi

# check ENVIRONMENT
if [ -z "${ENVIRONMENT}" ]
then
  echo "No environment provided (use ENVIRONMENT)"
  exit 1
fi

echo "Using environment \"${ENVIRONMENT}\""

# build using buildkit
COMPOSE_DOCKER_CLI_BUILD=1 DOCKER_BUILDKIT=1 \
  docker compose \
    --env-file=env/${ENVIRONMENT}.env \
    -f docker-compose.yml \
  build ${BUILD_ARGS}

# start in detached mode
BUILD_EXIT_CODE=$?

if [ "${BUILD_EXIT_CODE}" != "0" ]
then
  echo "Build failed with exit code ${BUILD_EXIT_CODE}"

  exit ${BUILD_EXIT_CODE}
fi

docker compose \
  --env-file=env/${ENVIRONMENT}.env \
  -f docker-compose.yml \
  up
