import React from 'react';
import renderer from 'react-test-renderer';

import Loader from '../Loader';

it('Loader renders correctly when isLoading=true', () => {
  const tree = renderer
    .create(<Loader isLoading />)
    .toJSON();

  expect(tree).toMatchSnapshot();
});

it('Loader renders correctly when isLoading=false', () => {
  const tree = renderer
    .create(<Loader isLoading={false} />)
    .toJSON();

  expect(tree).toMatchSnapshot();
});

