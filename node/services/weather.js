const fetch = require('node-fetch');

module.exports.getWeatherAtTime = function getWeatherForTime(lat, long, time) {
  console.log('getWeatherAtTime', { lat, long, time });
  return fetch(`http://localhost:8080/forecast/${lat},${long},${time}`)
    .then(res => res.json());
};
