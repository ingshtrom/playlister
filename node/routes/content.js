const { Op } = require('sequelize');
const express = require('express');

const { getModels } = require('../services/mysql');

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

router.get('/media', async (req, res, next) => {
  try {
    let  ids = req.query.ids;
    if (!ids) return res.status(400).send();

    res.status(200).json(fakeMedia);
  } catch (err) {
    console.error('Error getting media', err);
    next(err);
  }
});

// CREATE a container
router.post('/containers', async (req, res, next) => {
  try {
    const body = req.body;

    if (typeof body.isLocked !== 'undefined') return res.status(400).json({ error: 'Cannot set the isLocked column' });
    if (typeof body.id !== 'undefined') return res.status(400).json({ error: 'Cannot set the id column' });
    if (typeof body.updatedAt !== 'undefined') return res.status(400).json({ error: 'Cannot set the updatedAt column' });
    if (typeof body.createdAt !== 'undefined') return res.status(400).json({ error: 'Cannot set the createdAt column' });

    const models = await getModels();
    const container = await models.Container.create({
      ...body
    });

    res.status(201).json(container);
  } catch (err) {
    console.error('Error creating container', err);
    next(err);
  }
});

// DELETE a container
router.delete('/containers/:id', async (req, res, next) => {
  try {
    const id = req.params.id;
    if (!id) return res.status(400).json({ error: 'No id specified' });

    const models = await getModels();
    await models.Container.destroy({
      where: {
        id
      }
    });

    res.status(204).end();
  } catch (err) {
    console.error('Error creating container', err);
    next(err);
  }
});

// GET container contents
router.get('/containers/:id', async (req, res, next) => {
  try {
    const id = req.params.id;
    if (!id) return res.status(400).json({ error: 'No id specified' });

    const models = await getModels();
    const containers = await models.Container.findAll({
      where: {
        [Op.or]: [
          {
            parent: id
          },
          {
            id
          }
        ]
      }
    });

    res.status(200).json({ data: containers });
  } catch (err) {
    console.error('Error creating container', err);
    next(err);
  }
});


module.exports = router;
