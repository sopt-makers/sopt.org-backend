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

COPY package*.json ./
COPY yarn.lock ./

RUN yarn install --production

COPY --from=build /app/dist ./dist

EXPOSE 3000

CMD ["yarn", "run", "start"]
