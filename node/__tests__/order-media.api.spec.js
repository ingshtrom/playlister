test('PUT /containers/:id/order fails with error if no mediaContent is supplied', async () => {
  const { Container, Media } = db.models;
  const [name] = RM.genContainerNames(1);

  let container = await Container.create({
    name,
    fullPath: `/${name}`,
    type: 'PLAYLIST'
  });

  const res = await http.put(`${baseUrl}/containers/${container.id}/order`, []);

  expect(res.status).toEqual(400);

  const body = await res.json();
  expect(body).toEqual({ error: 'No media specified for ordering' });
});

test('PUT /containers/:id/order fails with error if mediaContent is not an array of numbers', async () => {
  const { Container } = db.models;
  const [name] = RM.genContainerNames(1);

  let container = await Container.create({
    name,
    fullPath: `/${name}`,
    type: 'PLAYLIST'
  });

  const res = await http.put(`${baseUrl}/containers/${container.id}/order`, ['foo', 4, 5, 6]);

  expect(res.status).toEqual(400);

  const body = await res.json();
  expect(body).toEqual({ error: 'Expected body to be an array of media IDs (numbers)' });
});

test('PUT /containers/:id/order orders the content successfully', async () => {
  // expect.assertions(2);

  const { Container, Media } = db.models;
  const [name] = RM.genContainerNames(1);
  const mediaNames = RM.genMediaNames(4);

  let container = await Container.create({
    name,
    fullPath: `/${name}`,
    type: 'PLAYLIST',
    mediaContent: mediaNames.map((name, index) => ({
      name,
      playlistIndex: index,
      type: 'IMAGE'
    }))
  }, {
    include: [{
      model: Media,
      as: 'mediaContent'
    }]
  });

  const newOrder = shuffle(container.mediaContent.map(media => media.id));

  const res = await http.put(`${baseUrl}/containers/${container.id}/order`, newOrder);

  expect(res.status).toEqual(204);

  container = await Container.find({
    where: { id: container.id },
    include: [{ model: Media, as: 'mediaContent' }]
  });

  expect(container).not.toEqual(null);
  expect(container.toJSON()).toMatchObject(
    expect.objectContaining({
      id: container.id,
      type: 'PLAYLIST',
      mediaContent: expect.arrayContaining(
        newOrder.map((id, index) => {
          return expect.objectContaining({
            id,
            playlistIndex: index
          });
        })
      )
    })
  );
});


// https://www.w3resource.com/javascript-exercises/javascript-array-exercise-17.php
function shuffle(arra1) {
    var ctr = arra1.length, temp, index;

// While there are elements in the array
    while (ctr > 0) {
// Pick a random index
        index = Math.floor(Math.random() * ctr);
// Decrease ctr by 1
        ctr--;
// And swap the last element with it
        temp = arra1[ctr];
        arra1[ctr] = arra1[index];
        arra1[index] = temp;
    }
    return arra1;
}
