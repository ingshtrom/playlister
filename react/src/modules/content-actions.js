export function getContent(prefix) {
  return {
    type: 'GET_CONTENT_REQUEST',
    prefix
  };
}

