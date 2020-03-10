#!/bin/bash

STAGE=${1:-development}

echo $STAGE
cd /opt
rm -rf .next
mv .env .env.bak
cp .env.$STAGE .env
npm ci
npm run build:next
rm .env
mv .env.bak .env

