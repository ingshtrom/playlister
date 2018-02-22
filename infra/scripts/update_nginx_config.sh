#! /bin/bash

set -e

sudo cp /opt/playlister/infra/nginx/nginx.conf /etc/nginx/nginx.conf

sudo service nginx reload
