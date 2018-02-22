test('DELETE /containers/:id fails if the Container cannot be found', async () => {
  expect.assertions(2);

  // TODO: probably won't fix, but know that this will fail at some point...
  const res = await http.delete(`${baseUrl}/containers/103820487`);

  expect(res.status).toEqual(400);

  const body = await res.json();
  expect(body).toMatchObject({ error: 'Could not find container to delete' });
});

test('DELETE /containers/:id fails if the Container is locked', async () => {
  const { Container } = db.models;
  expect.assertions(3);

  const [name] = RM.genContainerNames(1);

  let container = await Container.create({
    name: name,
    fullPath: `/${name}`,
    isLocked: true
  });

  const res = await http.delete(`${baseUrl}/containers/${container.id}`);

  container = await Container.find({ where: { id: container.id, deletedAt: null }});

  expect(res.status).toEqual(400);

  const body = await res.json();
  expect(body).toMatchObject({ error: 'Could not find container to delete' });
  expect(container).not.toEqual(null);
});

test('DELETE /containers/:id deletes Container successfully', async () => {
  const { Container } = db.models;
  expect.assertions(2);

  const [name] = RM.genContainerNames(1);

  container = await Container.create({
    name: name,
    fullPath: `/${name}`,
    isLocked: false
  });

  const res = await http.delete(`${baseUrl}/containers/${container.id}`);

  container = await Container.find({ where: { id: container.id, deletedAt: null }});

  expect(res.status).toEqual(204);
  expect(container).toEqual(null);
});

