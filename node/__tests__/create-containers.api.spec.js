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

test('POST /containers cannot set isLocked to true', async () => {
  expect.assertions(2);

  const [name] = RM.genContainerNames(1);

  const res = await http.post(`${baseUrl}/containers`, {
    name,
    fullPath: `/${name}`,
    isLocked: true
  });

  expect(res.status).toEqual(400);

  const body = await res.json();
  expect(body).toMatchObject({
    error: 'Cannot set the isLocked column',
  });
});

test('POST /containers cannot set isLocked to false', async () => {
  expect.assertions(2);

  const [name] = RM.genContainerNames(1);

  const res = await http.post(`${baseUrl}/containers`, {
    name,
    fullPath: `/${name}`,
    isLocked: false
  });

  expect(res.status).toEqual(400);

  const body = await res.json();
  expect(body).toMatchObject({
    error: 'Cannot set the isLocked column',
  });
});

test('POST /containers creates new Container successfully', async () => {
  expect.assertions(2);

  const [name] = RM.genContainerNames(1);

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

