const { createBlobService } = require('azure-storage');

if (!process.env.AZURE_STORAGE_CONNECTION_STRING) throw new Error('AZURE_STORAGE_CONNECTION_STRING must be defined');
if (!process.env.BLOB_MEDIA_CONTAINER) throw new Error('BLOB_MEDIA_CONTAINER must be defined');

const MEDIA_CONTAINER = process.env.BLOB_MEDIA_CONTAINER || 'media';
const blobService = createBlobService();

const initPromise = init();

function init() {
  return new Promise((resolve, reject) => {
    blobService.createContainerIfNotExists(MEDIA_CONTAINER, {
      publicAccessLevel: 'blob' // can be 'private', 'blob', or 'container'
    }, (err, result, res) => {
      if (err) {
        return reject(err);
      }

      resolve(result);
    });
  });
}

async function createMedia(readStream, streamLength, mimeType, name) {
  await initPromise;

  const options = {
    contentSettings: {
      contentType: mimeType,
      // contentEncoding: encoding
    }
  }

  return await new Promise((resolve, reject) => {
    blobService.createAppendBlobFromStream(MEDIA_CONTAINER, name, readStream, options, (err, result, res) => {
      if (err) {
        return reject(err);
      }

      resolve(result);
    });
  });
}

function getMediaUrl(filename) {
  return `/${MEDIA_CONTAINER}/${filename}`;
}

module.exports.createMedia = createMedia;
module.exports.getMediaUrl = getMediaUrl;
