import React from 'react';
import Enzyme, {shallow} from 'enzyme';
import AddContainer from '../AddContainer';
import Adapter from 'enzyme-adapter-react-16';

import * as models from '../../models';

Enzyme.configure({ adapter: new Adapter() });

test('AddContainer text input displays the correctly input text', () => {
  const parent = new models.Folder({ id: 1 });
  const addContainerFn = jest.fn();

  const component = shallow(<AddContainer parent={parent} addContainer={addContainerFn} />);

  component.find('input#new-container-name').simulate('change', { target: { value: 'foobar' }});

  expect(component.find('input#new-container-name[value=\'foobar\']').exists()).toBeTruthy();
});

test('AddContainer select input displays the correctly selected item', () => {
  const parent = new models.Folder({ id: 1 });
  const addContainerFn = jest.fn();

  const component = shallow(<AddContainer parent={parent} addContainer={addContainerFn} />);

  expect(component.find('select#new-container-type[value=\'FOLDER\']').exists()).toBeTruthy();

  component.find('select#new-container-type').simulate('change', { target: { value: 'PLAYLIST' }});

  expect(component.find('select#new-container-type[value=\'PLAYLIST\']').exists()).toBeTruthy();
});

test('AddContainer sends the correct data to the addContainer dispatch. It also preventsDefault.', () => {
  const parent = new models.Folder({ id: 1, fullPath: '/' });
  const addContainerFn = jest.fn();
  const preventDefault = jest.fn();

  const component = shallow(<AddContainer parent={parent} addContainer={addContainerFn} />);

  component.find('input#new-container-name').simulate('change', { target: { value: 'footzies' }});
  component.find('select#new-container-type').simulate('change', { target: { value: 'PLAYLIST' }});
  component.find('button#new-container-submit').simulate('click', { preventDefault });

  expect(addContainerFn).toHaveBeenCalledWith(1, 'footzies', '/footzies', 'PLAYLIST');
  expect(preventDefault).toHaveBeenCalled();
});

test('AddContainer sends the correct data to the addContainer dispatch for embedded containers as well.', () => {
  const parent = new models.Folder({ id: 52938, fullPath: '/foo' });
  const addContainerFn = jest.fn();
  const preventDefault = jest.fn();

  const component = shallow(<AddContainer parent={parent} addContainer={addContainerFn} />);

  component.find('input#new-container-name').simulate('change', { target: { value: 'footzies' }});
  component.find('select#new-container-type').simulate('change', { target: { value: 'PLAYLIST' }});
  component.find('button#new-container-submit').simulate('click', { preventDefault });

  expect(addContainerFn).toHaveBeenCalledWith(52938, 'footzies', '/foo/footzies', 'PLAYLIST');
  expect(preventDefault).toHaveBeenCalled();
});

