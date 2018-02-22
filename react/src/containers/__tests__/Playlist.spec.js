import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { fromJS, List } from 'immutable';

import { Playlist, mapStateToProps } from '../Playlist';
import * as models from '../../models';

Enzyme.configure({ adapter: new Adapter() });

const defaultState = {
  content: fromJS({
    media: {
      'media-4': new models.Image({
        id: 'media-4',
        name: 'shotshotshotshotshots',
        type: 'IMAGE',
        url: 'https://some-url/io23ji2ff.png',
        createdBy: null,
        createdOn: null,
        updatedOn: null
      })
    }
  })
}

const getMediaMock = jest.fn();

function setup(propsOverride) {
  const props = {
    content: new models.Playlist(),
    childContent: List(),
    getMedia: getMediaMock,
    ...propsOverride
  };
  return shallow(<Playlist {...props} />);
}

beforeEach(() => {
  getMediaMock.mockReset();
});

// test('Playlist does not call getMedia if ids are empty', () => {
//   expect.assertions(1);

//   setup();
//   expect(getMediaMock).not.toHaveBeenCalled();
// });

// test('Playlist calls getMedia if ids has a positive size', () => {
//   expect.assertions(1);

//   setup({
//     content: new models.Playlist({ content: ['foo'] })
//   });
//   expect(getMediaMock).toHaveBeenCalledWith(List(['foo']));
// });

test('Playlist.mapStateToProps correctly returns items from state', () => {
  expect.assertions(4);

  const state = defaultState;
  const props = {
    content: new models.Playlist({
      mediaContent: [ 'media-4' ]
    }),
  };

  const { childContent } = mapStateToProps(state, props);

  expect(childContent).toBeInstanceOf(List);
  expect(childContent.size).toEqual(1);
  expect(childContent.get(0)).toBeInstanceOf(models.Image);
  expect(childContent.get(0)).toMatchObject(state.content.getIn(['media', 'media-4']));
});

test('Playlist.mapStateToProps correctly returns items from state, ignoring items not in state', () => {
  expect.assertions(4);

  const state = defaultState;
  const props = {
    content: new models.Playlist({
      mediaContent: [ 'media-4', 'media-5' ]
    }),
  };

  const { childContent } = mapStateToProps(state, props);

  expect(childContent).toBeInstanceOf(List);
  expect(childContent.size).toEqual(1);
  expect(childContent.get(0)).toBeInstanceOf(models.Image);
  expect(childContent.get(0)).toMatchObject(state.content.getIn(['media', 'media-4']));
});

