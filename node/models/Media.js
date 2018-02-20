const Sequelize = require('sequelize');

module.exports = function exportMedia(sequelize) {
  return sequelize.define('Media', {
    id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    playlistIndex: {
      type: Sequelize.INTEGER,
      allowNull: false,
      defaultValue: 1,
      unique: 'playlistIndexUnique'
    },
    containerId: {
      type: Sequelize.INTEGER,
      allowNull: false,
      unique: 'playlistIndexUnique'
    },
    url: {
      type: Sequelize.STRING,
      allowNull: false
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
    }
  });
};

