#! /bin/bash

set -e

export NODE_ENV=production

# cd /opt/playlister
# sudo /usr/bin/git pull


# cd react
# sudo yarn build


sudo pm2 start /opt/playlister/process-production.yml
