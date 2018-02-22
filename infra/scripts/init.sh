#! /bin/bash

set -e

if [[ ! -f "/opt/api.env" ]]; then
  echo "ERROR:"
  echo ""
  echo "/opt/api.env must be defined before we can start!"
  echo ""
  exit 1
fi

if [[ ! -f "/opt/db.env" ]]; then
  echo "ERROR:"
  echo ""
  echo "/opt/db.env must be defined before we can start!"
  echo ""
  exit 1
fi

sudo apt-get update -y
sudo apt-get install -y build-essential
sudo apt-get install -y nginx

# Docker
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -
sudo add-apt-repository "deb [arch=amd64] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable"
sudo apt-get update -y
sudo apt-cache policy docker-ce
sudo apt-get install -y docker-ce

sudo docker swarm init

# NODE JS
curl -sL https://deb.nodesource.com/setup_9.x | sudo -E bash -
sudo apt-get install -y nodejs

# YARN
curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | sudo apt-key add -
echo "deb https://dl.yarnpkg.com/debian/ stable main" | sudo tee /etc/apt/sources.list.d/yarn.list
sudo apt-get update -y
sudo apt-get install -y yarn

# # PM2
# sudo npm install -g pm2
# sudo pm2 startup

sudo service nginx start

source /opt/playlister/infra/scripts/update_docker.sh
source /opt/playlister/infra/scripts/update_react.sh
source /opt/playlister/infra/scripts/update_nginx_config.sh
source /opt/playlister/infra/scripts/update_ufw_rules.sh


