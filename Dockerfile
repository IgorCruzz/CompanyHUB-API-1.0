FROM node:10.19.0

WORKDIR /usr/src/app 

COPY package*.json \
    nest-cli.json \
    tsconfig*.json \         
 ./
 
RUN npm install

ENV DB_HOST=ec2-34-200-15-192.compute-1.amazonaws.com
    DB_USER=ggcuzfmgehrtlj
    DB_PASSWORD=9ab5ee3ed7d5902f8cf8422573bb1937c35292478437ef8bdaf17a57827cdd5a
    DB_NAME=dd5igj8hv5eb0a

COPY . .

 

 

 