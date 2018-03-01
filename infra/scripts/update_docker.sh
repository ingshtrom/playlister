#! /bin/bash

set -e

sudo mkdir -p /data/mysql
sudo chmod +rwx /data/mysql

cd /opt/playlister/node

sudo docker build . --rm --no-cache -t ingshtrom/playlister:local
sudo docker build . --rm --no-cache -t ingshtrom/playlister-process-media:local

cd /opt/playlister

sudo docker stack deploy -c /opt/playlister/docker-stack-production.yml --resolve-image always --prune prd

sudo docker service update --image ingshtrom/playlister:local --force prd_api
sudo docker service update --image ingshtrom/playlister-process-media:local --force prd_process_media

