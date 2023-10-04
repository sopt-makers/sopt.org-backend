# Stage 1: Build the application
FROM node:16-alpine AS build

WORKDIR /app

COPY package*.json ./
COPY yarn.lock ./
COPY deploy.sh ./

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
COPY --from=build /app/deploy.sh ./deploy.sh

RUN chmod +x deploy.sh

EXPOSE 3000

CMD ["./deploy.sh"]
