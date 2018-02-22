import * as models from '../models';

export async function addContainer(parentId, name, fullPath, type) {
  try {
    console.log('starting api.addContainer');
    const fetchResult = await fetch('/api/containers', {
      method: 'POST',
      body: JSON.stringify({
        parentId,
        name,
        fullPath,
        type: type.toUpperCase()
      })
    });
    const body = await fetchResult.json();
    const newFolder = new models.Folder(body);

    console.log('api.addContainer done!', newFolder);
    return newFolder;
  } catch (err) {
    console.error('api.addContainer error', err);
    throw err;
  }
}

