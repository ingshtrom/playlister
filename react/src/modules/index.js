import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'

import weatherReducer from './weather';

export default combineReducers({
  routing: routerReducer,
  weather: weatherReducer
});
