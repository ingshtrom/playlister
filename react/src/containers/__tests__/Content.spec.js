import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import { Content } from '../Content';

Enzyme.configure({ adapter: new Adapter() });

function setup(propsOverride) {
  const props = {
    getContent: () => {},
    isLoading: false,
    errorMessage: '',
    match: {
      url: 'foobar'
    },
    ...propsOverride
  };

  const component = shallow(<Content {...props} />);

  return {
    props,
    component
  };
}

test('Loading overlay has display-none class by default', () => {
  const { component } = setup();

  expect(component.find('#content-loader').hasClass('display-none')).toEqual(true);
});

test('Loading overlay does NOT have "display-none" class if `isLoading===true`', () => {
  const { component } = setup({ isLoading: true });

  expect(component.find('#content-loader').hasClass('display-none')).toEqual(false);
});

test('NotFound component has "display-none" class if `errorMessage` is an empty string', () => {
  const { component } = setup();

  expect(component.find('#notfound-wrapper').hasClass('display-none')).toEqual(true);
});

test('NotFound component does NOT have "display-none" class if `errorMessage` is defined', () => {
  const { component } = setup({ errorMessage: 'Something crazy happened' });

  expect(component.find('#notfound-wrapper').hasClass('display-none')).toEqual(false);
});


