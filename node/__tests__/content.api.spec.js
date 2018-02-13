require('dotenv').config();

const chakram = require('chakram');

const baseUrl = process.env.BASE_URL;
if (!baseUrl) {
  throw new Error('BASE_URL not defined.');
}

test('POST /content/containers cannot set id', async () => {
  expect.assertions(2);

  const { response } = await chakram.post(`${baseUrl}/content/containers`, {
    id: 1
  });


  expect(response.statusCode).toEqual(400);
  expect(response.body).toMatchObject({
    error: 'Cannot set the id column',
  });
});

test('POST /content/containers cannot set updatedAt', async () => {
  expect.assertions(2);

  const { response } = await chakram.post(`${baseUrl}/content/containers`, {
    updatedAt: new Date()
  });


  expect(response.statusCode).toEqual(400);
  expect(response.body).toMatchObject({
    error: 'Cannot set the updatedAt column',
  });
});

test('POST /content/containers cannot set createdAt', async () => {
  expect.assertions(2);

  const { response } = await chakram.post(`${baseUrl}/content/containers`, {
    createdAt: new Date()
  });


  expect(response.statusCode).toEqual(400);
  expect(response.body).toMatchObject({
    error: 'Cannot set the createdAt column',
  });
});

test('POST /content/containers cannot set isLocked to null', async () => {
  expect.assertions(4);

  let res = await chakram.post(`${baseUrl}/content/containers`, {
    isLocked: true
  });

  expect(res.response.statusCode).toEqual(400);
  expect(res.response.body).toMatchObject({
    error: 'Cannot set the isLocked column',
  });

  res = await chakram.post(`${baseUrl}/content/containers`, {
    isLocked: false
  });


  expect(res.response.statusCode).toEqual(400);
  expect(res.response.body).toMatchObject({
    error: 'Cannot set the isLocked column',
  });
});

test('POST /content/containers creates new Container successfully', async () => {
  expect.assertions(2);

  const { response } = await chakram.post(`${baseUrl}/content/containers`, {
    name: 'foo',
    fullPath: '/foo',
  });


  expect(response.statusCode).toEqual(201);
  expect(response.body).toMatchObject(
    expect.objectContaining({
      createdAt: expect.any(String),
      fullPath: '/foo',
      id: expect.any(Number),
      isLocked: false,
      name: 'foo',
      type: 'FOLDER',
      updatedAt: expect.any(String)
    })
  );
});

test('DELETE /content/containers/:id deletes Container successfully', async () => {
  expect.assertions(3);

  let res = await chakram.post(`${baseUrl}/content/containers`, {
    name: 'foo',
    fullPath: '/foo'
  });


  expect(res.response.statusCode).toEqual(201);
  expect(res.response.body).toMatchObject(
    expect.objectContaining({
      createdAt: expect.any(String),
      fullPath: expect.any(String),
      id: expect.any(Number),
      isLocked: false,
      name: expect.any(String),
      type: 'FOLDER',
      updatedAt: expect.any(String)
    })
  );

  const id = res.response.body.id;

  res = await chakram.delete(`${baseUrl}/content/containers/${id}`);

  expect(res.response.statusCode).toEqual(204);
});

test('DELETE /content/containers/:id deletes Container successfully', async () => {
  expect.assertions(13);

  const res1 = await chakram.post(`${baseUrl}/content/containers`, {
    name: 'foo',
    fullPath: '/foo',
    parent: 1
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
      updatedAt: expect.any(String)
    })
  );

  const res2 = await chakram.post(`${baseUrl}/content/containers`, {
    name: 'bar',
    fullPath: '/bar',
    parent: 1
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
      updatedAt: expect.any(String)
    })
  );

  const res3 = await chakram.post(`${baseUrl}/content/containers`, {
    name: 'baz',
    fullPath: '/baz',
    parent: 1
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
      updatedAt: expect.any(String)
    })
  );

  const res = await chakram.get(`${baseUrl}/content/containers/1`);

  expect(res.response.statusCode).toEqual(200);
  expect(res.response.body).toHaveProperty('data');
  expect(res.response.body.data).toHaveLength(4);

  expect(res.response.body.data).toContainEqual(
    expect.objectContaining({
      ...res1.response.body,
      createdAt: expect.any(String),
      updatedAt: expect.any(String),
      id: expect.any(Number),
      isLocked: false
    })
  );
  expect(res.response.body.data).toContainEqual(
    expect.objectContaining({
      ...res2.response.body,
      createdAt: expect.any(String),
      updatedAt: expect.any(String),
      id: expect.any(Number),
      isLocked: false
    })
  );
  expect(res.response.body.data).toContainEqual(
    expect.objectContaining({
      ...res3.response.body,
      createdAt: expect.any(String),
      updatedAt: expect.any(String),
      id: expect.any(Number),
      isLocked: false
    })
  );
  expect(res.response.body.data).toContainEqual(
    expect.objectContaining({
      createdAt: expect.any(String),
      fullPath: expect.any(String),
      id: expect.any(Number),
      isLocked: true,
      name: expect.any(String),
      type: 'FOLDER',
      updatedAt: expect.any(String),
      createdBy: '__root__',
      updatedBy: '__root__'
    })
  );
});

