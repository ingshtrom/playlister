const Sequelize = require('sequelize');

module.exports = function exportMedia(sequelize, models) {
  return sequelize.define('Media', {
    id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    url: {
      type: Sequelize.STRING,
      allowNull: false
    },
    type: {
      type: Sequelize.ENUM('IMAGE', 'VIDEO'),
      allowNull: false,
      defaultValue: 'IMAGE'
    }
  });
};

