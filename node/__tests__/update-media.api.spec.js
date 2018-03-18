const uuid = require('uuid/v4');

test('PUT /media/:id cannot set id', async () => {
  const { Media } = db.models;
  expect.assertions(2);

  const [name] = RM.genMediaNames(1);

  let media = await Media.create({
    id: uuid(),
    name: name,
    fullPath: `/${name}`,
    isLocked: false
  });

  const res = await http.put(`${baseUrl}/media/${media.id}`, { id: 12345 });

  expect(res.status).toEqual(400);

  const body = await res.json();
  expect(body).toMatchObject({
    error: 'Cannot set the id column'
  });
});

test('PUT /media/:id cannot set updatedAt', async () => {
 const { Media } = db.models;
  expect.assertions(2);

  const [name] = RM.genMediaNames(1);

  let media = await Media.create({
    id: uuid(),
    name: name,
    fullPath: `/${name}`,
    isLocked: false
  });

  const res = await http.put(`${baseUrl}/media/${media.id}`, { updatedAt: new Date() });

  expect(res.status).toEqual(400);

  const body = await res.json();
  expect(body).toMatchObject({
    error: 'Cannot set the updatedAt column',
  });
});

test('PUT /media/:id cannot set createdAt', async () => {
  const { Media } = db.models;
  expect.assertions(2);

  const [name] = RM.genMediaNames(1);

  let media = await Media.create({
    id: uuid(),
    name: name,
    fullPath: `/${name}`,
    isLocked: false
  });

  const res = await http.put(`${baseUrl}/media/${media.id}`, { createdAt: new Date() });

  expect(res.status).toEqual(400);

  const body = await res.json();
  expect(body).toMatchObject({
    error: 'Cannot set the createdAt column',
  });
});

test('PUT /media/:id cannot set deletedAt', async () => {
  const { Media } = db.models;
  expect.assertions(2);

  const [name] = RM.genMediaNames(1);

  let media = await Media.create({
    id: uuid(),
    name: name,
    fullPath: `/${name}`,
    isLocked: false
  });

  const res = await http.put(`${baseUrl}/media/${media.id}`, { deletedAt: new Date() });

  expect(res.status).toEqual(400);

  const body = await res.json();
  expect(body).toMatchObject({
    error: 'Cannot set the deletedAt column',
  });
});

test('PUT /media/:id updates the name of a Media successfully', async () => {
  const { Media } = db.models;
  expect.assertions(2);

  const [name] = RM.genMediaNames(1);

  let media = await Media.create({
    id: uuid(),
    name: 'foobar',
    fullPath: `/${name}`,
    isLocked: false
  });

  const res = await http.put(`${baseUrl}/media/${media.id}`, { name });

  expect(res.status).toEqual(200);

  const body = await res.json();
  expect(body).toMatchObject(
    expect.objectContaining({
      name: name,
    })
  );
});

