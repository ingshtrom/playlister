require('dotenv').config();
const { Op } = require('sequelize');
const { close, getModels } = require('../services/mysql');

beforeEach(async () => {
  await truncateAllTables();
});

afterAll(async () => {
  await truncateAllTables();
  await close();
});

async function truncateAllTables() {
  const models = await getModels();

  models.Container.destroy({
    where: {
      id: {
        [Op.not]: 1
      }
    },
  });

  models.Playlist.destroy({
    where: {
      id: {
        [Op.not]: null
      }
    },
  });
  models.Media.destroy({
    where: {
      id: {
        [Op.not]: null
      }
    },
  });
}
