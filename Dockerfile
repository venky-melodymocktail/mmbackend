FROM node:20-alpine

WORKDIR /mmbuilder

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 8082

CMD ["node","server.js"]

