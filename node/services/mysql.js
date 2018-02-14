const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');

const host = process.env.MYSQL_HOST;
const user = process.env.MYSQL_USER;
const password = process.env.MYSQL_PASSWORD;
const database = process.env.MYSQL_DATABASE;
const dialect = process.env.SEQUELIZE_DIALECT || 'mysql';
const logging = process.env.SEQUELIZE_SYNC_LOGGING === 'false' ? false : console.log;

if (!host) throw new Error('MYSQL_HOST must be defined');
if (!user) throw new Error('MYSQL_USER must be defined');
if (!password) throw new Error('MYSQL_PASSWORD must be defined');
if (!database) throw new Error('MYSQL_DATABASE must be defined');

const sequelize = new Sequelize(database, user, password, {
  host,
  dialect,
  pool: {
    max: 5,
    min: 0,
    acquire: 10000,
    idle: 5000
  },
  logging,
  operatorsAliases: false
});

const models = {};
const syncPromise = main()
  .catch(err => {
    console.error('OMGOMGOMGOMGOMGOMG something went wrong with mysql init', err);
    throw err;
  });


async function main() {
  // models
  models.Playlist = require('../models/Playlist')(sequelize, models);
  models.Container = require('../models/Container')(sequelize, models);
  models.Media = require('../models/Media')(sequelize, models);

  // relations
  models.Container.hasMany(models.Container, {
    as: 'content',
    foreignKey: 'parentId',
    useJunctionTable: false
  });

  await sequelize.sync();

  await models.Container.findOrCreate({
    where: {
      fullPath: '/'
    },
    defaults: {
      name: '/',
      fullPath: '/',
      type: 'FOLDER',
      parent: null,
      playlistId: null,
      isLocked: true,
      createdBy: '__root__',
      updatedBy: '__root__'
    }
  });

}

async function getModels() {
  // don't allow anyone to do anything until the
  // synchonization has been completed
  await syncPromise;
  return models;
}

async function close() {
  await sequelize.close();
}

module.exports.getModels = getModels;
module.exports.close = close;

