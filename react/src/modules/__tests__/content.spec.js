import { fromJS } from 'immutable';
import contentReducer from '../content';

test('GET_CONTENT_REQUEST action sets isLoading=true and wipes any existing errorMessage', () => {
  const startState = fromJS({
    data: {},
    media: {},
    errorMessage: '!foobar!',
    isLoading: false
  });
  const endState = fromJS({
    data: {},
    media: {},
    errorMessage: '',
    isLoading: true
  });
  const action = { type: 'GET_CONTENT_REQUEST' };

  expect(contentReducer(startState, action)).toMatchObject(endState);
});

test('GET_MEDIA_REQUEST action sets isLoading=true and wipes any existing errorMessage', () => {
  const startState = fromJS({
    data: {},
    media: {},
    errorMessage: '!foobar!',
    isLoading: false
  });
  const endState = fromJS({
    data: {},
    media: {},
    errorMessage: '',
    isLoading: true
  });
  const action = { type: 'GET_MEDIA_REQUEST' };

  expect(contentReducer(startState, action)).toMatchObject(endState);
});


test('GET_CONTENT_FAILURE action sets isLoading=false and sets the errorMessage according to the action', () => {
  const startState = fromJS({
    data: {},
    media: {},
    errorMessage: '',
    isLoading: true
  });
  const endState = fromJS({
    data: {},
    media: {},
    errorMessage: '!boobaz!',
    isLoading: false
  });
  const action = { type: 'GET_CONTENT_FAILURE', errorMessage: '!boobaz!' };

  expect(contentReducer(startState, action)).toMatchObject(endState);
});

test('GET_MEDIA_FAILURE action sets isLoading=false and sets the errorMessage according to the action', () => {
  const startState = fromJS({
    data: {},
    media: {},
    errorMessage: '',
    isLoading: true
  });
  const endState = fromJS({
    data: {},
    media: {},
    errorMessage: '!boobaz!',
    isLoading: false
  });
  const action = { type: 'GET_MEDIA_FAILURE', errorMessage: '!boobaz!' };

  expect(contentReducer(startState, action)).toMatchObject(endState);
});

test('GET_CONTENT_SUCCESS action sets isLoading=false and sets the data according to the action', () => {
  const startState = fromJS({
    data: {},
    media: {},
    errorMessage: '',
    isLoading: true
  });
  const endState = fromJS({
    data: {
      does_not: 'matter what this is, just that it is set'
    },
    media: {},
    errorMessage: '',
    isLoading: false
  });
  const action = { type: 'GET_CONTENT_SUCCESS', data: { does_not: 'matter what this is, just that it is set' }};

  expect(contentReducer(startState, action)).toMatchObject(endState);
});

test('GET_MEDIA_SUCCESS action sets isLoading=false and sets the media according to the action', () => {
  const startState = fromJS({
    data: {},
    media: {},
    errorMessage: '',
    isLoading: true
  });
  const endState = fromJS({
    data: {
    },
    media: {
      does_not: 'matter what this is, just that it is set'
    },
    errorMessage: '',
    isLoading: false
  });
  const action = { type: 'GET_MEDIA_SUCCESS', data: { does_not: 'matter what this is, just that it is set' }};

  expect(contentReducer(startState, action)).toMatchObject(endState);
});

