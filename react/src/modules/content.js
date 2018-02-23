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
    case 'ADD_CONTAINER_REQUEST':
    case 'ADD_MEDIA_REQUEST':
      return handleRequest(state, action);

    case 'GET_CONTENT_FAILURE':
    case 'ADD_CONTAINER_FAILURE':
    case 'ADD_MEDIA_FAILURE':
      return handleFailure(state, action);

    case 'GET_CONTENT_SUCCESS':
      return getContentSuccess(state, action);

    case 'ADD_CONTAINER_SUCCESS':
      return addContainerSuccess(state, action);

    case 'ADD_MEDIA_SUCCESS':
      return addMediaSuccess(state, action);

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
    .updateIn(['data'], data => data.mergeDeep(action.data.data))
    .updateIn(['media'], media => media.mergeDeep(action.data.media))
    .set('isLoading', false);
}

function addContainerSuccess(state, action) {
  return state.updateIn(['data'], data => data.set(action.data.fullPath, action.data))
  .updateIn(['data'], data => {
    const parent = data.find(val => val.id === action.data.parentId);
    if (!parent) {
      console.error('Could not find the parent when updating it to include the new container', action.data.id);
      return data;
    }

    return data.mergeDeep({
      [parent.fullPath]: parent.updateIn(['content'], content => content.push(action.data.name))
    });
  })
  .set('isLoading', false);
}

function addMediaSuccess(state, action) {
  return state.updateIn(['media'], media => media.set(action.data.id.toString(), action.data))
    .updateIn(['data'], data => {
      const parent = data.find(val => val.id === action.data.containerId);
      if (!parent) {
        console.error('Could not find the parent when updating it to include the new media', action.data.id);
        return data;
      }

      return data.mergeDeep({
        [parent.fullPath]: parent.updateIn(['mediaContent'], mediaContent => mediaContent.push(action.data.id.toString()))
      });
    })
    .set('isLoading', false);
}

