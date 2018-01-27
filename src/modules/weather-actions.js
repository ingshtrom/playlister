export function updateLocationInput(value) {
  return {
    type: 'UPDATE_LOCATION_INPUT',
    value
  };
}

export function updateDateInput(value) {
  return {
    type: 'UPDATE_DATE_INPUT',
    value
  };
}

export function fetchWeather(location, date) {
  return {
    type: 'FETCH_WEATHER_REQUEST',
    location,
    date: new Date(date).getTime()
  };
}

