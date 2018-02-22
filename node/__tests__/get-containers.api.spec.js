test('GET /containers?path=/{some-path} gets container and content successfully', async () => {
  expect.assertions(4);

  const { Container } = db.models;
  const [name1, name2, name3, name4] = RM.genContainerNames(4);

  const parent = await Container.create({
    name: name1,
    fullPath: `/${name1}`,
    parentId: 1
  });

  const children = await Container.bulkCreate([{
      name: name2,
      fullPath: `/${name2}`,
      parentId: parent.id
    }, {
      name: name3,
      fullPath: `/${name3}`,
      parentId: parent.id
    }, {
      name: name4,
      fullPath: `/${name4}`,
      parentId: parent.id
    }]);


  const res = await http.get(`${baseUrl}/containers?path=${parent.fullPath}`);

  expect(res.status).toEqual(200);

  const body = await res.json();
  expect(body).toHaveProperty('content');
  expect(body.content).toHaveLength(3);

  expect(body).toMatchObject(
    expect.objectContaining({
      fullPath: parent.fullPath,
      id: parent.id,
      name: parent.name,
      type: 'FOLDER',
      content: expect.arrayContaining([
        expect.objectContaining({
          id: children[0].id,
          name: name2,
          parentId: parent.id,
        }),
        expect.objectContaining({
          id: children[1].id,
          name: name3,
          parentId: parent.id,
        }),
        expect.objectContaining({
          id: children[2].id,
          name: name4,
          parentId: parent.id,
        })
      ])
    })
  );
});

test('GET /containers/:id gets Container and content successfully', async () => {
 expect.assertions(4);

  const { Container } = db.models;
  const [name1, name2, name3, name4] = RM.genContainerNames(4);

  const parent = await Container.create({
    name: name1,
    fullPath: `/${name1}`,
    parentId: 1
  });

  const children = await Container.bulkCreate([{
      name: name2,
      fullPath: `/${name2}`,
      parentId: parent.id
    }, {
      name: name3,
      fullPath: `/${name3}`,
      parentId: parent.id
    }, {
      name: name4,
      fullPath: `/${name4}`,
      parentId: parent.id
    }]);

  const res = await http.get(`${baseUrl}/containers/${parent.id}`);

  expect(res.status).toEqual(200);

  const body = await res.json();
  expect(body).toHaveProperty('content');
  expect(body.content).toHaveLength(3);

 expect(body).toMatchObject(
    expect.objectContaining({
      fullPath: parent.fullPath,
      id: parent.id,
      name: parent.name,
      type: 'FOLDER',
      content: expect.arrayContaining([
        expect.objectContaining({
          id: children[0].id,
          name: name2,
          parentId: parent.id,
        }),
        expect.objectContaining({
          id: children[1].id,
          name: name3,
          parentId: parent.id,
        }),
        expect.objectContaining({
          id: children[2].id,
          name: name4,
          parentId: parent.id,
        })
      ])
    })
  );
});

test('GET /containers/:id gets Container and mediaContent successfully', async () => {
  const { Container, Media } = db.models;
  expect.assertions(4);

  const [name] = RM.genContainerNames(1);
  const [mediaName1, mediaName2] = RM.genMediaNames(2);

  const playlist = await Container.create({
    name: name,
    fullPath: `/${name}`,
    parentId: 1,
    type: 'PLAYLIST',
    mediaContent: [
      {
        name: mediaName1,
        playlistIndex: 1,
        type: 'IMAGE',
      },
      {
        name: mediaName2,
        playlistIndex: 2,
        type: 'IMAGE',
      }
    ]
  }, {
    include: [{
      model: Media,
      as: 'mediaContent'
    }]
  });

  const res = await http.get(`${baseUrl}/containers/${playlist.id}`);

  expect(res.status).toEqual(200);

  const body = await res.json();
  expect(body).toHaveProperty('mediaContent');
  expect(body.mediaContent).toHaveLength(2);

  expect(body).toMatchObject(
    expect.objectContaining({
      fullPath: `/${name}`,
      name: name,
      type: 'PLAYLIST',
      mediaContent: expect.arrayContaining([
        expect.objectContaining({
          name: mediaName1,
          playlistIndex: 1,
          type: 'IMAGE',
        }),
        expect.objectContaining({
          name: mediaName2,
          type: 'IMAGE',
        })
      ])
    })
  );
});

test('GET /containers?path=/<some_path> gets Container and mediaContent successfully', async () => {
  const { Container, Media } = db.models;
  expect.assertions(4);

  const [name] = RM.genContainerNames(1);
  const [mediaName1, mediaName2] = RM.genMediaNames(2);


  const playlist = await Container.create({
    name: name,
    fullPath: `/${name}`,
    parentId: 1,
    type: 'PLAYLIST',
    mediaContent: [
      {
        name: mediaName1,
        playlistIndex: 0,
        type: 'IMAGE',
      },
      {
        name: mediaName2,
        playlistIndex: 1,
        type: 'IMAGE',
      }
    ]
  }, {
    include: [{
      model: Media,
      as: 'mediaContent'
    }]
  });

  const res = await http.get(`${baseUrl}/containers?path=/${name}`);

  expect(res.status).toEqual(200);

  const body = await res.json();
  expect(body).toHaveProperty('mediaContent');
  expect(body.mediaContent).toHaveLength(2);

  expect(body).toMatchObject(
    expect.objectContaining({
      fullPath: `/${name}`,
      name: name,
      type: 'PLAYLIST',
      mediaContent: expect.arrayContaining([
        expect.objectContaining({
          name: mediaName1,
          playlistIndex: 0,
          type: 'IMAGE',
        }),
        expect.objectContaining({
          name: mediaName2,
          playlistIndex: 1,
          type: 'IMAGE',
        })
      ])
    })
  );
});

