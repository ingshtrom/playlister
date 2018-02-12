import React from 'react';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import Pass from '../Pass';

Enzyme.configure({ adapter: new Adapter() });

function setup(props, children) {
  return mount(
    <Pass {...props}>
      {children}
    </Pass>
  );
}

it('Pass renders with the passed in className', () => {
  const component = setup({ className: 'foobar' }, (null));
  expect(component.hasClass('foobar')).toBeTruthy();
});

it('Pass renders with the passed in id', () => {
  const component = setup({ id: 'foobar' }, (null));
  expect(component.find('#foobar').exists()).toEqual(true);
});

it('Pass renders with the passed in component', () => {
  const component = setup({ id: 'bar' }, (<div id='foo'></div>));
  expect(component.find('#foo').exists()).toEqual(true);
});

