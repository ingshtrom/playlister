require('dotenv').config();

const chakram = require('chakram');

beforeEach(async () => {
  await resetDb();
});

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



