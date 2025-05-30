FROM node:20-alpine

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

COPY wait-for-it.sh /usr/src/app/wait-for-it.sh

RUN chmod +x /usr/src/app/wait-for-it.sh

EXPOSE 5000

CMD ["./wait-for-it.sh", "db:5432", "--", "npm", "run", "dev:init"]