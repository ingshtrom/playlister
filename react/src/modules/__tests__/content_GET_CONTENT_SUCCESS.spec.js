import { List, fromJS } from 'immutable';
import contentReducer from '../content';
import * as models from '../../models';

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
    media: {
      media_stuff: 'really does not matter'
    },
    errorMessage: '',
    isLoading: false
  });
  const action = {
    type: 'GET_CONTENT_SUCCESS',
    data: {
      data: {
        does_not: 'matter what this is, just that it is set'
      },
      media: {
        media_stuff: 'really does not matter'
      }
    }
  };

  expect(contentReducer(startState, action)).toMatchObject(endState);
});

