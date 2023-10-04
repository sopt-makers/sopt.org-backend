# Stage 1: Build the application
FROM node:16-alpine AS build

WORKDIR /app

COPY package*.json ./
COPY yarn.lock ./

RUN yarn install

COPY . .

RUN yarn build

# Stage 2: Create the production image
FROM node:16-alpine AS production

WORKDIR /app

COPY --from=build /app/package.json ./package.json
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/yarn.lock ./yarn.lock
COPY --from=build /app/dist ./dist

EXPOSE 3000

CMD yarn run start
