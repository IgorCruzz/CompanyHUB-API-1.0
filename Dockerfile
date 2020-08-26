FROM node:10.19.0

WORKDIR /usr/src/app 

COPY package*.json \
    nest-cli.json \
    tsconfig*.json \         
 ./
 
RUN npm install
ARG REDIS_PASS
ENV DB_HOST=${REDIS_PASS} 
ENV DB_USER ggcuzfmgehrtlj
ENV DB_PASSWORD 9ab5ee3ed7d5902f8cf8422573bb1937c35292478437ef8bdaf17a57827cdd5a
ENV DB_NAME dd5igj8hv5eb0a

COPY . .

 

 

 