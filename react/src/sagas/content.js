import { call, put, select } from 'redux-saga/effects';

import * as api from '../api/content';

export function* getContent(action) {
  try {
    console.log('saga getContent', action);
    const data = yield call(api.getContainerContent, action.path);
    yield put({ type: 'GET_CONTENT_SUCCESS', data });
  } catch (e) {
    console.error('Error getting content', e);
    yield put({ type: 'GET_CONTENT_FAILURE', errorMessage: 'Could not find content' });
  }
}

export function* getMedia(action) {
  try {
    const data = yield call(api.getMedia, action.ids);
    yield put({ type: 'GET_MEDIA_SUCCESS', data });
  } catch (e) {
    console.error('Error getting media', e);
    yield put({ type: 'GET_MEDIA_FAILURE', errorMessage: 'Could not find media' });
  }
}

export function* addContainer(action) {
  try {
    const data = yield call(api.addContainer, action.parentId, action.name, action.fullPath, action.containerType);
    yield put({ type: 'ADD_CONTAINER_SUCCESS', data });
  } catch (e) {
    console.error('Error getting content', e);
    yield put({ type: 'ADD_CONTAINER_FAILURE', errorMessage: 'Could not add container' });
  }
}

export function* addMedia(action) {
  try {
    const data = yield call(api.addMedia, action.playlistId, action.name, action.playlistIndex, action.mediaType, action.file);
    yield put({ type: 'ADD_MEDIA_SUCCESS', data });
  } catch (e) {
    console.error('Error getting content', e);
    yield put({ type: 'ADD_MEDIA_FAILURE', errorMessage: 'Could not add media' });
  }
}

// triggered from MOVE_MEDIA_UP_REQUEST or MOVE_MEDIA_DOWN_REQUEST, both pass through an ID of the media
export function* reorderMedia(action) {
  try {
    const reorderedPlaylistData = yield select(state => {
      const mediaItem = state.content.getIn(['media', action.id]);
      const orderedMedia = state.content.get('media')
        .toList()
        .filter(item => item.get('containerId') === mediaItem.get('containerId'))
        .sort((a, b) => {
          const aIndex = a.playlistIndex;
          const bIndex = b.playlistIndex;

          if (aIndex < bIndex) return -1;
          if (aIndex > bIndex) return 1;
          return 0;
        })
        .map(item => item.id);

      return { playlistId: mediaItem.get('containerId'), orderedMedia };
    });

    console.log('FOOBAZFJDKSA', reorderedPlaylistData);

    yield call(api.reorderMedia, reorderedPlaylistData.playlistId, reorderedPlaylistData.orderedMedia);
    yield put({ type: 'REORDER_MEDIA_SUCCESS' });
  } catch (err) {
    console.error('Error reordering media in saga', err);
    yield put({ type: 'REORDER_MEDIA_FAILURE', errorMessage: 'Could not persist playlist ordering to the server. Please, try again' });
  }
}

export function* deleteMedia(action) {
  try {
    yield call(api.deleteMedia, action.id);
    yield call(reorderMedia, { id: action.id });
    yield put({ type: 'DELETE_MEDIA_SUCCESS', id: action.id });
  } catch (e) {
    console.error('Error deleting media', e);
    yield put({ type: 'DELETE_MEDIA_FAILURE', errorMessage: 'Could not delete media' });
  }
}

export function* deleteContainer(action) {
  try {
    yield call(api.deleteContainer, action.id);
    yield put({ type: 'DELETE_CONTAINER_SUCCESS', id: action.id });
  } catch (e) {
    console.error('Error deleting container', e);
    yield put({ type: 'DELETE_CONTAINER_FAILURE', errorMessage: 'Could not delete container' });
  }
}

export function* updateContainer(action) {
  try {
    const data = yield call(api.updateContainer, action.id, action.containerUpdates);
    yield put({ type: 'UPDATE_CONTAINER_SUCCESS', data });
  } catch (e) {
    console.error('Error updating container', e);
    yield put({ type: 'UPDATE_CONTAINER_FAILURE', errorMessage: 'Could not update container' });
  }
}

export function* updateMedia(action) {
  try {
    const data = yield call(api.updateMedia, action.id, action.mediaUpdates);
    yield put({ type: 'UPDATE_MEDIA_SUCCESS', data });
  } catch (e) {
    console.error('Error updating media', e);
    yield put({ type: 'UPDATE_MEDIA_FAILURE', errorMessage: 'Could not update media' });
  }
}

