# FROM node:20.10.0-alpine as build
# WORKDIR /app
# COPY package.json package-lock.json ./
# RUN npm install
# COPY . .
# RUN npm run build

FROM node:20.10.0-alpine as production
WORKDIR /app
COPY --from=build /app/package.json /app/package-lock.json ./
RUN npm i 
EXPOSE 5173
CMD ["npm", "run", "dev"]