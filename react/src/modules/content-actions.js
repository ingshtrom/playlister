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

export function deleteContainer(id) {
  return {
    type: 'DELETE_CONTAINER_REQUEST',
    id
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

export function moveMediaDown(playlistId, id) {
  return {
    type: 'MOVE_MEDIA_DOWN_REQUEST',
    id
  };
}

export function moveMediaUp(playlistId, id) {
  return {
    type: 'MOVE_MEDIA_UP_REQUEST',
    id
  };
}

export function toggleMediaPreview(id) {
  return {
    type: 'TOGGLE_PREVIEW_MEDIA_ITEM',
    id
  };
}

export function deleteMedia(id) {
  return {
    type: 'DELETE_MEDIA_REQUEST',
    id
  };
}

export function updateContainer(id, containerUpdates) {
  return {
    type: 'UPDATE_CONTAINER_REQUEST',
    id,
    containerUpdates
  };
}

export function updateMedia(id, mediaUpdates) {
  return {
    type: 'UPDATE_MEDIA_REQUEST',
    id,
    mediaUpdates
  };
}

