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

