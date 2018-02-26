import { fromJS } from 'immutable';
import contentReducer from '../content';
import * as models from '../../models';

test('ADD_MEDIA_SUCCESS action sets isLoading=false, adds the media to the playlist, and adds the media to the media object. IMAGE', () => {
  const startState = fromJS({
    data: {
      '/': new models.Playlist({
        id: 1,
        fullPath: '/',
        mediaContent: []
      })
    },
    media: {},
    errorMessage: '',
    isLoading: true
  });
  const endState = fromJS({
    data: {
      '/': new models.Playlist({
        id: 1,
        fullPath: '/',
        mediaContent: [ '5' ]
      })
    },
    media: {
      5: new models.Image({
        id: 5,
        name: 'foo',
        playlistIndex: 0,
        containerId: 1
      })
    },
    errorMessage: '',
    isLoading: false
  });
  const action = {
    type: 'ADD_MEDIA_SUCCESS',
    data:new models.Image({
      id: 5,
      name: 'foo',
      playlistIndex: 0,
      containerId: 1
    })
  };

  expect(contentReducer(startState, action)).toMatchObject(endState);
});

test('ADD_MEDIA_SUCCESS action sets isLoading=false, adds the media to the playlist, and adds the media to the media object. VIDEO', () => {
  const startState = fromJS({
    data: {
      '/': new models.Playlist({
        id: 1,
        fullPath: '/',
        mediaContent: []
      })
    },
    media: {},
    errorMessage: '',
    isLoading: true
  });
  const endState = fromJS({
    data: {
      '/': new models.Playlist({
        id: 1,
        fullPath: '/',
        mediaContent: [ '5' ]
      })
    },
    media: {
      '5': new models.Video({
        id: 5,
        name: 'foo',
        playlistIndex: 0,
        containerId: 1
      })
    },
    errorMessage: '',
    isLoading: false
  });
  const action = {
    type: 'ADD_MEDIA_SUCCESS',
    data: new models.Video({
      id: 5,
      name: 'foo',
      playlistIndex: 0,
      containerId: 1
    })
  };

  expect(contentReducer(startState, action)).toMatchObject(endState);
});

