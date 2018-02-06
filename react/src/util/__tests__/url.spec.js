import { normalizeRootUrl } from '../url';

test('normalizeRootUrl returns empty string if given input of `/`', () => {
  expect(normalizeRootUrl('/')).toEqual('');
});

test('normalizeRootUrl returns input if given `/foo`', () => {
  expect(normalizeRootUrl('/foo')).toEqual('/foo');
});

test('normalizeRootUrl returns input if given `/foo/bar/baz`', () => {
  expect(normalizeRootUrl('/foo/bar/baz')).toEqual('/foo/bar/baz');
});
