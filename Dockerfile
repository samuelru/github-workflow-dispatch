FROM node:18-alpine as build-stage
RUN apk update && apk upgrade
RUN apk add bash

COPY . .

RUN yarn install

CMD ["bash", "entrypoint.sh"]