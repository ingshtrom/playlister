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

const models = {};
let sequelize = null
let syncPromise = null;

async function main() {
  sequelize = new Sequelize(database, user, password, {
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

  // models
  models.Container = require('../models/Container')(sequelize, models);
  models.Media = require('../models/Media')(sequelize, models);

  // relations
  models.Container.hasMany(models.Container, {
    as: 'content',
    foreignKey: 'parentId',
    constraints: true,
    onDelete: 'cascade',
  });
  models.Container.hasMany(models.Media, {
    as: 'mediaContent',
    foreignKey: 'containerId',
    constraints: true,
    onDelete: 'cascade',
  });
  models.Media.belongsTo(models.Container, {
    foreignKey: 'containerId',
    constraints: true,
    scope: {
      type: 'FOLDER',
    },
  });


  await sequelize.sync();

  // we always need a root record otherwise no other things will have a place to live
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
  if (!syncPromise) {
    syncPromise = main()
      .catch(err => {
        console.error('OMGOMGOMGOMGOMGOMG something went wrong with mysql init', err);
        throw err;
      });
  }
  await syncPromise;
  return models;
}

async function close() {
  await sequelize.close();
  syncPromise = null;
}

module.exports.getModels = getModels;
module.exports.close = close;

