FROM node:20-alpine

WORKDIR /mmbuilder

COPY package*.json ./


RUN npm install

COPY . .

EXPOSE 8083

CMD ["node","server.js"]
# Stage 1: Build the application
#FROM node:20-alpine

#WORKDIR /mmbackend

#COPY . .

#RUN npm install

#RUN npm run start

# Expose port 80
#EXPOSE 8083
