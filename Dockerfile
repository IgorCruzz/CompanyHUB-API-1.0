FROM node:10.19.0

WORKDIR /usr/src/app 

COPY package*.json \
    nest-cli.json \
    tsconfig*.json \  
    yarn.lock \       
 ./
 
RUN yarn
ARG URL
ARG DB_HOST
ARG DB_USER
ARG DB_PASSWORD
ARG DB_NAME
ARG MAIL_SERVICE  
ARG MAIL_USER  
ARG MAIL_PASS  
ENV URL ${URL}
ENV DB_HOST ${DB_HOST} 
ENV DB_USER ${DB_USER}
ENV DB_PASSWORD ${DB_PASSWORD}
ENV DB_NAME ${DB_NAME}
ENV MAIL_SERVICE ${MAIL_SERVICE}
ENV MAIL_USER ${MAIL_USER}
ENV MAIL_PASS ${MAIL_PASS}

COPY . .


RUN yarn build  

RUN yarn migration:run

CMD ["yarn", "start:prod"]
 

 

 