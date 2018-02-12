import React from 'react';
import renderer from 'react-test-renderer';

import Breadcrumbs from '../Breadcrumbs';

it('Breadcrumbs renders correctly', () => {
  const tree = renderer
    .create(<Breadcrumbs match={{ url: '/foo/bar' }} />)
    .toJSON();

  expect(tree).toMatchSnapshot();
});

