FROM node:carbon

WORKDIR /opt/app
COPY package*.json yarn.lock ./

ENV NODE_ENV=production
RUN yarn install

COPY . .

CMD [ 'bash' ]
