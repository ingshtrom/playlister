test('GET /containers?path=/ gets root container and content successfully', async () => {
  expect.assertions(10);

  const res1 = await http.post(`${baseUrl}/containers`, {
    name: 'foo',
    fullPath: '/foo',
    parentId: 1
  });

  expect(res1.status).toEqual(201);

  const body1 = await res1.json();
  expect(body1).toMatchObject(
    expect.objectContaining({
      createdAt: expect.any(String),
      fullPath: expect.any(String),
      id: expect.any(Number),
      isLocked: false,
      name: expect.any(String),
      type: 'FOLDER',
      updatedAt: expect.any(String),
      parentId: 1
    })
  );

  const res2 = await http.post(`${baseUrl}/containers`, {
    name: 'bar',
    fullPath: '/bar',
    parentId: 1
  });

  expect(res2.status).toEqual(201);

  const body2 = await res2.json();
  expect(body2).toMatchObject(
    expect.objectContaining({
      createdAt: expect.any(String),
      fullPath: expect.any(String),
      id: expect.any(Number),
      isLocked: false,
      name: expect.any(String),
      type: 'FOLDER',
      updatedAt: expect.any(String),
      parentId: 1
    })
  );

  const res3 = await http.post(`${baseUrl}/containers`, {
    name: 'baz',
    fullPath: '/baz',
    parentId: 1
  });

  expect(res3.status).toEqual(201);

  const body3 = await res3.json();
  expect(body3).toMatchObject(
    expect.objectContaining({
      createdAt: expect.any(String),
      fullPath: expect.any(String),
      id: expect.any(Number),
      isLocked: false,
      name: expect.any(String),
      type: 'FOLDER',
      updatedAt: expect.any(String),
      parentId: 1
    })
  );

  const res4 = await http.get(`${baseUrl}/containers?path=/`);

  expect(res4.status).toEqual(200);

  const body4 = await res4.json();
  expect(body4).toHaveProperty('data.content');
  expect(body4.data.content).toHaveLength(3);

  expect(body4.data).toMatchObject(
    expect.objectContaining({
      createdAt: expect.any(String),
      fullPath: '/',
      id: 1,
      isLocked: true,
      name: '/',
      type: 'FOLDER',
      updatedAt: expect.any(String),
      createdBy: '__root__',
      updatedBy: '__root__',
      deletedAt: null,
      deletedBy: null,
      parentId: null,
      content: expect.arrayContaining([
        expect.objectContaining({
          ...body1,
          createdAt: expect.any(String),
          updatedAt: expect.any(String),
          id: expect.any(Number),
          isLocked: false,
          parentId: 1,
        }),
        expect.objectContaining({
          ...body2,
          createdAt: expect.any(String),
          updatedAt: expect.any(String),
          id: expect.any(Number),
          isLocked: false,
          parentId: 1,
        }),
        expect.objectContaining({
          ...body3,
          createdAt: expect.any(String),
          updatedAt: expect.any(String),
          id: expect.any(Number),
          isLocked: false,
          parentId: 1,
        })
      ])
    })
  );
});

test('GET /containers/:id gets Container and content successfully', async () => {
  expect.assertions(10);

  const res1 = await http.post(`${baseUrl}/containers`, {
    name: 'foo',
    fullPath: '/foo',
    parentId: 1
  });

  expect(res1.status).toEqual(201);

  const body1 = await res1.json();
  expect(body1).toMatchObject(
    expect.objectContaining({
      createdAt: expect.any(String),
      fullPath: expect.any(String),
      id: expect.any(Number),
      isLocked: false,
      name: expect.any(String),
      type: 'FOLDER',
      updatedAt: expect.any(String),
      parentId: 1
    })
  );

  const res2 = await http.post(`${baseUrl}/containers`, {
    name: 'bar',
    fullPath: '/bar',
    parentId: 1
  });

  expect(res2.status).toEqual(201);

  const body2 = await res2.json();
  expect(body2).toMatchObject(
    expect.objectContaining({
      createdAt: expect.any(String),
      fullPath: expect.any(String),
      id: expect.any(Number),
      isLocked: false,
      name: expect.any(String),
      type: 'FOLDER',
      updatedAt: expect.any(String),
      parentId: 1
    })
  );

  const res3 = await http.post(`${baseUrl}/containers`, {
    name: 'baz',
    fullPath: '/baz',
    parentId: 1
  });

  expect(res3.status).toEqual(201);

  const body3 = await res3.json();
  expect(body3).toMatchObject(
    expect.objectContaining({
      createdAt: expect.any(String),
      fullPath: expect.any(String),
      id: expect.any(Number),
      isLocked: false,
      name: expect.any(String),
      type: 'FOLDER',
      updatedAt: expect.any(String),
      parentId: 1
    })
  );

  const res = await http.get(`${baseUrl}/containers/1`);

  expect(res.status).toEqual(200);

  const body = await res.json();
  expect(body).toHaveProperty('data.content');
  expect(body.data.content).toHaveLength(3);

  expect(body.data).toMatchObject(
    expect.objectContaining({
      createdAt: expect.any(String),
      fullPath: '/',
      id: 1,
      isLocked: true,
      name: '/',
      type: 'FOLDER',
      updatedAt: expect.any(String),
      createdBy: '__root__',
      updatedBy: '__root__',
      deletedAt: null,
      deletedBy: null,
      parentId: null,
      content: expect.arrayContaining([
        expect.objectContaining({
          ...body1,
          createdAt: expect.any(String),
          updatedAt: expect.any(String),
          id: expect.any(Number),
          isLocked: false,
          parentId: 1,
        }),
        expect.objectContaining({
          ...body2,
          createdAt: expect.any(String),
          updatedAt: expect.any(String),
          id: expect.any(Number),
          isLocked: false,
          parentId: 1,
        }),
        expect.objectContaining({
          ...body3,
          createdAt: expect.any(String),
          updatedAt: expect.any(String),
          id: expect.any(Number),
          isLocked: false,
          parentId: 1,
        })
      ])
    })
  );
});

test('GET /containers/:id gets Container and mediaContent successfully', async () => {
  const { Container, Media } = db.models;
  expect.assertions(4);

  const playlist = await Container.create({
    name: 'foo',
    fullPath: '/foo',
    parentId: 1,
    type: 'PLAYLIST',
    mediaContent: [
      {
        playlistIndex: 1,
        url: 'http://google.com/favicon.ico',
        type: 'IMAGE',
      },
      {
        playlistIndex: 2,
        url: 'http://google.com/favicon.ico',
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
  expect(body).toHaveProperty('data.mediaContent');
  expect(body.data.mediaContent).toHaveLength(2);

  expect(body.data).toMatchObject(
    expect.objectContaining({
      createdAt: expect.any(String),
      createdBy: null,
      fullPath: '/foo',
      id: playlist.id,
      isLocked: false,
      name: 'foo',
      type: 'PLAYLIST',
      updatedAt: expect.any(String),
      updatedBy: null,
      deletedAt: null,
      deletedBy: null,
      parentId: 1,
      content: [],
      mediaContent: expect.arrayContaining([
        expect.objectContaining({
          playlistIndex: 1,
          url: 'http://google.com/favicon.ico',
          type: 'IMAGE',
        }),
        expect.objectContaining({
          playlistIndex: 2,
          url: 'http://google.com/favicon.ico',
          type: 'IMAGE',
        })
      ])
    })
  );
});

test('GET /containers?path=/foo gets Container and mediaContent successfully', async () => {
  const { Container, Media } = db.models;
  expect.assertions(4);

  const playlist = await Container.create({
    name: 'foo',
    fullPath: '/foo',
    parentId: 1,
    type: 'PLAYLIST',
    mediaContent: [
      {
        playlistIndex: 1,
        url: 'http://google.com/favicon.ico',
        type: 'IMAGE',
      },
      {
        playlistIndex: 2,
        url: 'http://google.com/favicon.ico',
        type: 'IMAGE',
      }
    ]
  }, {
    include: [{
      model: Media,
      as: 'mediaContent'
    }]
  });

  const res = await http.get(`${baseUrl}/containers?path=/foo`);

  expect(res.status).toEqual(200);

  const body = await res.json();
  expect(body).toHaveProperty('data.mediaContent');
  expect(body.data.mediaContent).toHaveLength(2);

  expect(body.data).toMatchObject(
    expect.objectContaining({
      createdAt: expect.any(String),
      createdBy: null,
      fullPath: '/foo',
      id: playlist.id,
      isLocked: false,
      name: 'foo',
      type: 'PLAYLIST',
      updatedAt: expect.any(String),
      updatedBy: null,
      deletedAt: null,
      deletedBy: null,
      parentId: 1,
      content: [],
      mediaContent: expect.arrayContaining([
        expect.objectContaining({
          playlistIndex: 1,
          url: 'http://google.com/favicon.ico',
          type: 'IMAGE',
        }),
        expect.objectContaining({
          playlistIndex: 2,
          url: 'http://google.com/favicon.ico',
          type: 'IMAGE',
        })
      ])
    })
  );
});

