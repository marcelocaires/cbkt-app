# Build SSR
FROM node:20 AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build:ssr --configuration=prod

# Server runtime
FROM node:20 AS server
WORKDIR /app
COPY --from=build /app/dist /app/dist
COPY --from=build /app/node_modules /app/node_modules

EXPOSE 4000
CMD ["node", "dist/cbkt-app/server/server.mjs"]
