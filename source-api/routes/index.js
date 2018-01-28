const express = require('express');
const router = express.Router();

const dayInMs = 1000 * 60 * 60 * 24;
const hourInMs = 1000 * 60 * 60;

// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
// and yes, it is "random"
function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
}

router.get('/forecast/:lat,:long,:time', (req, res) => {
  const timeInMs = req.params.time * 1000;
  const msSinceStartOfDay = timeInMs % 86400000
  const startOfDayUnixMs = timeInMs - msSinceStartOfDay;
  const hourlyArray = []


  for (let i = 0; i < 24; i++) {
  console.log('startOfDayUnixMs', { startOfDayUnixMs, hourInMs, i, total: startOfDayUnixMs + (hourInMs * i) });
    hourlyArray.push({
      time: startOfDayUnixMs + (hourInMs * i),
      temperature: getRandomInt(-50, 150),
      uvIndex: getRandomInt(0, 10),
      precipProbability: getRandomInt(0, 100),
      precipAccumulation: getRandomInt(0, 20),
      type: 'snow',
      visibility: getRandomInt(0, 10)
    });
  }

  res.status(400).send({
    hourly: {
      data: hourlyArray
    }
  });
});

module.exports = router;
