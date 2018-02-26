import { List, fromJS } from 'immutable';
import contentReducer from '../content';
import * as models from '../../models';

test('ADD_MEDIA_FAILURE action sets isLoading=false and sets the errorMessage according to the action', () => {
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
  const action = { type: 'ADD_MEDIA_FAILURE', errorMessage: '!boobaz!' };

  expect(contentReducer(startState, action)).toMatchObject(endState);
});

