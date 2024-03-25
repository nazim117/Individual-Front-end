FROM node:16 AS build
LABEL authors="nazim"
WORKDIR /opt/app
COPY package.json package-lock.json ./
RUN npm i
COPY . ./
RUN npm run build

ENTRYPOINT ["sh", "-c", "java ${JAVA_OPTS} -jar Individual-BackEnd-0.0.1-SNAPSHOT.jar"]