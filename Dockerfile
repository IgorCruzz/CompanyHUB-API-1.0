FROM node:13-alpine

WORKDIR /usr/src/app 

COPY package*.json \
    nest-cli.json \
    tsconfig*.json \  
    yarn.lock\     
 ./
 
RUN yarn

COPY . .

RUN npm run build

CMD ["yarn", "start:prod"]