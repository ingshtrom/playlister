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
      '1': new models.Image({
        id: 1,
        name: 'shotshotshotshotshots',
        type: 'IMAGE',
        url: 'https://some-url/io23ji2ff.png',
        playlistIndex: 0,
      }),
      '2': new models.Image({
        id: 2,
        name: 'shotshotshotshotshots',
        type: 'IMAGE',
        url: 'https://some-url/io23ji2ff.png',
        playlistIndex: 1,
      })
    }
  })
};

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

test('Playlist.mapStateToProps correctly returns items from state', () => {
  expect.assertions(4);

  const state = defaultState;
  const props = {
    content: new models.Playlist({
      mediaContent: [ '1' ]
    }),
  };

  const { childContent } = mapStateToProps(state, props);

  expect(childContent).toBeInstanceOf(List);
  expect(childContent.size).toEqual(1);
  expect(childContent.get(0)).toBeInstanceOf(models.Image);
  expect(childContent.get(0)).toMatchObject(state.content.getIn(['media', '1']));
});

test('Playlist.mapStateToProps correctly returns items from state, ignoring items not in state', () => {
  expect.assertions(4);

  const state = defaultState;
  const props = {
    content: new models.Playlist({
      mediaContent: [ '1', '3' ]
    }),
  };

  const { childContent } = mapStateToProps(state, props);

  expect(childContent).toBeInstanceOf(List);
  expect(childContent.size).toEqual(1);
  expect(childContent.get(0)).toBeInstanceOf(models.Image);
  expect(childContent.get(0)).toMatchObject(state.content.getIn(['media', '1']));
});

test('Playlist.mapStateToProps correctly returns items from state ordered by playlistIndex', () => {
  expect.assertions(5);

  const state = {
    content: fromJS({
      media: {
        '1': new models.Image({
          id: 1,
          name: 'shotshotshotshotshots',
          type: 'IMAGE',
          url: 'https://some-url/io23ji2ff.png',
          playlistIndex: 1,
        }),
        '2': new models.Image({
          id: 2,
          name: 'shotshotshotshotshots',
          type: 'IMAGE',
          url: 'https://some-url/io23ji2ff.png',
          playlistIndex: 0,
        })
      }
    })
  };
  const props = {
    content: new models.Playlist({
      mediaContent: [ '1', '2' ]
    }),
  };

  const { childContent } = mapStateToProps(state, props);

  expect(childContent).toBeInstanceOf(List);
  expect(childContent.size).toEqual(2);
  expect(childContent.get(0)).toBeInstanceOf(models.Image);
  expect(childContent.get(0)).toMatchObject(state.content.getIn(['media', '2']));
  expect(childContent.get(1)).toMatchObject(state.content.getIn(['media', '1']));
});

