import React from 'react';
import renderer from 'react-test-renderer';
import { MemoryRouter } from 'react-router';
import { Provider } from 'react-redux'

import Header from '../Header';
import store from '../../store';

test('Header snapshot', () => {
  const component = renderer.create(
    <Provider store={store}>
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    </Provider>
  );

  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

