FROM node:10.19.0

WORKDIR /usr/src/app 

COPY package*.json \
    nest-cli.json \
    tsconfig*.json \         
 ./
 
RUN npm install

COPY . .

CMD ["npm", "run", "start:dev", "test", "start:prod"]