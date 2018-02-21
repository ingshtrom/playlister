const uuid = require('uuid/v4');
const { Op } = require('sequelize');

class ResourceManager {
  constructor(dbInstance) {
    this.db = dbInstance;
    this.containers = [];
    this.mediaNames = [];
  }

  static genNames(count) {
    const names = [];
    for (let i = 0; i < count; i++) {
      names.push(uuid());
    }

    return names;
  }

  genContainerNames(count) {
    const names = ResourceManager.genNames(count);
    names.forEach(name => this.containers.push(name));
    return names;
  }

  genMediaNames(count) {
    const names = ResourceManager.genNames(count);
    names.forEach(name => this.mediaNames.push(name));
    return names;
  }

  async teardown() {
    const { Container, Media } = this.db.models;

    console.log('found containers to cleanup. names: ', this.containers);
    console.log('found media to cleanup. names: ', this.mediaNames);

    const containersDeleted = await Container.destroy({
      where: {
        name: {
          [Op.in]: this.containers
        }
      },
      force: true
    });

    const mediaDeleted = await Media.destroy({
      where: {
        name: {
          [Op.in]: this.mediaNames
        }
      },
      force: true
    });
  }
}

module.exports = ResourceManager;
