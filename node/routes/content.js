const Sequelize = require('sequelize');
const { Op } = Sequelize;
const express = require('express');
const uuid = require('uuid/v4');

const router = express.Router();

// CREATE a container
router.post('/containers', async (req, res, next) => {
  try {
    const body = req.body;

    if (typeof body.isLocked !== 'undefined') return res.status(400).json({ error: 'Cannot set the isLocked column' });
    if (typeof body.id !== 'undefined') return res.status(400).json({ error: 'Cannot set the id column' });
    if (typeof body.updatedAt !== 'undefined') return res.status(400).json({ error: 'Cannot set the updatedAt column' });
    if (typeof body.createdAt !== 'undefined') return res.status(400).json({ error: 'Cannot set the createdAt column' });
    if (typeof body.deletedAt !== 'undefined') return res.status(400).json({ error: 'Cannot set the deletedAt column' });

    const { Container, Media } = req.app.get('db').models;
    const container = await Container.create({
      id: uuid(),
      ...body
    }, {
     include: [{
      model: Media,
      as: 'mediaContent'
     }]
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

    const { Container, Media } = req.app.get('db').models;
    const rowsDeleted = await Container.destroy({
      where: {
        id,
        isLocked: false
      },
      include: [{
        model: Container,
        as: 'content'
      }, {
        mode: Media,
        as: 'mediaContent'
      }]
    });

    console.log(`${req.path} => number of rows deleted: ${rowsDeleted}`);
    if (rowsDeleted === 0) return res.status(400).json({ error: 'Could not find container to delete' });

    res.status(204).end();
  } catch (err) {
    console.error('Error deleting container', err);
    next(err);
  }
});

// GET container contents by container id
router.get('/containers/:id', async (req, res, next) => {
  try {
    const id = req.params.id;
    if (!id) return res.status(400).json({ error: 'No id specified' });

    const { Container, Media } = req.app.get('db').models;
    const container = await Container.find({
      where: {
        id
      },
      include: [{
        model: Container,
        as: 'content'
      }, {
        model: Media,
        as: 'mediaContent'
      }]
    });

    res.status(200).json(container);
  } catch (err) {
    console.error('Error fetching container', err);
    next(err);
  }
});

// GET container contents by container path
// can also return playlists since a container can be a folder or playlist
router.get('/containers', async (req, res, next) => {
  try {
    const path = req.query.path;
    if (!path) return res.status(400).json({ error: 'No path specified' });

    const { Container, Media } = req.app.get('db').models;
    const container = await Container.find({
      where: {
        fullPath: path
      },
      include: [{
        model: Container,
        as: 'content'
      }, {
        model: Media,
        as: 'mediaContent'
      }]
    });

    res.status(200).json(container);
  } catch (err) {
    console.error('Error fetching container', err);
    next(err);
  }
});

// update the position of items in the playlist
// [ 5, 7, 1, 4, 2 ] would mean that the new order is
// 1st position: media item with id=5
// 2nd position: media item with id=7
// 3rd position: media item with id=1
// 4th position: media item with id=4
// 5th position: media item with id=2
router.put('/containers/:id/order', async (req, res, next) => {
  try {
    const playlistId = req.params.id;
    if (!playlistId) return res.status(400).json({ error: 'No id specified' });

    const newOrdering = req.body;
    if (!newOrdering || !newOrdering.length) return res.status(400).json({ error: 'No media specified for ordering' });

    for (let i = 0; i < newOrdering.length; i++) {
      if (typeof newOrdering[i] !== 'string') return res.status(400).json({ error: 'Expected body to be an array of media IDs (string)' });
    }

    const db = req.app.get('db');
    const { Container, Media } = db.models;

    const media = await Media.findAll({
      where: {
        id: {
          [Op.in]: newOrdering
        }
      }
    });

    await Promise.all(
      media.map(mediaItem => {
        mediaItem.playlistIndex = newOrdering.indexOf(mediaItem.id);
        return mediaItem.save();
      })
    );

    res.status(204).end();

  } catch (err) {
    console.error('Error ordering media in a playlist', err);
    next(err);
  }
});

module.exports = router;
