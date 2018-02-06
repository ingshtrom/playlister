import { Map } from 'immutable';
import Folder from '../models/Folder';
import Playlist from '../models/Playlist';

const fakeData = {
  '/': {
    name: 'root',
    type: 'FOLDER',
    content: [ 'foo', 'bar' ]
  },
  '/foo': {
    name: 'foo',
    type: 'FOLDER',
    content: [ 'bar', 'bar2' ]
  },
  '/foo/bar': {
    name: 'bar',
    type: 'FOLDER',
    content: []
  },
  '/foo/bar2': {
    name: 'bar2',
    type: 'FOLDER',
    content: [ 'blubber' ]
  },
  '/foo/bar2/blubber': {
    name: 'blubber',
    type: 'PLAYLIST',
    content: []
  },
  '/bar': {
    name: 'bar',
    type: 'FOLDER',
    content: [ 'baz' ]
  },
  '/bar/baz': {
    name: 'baz',
    type: 'PLAYLIST',
    content: []
  }
};

export function getContent() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      try {
        console.log('starting api.getContent');
        const data = Object.keys(fakeData)
          .map(key => {
            const obj = fakeData[key];
            obj.fullUrl = key;
            console.log('obj', obj);

            switch (obj.type) {
              case 'PLAYLIST':
                return new Playlist(obj);
              default:
                return new Folder(obj);
            }
          })
          .reduce((prev, next) => {
            return prev.set(next.fullUrl, next);
          }, Map());

        resolve(data);
        console.log('done!', data);
      } catch (err) {
        console.error('error getting content', err);
        reject(err);
      }
    }, 1000);
  });
}

// export function getContent(prefix) {
//   return new Promise((resolve, reject) => {
//     setTimeout(() => {
//       try {
//         console.log('starting api.getContent');
//         // TODO: make actual API request. Assume we load the whole tree for now
//         // TODO: error handling for going farther than we have data for
//         const prefixList = prefix.split('/').filter(i => !!i);
//         let dataForPrefix = fakeData;
//         for (let i = 0; i < prefixList.length; i++) {
//           const nextPrefix = prefixList[i];
//           dataForPrefix = dataForPrefix.content.find(el => el.name === nextPrefix);
//         }

//         resolve(dataForPrefix);
//         console.log('done!');
//       } catch (err) {
//         reject(err);
//       }
//     }, 2000);
//   });
// }

