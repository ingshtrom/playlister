const DarkSky = require('forecast.io');
const fetch = require('node-fetch');

if (!process.env.DARKSKY_API_KEY) {
  throw new Error('No DarkSkip API Key defined. Please use the "DARKSKY_API_KEY" environment variable.');
}

const ds = new DarkSky({
  APIKey: process.env.DARKSKY_API_KEY
});

module.exports.getWeatherAtTime = function getWeatherForTime(lat, long, time) {
  console.log('getWeatherAtTime', { lat, long, time });
  return fetch ('https://api.darksky.net/forecast/1009f398469e9a0f4c09a63ef83c3223/40.0455917,-86.0085955,1517089386?exclude=minutely,flags,alerts,daily')
    .then(res => res.json());
  // const opt = {
  //   exclude: 'minutely,flags,alerts,daily'
  // };
  // return new Promise((resolve, reject) => {
  //   ds.getAtTime(lat, long, Number(time), opt, (err, res, data) => {
  //     if (err) {
  //       return reject(err);
  //     }

  //     resolve(data);
  //   });
  // });
};
