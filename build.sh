#!/usr/bin/env bash
# exit on error
set -o errexit

npm install
npm build
npx prisma migrate dev deploy