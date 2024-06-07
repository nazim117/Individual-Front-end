FROM node:20.10.0-alpine as production
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install
RUN npm run
EXPOSE 5173
CMD ["npm", "run", "dev"]

FROM cypress/base
RUN npm install
RUN npx cypress run