import { takeLatest } from 'redux-saga/effects';

import {
  getContent
} from './content';

function* sagas() {
  yield takeLatest('GET_CONTENT_REQUEST', getContent);
}

export default sagas;
