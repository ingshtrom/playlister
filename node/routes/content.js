const express = require('express');
const router = express.Router();

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

router.get('/containers', async (req, res) => {
  res.status(200).json(fakeData);
});

router.get('/media', async (req, res) => {
  try {
    let  ids = req.query.ids;
    if (!ids) return res.status(400).send();

    res.status(200).json(fakeMedia);
  } catch (err) {
    console.error('Error getting media', err);
    throw err;
  }
});

module.exports = router;
