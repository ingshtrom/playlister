const { createReadStream } = require('fs');
const path                 = require('path');
const FormData             = require('form-data');
const uuid                 = require('uuid/v4');

test('POST /media/:id/upload returns an error if the file is not specified', async () => {
 const { Media } = db.models;

  expect.assertions(2);

  const [name] = RM.genMediaNames(1);

  let media = await Media.create({
    id: uuid(),
    name,
    type: 'IMAGE',
  });


  const form = new FormData();
  const res = await http.post(`${baseUrl}/media/${media.id}/upload`, form);

  expect(res.status).toEqual(400);

  const body = await res.json();
  expect(body).toEqual({ error: 'Must upload a file' });
});

test('POST /media/:id/upload returns an error if the file is not actually a file', async () => {
 const { Media } = db.models;

  expect.assertions(2);

  const [name] = RM.genMediaNames(1);

  let media = await Media.create({
    id: uuid(),
    name,
    type: 'IMAGE',
  });

  const form = new FormData();
  form.append('media', 'foo');
  const res = await http.post(`${baseUrl}/media/${media.id}/upload`, form);

  expect(res.status).toEqual(400);

  const body = await res.json();
  expect(body).toEqual({ error: 'Must upload a file' });
});

test('POST /media/:id/upload works with a jpg', async () => {
 const { Media } = db.models;

  expect.assertions(1);

  const [name] = RM.genMediaNames(1);

  let media = await Media.create({
    id: uuid(),
    name,
    type: 'IMAGE',
  });

  const form = new FormData();
  form.append('media', createReadStream(path.resolve(__dirname, 'test.jpg')));
  const res = await http.post(`${baseUrl}/media/${media.id}/upload`, form);

  expect(res.status).toEqual(200);
});

test('POST /media/:id/upload works with another jpg', async () => {
 const { Media } = db.models;

  expect.assertions(1);

  const [name] = RM.genMediaNames(1);

  let media = await Media.create({
    id: uuid(),
    name,
    type: 'IMAGE',
  });

  const form = new FormData();
  form.append('media', createReadStream(path.resolve(__dirname, 'test1.jpg')));
  const res = await http.post(`${baseUrl}/media/${media.id}/upload`, form);

  expect(res.status).toEqual(200);
});

test('POST /media/:id/upload works with a gif', async () => {
 const { Media } = db.models;

  expect.assertions(1);

  const [name] = RM.genMediaNames(1);

  let media = await Media.create({
    id: uuid(),
    name,
    type: 'IMAGE',
  });

  const form = new FormData();
  form.append('media', createReadStream(path.resolve(__dirname, 'test.gif')));
  const res = await http.post(`${baseUrl}/media/${media.id}/upload`, form);

  expect(res.status).toEqual(200);
});

test.skip('POST /media/:id/upload works with a mp4', async () => {
 const { Media } = db.models;

  expect.assertions(1);

  const [name] = RM.genMediaNames(1);

  let media = await Media.create({
    id: uuid(),
    name,
    type: 'VIDEO',
  });

  const form = new FormData();
  form.append('media', createReadStream(path.resolve(__dirname, 'test.mp4')));
  const res = await http.post(`${baseUrl}/media/${media.id}/upload`, form);

  expect(res.status).toEqual(200);
});

