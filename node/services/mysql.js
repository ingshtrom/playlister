const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');

const host = process.env.MYSQL_HOST;
const user = process.env.MYSQL_USER;
const password = process.env.MYSQL_PASSWORD;
const database = process.env.MYSQL_DATABASE;

if (!host) throw new Error('MYSQL_HOST must be defined');
if (!user) throw new Error('MYSQL_USER must be defined');
if (!password) throw new Error('MYSQL_PASSWORD must be defined');
if (!database) throw new Error('MYSQL_DATABASE must be defined');

const sequelize = new Sequelize(database, user, password, {
  host,
  dialect: 'mysql',
  pool: {
    max: 5,
    min: 0,
    acquire: 10000,
    idle: 5000
  }
});

const models = {};
models.Playlist = require('../models/Playlist')(sequelize, models);
models.Container = require('../models/Container')(sequelize, models);
models.Media = require('../models/Media')(sequelize, models);

const syncPromise = sequelize.sync();


async function getModels() {
  // don't allow anyone to do anything until the 
  // synchonization has been completed
  await syncPromise;
  return models;
}

module.exports.getModels = getModels;

