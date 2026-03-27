# --------------
# 1. build stage
# --------------
FROM node:20.10-alpine3.17 AS build

WORKDIR /build

COPY package.json yarn.lock ./
RUN yarn install

COPY . .
RUN yarn build

# --------------
# 2. runtime stage
# --------------
FROM node:20.10-alpine3.17

WORKDIR /usr/src/app

COPY package.json yarn.lock prisma ./
COPY --from=build /build/dist ./dist

RUN yarn install --production && \
  yarn cache clean

ENTRYPOINT [ "yarn", "start" ]
