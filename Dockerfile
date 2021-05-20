FROM node:10.16.0

ADD . /app/

WORKDIR /app

EXPOSE 3000

CMD ["npm", "start"]