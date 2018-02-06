export function getContent() {
  return {
    type: 'GET_CONTENT_REQUEST'
  };
}

export function getMedia(ids) {
  return {
    type: 'GET_MEDIA_REQUEST',
    ids
  };
}

