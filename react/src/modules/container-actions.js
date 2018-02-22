export function addContainer(parentId, name, fullPath, type) {
  return {
    type: 'ADD_CONTAINER_REQUEST',
    parentId,
    name,
    fullPath,
    containerType: type
  };
}

