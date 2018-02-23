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

test('ADD_CONTAINER_REQUEST action sets isLoading=true and wipes any existing errorMessage', () => {
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
  const action = { type: 'ADD_CONTAINER_REQUEST' };

  expect(contentReducer(startState, action)).toMatchObject(endState);
});

test('ADD_MEDIA_REQUEST action sets isLoading=true and wipes any existing errorMessage', () => {
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
  const action = { type: 'ADD_MEDIA_REQUEST' };

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

test('ADD_CONTAINER_FAILURE action sets isLoading=false and sets the errorMessage according to the action', () => {
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
  const action = { type: 'ADD_CONTAINER_FAILURE', errorMessage: '!boobaz!' };

  expect(contentReducer(startState, action)).toMatchObject(endState);
});

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

test('ADD_CONTAINER_SUCCESS action sets isLoading=false, adds the container to the parent, and adds the container to the data object. FOLDER', () => {
  const startState = fromJS({
    data: {
      '/': new models.Folder({
        id: 1,
        fullPath: '/',
        content: []
      })
    },
    media: {},
    errorMessage: '',
    isLoading: true
  });
  const endState = fromJS({
    data: {
      '/': new models.Folder({
        id: 1,
        fullPath: '/',
        content: [ 'foo' ]
      }),
      '/foo': new models.Folder({
        id: 2,
        type: 'FOLDER',
        fullPath: '/foo',
        name: 'foo',
        parentId: 1
      })
    },
    media: {},
    errorMessage: '',
    isLoading: false
  });
  const action = {
    type: 'ADD_CONTAINER_SUCCESS',
    data: new models.Folder({
      id: 2,
      fullPath: '/foo',
      name: 'foo',
      parentId: 1
    })
  };

  expect(contentReducer(startState, action)).toMatchObject(endState);
});

test('ADD_CONTAINER_SUCCESS action sets isLoading=false, adds the container to the parent, and adds the container to the data object. PLAYLIST', () => {
  const startState = fromJS({
    data: {
      '/': new models.Folder({
        id: 1,
        fullPath: '/',
        content: []
      })
    },
    media: {},
    errorMessage: '',
    isLoading: true
  });
  const endState = fromJS({
    data: {
      '/': new models.Folder({
        id: 1,
        fullPath: '/',
        content: [ 'foo' ]
      }),
      '/foo': new models.Playlist({
        id: 2,
        fullPath: '/foo',
        name: 'foo',
        parentId: 1
      })
    },
    media: {},
    errorMessage: '',
    isLoading: false
  });
  const action = {
    type: 'ADD_CONTAINER_SUCCESS',
    data: new models.Playlist({
      id: 2,
      fullPath: '/foo',
      name: 'foo',
      parentId: 1
    })
  };

  expect(contentReducer(startState, action)).toMatchObject(endState);
});

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
