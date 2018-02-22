import Folder from '../Folder';
import { List } from 'immutable';

test('New Folder instances set the `content` to a List type', () => {
  const instance = new Folder({
    content: [ 'foo', 'bar'],
  });

  expect(instance.get('content')).toBeInstanceOf(List);
  expect(instance.get('content')).toMatchObject(List(['foo', 'bar']));
});

test('New Folder instances set the properties correctly as passed in', () => {
  const date = new Date();
  const f = new Folder({
    fullPath: 'http://foo',
    name: 'foo',
    content: [ 'foo', 'bar'],
    createdBy: 'Jill',
    createdOn: date,
    updatedOn: date
  });

  expect(f.get('fullPath')).toEqual('http://foo');
  expect(f.get('name')).toEqual('foo');
  expect(f.get('content')).toEqual(List(['foo', 'bar']));
  expect(f.get('createdBy')).toEqual('Jill');
  expect(f.get('createdOn')).toEqual(date);
  expect(f.get('updatedOn')).toEqual(date);
  expect(f.get('type')).toEqual('FOLDER');
});

