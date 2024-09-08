# Stage 1: Build the application
FROM node:22-alpine AS build

WORKDIR /app

COPY package*.json ./
COPY yarn.lock ./

RUN yarn install

COPY . .

RUN yarn build

# Stage 2: Create the production image
FROM node:22-alpine AS production

RUN apk add --no-cache udev ttf-freefont chromium

WORKDIR /app

COPY --from=build /app/package.json ./package.json
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/yarn.lock ./yarn.lock
COPY --from=build /app/dist ./dist

EXPOSE 3000

CMD ["yarn", "run", "start"]
