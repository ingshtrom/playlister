# node api

## Running

```
  echo 'GOOGLEMAPS_API_KEY=<YOUR_GOOGLE_MAPS_API_KEY>' > .env
  echo 'PORT=3001' > .env
  yarn
  yarn start
```

# API

```
function createContainer(path, type) {}
function removeContainer(path) {}

function getContainerContents(path) {}

function getMediaById(id) {}
function createMediaInContainer(path, media) {}
function deleteMediaInContainer(path) {}
```
