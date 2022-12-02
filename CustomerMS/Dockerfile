FROM node:18.9.0-slim

RUN mkdir -p /usr/src/app

WORKDIR /usr/src/app

#Add environmental variables
ARG SERVER

ENV SERVER $SERVER

COPY package.json /usr/src/app

RUN npm install

COPY . /usr/src/app

EXPOSE 80

CMD [ "npm", "start" ]