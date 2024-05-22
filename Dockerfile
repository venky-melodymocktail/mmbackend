FROM node:20-alpine

WORKDIR /mmbuilder

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 8083

CMD ["node","server.js"]

