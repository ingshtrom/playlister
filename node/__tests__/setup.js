require('dotenv').config();
const { Op } = require('sequelize');
const { close, getModels } = require('../services/mysql');

global.baseUrl = process.env.BASE_URL;
if (!baseUrl) {
  throw new Error('BASE_URL not defined.');
}

afterAll(async () => {
  await close();
});

global.resetDb = async function truncateAllTables() {
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
