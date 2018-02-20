const uuid = require('uuid/v4');
const { Op } = require('sequelize');

class ResourceManager {
  constructor(dbInstance) {
    this.db = dbInstance;
    this.containers = [];
    this.mediaUrls = [];
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

  genMediaUrls(count) {
    const names = ResourceManager.genNames(count);

    return names.map(name => {
      const url = `https://google.com/${name}.png`;
      this.mediaUrls.push(url)
      return url;
    });
  }

  // static genTemplates(count, mediaCount) {
  //   return ResourceManager.genNames(count).map(name => ({
  //     name,
  //     fullPath: `/${name}`,
  //     mediaContent: genNames(mediaCount).map((mediaName, index) => ({
  //       url: `https://google.com/${mediaName}.png`,
  //       playlistIndex: index + 1,
  //       type: 'IMAGE'
  //     }))
  //   }));
  // }
  //
  // async requireContainers(count, mediaCount) {
  //   const { Container, Media } = this.db.models;

  //   const containerTemplates = ResourceManager.genTemplates(count, mediaCount);

  //   const containers = await Container.bulkCreate(containerTemplates, {
  //     include: [{
  //       model: Media,
  //       as: 'mediaContent'
  //     }]
  //   });

  //   containers.forEach(container => this.containers.push(container.id));

  //   return containers;
  // }

  async teardown() {
    const { Container, Media } = this.db.models;

    // console.log('found containers to cleanup. names: ', this.containers);
    // console.log('found media to cleanup. urls: ', this.mediaUrls);

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
        url: {
          [Op.in]: this.mediaUrls
        }
      },
      force: true
    });
  }
}

module.exports = ResourceManager;
