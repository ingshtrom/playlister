import { takeLatest } from 'redux-saga/effects';

import {
  getContent,
  getMedia
} from './content';

function* sagas() {
  yield takeLatest('GET_CONTENT_REQUEST', getContent);
  yield takeLatest('GET_MEDIA_REQUEST', getMedia);
}

export default sagas;
