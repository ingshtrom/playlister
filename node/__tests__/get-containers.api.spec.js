require('dotenv').config();

const chakram = require('chakram');

beforeEach(async () => {
  await resetDb();
});


test('GET /content/containers/:id gets Container and content successfully', async () => {
  // expect.assertions(13);

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
      playlistId: null,
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
