const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');

const host = process.env.MYSQL_HOST;
const user = process.env.MYSQL_USER;
const password = process.env.MYSQL_PASSWORD;
const database = process.env.MYSQL_DATABASE;
const dialect = process.env.SEQUELIZE_DIALECT || 'mysql';
const logging = process.env.SEQUELIZE_LOGGING === 'false' ? false : console.log;

if (!host) throw new Error('MYSQL_HOST must be defined');
if (!user) throw new Error('MYSQL_USER must be defined');
if (!password) throw new Error('MYSQL_PASSWORD must be defined');
if (!database) throw new Error('MYSQL_DATABASE must be defined');

let sequelize = null
let syncPromise = null;

async function setupDb(options) {
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
    operatorsAliases: false,
    ...options
  });

  // models
  require('../models/Container')(sequelize);
  require('../models/Media')(sequelize);

  // relations
  sequelize.models.Container.hasMany(sequelize.models.Container, {
    as: 'content',
    foreignKey: 'parentId',
    constraints: true,
    onDelete: 'cascade',
  });
  sequelize.models.Container.belongsTo(sequelize.models.Container, {
    foreignKey: 'parentId',
    constraints: true
  });
  sequelize.models.Container.hasMany(sequelize.models.Media, {
    as: 'mediaContent',
    foreignKey: 'containerId',
    constraints: true,
    onDelete: 'cascade',
  });
  sequelize.models.Media.belongsTo(sequelize.models.Container, {
    foreignKey: 'containerId',
    constraints: true,
    scope: {
      type: 'FOLDER',
    },
  });


  await sequelize.sync();

  // we always need a root record otherwise no other things will have a place to live
  await sequelize.models.Container.findOrCreate({
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

async function getDbInstance(options) {
  // don't allow anyone to do anything until the
  // synchonization has been completed
  if (!syncPromise) {
    syncPromise = setupDb(options)
      .catch(err => {
        console.error('OMGOMGOMGOMGOMGOMG something went wrong with mysql init', err);
        throw err;
      });
  }
  await syncPromise;
  return sequelize;
}

async function close() {
  await sequelize.close();
  syncPromise = null;
}

module.exports.getDbInstance = getDbInstance;
module.exports.close = close;

