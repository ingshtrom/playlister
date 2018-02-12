const Sequelize = require('sequelize');

module.exports = function exportPlaylist(sequelize, models) {
  return sequelize.define('Playlist', {
    id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    content: {
      type: Sequelize.TEXT,
      allowNull: false,
      defaultValue: '[]'
    }
  });
};

