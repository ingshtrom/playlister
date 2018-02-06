import { call, put } from 'redux-saga/effects';

import * as api from '../api/content';

export function* getContent(action) {
  try {
    console.log('getContent');
    const data = yield call(api.getContent);
    yield put({ type: 'GET_CONTENT_SUCCESS', data });
  } catch (e) {
    console.error('Error getting content', e);
    yield put({ type: 'GET_CONTENT_FAILURE', errorMessage: 'Could not find content' });
  }
}

export function* getMedia(action) {
  try {
    console.log(`getMedia for ids '${action.ids}'`);
    const data = yield call(api.getMedia, action.ids);
    yield put({ type: 'GET_MEDIA_SUCCESS', data });
  } catch (e) {
    console.error('Error getting media', e);
    yield put({ type: 'GET_MEDIA_FAILURE', errorMessage: 'Could not find media' });
  }
}

