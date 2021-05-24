#!/bin/bash

git pull origin master \
&& npm install \
&& docker-compose down \
&& docker rmi alrale/fake-api \
&& docker-compose build \
&& docker-compose up -d