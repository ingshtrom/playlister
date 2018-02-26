import { fromJS } from 'immutable';
import contentReducer from '../content';
import * as models from '../../models';

test('TOGGLE_PREVIEW_MEDIA_ITEM correctly toggles the `isBeingPreviewed` boolean from false to true', () => {
  expect.assertions(1);

  const startState = fromJS({
    data: {},
    media: {
      '3': new models.Video({
        id: 3,
        name: 'foo',
        playlistIndex: 0,
        containerId: 1
      })
    },
    errorMessage: '',
    isLoading: true
  });
 const endState = fromJS({
    data: {},
    media: {
      '3': new models.Video({
        id: 3,
        name: 'foo',
        playlistIndex: 0,
        containerId: 1,
        isBeingPreviewed: true
      })
    },
    errorMessage: '',
    isLoading: true
  });
  const action = {
    type: 'TOGGLE_PREVIEW_MEDIA_ITEM',
    id: 3
  };

  expect(contentReducer(startState, action)).toMatchObject(endState);
});

test('TOGGLE_PREVIEW_MEDIA_ITEM correctly toggles the `isBeingPreviewed` boolean from true to false', () => {
  expect.assertions(1);

  const startState = fromJS({
    data: {},
    media: {
      '3': new models.Video({
        id: 3,
        name: 'foo',
        playlistIndex: 0,
        containerId: 1,
        isBeingPreviewed: true
      })
    },
    errorMessage: '',
    isLoading: true
  });
 const endState = fromJS({
    data: {},
    media: {
      '3': new models.Video({
        id: 3,
        name: 'foo',
        playlistIndex: 0,
        containerId: 1,
        isBeingPreviewed: false
      })
    },
    errorMessage: '',
    isLoading: true
  });
  const action = {
    type: 'TOGGLE_PREVIEW_MEDIA_ITEM',
    id: 3
  };

  expect(contentReducer(startState, action)).toMatchObject(endState);
});

