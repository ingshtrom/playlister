import { put } from 'redux-saga/effects';
import * as foldersSagas from '../content';

const expectedRootContent = {
  name: 'root',
  type: 'folder',
  content: [
    {
      name: 'foo',
      type: 'folder',
      content: [
        {
          name: 'bar',
          type: 'folder',
          content: []
        },
        {
          name: 'bar2',
          type: 'folder',
          content: [
            {
              name: 'blubber',
              type: 'playlist',
              content: []
            }
          ]
        }
      ]
    },
    {
      name: 'bar',
      type: 'folder',
      content: [
        {
          name: 'baz',
          type: 'playlist',
          content: []
        }
      ]
    }
  ]
};

test('getContent selects the correct root data', () => {
  const gen = foldersSagas.getContent({
    type: 'GET_CONTENT',
    prefix: '/'
  });

  expect(gen.next().value).toMatchObject(put({ type: 'GET_CONTENT_SUCCESS', data: expectedRootContent }));
});

test('getContent selects the correct folder data (depth: 1)', () => {
  const gen = foldersSagas.getContent({
    type: 'GET_CONTENT',
    prefix: '/foo'
  });

  expect(gen.next().value).toMatchObject(put({ type: 'GET_CONTENT_SUCCESS', data: expectedRootContent.content[0] }));
});

test('getContent selects the correct folder data (depth: 2)', () => {
  const gen = foldersSagas.getContent({
    type: 'GET_CONTENT',
    prefix: '/foo/bar2'
  });

  expect(gen.next().value).toMatchObject(put({ type: 'GET_CONTENT_SUCCESS', data: expectedRootContent.content[0].content[1] }));
});

