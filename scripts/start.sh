#!/bin/sh

# This script is only meant to be used inside a running docker container

case ${ENVIRONMENT} in
  production)
    NODE_ENV=production npm run start -w ${WORKSPACE} $@
    ;;

  development)
    NODE_ENV=development npm run dev -w ${WORKSPACE} $@
    ;;

  *)
    echo "Unknown environment \"${ENVIRONMENT}\" -- cannot start"
    exit 1
    ;;
esac
