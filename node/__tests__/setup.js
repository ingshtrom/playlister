require('dotenv').config();
const { Op } = require('sequelize');
const { close, getModels } = require('../services/mysql');

global.baseUrl = process.env.BASE_URL;
if (!baseUrl) {
  throw new Error('BASE_URL not defined.');
}

afterAll(async () => {
  // NOTE: this can be commented out in order to
  // see the DB state when a test fails
  await resetDb();
  await close();
});

global.resetDb = async function resetDb() {
  const models = await getModels();

  models.Container.destroy({
    where: {
      id: {
        [Op.not]: 1
      }
    },
    force: true,
  });
  models.Media.destroy({
    where: {
      id: {
        [Op.not]: null
      }
    },
    force: true,
  });
}
