FROM keymetrics/pm2:8-alpine

# RUN sudo add-apt-repository --yes ppa:stebbins/handbrake-releases \
#   && sudo apt-get update -qq \
#   && sudo apt-get install -qq handbrake-cli

WORKDIR /opt/app
COPY package*.json yarn.lock ./

ENV NODE_ENV=production
RUN yarn install

COPY . .

EXPOSE 3001

CMD [ 'pm2-runtime', './bin/www' ]
