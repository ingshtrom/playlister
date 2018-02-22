#! /bin/bash

set -e

sudo ufw status
sudo ufw allow ssh
sudo ufw allow 'Nginx Full'
echo "y" | sudo ufw enable
