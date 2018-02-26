import { fromJS } from 'immutable';
import contentReducer from '../content';
import * as models from '../../models';

test('MOVE_MEDIA_DOWN_ACTION fails if it is already the last item in the list', () => {
  const startState = fromJS({
    data: {
      '/foo': new models.Playlist({
        id: 2,
        fullPath: '/foo',
        mediaContent: [ '5' ]
      })
    },
    media: {
      '5': new models.Video({
        id: 5,
        name: 'bar',
        playlistIndex: 0,
        containerId: 1
      }),
      '6': new models.Video({
        id: 6,
        name: 'bar',
        playlistIndex: 1,
        containerId: 1
      })
    },
    errorMessage: '',
    isLoading: true
  });
 const endState = fromJS({
    data: {
      '/foo': new models.Playlist({
        id: 2,
        fullPath: '/foo',
        mediaContent: [ '5' ]
      })
    },
    media: {
      '5': new models.Video({
        id: 5,
        name: 'bar',
        playlistIndex: 0,
        containerId: 1
      }),
      '6': new models.Video({
        id: 6,
        name: 'bar',
        playlistIndex: 1,
        containerId: 1
      })
    },
    errorMessage: 'Cannot move media down. Already the last item in the list.',
    isLoading: true
  });
  const action = {
    type: 'MOVE_MEDIA_DOWN_REQUEST',
    id: 6
  };

  expect(contentReducer(startState, action)).toMatchObject(endState);
});

test('MOVE_MEDIA_DOWN_ACTION correctly swaps two media items', () => {
  const startState = fromJS({
    data: {
      '/foo': new models.Playlist({
        id: 2,
        fullPath: '/foo',
        mediaContent: [ '5' ]
      })
    },
    media: {
      '5': new models.Video({
        id: 5,
        name: 'bar',
        playlistIndex: 0,
        containerId: 1
      }),
      '6': new models.Video({
        id: 6,
        name: 'bar',
        playlistIndex: 1,
        containerId: 1
      })
    },
    errorMessage: '',
    isLoading: true
  });
 const endState = fromJS({
    data: {
      '/foo': new models.Playlist({
        id: 2,
        fullPath: '/foo',
        mediaContent: [ '5' ]
      })
    },
    media: {
      '5': new models.Video({
        id: 5,
        name: 'bar',
        playlistIndex: 1,
        containerId: 1
      }),
      '6': new models.Video({
        id: 6,
        name: 'bar',
        playlistIndex: 0,
        containerId: 1
      })
    },
    errorMessage: '',
    isLoading: true
  });
  const action = {
    type: 'MOVE_MEDIA_DOWN_REQUEST',
    id: 5
  };

  expect(contentReducer(startState, action)).toMatchObject(endState);
});
