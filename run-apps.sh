#!/bin/bash
set -e

cd ../inspection-app
npm run build
npm run deploy
cd ../dashboard-app
npm start