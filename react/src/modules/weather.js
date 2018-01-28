import moment from 'moment';

const defaultState = {
  locationInput: 'Indianapolis, IN',
  dateInput: moment(),
  weatherData: {},
  errorMessage: ''
};

export default function weatherReducer(state = defaultState, action) {
  switch(action.type) {
    case 'UPDATE_LOCATION_INPUT':
      return {
        ...state,
        locationInput: action.value
      };

    case 'UPDATE_DATE_INPUT':
      return {
        ...state,
        dateInput: action.value
      };

    case 'FETCH_WEATHER_REQUEST':
      return {
        ...state,
        locationInput: action.location,
        dateInput: action.date
      };

    case 'FETCH_WEATHER_SUCCESS':
      return {
        ...state,
        weatherData: action.weatherData
      };

    case 'FETCH_WEATHER_FAILURE':
      return {
        ...state,
        errorMessage: action.errorMessage
      };

    default:
      return state;
  }
}
