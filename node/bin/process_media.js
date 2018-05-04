require('dotenv').config();

const Sequelize = require('sequelize');
const express   = require('express');
const uuid      = require('uuid/v4');
const fs        = require('fs');
const path      = require('path');
const mime      = require('mime');

const {
  getDbInstance
} = require('../services/mysql');

const {
  createMedia,
  getMediaUrl
}   = require('../services/blob');

let dbInstance;

const MEDIA_REGEX = /\.?(jpg|jpeg|png|mp4|mov|avi|gif)/;
const UPLOAD_DIRECTORY = process.env.UPLOAD_DIRECTORY;

if (!UPLOAD_DIRECTORY) throw new Error('UPLOAD_DIRECTORY must be defined');

console.log('process media', UPLOAD_DIRECTORY);

scheduleProcessing(0);

function scheduleProcessing(delay = 1000 * 60) {
  setTimeout(() => {
    processDirectory()
      .catch(err => {
        console.error('Something bad happened while processing!', err);
        process.exit(1);
      });
  }, delay);
}

async function processDirectory() {
  if (!dbInstance) dbInstance = await getDbInstance();

  const files = fs.readdirSync(UPLOAD_DIRECTORY)
    .filter(file => {
      const extension = path.extname(file);
      return MEDIA_REGEX.test(extension);
    });

  for (let file of files) {
    try {
      const fullPath = path.resolve(UPLOAD_DIRECTORY, file);
      const fileStat = fs.statSync(fullPath);
      await processFile(fullPath, fileStat.size, mime.getType(file));
    } catch (err) {
      console.error('Inner error processing a file. continuing on with the rest', file, err);
    }
  }

  scheduleProcessing();
}


async function processFile(filePath, fileSize, fileType, tries = 0) {
  try {
    console.time(`${filePath} => processFile`);

    console.time(`${filePath} => get media id from metadata file`);
    const mediaId = await readFile(`${filePath}.txt`);
    console.timeEnd(`${filePath} => get media id from metadata file`);

    console.time(`${filePath} => db query`);
    const { Media } = dbInstance.models;
    const media = await Media.find({ where: { id: mediaId } });
    console.timeEnd(`${filePath} => db query`);

    if (!media) {
      throw new Error('The media does not exist');
    }

    console.time(`${filePath} => create blob`);
    const newFilename = `${uuid()}${path.extname(filePath)}`;
    await createMedia(
      fs.createReadStream(filePath),
      fileSize,
      fileType,
      newFilename,
    );
    console.timeEnd(`${filePath} => create blob`);

    console.time(`${filePath} => update media record`);
    media.url = getMediaUrl(newFilename);
    media.contentType = fileType;
    await media.save();
    console.timeEnd(`${filePath} => update media record`);

    console.time(`${filePath} => delete file`);
    fs.unlinkSync(filePath);
    fs.unlinkSync(`${filePath}.txt`);
    console.timeEnd(`${filePath} => delete file`);

    console.timeEnd(`${filePath} => processFile`);
  } catch (err) {
    console.error('An error ocurred while trying to process the file. Will try up to 5 times.', err, filePath, fileSize, fileType, tries);

    if (tries < 5) {
      return setTimeout(() => {
        processFile(filePath, fileSize, fileType, tries + 1);
      }, 1000 * 5 * tries);
    }

    console.log('We tried, tried, tried, tried, and... tried. Nothing worked. Just going to delete the file and move on with our lives. This must not have been the file you were looking for...');
    try {
      fs.unlinkSync(filePath);
    } catch (e) {}

    try {
      fs.unlinkSync(filePath + '.txt');
    } catch (e) {}
  }
}

function readFile(path) {
  return new Promise((resolve, reject) => {
    fs.readFile(path, 'utf8', (err, data) => {
      if (err) return reject(err);

      resolve(data);
    });
  });
}
