import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import { Content } from '../Content';
import { Playlist } from '../Playlist';
import { ContentList } from '../ContentList';
import { NOOP } from '../../util/react';
import * as models from '../../models';

Enzyme.configure({ adapter: new Adapter() });

test('ContentList.getComponentToLoad returns NOOP if content is falsy', () => {
  expect(Content.getComponentToLoad()).toEqual(NOOP);
});

test('ContentList.getComponentToLoad returns NOOP if content.get(\'type\') is falsy', () => {
  let content = new models.Folder();
  content = content.set('type', '');
  expect(Content.getComponentToLoad(content)).toEqual(NOOP);
});

test('ContentList.getComponentToLoad returns ContentList component if content.get(\'type\') is "FOLDER"', () => {
  const content = new models.Folder();
  expect(Content.getComponentToLoad(content).WrappedComponent).toEqual(ContentList);
});

test('ContentList.getComponentToLoad returns Playlist component if content.get(\'type\') is "PLAYLIST"', () => {
  const content = new models.Playlist();
  expect(Content.getComponentToLoad(content).WrappedComponent).toEqual(Playlist);
});

