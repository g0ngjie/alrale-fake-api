# FROM alpine:latest

# RUN sed -i 's/dl-cdn.alpinelinux.org/mirrors.aliyun.com/g' /etc/apk/repositories
# RUN apk add --no-cache --update nodejs nodejs-npm

FROM node:alpine

WORKDIR /app

ADD . /app

RUN npm install --production --registry=https://registry.npm.taobao.org

EXPOSE 3000

CMD ["npm", "start"]
