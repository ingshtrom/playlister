import { List, fromJS } from 'immutable';
import contentReducer from '../content';
import * as models from '../../models';

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

