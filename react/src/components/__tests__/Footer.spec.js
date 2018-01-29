import React from 'react';
import renderer from 'react-test-renderer';

import Footer from '../Footer.js';

test('Footer snapshot', () => {
  const component = renderer.create(
    <Footer />,
  );

  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
