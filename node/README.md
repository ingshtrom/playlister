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
// DONE
function createContainer(path, type) {}
function removeContainer(path) {}

// these both return media as well
function getContainerContentsById(id) {}
function getContainerContentsByPath(path) {}

// TODO
function getMediaById(id) {}
function deleteMediaById(id) {}
function createMediaInContainer(path, media) {}
```

