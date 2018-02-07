import Video from '../Video';

test('New Video instances set the properties correctly as passed in', () => {
  const date = new Date();
  const f = new Video({
    id: 'media-1',
    name: 'foo',
    blobUrl: 'http://blob',
    createdBy: 'Bob',
    createdOn: date,
    updatedOn: date
  });

  expect(f.get('id')).toEqual('media-1');
  expect(f.get('name')).toEqual('foo');
  expect(f.get('blobUrl')).toEqual('http://blob');
  expect(f.get('createdBy')).toEqual('Bob');
  expect(f.get('createdOn')).toEqual(date);
  expect(f.get('updatedOn')).toEqual(date);
  expect(f.get('type')).toEqual('VIDEO');
});

