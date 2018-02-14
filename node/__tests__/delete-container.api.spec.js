require('dotenv').config();
const chakram = require('chakram');
const { getModels } = require('../services/mysql');

beforeEach(async () => {
  await resetDb();
});

test('DELETE /content/containers/:id fails if the Container cannot be found', async () => {
  expect.assertions(2);

  res = await chakram.delete(`${baseUrl}/content/containers/2`); // only row with id=1 should be created at this point

  expect(res.response.statusCode).toEqual(400);
  expect(res.response.body).toMatchObject({ error: 'Could not find container to delete' });
});

test('DELETE /content/containers/:id fails if the Container is locked', async () => {
  expect.assertions(3);

  const models = await getModels();

  let container = await models.Container.create({
    name: 'foobarbaz',
    fullPath: '/foobarbaz',
    isLocked: true
  });

  res = await chakram.delete(`${baseUrl}/content/containers/${container.id}`);

  container = await models.Container.find({ where: { id: container.id }});

  expect(res.response.statusCode).toEqual(400);
  expect(res.response.body).toMatchObject({ error: 'Could not find container to delete' });
  expect(container).not.toEqual(null);
});

test('DELETE /content/containers/:id deletes Container successfully', async () => {
  expect.assertions(2);

  const models = await getModels();

  let container = await models.Container.create({
    name: 'foobarbaz',
    fullPath: '/foobarbaz',
    isLocked: false
  });

  res = await chakram.delete(`${baseUrl}/content/containers/${container.id}`);

  container = await models.Container.find({ where: { id: container.id }});

  expect(res.response.statusCode).toEqual(204);
  expect(container).toEqual(null);
});

