import { takeLatest } from 'redux-saga/effects';

import {
  fetchWeather
} from './weather';

function* sagas() {
  yield takeLatest('FETCH_WEATHER_REQUEST', fetchWeather);
}

export default sagas;
