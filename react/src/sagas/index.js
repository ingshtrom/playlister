import { takeLatest, throttle } from 'redux-saga/effects';

import {
  addContainer,
  addMedia,
  deleteMedia,
  deleteContainer,
  getContent,
  getMedia,
  reorderMedia,
} from './content';

function* sagas() {
  yield takeLatest('GET_CONTENT_REQUEST', getContent);
  yield takeLatest('GET_MEDIA_REQUEST', getMedia);
  yield takeLatest('ADD_CONTAINER_REQUEST', addContainer);
  yield takeLatest('ADD_MEDIA_REQUEST', addMedia);
  yield takeLatest('DELETE_MEDIA_REQUEST', deleteMedia);
  yield takeLatest('DELETE_CONTAINER_REQUEST', deleteContainer);
  yield throttle(1.5 * 1000, [ 'MOVE_MEDIA_UP_REQUEST', 'MOVE_MEDIA_DOWN_REQUEST' ], reorderMedia);
}

export default sagas;
