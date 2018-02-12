import React from 'react';
import Enzyme, { render } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import rewire from 'rewire';

import * as models from '../../models';

const { Content } = rewire('../Content');
const PlaylistMock = jest.fn(() => {
  return (<div id='playlist'></div>);
});
const ContentListMock = jest.fn(() => {
  return (<div id='content-list'></div>);
});

Content.__set__('Playlist', PlaylistMock);
Content.__set__('ContentList', ContentListMock);

Enzyme.configure({ adapter: new Adapter() });

test('Loading overlay has display-none class by default', () => {
  const component = render(Content.renderLoader());

  expect(component.hasClass('display-none')).toEqual(true);
});

test('Loading overlay does NOT have "display-none" class if `isLoading===true`', () => {
  const component = render(Content.renderLoader(true));

  expect(component.find('#content-loader').hasClass('display-none')).toEqual(false);
});

test('NotFound component has "display-none" class if `errorMessage` is an empty string', () => {
  const component = render(Content.renderErrorMessage(''));

  expect(component.hasClass('display-none')).toEqual(true);
});

test('NotFound component does NOT have "display-none" class if `errorMessage` is defined', () => {
  const component = render(Content.renderErrorMessage('Something crazy happened'));

  expect(component.hasClass('display-none')).toEqual(false);
});

test('ContentList componet is rendered if a Folder is passed in for the `content` prop', () => {
  const content = new models.Folder();
  const match = { url: '/foo' };
  const component = render(Content.renderMainContent(content, match));

  expect(component.html()).toEqual(true);
});

