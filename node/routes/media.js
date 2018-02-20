const Sequelize = require('sequelize');
const express = require('express');

const { getDbInstance } = require('../services/mysql');

const router = express.Router();

router.post('/media', async (req, res, next) => {
  try {
    const body = req.body;

    if (typeof body.id !== 'undefined') return res.status(400).json({ error: 'Cannot set the id column' });
    if (typeof body.updatedAt !== 'undefined') return res.status(400).json({ error: 'Cannot set the updatedAt column' });
    if (typeof body.createdAt !== 'undefined') return res.status(400).json({ error: 'Cannot set the createdAt column' });
    if (typeof body.deletedAt !== 'undefined') return res.status(400).json({ error: 'Cannot set the deletedAt column' });

    const { Media } = req.app.get('db').models;
    const container = await Media.create({
      ...body
    });

    res.status(201).json(container);
  } catch (err) {
    console.error('Error creating media', err);
    next(err);
  }
});

// router.post('/media/:id/upload', async (req, res, next) => {
//   // raw media data input
// });

router.delete('/media/:id', async (req, res, next) => {
  try {
    const id = req.params.id;
    if (!id) return res.status(400).json({ error: 'No id specified' });

    const { Media } = req.app.get('db').models;
    const rowsDeleted = await Media.destroy({
      where: { id }
    });

    console.log(`${req.path} => number of rows deleted: ${rowsDeleted}`);
    if (rowsDeleted === 0) return res.status(400).json({ error: 'Could not find media to delete' });

    res.status(204).end();
  } catch (err) {
    console.error('Error deleting media', err);
    next(err);
  }
});

module.exports = router;
