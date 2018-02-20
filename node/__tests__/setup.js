require('dotenv').config();
const { Op } = require('sequelize');
const uuid = require('uuid/v4');
const { handleError } = require('../services/errors');
const { close, getDbInstance } = require('../services/mysql');
const fetch = require('../services/http');

global.baseUrl = process.env.BASE_URL;
if (!global.baseUrl) {
  throw new Error('BASE_URL not defined.');
}

beforeAll(async () => {
  try {
    global.db = await getDbInstance({ pool: { max: 1, min: 1 }});
  } catch (err) {
    handleError('beforeAll error', err);
  }
});

beforeEach(async () => {
  try {
    await resetDb();
  } catch (err) {
    handleError('beforeEach error', err);
  }
});

afterAll(async () => {
  try {
    await close()
  } catch (err) {
    console.error('afterAll error', err);
  }
});

async function resetDb() {
  const { Container, Media } = db.models;

  await Container.destroy({
    where: {
      id: {
        [Op.not]: 1
      }
    },
    force: true,
  });

  await Media.destroy({
    where: {
      id: {
        [Op.not]: null
      }
    },
    force: true,
  });
}

function getRandomName() {
  return uuid.v4();
}

global.http = fetch;
global.resetDb = resetDb;
global.getRandomName = getRandomName;

