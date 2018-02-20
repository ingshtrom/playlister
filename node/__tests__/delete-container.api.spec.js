test('DELETE /containers/:id fails if the Container cannot be found', async () => {
  expect.assertions(2);

  const res = await http.delete(`${baseUrl}/containers/2`);

  expect(res.status).toEqual(400);

  const body = await res.json();
  expect(body).toMatchObject({ error: 'Could not find container to delete' });
});

test('DELETE /containers/:id fails if the Container is locked', async () => {
  const { Container } = db.models;
  expect.assertions(3);

  let container = await Container.create({
    name: 'foobarbaz',
    fullPath: '/foobarbaz',
    isLocked: true
  });

  const res = await http.delete(`${baseUrl}/containers/${container.id}`);

  container = await Container.find({ where: { id: container.id }});

  expect(res.status).toEqual(400);

  const body = await res.json();
  expect(body).toMatchObject({ error: 'Could not find container to delete' });
  expect(container).not.toEqual(null);
});

test('DELETE /containers/:id deletes Container successfully', async () => {
  const { Container } = db.models;
  expect.assertions(2);

  container = await Container.create({
    name: 'foobarbaz',
    fullPath: '/foobarbaz',
    isLocked: false
  });

  const res = await http.delete(`${baseUrl}/containers/${container.id}`);

  container = await Container.find({ where: { id: container.id }});

  expect(res.status).toEqual(204);
  expect(container).toEqual(null);
});

