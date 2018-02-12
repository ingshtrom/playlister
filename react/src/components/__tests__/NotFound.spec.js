import React from 'react';
import renderer from 'react-test-renderer';

import NotFound from '../NotFound.js';

test('NotFound snapshot', () => {
  const component = renderer.create(
    <NotFound />,
  );

  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
