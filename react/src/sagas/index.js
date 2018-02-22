import { takeLatest } from 'redux-saga/effects';

import {
  addContainer,
  getContent,
  getMedia
} from './content';

function* sagas() {
  yield takeLatest('GET_CONTENT_REQUEST', getContent);
  yield takeLatest('GET_MEDIA_REQUEST', getMedia);
  yield takeLatest('ADD_CONTAINER_REQUEST', addContainer);
}

export default sagas;
