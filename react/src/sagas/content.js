import { put } from 'redux-saga/effects';

const fakeData = {
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

export function* getContent(action) {
  try {
    console.log(`getContent for prefix '${action.prefix}'`);
    setTimeout(function* () {
      console.log('startin');
      // TODO: make actual API request. Assume we load the whole tree for now
      // TODO: error handling for going farther than we have data for
      const prefixList = action.prefix.split('/').filter(i => !!i);
      let dataForPrefix = fakeData;
      for (let i = 0; i < prefixList.length; i++) {
        const nextPrefix = prefixList[i];
        dataForPrefix = dataForPrefix.content.find(el => el.name === nextPrefix);
      }

      console.log('done!');
      yield put({ type: 'GET_CONTENT_SUCCESS', data: dataForPrefix });
    }, 3000);
  } catch (e) {
    console.error('Error getting content', e);
    yield put({ type: 'GET_CONTENT_FAILURE', errorMessage: 'Could not find content' });
  }
}

