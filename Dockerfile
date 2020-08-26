FROM node:10.19.0

WORKDIR /usr/src/app 

COPY package*.json \
    nest-cli.json \
    tsconfig*.json \         
 ./
 
RUN npm install
ARG DB_HOST
ARG DB_USER
ARG DB_PASSWORD
ARG DB_NAME
ENV DB_HOST ${DB_HOST} 
ENV DB_USER ${DB_USER}
ENV DB_PASSWORD ${DB_PASSWORD}
ENV DB_NAME ${DB_NAME}

COPY . .

 

 

 