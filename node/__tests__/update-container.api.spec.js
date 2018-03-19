const uuid = require('uuid/v4');

test('PUT /containers/:id cannot set id', async () => {
  const { Container } = db.models;
  expect.assertions(2);

  const [name] = RM.genContainerNames(1);

  let container = await Container.create({
    id: uuid(),
    name: name,
    fullPath: `/${name}`,
    isLocked: false
  });

  const res = await http.put(`${baseUrl}/containers/${container.id}`, { id: 12345 });

  expect(res.status).toEqual(400);

  const body = await res.json();
  expect(body).toMatchObject({
    error: 'Cannot set the id column'
  });
});

test('PUT /containers/:id cannot set updatedAt', async () => {
 const { Container } = db.models;
  expect.assertions(2);

  const [name] = RM.genContainerNames(1);

  let container = await Container.create({
    id: uuid(),
    name: name,
    fullPath: `/${name}`,
    isLocked: false
  });

  const res = await http.put(`${baseUrl}/containers/${container.id}`, { updatedAt: new Date() });

  expect(res.status).toEqual(400);

  const body = await res.json();
  expect(body).toMatchObject({
    error: 'Cannot set the updatedAt column',
  });
});

test('PUT /containers/:id cannot set createdAt', async () => {
  const { Container } = db.models;
  expect.assertions(2);

  const [name] = RM.genContainerNames(1);

  let container = await Container.create({
    id: uuid(),
    name: name,
    fullPath: `/${name}`,
    isLocked: false
  });

  const res = await http.put(`${baseUrl}/containers/${container.id}`, { createdAt: new Date() });

  expect(res.status).toEqual(400);

  const body = await res.json();
  expect(body).toMatchObject({
    error: 'Cannot set the createdAt column',
  });
});

test('PUT /containers/:id cannot set deletedAt', async () => {
  const { Container } = db.models;
  expect.assertions(2);

  const [name] = RM.genContainerNames(1);

  let container = await Container.create({
    id: uuid(),
    name: name,
    fullPath: `/${name}`,
    isLocked: false
  });

  const res = await http.put(`${baseUrl}/containers/${container.id}`, { deletedAt: new Date() });

  expect(res.status).toEqual(400);

  const body = await res.json();
  expect(body).toMatchObject({
    error: 'Cannot set the deletedAt column',
  });
});

test('PUT /containers/:id cannot set isLocked to true', async () => {
  const { Container } = db.models;
  expect.assertions(2);

  const [name] = RM.genContainerNames(1);

  let container = await Container.create({
    id: uuid(),
    name: name,
    fullPath: `/${name}`,
    isLocked: false
  });

  const res = await http.put(`${baseUrl}/containers/${container.id}`, { isLocked: true });

  expect(res.status).toEqual(400);

  const body = await res.json();
  expect(body).toMatchObject({
    error: 'Cannot set the isLocked column',
  });
});

test('PUT /containers/:id cannot set isLocked to false', async () => {
  const { Container } = db.models;
  expect.assertions(2);

  const [name] = RM.genContainerNames(1);

  let container = await Container.create({
    id: uuid(),
    name: name,
    fullPath: `/${name}`,
    isLocked: true
  });

  const res = await http.put(`${baseUrl}/containers/${container.id}`, { isLocked: false });

  expect(res.status).toEqual(400);

  const body = await res.json();
  expect(body).toMatchObject({
    error: 'Cannot set the isLocked column',
  });
});

test('PUT /containers/:id updates the name of a Container successfully', async () => {
  const { Container } = db.models;
  expect.assertions(2);

  const [name1, name2] = RM.genContainerNames(2);

  let container = await Container.create({
    id: uuid(),
    name: name1,
    fullPath: `/${name1}`,
    isLocked: false
  });

  const res = await http.put(`${baseUrl}/containers/${container.id}`, { name: name2 });

  expect(res.status).toEqual(200);

  const body = await res.json();
  expect(body).toMatchObject(
    expect.objectContaining({
      name: name2,
      fullPath: `/${name2}`
    })
  );
});

