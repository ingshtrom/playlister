import { List, Map } from 'immutable';

import * as models from '../models';
import Auth from '../services/Auth';

const auth = new Auth();

async function assertStatusCode(fetchResult) {
  if (fetchResult.status === 500) {
    throw new Error('Unknown error getting data');
  }

  if (fetchResult.status === 401) {
    throw new Error('You are not authorized to perform that action! Please try to login again or contact your administrator.');
  }

  if (fetchResult.status === 400) {
    const body = await fetchResult.json();
    throw new Error(body.error);
  }
}

function parseFolder(body) {
  let folder = new models.Folder(body);

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
  return { data, media: List() };
}

function parsePlaylist(body) {
  let playlist = new models.Playlist(body);

  let media = playlist.mediaContent
    .map(obj => {
      switch (obj.type) {
        case 'IMAGE':
          return new models.Image(obj);
        default:
          return new models.Video(obj);
      }
    })
    .filter(x => x)
    .reduce((prev, next) => {
      return prev.set(next.id, next);
    }, Map());

  playlist = playlist.set('mediaContent', playlist.mediaContent.map(obj => obj.id));
  console.log('api.getContent done!', media);

  return {
    data: {
      [playlist.fullPath]: playlist
    },
    media
  }
}

export async function getContainerContent(path) {
  try {
    console.log('starting api.getContent');
    const fetchResult = await fetch(`/api/containers?path=${path}`, {
      headers: {
        'Authorization': `Bearer ${auth.getIdToken()}`
      }
    })

    await assertStatusCode(fetchResult);

    const body = await fetchResult.json();

    if (body.type === 'PLAYLIST') return parsePlaylist(body);

    return parseFolder(body);
  } catch (err) {
    console.error('api.getContent error', err);
    throw err;
  }
}

export async function getMedia(ids) {
  try {
    console.log('starting api.getMedia', ids);
    const fetchResult = await fetch(`/api/content/media?ids=${ids.join(',')}`, {
      headers: {
        'Authorization': `Bearer ${auth.getIdToken()}`
      }
    })
    const body = await fetchResult.json();

    await assertStatusCode(fetchResult);

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
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${auth.getIdToken()}`,
      }
    });

    await assertStatusCode(fetchResult);

    const body = await fetchResult.json();

    console.log('api.addContainer done!', body);

    if (body.type === 'PLAYLIST') {
      return new models.Playlist(body);
    }

    return new models.Folder(body);
  } catch (err) {
    console.error('api.addContainer error', err);
    throw err;
  }
}

export async function addMedia(playlistId, name, playlistIndex, type, file) {
  try {
    console.log('starting api.addMedia', playlistId, name, playlistIndex, type);

    if (!name || !file) {
      throw new Error('name or file not filled out for new media');
    }

    const fetchResult = await fetch('/api/media', {
      method: 'POST',
      body: JSON.stringify({
        containerId: playlistId,
        name,
        playlistIndex,
        type: type.toUpperCase()
      }),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${auth.getIdToken()}`,
      }
    });

    await assertStatusCode(fetchResult);

    const body = await fetchResult.json();

    const form = new FormData();
    form.append('media', file);

    const uploadResult = await fetch(`/api/media/${body.id}/upload`, {
      method: 'POST',
      body: form,
      headers: {
        'Authorization': `Bearer ${auth.getIdToken()}`,
      }
    });

    await assertStatusCode(uploadResult);

    console.log('api.addMedia done!', body);

    if (body.type === 'IMAGE') {
      return new models.Image(body);
    }

    return new models.Video(body);
  } catch (err) {
    console.error('api.addMedia error', err);
    throw err;
  }
}

export async function reorderMedia(playlistId, orderedMedia) {
  try {
    console.log('starting api.reorderMedia');
    const fetchResult = await fetch(`/api/containers/${playlistId}/order`, {
      method: 'PUT',
      body: JSON.stringify(orderedMedia),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${auth.getIdToken()}`,
      }
    });

    await assertStatusCode(fetchResult);

  } catch (err) {
    console.error('api.reorderMedia error', err);
    throw err;
  }
}

export async function deleteMedia(id) {
  try {
    console.log('starting api.deleteMedia', id);

    const fetchResult = await fetch(`/api/media/${id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${auth.getIdToken()}`,
      }
    });

    await assertStatusCode(fetchResult);
  } catch (err) {
    console.error('api.deleteMedia error', err);
    throw err;
  }
}

export async function deleteContainer(id) {
  try {
    console.log('starting api.deleteContainer', id);

    const fetchResult = await fetch(`/api/containers/${id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${auth.getIdToken()}`,
      }
    });

    await assertStatusCode(fetchResult);
  } catch (err) {
    console.error('api.deleteContainer error', err);
    throw err;
  }
}

export async function updateContainer(id, containerUpdates) {
  try {
    console.log('starting api.updateContainer', id, containerUpdates);

    const fetchResult = await fetch(`/api/containers/${id}`, {
      method: 'PUT',
      body: JSON.stringify(containerUpdates),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${auth.getIdToken()}`,
      }
    });

    await assertStatusCode(fetchResult);

    const body = await fetchResult.json();

    console.log('api.updateContainer done!', body);

    if (body.type === 'PLAYLIST') {
      return new models.Playlist(body);
    }

    return new models.Folder(body);
  } catch (err) {
    console.error('api.updateContainer error', err);
    throw err;
  }
}

export async function updateMedia(id, mediaUpdates) {
  try {
    console.log('starting api.updateMedia', id, mediaUpdates);

    const fetchResult = await fetch(`/api/media/${id}`, {
      method: 'PUT',
      body: JSON.stringify(mediaUpdates),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${auth.getIdToken()}`,
      }
    });

    await assertStatusCode(fetchResult);

    const body = await fetchResult.json();

    console.log('api.updateMedia done!', body);

    if (body.type === 'IMAGE') {
      return new models.Image(body);
    }

    return new models.Video(body);
  } catch (err) {
    console.error('api.updateMedia error', err);
    throw err;
  }
}

