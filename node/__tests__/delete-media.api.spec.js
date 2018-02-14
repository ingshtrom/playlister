require('dotenv').config();
const chakram = require('chakram');
const { getModels } = require('../services/mysql');

beforeEach(async () => {
  await resetDb();
});

test('DELETE /media/:id fails if the media cannot be found', async () => {
  expect.assertions(2);

  res = await chakram.delete(`${baseUrl}/media/1`);

  expect(res.response.statusCode).toEqual(400);
  expect(res.response.body).toMatchObject({ error: 'Could not find media to delete' });
});

test('DELETE /media/:id deletes media successfully', async () => {
  expect.assertions(2);

  const models = await getModels();

  let media = await models.Media.create({
    name: 'foobarbaz',
    type: 'IMAGE',
    url: 'https://google.com/favicon.ico',
    containerId: 1
  });

  res = await chakram.delete(`${baseUrl}/media/${media.id}`);

  media = await models.Media.find({ where: { id: media.id }});

  expect(res.response.statusCode).toEqual(204);
  expect(media).toEqual(null);
});
