import { fromJS } from 'immutable';

const defaultState = fromJS({
  data: {},
  media: {},
  errorMessage: '',
  isLoading: false
});

export default function contentReducer(state = defaultState, action) {
  switch(action.type) {
    case 'GET_CONTENT_REQUEST':
    case 'ADD_CONTAINER_REQUEST':
    case 'ADD_MEDIA_REQUEST':
    case 'DELETE_CONTAINER_REQUEST':
    case 'DELETE_MEDIA_REQUEST':
    case 'UPDATE_CONTAINER_REQUEST':
    case 'UPDATE_MEDIA_REQUEST':
      return handleRequest(state, action);

    case 'GET_CONTENT_FAILURE':
    case 'ADD_CONTAINER_FAILURE':
    case 'ADD_MEDIA_FAILURE':
    case 'DELETE_CONTAINER_FAILURE':
    case 'DELETE_MEDIA_FAILURE':
    case 'UPDATE_CONTAINER_FAILURE':
    case 'UPDATE_MEDIA_FAILURE':
      return handleFailure(state, action);

    case 'GET_CONTENT_SUCCESS':
      return getContentSuccess(state, action);

    case 'ADD_CONTAINER_SUCCESS':
      return addContainerSuccess(state, action);

    case 'ADD_MEDIA_SUCCESS':
      return addMediaSuccess(state, action);

    case 'TOGGLE_PREVIEW_MEDIA_ITEM':
      return toggleMediaPreview(state, action);

    case 'MOVE_MEDIA_DOWN_REQUEST':
      return moveMediaDownRequest(state, action);

    case 'MOVE_MEDIA_UP_REQUEST':
      return moveMediaUpRequest(state, action);

    case 'DELETE_MEDIA_SUCCESS':
      return deleteMediaSuccess(state, action);

    case 'DELETE_CONTAINER_SUCCESS':
      return deleteContainerSuccess(state, action);

    case 'UPDATE_CONTAINER_SUCCESS':
      return updateContainerSuccess(state, action);

    case 'UPDATE_MEDIA_SUCCESS':
      return updateMediaSuccess(state, action);

    default:
      return state;
  }
}

function handleRequest(state, action) {
  return state
    .set('isLoading', true)
    .set('errorMessage', '');
}

function handleFailure(state, action) {
  return state
    .set('errorMessage', action.errorMessage)
    .set('isLoading', false);
}

function getContentSuccess(state, action) {
  return state
    .updateIn(['data'], data => data.mergeDeep(action.data.data))
    .updateIn(['media'], media => media.mergeDeep(action.data.media))
    .set('isLoading', false);
}

function addContainerSuccess(state, action) {
  return state.updateIn(['data'], data => data.set(action.data.fullPath, action.data))
  .updateIn(['data'], data => {
    const parent = data.find(val => val.id === action.data.parentId);
    if (!parent) {
      console.error('Could not find the parent when updating it to include the new container', action.data.id);
      return data;
    }

    return data.mergeDeep({
      [parent.fullPath]: parent.updateIn(['content'], content => content.push(action.data.name))
    });
  })
  .set('isLoading', false);
}

function addMediaSuccess(state, action) {
  return state.updateIn(['media'], media => media.set(action.data.id.toString(), action.data))
    .updateIn(['data'], data => {
      const parent = data.find(val => val.id === action.data.containerId);
      if (!parent) {
        console.error('Could not find the parent when updating it to include the new media', action.data.id);
        return data;
      }

      return data.mergeDeep({
        [parent.fullPath]: parent.updateIn(['mediaContent'], mediaContent => mediaContent.push(action.data.id.toString()))
      });
    })
    .set('isLoading', false);
}

function toggleMediaPreview(state, action) {
  return state.updateIn(['media', action.id.toString(), 'isBeingPreviewed'], isBeingPreviewed => !isBeingPreviewed);
}

function moveMediaDownRequest(state, action) {
  let error = '';

  return state.updateIn(['media'], media => {
    if (error) return media;

    let media1 = media.find(mediaItem => mediaItem.get('id') === action.id);
    let media2 = media.find(
      mediaItem =>
        mediaItem.get('containerId') === media1.get('containerId')
        && mediaItem.get('playlistIndex') === media1.get('playlistIndex') + 1
    );

    if (!media1 || !media2) {
      console.log('cannot move down', action.id);
      error = 'Cannot move media down. Already the last item in the list.';
      return media;
    }

    media1 = media1.update('playlistIndex', index => index + 1);
    media2 = media2.update('playlistIndex', index => index - 1);

    return media
      .update(media1.id.toString(), () => media1)
      .update(media2.id.toString(), () => media2);
  }).update('errorMessage', () => error);
}

function moveMediaUpRequest(state, action) {
  let error = '';

  return state.updateIn(['media'], media => {
    if (error) return media;

    let media1 = media.find(mediaItem => mediaItem.get('id') === action.id);
    let media2 = media.find(
      mediaItem =>
        mediaItem.get('containerId') === media1.get('containerId')
        && mediaItem.get('playlistIndex') === media1.get('playlistIndex') - 1
    );

    if (!media1 || !media2) {
      console.log('cannot move media up', action.id);
      error = 'Cannot move media up. Already the first item in the list.';
      return media;
    }

    media1 = media1.update('playlistIndex', index => index - 1);
    media2 = media2.update('playlistIndex', index => index + 1);

    return media
      .update(media1.id.toString(), () => media1)
      .update(media2.id.toString(), () => media2);
  }).update('errorMessage', () => error);
}

function deleteMediaSuccess(state, action) {
  return state
    .set('isLoading', false)
    .updateIn(['media'], media => {
      let media1 = media.find(mediaItem => mediaItem.get('id') === action.id);
      let mediaInPlaylist = media
        .deleteIn([action.id])
        .filter(mediaItem => mediaItem.get('containerId') === media1.get('containerId'))
        .sort((a, b) => {
          const aIndex = a.playlistIndex;
          const bIndex = b.playlistIndex;

          if (aIndex < bIndex) return -1;
          if (aIndex > bIndex) return 1;
          return 0;
        })
        .toList()
        .map((mediaItem, index) => mediaItem.set('playlistIndex', index))
        .reduce((prev, next) => prev.set(next.id, next), new Map());

      return media.mergeDeep(mediaInPlaylist);
    });
}

function deleteContainerSuccess(state, action) {
  return state
    .updateIn(['data'], containers => {
      const containerToDelete = containers.find(c => c.id === action.id);

      return containers.delete(containerToDelete.get('fullPath'));
    })
    .set('isLoading', false);
}

function updateContainerSuccess(state, action) {
  return state
    .updateIn(['data'], containers => {
      const containerToUpdate = containers.find(c => c.id === action.data.id);
      const parentContainer = containers.find(c => c.id === containerToUpdate.parentId);

      return containers
        .deleteIn([containerToUpdate.fullPath])
        .set(action.data.fullPath, action.data)
        .updateIn([parentContainer.fullPath, 'content'], content => {
          return content
            .filter(i => i !== containerToUpdate.name)
            .push(action.data.name);
        });
    })
    .set('isLoading', false);
}

function updateMediaSuccess(state, action) {
  return state
    .updateIn(['media', action.data.id.toString()], media => {
      return media.merge(action.data);
    })
    .set('isLoading', false);

  const parentContainer = state.data.find(c => c.id === action.data.containerId);

  return state
    .updateIn(['media'], media => {
      return media
        .updateIn(['media', action.id.toString()], media => {
          return media.merge(action.data);
        })
    })
    .updateIn([parentContainer.fullPath, 'mediaContent'], content => {
      return content
        .filter(i => i !== action.data.id)
        .push(action.data.id);
    })
    .set('isLoading', false);
}

