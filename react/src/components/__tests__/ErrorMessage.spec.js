import React from 'react';
import renderer from 'react-test-renderer';

import ErrorMessage from '../ErrorMessage';

it('ErrorMessage renders correctly if no message is provided', () => {
  const tree = renderer
    .create(<ErrorMessage message='' />)
    .toJSON();

  expect(tree).toMatchSnapshot();
});

it('ErrorMessage renders correctly if an error message is provided', () => {
  const tree = renderer
    .create(<ErrorMessage message='Something crazy happened!' />)
    .toJSON();

  expect(tree).toMatchSnapshot();
});

