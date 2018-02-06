import { fromJS } from 'immutable';

const defaultState = fromJS({
  data: {},
  errorMessage: '',
  isLoading: false
});

export default function contentReducer(state = defaultState, action) {
  switch(action.type) {
    case 'GET_CONTENT_REQUEST':
      return getContentRequest(state, action);

    case 'GET_CONTENT_SUCCESS':
      return getContentSuccess(state, action);

    case 'GET_CONTENT_FAILURE':
      return getContentFailure(state, action);

    default:
      return state;
  }
}

function getContentRequest(state, action) {
  return state
    .set('isLoading', true)
    .set('errorMessage', '');
}

function getContentSuccess(state, action) {
  return state
    .updateIn(['data'], data => data.mergeDeep(action.data))
    .set('isLoading', false);
}

function getContentFailure(state, action) {
  return state
    .set('errorMessage', action.errorMessage)
    .set('isLoading', false);
}

