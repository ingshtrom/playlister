test('DELETE /media/:id fails if the media cannot be found', async () => {
  expect.assertions(2);

  const res = await http.delete(`${baseUrl}/media/1`);

  expect(res.status).toEqual(400);

  const body = await res.json();
  expect(body).toMatchObject({ error: 'Could not find media to delete' });
});

test('DELETE /media/:id deletes media successfully', async () => {
  const { Media } = db.models;

  expect.assertions(2);

  let media = await Media.create({
    name: 'foobarbaz',
    type: 'IMAGE',
    url: 'https://google.com/favicon.ico',
    containerId: 1
  });

  const res = await http.delete(`${baseUrl}/media/${media.id}`);

  media = await Media.find({ where: { id: media.id }});

  expect(res.status).toEqual(204);
  expect(media).toEqual(null);
});

