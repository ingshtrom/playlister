import { Map } from 'immutable';

import * as models from '../models';

export async function getContainerContent(path) {
  try {
    console.log('starting api.getContent');
    const fetchResult = await fetch(`/api/containers?path=${path}`)
    const body = await fetchResult.json();

    let folder = new models.Folder(body);
    console.log(folder, body);

    let data = folder.content
      .map(obj => {
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

    folder = folder.set('content', folder.content.map(obj => obj.name));
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

export async function addContainer(parentId, name, fullPath, type) {
  try {
    console.log('starting api.addContainer', parentId, name, fullPath, type);
    const fetchResult = await fetch('/api/containers', {
      method: 'POST',
      body: JSON.stringify({
        parentId,
        name,
        fullPath,
        type: type.toUpperCase()
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if (fetchResult.status === 500) {
      throw new Error('Unkown error adding container');
    }

    if (fetchResult.status === 400) {
      const body = await fetchResult.json();
      throw new Error(body.error);
    }

    const body = await fetchResult.json();
    const newFolder = new models.Folder(body);

    console.log('api.addContainer done!', newFolder);
    return newFolder;
  } catch (err) {
    console.error('api.addContainer error', err);
    throw err;
  }
}

