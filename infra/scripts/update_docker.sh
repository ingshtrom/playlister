#! /bin/bash

set -e

sudo mkdir -p /data/mysql
sudo chmod +rwx /data/mysql

cd /opt/playlister/node

sudo docker build . --rm --no-cache -t ingshtrom/playlister:local

cd /opt/playlister

if [[ -f /opt/initial_stack_created ]]; then
  sudo docker service update --image ingshtrom/playlister:local --force prd_api
fi

if [[ ! -f /opt/initial_stack_created ]]; then
  sudo docker stack deploy -c /opt/playlister/docker-stack-production.yml prd
  touch /opt/initial_stack_created
fi
