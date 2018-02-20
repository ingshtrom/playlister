test('POST /containers cannot set id', async () => {
  expect.assertions(2);

  const res = await http.post(`${baseUrl}/containers`, { id: 10383 });

  expect(res.status).toEqual(400);

  const body = await res.json();
  expect(body).toMatchObject({
    error: 'Cannot set the id column'
  });
});

test('POST /containers cannot set updatedAt', async () => {
  expect.assertions(2);

  const res = await http.post(`${baseUrl}/containers`, {
    updatedAt: new Date()
  });

  expect(res.status).toEqual(400);

  const body = await res.json();
  expect(body).toMatchObject({
    error: 'Cannot set the updatedAt column',
  });
});

test('POST /containers cannot set createdAt', async () => {
  expect.assertions(2);

  const res = await http.post(`${baseUrl}/containers`, {
    createdAt: new Date()
  });

  expect(res.status).toEqual(400);

  const body = await res.json();
  expect(body).toMatchObject({
    error: 'Cannot set the createdAt column',
  });
});

test('POST /containers cannot set deletedAt', async () => {
  expect.assertions(2);

  const res = await http.post(`${baseUrl}/containers`, {
    deletedAt: new Date()
  });

  expect(res.status).toEqual(400);

  const body = await res.json();
  expect(body).toMatchObject({
    error: 'Cannot set the deletedAt column',
  });
});

test('POST /containers cannot set isLocked to null', async () => {
  expect.assertions(4);

  const name = getRandomName();

  const res1 = await http.post(`${baseUrl}/containers`, {
    name,
    fullPath: `/${name}`,
    isLocked: true
  });

  expect(res1.status).toEqual(400);

  const body1 = await res1.json();
  expect(body1).toMatchObject({
    error: 'Cannot set the isLocked column',
  });

  const name2 = getRandomName();

  const res2 = await http.post(`${baseUrl}/containers`, {
    name: name2,
    fullPath: `/${name2}`,
    isLocked: false
  });

  expect(res2.status).toEqual(400);

  const body2 = await res2.json();
  expect(body2).toMatchObject({
    error: 'Cannot set the isLocked column',
  });
});

test('POST /containers creates new Container successfully', async () => {
  expect.assertions(2);
  const name = getRandomName();

  const res = await http.post(`${baseUrl}/containers`, {
    name: name,
    fullPath: `/${name}`,
  });

  expect(res.status).toEqual(201);

  const body = await res.json();
  expect(body).toMatchObject(
    expect.objectContaining({
      createdAt: expect.any(String),
      fullPath: `/${name}`,
      id: expect.any(Number),
      isLocked: false,
      name: name,
      type: 'FOLDER',
      updatedAt: expect.any(String)
    })
  );
});

