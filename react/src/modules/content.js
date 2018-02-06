import { fromJS } from 'immutable';

const defaultState = fromJS({
  data: {},
  media: {},
  errorMessage: '',
  isLoading: false
});

export default function contentReducer(state = defaultState, action) {
  switch(action.type) {
    case 'GET_CONTENT_REQUEST':
    case 'GET_MEDIA_REQUEST':
      return getContentRequest(state, action);

    case 'GET_CONTENT_FAILURE':
    case 'GET_MEDIA_FAILURE':
      return getContentFailure(state, action);

    case 'GET_CONTENT_SUCCESS':
      return getContentSuccess(state, action);

    case 'GET_MEDIA_SUCCESS':
      return getMediaSuccess(state, action);

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

function getMediaSuccess(state, action) {
  return state
    .updateIn(['media'], media => media.mergeDeep(action.data))
    .set('isLoading', false);
}

