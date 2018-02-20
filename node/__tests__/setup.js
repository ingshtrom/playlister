require('dotenv').config();
const { Op } = require('sequelize');
const uuid = require('uuid/v4');
const { handleError } = require('../services/errors');
const { close, getDbInstance } = require('../services/mysql');
const fetch = require('../services/http');
const ResourceManager = require('../services/ResourceManager');

global.baseUrl = process.env.BASE_URL;
if (!global.baseUrl) {
  throw new Error('BASE_URL not defined.');
}

beforeAll(async () => {
  try {
    global.db = await getDbInstance({ pool: { max: 1, min: 1 }});
    global.RM = new ResourceManager(db);
  } catch (err) {
    handleError('beforeAll error', err);
  }
});

// beforeEach(async () => {
//   try {
//     await resetDb();
//   } catch (err) {
//     handleError('beforeEach error', err);
//   }
// });

afterAll(async () => {
  try {
    await RM.teardown();
    await close()
  } catch (err) {
    console.error('afterAll error', err);
  }
});

global.http = fetch;

