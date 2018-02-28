const Sequelize = require('sequelize');

module.exports = function exportMedia(sequelize) {
  return sequelize.define('Media', {
    id: {
      type: Sequelize.STRING,
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: ''
    },
    playlistIndex: {
      type: Sequelize.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    url: {
      type: Sequelize.STRING,
      allowNull: true
    },
    type: {
      type: Sequelize.ENUM('IMAGE', 'VIDEO'),
      allowNull: false,
      defaultValue: 'IMAGE'
    },
    updatedBy: {
      type: Sequelize.STRING,
      allowNull: true
    },
    createdBy: {
      type: Sequelize.STRING,
      allowNull: true
    },
    deletedBy: {
      type: Sequelize.STRING,
      allowNull: true
    },
    encoding: {
      type: Sequelize.STRING,
      allowNull: true
    },
    contentType: {
      type: Sequelize.STRING,
      allowNull: true
    }
  }, {
    paranoid: true
  });
};

