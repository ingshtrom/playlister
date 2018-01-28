const maps = require('@google/maps');

if (!process.env.GOOGLEMAPS_API_KEY) {
  throw new Error('No Google Maps API Key defined. Please use the "GOOGLEMAPS_API_KEY" environment variable.');
}

const mapsClient = maps.createClient({ key: process.env.GOOGLEMAPS_API_KEY });

module.exports.getLatLong = function getLatLong(location) {
  return new Promise((resolve, reject) => {
    mapsClient.geocode({
      address: location
    }, (err, resp) => {
      if (err) {
        return reject(err);
      }

      resolve({
        latitude: resp.json.results[0].geometry.location.lat,
        longitude: resp.json.results[0].geometry.location.lng
      });
    });
  });
};
