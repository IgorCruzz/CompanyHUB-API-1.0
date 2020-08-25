FROM node:13-alpine

WORKDIR /usr/src/app 

COPY package*.json \
    nest-cli.json \
    tsconfig*.json \         
 ./
 
RUN npm install

COPY . .

CMD ["npm", "run", "start:dev", "test", "start:prod"]