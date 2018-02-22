import { Content } from '../Content';
import { Playlist } from '../Playlist';
import { ContentList } from '../ContentList';
import { NOOP } from '../../util/react';

import * as models from '../../models';

// import React from 'react';
// import Enzyme, {shallow} from 'enzyme';
// import Adapter from 'enzyme-adapter-react-16';

// Enzyme.configure({ adapter: new Adapter() });


test('Content.getComponentToLoad returns NOOP if content is falsy', () => {
  expect(Content.getComponentToLoad()).toEqual(NOOP);
});

test('Content.getComponentToLoad returns NOOP if content.get(\'type\') is falsy', () => {
  let content = new models.Folder();
  content = content.set('type', '');
  expect(Content.getComponentToLoad(content)).toEqual(NOOP);
});

test('Content.getComponentToLoad returns ContentList component if content.get(\'type\') is "FOLDER"', () => {
  const content = new models.Folder();
  expect(Content.getComponentToLoad(content).WrappedComponent).toEqual(ContentList);
});

test('Content.getComponentToLoad returns Playlist component if content.get(\'type\') is "PLAYLIST"', () => {
  const content = new models.Playlist();
  expect(Content.getComponentToLoad(content).WrappedComponent).toEqual(Playlist);
});


// test('Content component calls getContent on initial mount with the current url', () => {
//   const content = new models.Folder();
//   const errorMessage = '';
//   const getContent = jest.fn();
//   const isLoading = false;
//   const match = { url: '/foo/bar' };

//   const component = shallow(
//     <Content
//       content={content}
//       errorMessage={errorMessage}
//       getContent={getContent}
//       isLoading={isLoading}
//       match={match}
//       store={{}}
//     />
//   );

//   expect(getContent).toHaveBeenCalled();

//   component.render();

//   expect(getContent).toHaveBeenCalledTimes(2);
// });

// test('Content component calss getContent after subsequent renders with the new url', () => {

// });


