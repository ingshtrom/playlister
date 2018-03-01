FROM keymetrics/pm2:8-alpine

WORKDIR /opt/app
COPY package*.json yarn.lock ./

ENV NODE_ENV=production
RUN yarn install

COPY . .

CMD [ 'pm2-runtime', './bin/process_media.js' ]
