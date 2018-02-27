#! /bin/bash

set -e

sudo mkdir -p /data/mysql
sudo chmod +rwx /data/mysql

cd /opt/playlister/node

sudo docker build . --rm --no-cache -t ingshtrom/playlister:local

cd /opt/playlister

sudo docker stack deploy -c /opt/playlister/docker-stack-production.yml prd

