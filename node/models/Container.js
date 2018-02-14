const Sequelize = require('sequelize');

module.exports = function exportContainer(sequelize, models) {
  return sequelize.define('Container', {
    id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: Sequelize.STRING,
      allowNull: false
    },
    fullPath: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true
    },
    type: {
      type: Sequelize.ENUM('FOLDER', 'PLAYLIST'),
      allowNull: false,
      defaultValue: 'FOLDER'
    },
    // playlistId: {
    //   type: Sequelize.INTEGER,
    //   allowNull: true,
    //   references: {
    //     model: models.Playlist,
    //     key: 'id'
    //   }
    // },
    updatedBy: {
      type: Sequelize.STRING,
      allowNull: true
    },
    createdBy: {
      type: Sequelize.STRING,
      allowNull: true
    },
    isLocked: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
    deletedBy: {
      type: Sequelize.STRING,
      allowNull: true
    }
  }, {
    paranoid: true
  });
};

