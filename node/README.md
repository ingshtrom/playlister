# node api

## setup .env for local dev

```
  echo 'BASE_URL=http://localhoset:3001>' > .env # for api testing
  echo 'PORT=3001' >> .env
  echo 'MYSQL_HOST=[mysql_host]' >> .env
  echo 'MYSQL_USER=[mysql_user]' >> .env
  echo 'MYSQL_PASSWORD=[mysql_password]' >> .env
  echo 'MYSQL_DATABASE=[mysql_database]' >> .env
```

# API

```
// DONE
function createContainer(path, type) {}
function removeContainer(path) {}

// NOTE: these both return media as well
function getContainerContentsById(id) {}
function getContainerContentsByPath(path) {}

// TODO
function deleteMediaById(id) {}
function createMediaInContainer(media) {}
function uploadDataToBlob(mediaId, rawData) {}
```

