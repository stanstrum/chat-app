#!/bin/sh

if [ "${WORKPACE}" = "none" -o -z "${WORKSPACE}" ]
then
  echo "No workspace provided (use env WORKSPACE)"
  exit 1
fi

echo "Using workspace \"${WORKSPACE}\""
