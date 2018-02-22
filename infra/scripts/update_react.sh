#! /bin/bash

set -e

export NODE_ENV=production

sudo mkdir -p /var/www/html
sudo chmod +w /var/www/html

cd /opt/playlister
# sudo /usr/bin/git pull


cd react
sudo yarn install
sudo yarn build


sudo cp -R /opt/playlister/react/build/* /var/www/html
sudo chmod +r /var/www/html
sudo chmod -w /var/www/html
