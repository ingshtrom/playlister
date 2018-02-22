import { Map } from 'immutable';

import * as models from '../models';

export async function getContainerContent(path) {
  try {
    console.log('starting api.getContent');
    const fetchResult = await fetch(`/api/containers?path=${path}`)
    const body = await fetchResult.json();

    const folder = new models.Folder(body);
    console.log(folder, body);

    let data = Object.keys(folder.content)
      .map(key => {
        const obj = body[key];
        if (!obj) return null

        obj.fullPath = key;

        switch (obj.type) {
          case 'PLAYLIST':
            return new models.Playlist(obj);
          default:
            return new models.Folder(obj);
        }
      })
      .filter(x => x)
      .reduce((prev, next) => {
        return prev.set(next.fullPath, next);
      }, Map());

    data = data.set(folder.fullPath, folder);
    console.log('api.getContent done!', data);
    return data
  } catch (err) {
    console.error('api.getContent error', err);
    throw err;
  }
}

export async function getMedia(ids) {
  try {
    console.log('starting api.getMedia', ids);
    const fetchResult = await fetch(`/api/content/media?ids=${ids.join(',')}`)
    const body = await fetchResult.json();

    const media = ids.map(id => {
      const mediaObject = body[id]

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

    console.log('api.getMedia done!', media);
    return media;
  } catch (err) {
    console.error('api.getMedia error', err);
    throw err;
  }
}

