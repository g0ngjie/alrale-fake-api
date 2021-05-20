#!/bin/bash

git pull origin master \
&& npm install \
&& docker-compose down \
&& docker rmi fake_api_image \
&& docker-compose build \
&& docker-compose up -d