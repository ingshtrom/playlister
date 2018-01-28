const express = require('express');
const router = express.Router();
const maps = require('../services/google-maps');
const weather = require('../services/weather');

router.get('/', (req, res) =>  {
  const location = req.query.l;
  const date = req.query.d;

  if (!location) {
    return res.status(400).send({ error: 'Invalid location' });
  }

  if (!date) {
    return res.status(400).send({ error: 'Invalid date' });
  }

  // 1. get the lat/long from google maps
  // 2. get the weather for the day in question from DarkSky
  maps.getLatLong(location)
    .then(latLong => weather.getWeatherAtTime(latLong.latitude, latLong.longitude, date))
    .then(results => {
      res.status(200).json(results);
    })
    .catch(err => {
      console.error('something went wrong after getting lat/long', err);
      res.status(500).send({ error : 'Unknown error' });
    });
});

module.exports = router;
