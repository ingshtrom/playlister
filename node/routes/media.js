const Sequelize         = require('sequelize');
const express           = require('express');
const uuid              = require('uuid/v4');
const fs                = require('fs');
const path              = require('path');
const { getDbInstance } = require('../services/mysql');

const {
  createMedia,
  getMediaUrl
}   = require('../services/blob');

const router = express.Router();

router.post('/media', async (req, res, next) => {
  try {
    const body = req.body;

    if (typeof body.id !== 'undefined') return res.status(400).json({ error: 'Cannot set the id column' });
    if (typeof body.updatedAt !== 'undefined') return res.status(400).json({ error: 'Cannot set the updatedAt column' });
    if (typeof body.createdAt !== 'undefined') return res.status(400).json({ error: 'Cannot set the createdAt column' });
    if (typeof body.deletedAt !== 'undefined') return res.status(400).json({ error: 'Cannot set the deletedAt column' });

    const { Media } = req.app.get('db').models;
    const media = await Media.create({
      id: uuid(),
      ...body
    });

    res.status(201).json(media);
  } catch (err) {
    console.error('Error creating media', err);
    next(err);
  }
});

router.post('/media/:id/upload', require('../middleware/formidable')(), async (req, res, next) => {
  let id;
  try {
    console.time(`${req.path} error conditions`);
    id = req.params.id;
    if (!id) return res.status(400).json({ error: 'Must pass the id in the path' });

    const file = req.files.media;

    if (!file) return res.status(400).json({ error: 'Must upload a file' });
    console.timeEnd(`${req.path} error conditions`);

    // write the metadata file for the process_media job to pick up
    await writeFile(`${file.path}.txt`, id);

    res.status(200).json();
  } catch (err) {
    console.error(`Error uploading media for media item ${id}`, err);
    next(err);
  }
});

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

function writeFile(path, text) {
  return new Promise((resolve, reject) => {
    fs.writeFile(path, text, 'utf8', (err, result) => {
      if (err) return reject(err);

      resolve(result);
    });
  });
}

module.exports = router;
