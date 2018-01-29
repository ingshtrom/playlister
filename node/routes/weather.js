const express = require('express');
const router = express.Router();
const maps = require('../services/google-maps');
const weather = require('../services/weather');
const { get, set } = require('../services/redis');

const cacheHeader = 'x-cached';

router.get('/', async (req, res) => {
  const location = req.query.l;
  const date = req.query.d;

  if (!location) {
    return res.status(400).send({ error: 'Invalid location' });
  }

  if (!date) {
    return res.status(400).send({ error: 'Invalid date' });
  }

  const cacheKey = `${location}_${date}`;

  try {
    const cachedData = await get(cacheKey);
    const data = JSON.parse(cachedData); // will throw an err if the data is not found
    res.set(cacheHeader, '1');
    res.status(200).json(data);
  } catch (err) {
    maps.getLatLong(location)
      .then(latLong => weather.getWeatherAtTime(latLong.latitude, latLong.longitude, date))
      .then(async results => {
        res.set(cacheHeader, '0');
        await set(cacheKey, JSON.stringify(results));
        res.status(200).json(results);
      })
      .catch(err => {
        console.error('something went wrong after getting lat/long', err);
        res.status(500).send({ error : 'Unknown error' });
      });
  }
});

module.exports = router;
