export function getContent(path) {
  return {
    type: 'GET_CONTENT_REQUEST',
    path
  };
}

export function getMedia(ids) {
  return {
    type: 'GET_MEDIA_REQUEST',
    ids
  };
}

export function addContainer(parentId, name, fullPath, type) {
  return {
    type: 'ADD_CONTAINER_REQUEST',
    parentId,
    name,
    fullPath,
    containerType: type
  };
}

export function addMedia(playlistId, name, playlistIndex, type, file) {
  return {
    type: 'ADD_MEDIA_REQUEST',
    playlistId,
    name,
    playlistIndex,
    mediaType: type,
    file
  };
}

