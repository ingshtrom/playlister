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

