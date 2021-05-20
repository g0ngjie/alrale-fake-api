FROM node:10.16.0

WORKDIR /app

ADD . /app

EXPOSE 3000

CMD ["npm", "start"]