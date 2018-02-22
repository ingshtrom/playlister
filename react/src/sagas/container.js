import { call, put } from 'redux-saga/effects';

import * as api from '../api/container';

export function* addContainer(action) {
  try {
    const data = yield call(api.addContainer, action.parentId, action.name, action.fullPath, action.containerType);
    yield put({ type: 'ADD_CONTAINER_SUCCESS', data });
  } catch (e) {
    console.error('Error getting content', e);
    yield put({ type: 'ADD_CONTAINER_FAILURE', errorMessage: 'Could not add container' });
  }
}

