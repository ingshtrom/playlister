import { Map } from 'immutable';

import * as models from '../models';

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
    content: [ 'media-1', 'media-2', 'media-3' ]
  },
  '/bar': {
    name: 'bar',
    type: 'FOLDER',
    content: [ 'baz' ]
  },
  '/bar/baz': {
    name: 'baz',
    type: 'PLAYLIST',
    content: [ 'media-4' ]
  }
};

const fakeMedia = {
  'media-1': {
    name: 'shotshotshotshotshots',
    blobUrl: 'https://some-url/io23ji2ff.png',
    type: 'IMAGE'
  },
  'media-2': {
    name: 'Dog Kicking',
    blobUrl: 'https://some-url/io23jilasliefwl2ff.mp4',
    type: 'VIDEO'
  },
  'media-3': {
    name: 'Cat Field Goal',
    blobUrl: 'https://some-url/io23hekoehjif.mp4',
    type: 'VIDEO'
  },
  'media-4': {
    name: 'shotshotshotshotshots',
    blobUrl: 'https://some-url/io23ji2ff.png',
    type: 'IMAGE'
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

            if (!obj) return null


            obj.fullUrl = key;

            switch (obj.type) {
              case 'PLAYLIST':
                return new models.Playlist(obj);
              default:
                return new models.Folder(obj);
            }
          })
          .filter(x => x)
          .reduce((prev, next) => {
            return prev.set(next.fullUrl, next);
          }, Map());

        resolve(data);
        console.log('api.getContent done!', data);
      } catch (err) {
        console.error('api.getContent error', err);
        reject(err);
      }
    }, 1000);
  });
}

export function getMedia(ids) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      try {
        console.log('starting api.getMedia', ids);

        const media = ids.map(id => {
          const mediaObject = fakeMedia[id]
          console.log('api.getMedia', id, mediaObject);

          if (!mediaObject) return null;

          mediaObject.id = id;

          switch (mediaObject.type) {
            case 'VIDEO':
              return new models.Video(mediaObject);
            default:
              return new models.Image(mediaObject);
          }
        })
        .filter(x => x)
        .reduce((prev, next) => {
          return prev.set(next.id, next);
        }, Map());

        resolve(media);
        console.log('api.getMedia done!', media);
      } catch (err) {
        console.error('api.getMedia error', err);
        reject(err);
      }
    }, 1000);
  });
}

