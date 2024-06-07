#Base Node.js stage
FROM node:20.10.0-alpine as base
WORKDIR /app
COPY package*.json ./
RUN npm install

#Build stage for building frontend assets, if necessary
FROM base as builder
COPY . .
RUN npm run build

#Production stage
FROM node:20.10.0-alpine as production
WORKDIR /app
COPY --from=builder /app/dist ./dist
EXPOSE 5173
CMD [ "npm", "run", "dev" ]
