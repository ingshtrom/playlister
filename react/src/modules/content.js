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
    case 'ADD_CONTAINER_REQUEST':
      return handleRequest(state, action);

    case 'GET_CONTENT_FAILURE':
    case 'GET_MEDIA_FAILURE':
    case 'ADD_CONTAINER_FAILURE':
      return handleFailure(state, action);

    case 'GET_CONTENT_SUCCESS':
      return getContentSuccess(state, action);

    case 'GET_MEDIA_SUCCESS':
      return getMediaSuccess(state, action);

    case 'ADD_CONTAINER_SUCCESS':
      return addContainerSuccess(state, action);

    default:
      return state;
  }
}

function handleRequest(state, action) {
  return state
    .set('isLoading', true)
    .set('errorMessage', '');
}

function handleFailure(state, action) {
  return state
    .set('errorMessage', action.errorMessage)
    .set('isLoading', false);
}

function getContentSuccess(state, action) {
  return state
    .updateIn(['data'], data => data.mergeDeep(action.data))
    .set('isLoading', false);
}

function getMediaSuccess(state, action) {
  return state
    .updateIn(['media'], media => media.mergeDeep(action.data))
    .set('isLoading', false);
}

function addContainerSuccess(state, action) {
  return state.updateIn(['data'], data => data.mergeDeep({ [action.data.fullPath] : action.data }))
  .updateIn(['data'], data => {
    const parent = data.find(val => val.id === action.data.parentId);
    if (!parent) {
      console.log('could not find the parent when updating it to include the new container');
      return data;
    }

    return data.mergeDeep({
      [parent.fullPath]: parent.updateIn(['content'], content => content.push(action.data.name))
    });
  })
  .set('isLoading', false);
}

