import { put } from 'redux-saga/effects';

import * as api from '../api/weather';

export function* fetchWeather(action) {
  try {
    const weatherData = yield api.fetchWeather(action.location, action.date);
    console.log('weatherData', weatherData);
    yield put({ type: 'FETCH_WEATHER_SUCCESS', weatherData });
  } catch (e) {
    yield put({ type: 'FETCH_WEATHER_FAILURE', errorMessage: e.message });
  }
}

