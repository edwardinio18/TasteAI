#!/usr/bin/env bash

echo "----- INSTALLING DEPENDENCIES -----"
if ! bun install; then
  echo "Error: Could not install dependencies."
  exit 1
fi

echo "----- STARTING REACT CLIENT -----"
if ! bun run dev; then
  echo "Error: Could not start the React client."
  exit 1
fi
