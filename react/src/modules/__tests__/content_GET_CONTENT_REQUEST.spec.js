import { List, fromJS } from 'immutable';
import contentReducer from '../content';
import * as models from '../../models';

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
