const Sequelize = require('sequelize');

module.exports = function exportContainer(sequelize) {
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
    },
    eventStart: {
      type: Sequelize.DATE,
      allowNull: true
    },
    eventEnd: {
      type: Sequelize.DATE,
      allowNull: true
    }
  }, {
    paranoid: true
  });
};

