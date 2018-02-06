import { call, put } from 'redux-saga/effects';

import * as api from '../api/content';

export function* getContent(action) {
  try {
    console.log(`getContent for prefix '${action.prefix}'`);
    const data = yield call(api.getContent);
    yield put({ type: 'GET_CONTENT_SUCCESS', data });
  } catch (e) {
    console.error('Error getting content', e);
    yield put({ type: 'GET_CONTENT_FAILURE', errorMessage: 'Could not find content' });
  }
}

