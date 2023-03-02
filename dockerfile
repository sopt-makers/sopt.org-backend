# install stage
FROM docker.io/node:16.13-slim as install

WORKDIR /root
COPY package.json .
COPY yarn.lock .
RUN yarn install

# final stage
FROM docker.io/node:16.13-slim
WORKDIR /root
COPY --from=install /root /root
COPY . .
RUN apt-get update && apt-get -y install git
#RUN apk add --no-cache git
RUN yarn build && yarn deploy:commit && yarn cache clean
EXPOSE 3000
CMD ["node", "dist/main"]