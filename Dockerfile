FROM node:latest

WORKDIR /app

COPY app/package.json /app

RUN npm install --silent

COPY app/ /app
