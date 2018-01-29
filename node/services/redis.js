const bluebird = require('bluebird');
const redis = require('redis');

bluebird.promisifyAll(redis.RedisClient.prototype);
bluebird.promisifyAll(redis.Multi.prototype);


const client = redis.createClient();

client.on('error', err => {
  console.log('Redis Error: ', err);
});


module.exports.get = function get(key) {
  return client.getAsync(key)
    .then(result => result || '')
    .catch(err => {
      console.error('Error getting Redis key', { key, err });
      return '';
    });
};

module.exports.set = function set(key, val) {
  return client.setAsync(key, val)
    .catch(err => {
      console.error('Error setting Redis kvp', { key, val });
    });
};

