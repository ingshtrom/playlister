require('dotenv').config();

const chakram = require('chakram');
const { getModels } = require('../services/mysql');

beforeEach(async () => {
  await resetDb();
});

test('GET /content/containers?path=/ gets root container and content successfully', async () => {
  expect.assertions(10);

  const res1 = await chakram.post(`${baseUrl}/content/containers`, {
    name: 'foo',
    fullPath: '/foo',
    parentId: 1
  });

  expect(res1.response.statusCode).toEqual(201);
  expect(res1.response.body).toMatchObject(
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

  const res2 = await chakram.post(`${baseUrl}/content/containers`, {
    name: 'bar',
    fullPath: '/bar',
    parentId: 1
  });

  expect(res2.response.statusCode).toEqual(201);
  expect(res2.response.body).toMatchObject(
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

  const res3 = await chakram.post(`${baseUrl}/content/containers`, {
    name: 'baz',
    fullPath: '/baz',
    parentId: 1
  });


  expect(res3.response.statusCode).toEqual(201);
  expect(res3.response.body).toMatchObject(
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

  const res = await chakram.get(`${baseUrl}/content/containers?path=/`);

  expect(res.response.statusCode).toEqual(200);
  expect(res.response.body).toHaveProperty('data.content');
  expect(res.response.body.data.content).toHaveLength(3);

  expect(res.response.body.data).toMatchObject(
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
          ...res1.response.body,
          createdAt: expect.any(String),
          updatedAt: expect.any(String),
          id: expect.any(Number),
          isLocked: false,
          parentId: 1,
        }),
        expect.objectContaining({
          ...res2.response.body,
          createdAt: expect.any(String),
          updatedAt: expect.any(String),
          id: expect.any(Number),
          isLocked: false,
          parentId: 1,
        }),
        expect.objectContaining({
          ...res3.response.body,
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

test('GET /content/containers/:id gets Container and content successfully', async () => {
  expect.assertions(10);

  const res1 = await chakram.post(`${baseUrl}/content/containers`, {
    name: 'foo',
    fullPath: '/foo',
    parentId: 1
  });

  expect(res1.response.statusCode).toEqual(201);
  expect(res1.response.body).toMatchObject(
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

  const res2 = await chakram.post(`${baseUrl}/content/containers`, {
    name: 'bar',
    fullPath: '/bar',
    parentId: 1
  });

  expect(res2.response.statusCode).toEqual(201);
  expect(res2.response.body).toMatchObject(
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

  const res3 = await chakram.post(`${baseUrl}/content/containers`, {
    name: 'baz',
    fullPath: '/baz',
    parentId: 1
  });


  expect(res3.response.statusCode).toEqual(201);
  expect(res3.response.body).toMatchObject(
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

  const res = await chakram.get(`${baseUrl}/content/containers/1`);

  expect(res.response.statusCode).toEqual(200);
  expect(res.response.body).toHaveProperty('data.content');
  expect(res.response.body.data.content).toHaveLength(3);

  expect(res.response.body.data).toMatchObject(
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
          ...res1.response.body,
          createdAt: expect.any(String),
          updatedAt: expect.any(String),
          id: expect.any(Number),
          isLocked: false,
          parentId: 1,
        }),
        expect.objectContaining({
          ...res2.response.body,
          createdAt: expect.any(String),
          updatedAt: expect.any(String),
          id: expect.any(Number),
          isLocked: false,
          parentId: 1,
        }),
        expect.objectContaining({
          ...res3.response.body,
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

test('GET /content/containers/:id gets Container and mediaContent successfully', async () => {
  expect.assertions(4);

  const models = await getModels();

  const playlist = await models.Container.create({
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
      model: models.Media,
      as: 'mediaContent'
    }]
  });

  const res = await chakram.get(`${baseUrl}/content/containers/${playlist.id}`);

  expect(res.response.statusCode).toEqual(200);
  expect(res.response.body).toHaveProperty('data.mediaContent');
  expect(res.response.body.data.mediaContent).toHaveLength(2);

  expect(res.response.body.data).toMatchObject(
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

test('GET /content/containers?path=/foo gets Container and mediaContent successfully', async () => {
  expect.assertions(4);

  const models = await getModels();

  const playlist = await models.Container.create({
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
      model: models.Media,
      as: 'mediaContent'
    }]
  });

  const res = await chakram.get(`${baseUrl}/content/containers?path=/foo`);

  expect(res.response.statusCode).toEqual(200);
  expect(res.response.body).toHaveProperty('data.mediaContent');
  expect(res.response.body.data.mediaContent).toHaveLength(2);

  expect(res.response.body.data).toMatchObject(
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

