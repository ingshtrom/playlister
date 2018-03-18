import Sort from '../sort';
import { List } from 'immutable';
import * as models from '../../models';

const contentToSort = new List([
  new models.Playlist({
    name: 'baz',
    createdOn: 'Sat Mar 17 2018 12:23:11 GMT-0400 (EDT)',
    updatedOn: 'Sun Mar 18 2018 12:23:11 GMT-0400 (EDT)',
  }),
  new models.Folder({
    name: 'foo',
    createdOn: 'Mon Mar 11 2018 12:23:11 GMT-0400 (EDT)',
    updatedOn: 'Fri Mar 16 2018 12:23:11 GMT-0400 (EDT)',
  }),
  new models.Playlist({
    name: 'booz',
    createdOn: 'Thurs Mar 15 2018 12:23:11 GMT-0400 (EDT)',
    updatedOn: 'Sat Mar 17 2018 12:23:11 GMT-0400 (EDT)',
  }),
  new models.Folder({
    name: 'farts',
    createdOn: 'Wed Mar 14 2018 12:23:11 GMT-0400 (EDT)',
    updatedOn: 'Sat Mar 17 2018 12:23:11 GMT-0400 (EDT)',
  }),
])

test('Sort.NameASC works', () => {
  expect.assertions(4);
  const result = Sort.NameASC(contentToSort);

  expect(result.get(0)).toMatchObject(
    expect.objectContaining({
      name: 'baz'
    })
  );
  expect(result.get(1)).toMatchObject(
    expect.objectContaining({
      name: 'booz'
    })
  );
  expect(result.get(2)).toMatchObject(
    expect.objectContaining({
      name: 'farts'
    })
  );
  expect(result.get(3)).toMatchObject(
    expect.objectContaining({
      name: 'foo'
    })
  );
});

test('Sort.NameDESC works', () => {
  expect.assertions(4);
  const result = Sort.NameDESC(contentToSort);

  expect(result.get(0)).toMatchObject(
    expect.objectContaining({
      name: 'foo'
    })
  );
  expect(result.get(1)).toMatchObject(
    expect.objectContaining({
      name: 'farts'
    })
  );
  expect(result.get(2)).toMatchObject(
    expect.objectContaining({
      name: 'booz'
    })
  );
  expect(result.get(3)).toMatchObject(
    expect.objectContaining({
      name: 'baz'
    })
  );
});

test('Sort.TypeASC works', () => {
  expect.assertions(4);
  const result = Sort.TypeASC(contentToSort);

  expect(result.get(0)).toMatchObject(
    expect.objectContaining({
      name: 'foo'
    })
  );
  expect(result.get(1)).toMatchObject(
    expect.objectContaining({
      name: 'farts'
    })
  );
  expect(result.get(2)).toMatchObject(
    expect.objectContaining({
      name: 'baz'
    })
  );
  expect(result.get(3)).toMatchObject(
    expect.objectContaining({
      name: 'booz'
    })
  );
});

test('Sort.TypeDESC works', () => {
  expect.assertions(4);
  const result = Sort.TypeDESC(contentToSort);

  expect(result.get(0)).toMatchObject(
    expect.objectContaining({
      name: 'baz'
    })
  );
  expect(result.get(1)).toMatchObject(
    expect.objectContaining({
      name: 'booz'
    })
  );
  expect(result.get(2)).toMatchObject(
    expect.objectContaining({
      name: 'foo'
    })
  );
  expect(result.get(3)).toMatchObject(
    expect.objectContaining({
      name: 'farts'
    })
  );
});

test('Sort.UpdatedASC works', () => {
  expect.assertions(4);
  const result = Sort.UpdatedASC(contentToSort);

  expect(result.get(0)).toMatchObject(
    expect.objectContaining({
      name: 'foo'
    })
  );
  expect(result.get(1)).toMatchObject(
    expect.objectContaining({
      name: 'booz'
    })
  );
  expect(result.get(2)).toMatchObject(
    expect.objectContaining({
      name: 'farts'
    })
  );
  expect(result.get(3)).toMatchObject(
    expect.objectContaining({
      name: 'baz'
    })
  );
});

test('Sort.UpdatedDESC works', () => {
  expect.assertions(4);
  const result = Sort.UpdatedDESC(contentToSort);

  expect(result.get(0)).toMatchObject(
    expect.objectContaining({
      name: 'baz'
    })
  );
  expect(result.get(1)).toMatchObject(
    expect.objectContaining({
      name: 'booz'
    })
  );
  expect(result.get(2)).toMatchObject(
    expect.objectContaining({
      name: 'farts'
    })
  );
  expect(result.get(3)).toMatchObject(
    expect.objectContaining({
      name: 'foo'
    })
  );
});

test('Sort.CreatedASC works', () => {
  expect.assertions(4);
  const result = Sort.CreatedASC(contentToSort);

  expect(result.get(0)).toMatchObject(
    expect.objectContaining({
      name: 'foo'
    })
  );
  expect(result.get(1)).toMatchObject(
    expect.objectContaining({
      name: 'farts'
    })
  );
  expect(result.get(2)).toMatchObject(
    expect.objectContaining({
      name: 'booz'
    })
  );
  expect(result.get(3)).toMatchObject(
    expect.objectContaining({
      name: 'baz'
    })
  );
});

test('Sort.CreatedDESC works', () => {
  expect.assertions(4);
  const result = Sort.CreatedDESC(contentToSort);

  expect(result.get(0)).toMatchObject(
    expect.objectContaining({
      name: 'baz'
    })
  );
  expect(result.get(1)).toMatchObject(
    expect.objectContaining({
      name: 'booz'
    })
  );
  expect(result.get(2)).toMatchObject(
    expect.objectContaining({
      name: 'farts'
    })
  );
  expect(result.get(3)).toMatchObject(
    expect.objectContaining({
      name: 'foo'
    })
  );
});

