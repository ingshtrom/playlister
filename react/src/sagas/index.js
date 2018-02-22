import { takeLatest } from 'redux-saga/effects';

import {
  addContainer,
  addMedia,
  getContent,
  getMedia
} from './content';

function* sagas() {
  yield takeLatest('GET_CONTENT_REQUEST', getContent);
  yield takeLatest('GET_MEDIA_REQUEST', getMedia);
  yield takeLatest('ADD_CONTAINER_REQUEST', addContainer);
  yield takeLatest('ADD_MEDIA_REQUEST', addMedia);
}

export default sagas;
