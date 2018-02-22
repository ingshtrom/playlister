import Playlist from '../Playlist';
import { List } from 'immutable';

test('New Playlist instances set the `content` to a List type', () => {
  const instance = new Playlist({
    mediaContent: [ 'foo', 'bar'],
  });

  expect(instance.get('mediaContent')).toBeInstanceOf(List);
  expect(instance.get('mediaContent')).toMatchObject(List(['foo', 'bar']));
});

test('New Playlist instances set the properties correctly as passed in', () => {
  const date = new Date();
  const f = new Playlist({
    fullPath: 'http://bar',
    name: 'baz',
    mediaContent: [ 'foo' ],
    createdBy: 'Jack',
    createdOn: date,
    updatedOn: date
  });

  expect(f.get('fullPath')).toEqual('http://bar');
  expect(f.get('name')).toEqual('baz');
  expect(f.get('mediaContent')).toEqual(List(['foo']));
  expect(f.get('createdBy')).toEqual('Jack');
  expect(f.get('createdOn')).toEqual(date);
  expect(f.get('updatedOn')).toEqual(date);
  expect(f.get('type')).toEqual('PLAYLIST');
});

