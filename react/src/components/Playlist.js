import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { List } from 'immutable';

import * as models from '../models';
import { getMedia } from '../modules/content-actions';

class Playlist extends Component {
  constructor(props) {
    super(props);

    this.renderMediaItem = this.renderMediaItem.bind(this);
  }

  componentDidMount() {
    const { getMedia, playlist } = this.props;
    const mediaIds = playlist.get('content');

    if (mediaIds && mediaIds.size) {
      getMedia(mediaIds);
    }
  }

  renderMediaItem(item) {
    return (
      <div key={item.id}>
        <a href={item.blobUrl} target="_blank">
          {item.id} | {item.name} | {item.type}
        </a>
      </div>
    );
  }

  render() {
    const { media, playlist } = this.props;

    return (
      <div>
        <div className='h1'>
          {playlist.name}
        </div>
        { media.map(this.renderMediaItem) }
      </div>
    );
  }
}

Playlist.propTypes = {
  playlist: PropTypes.instanceOf(models.Playlist).isRequired,
  media: ImmutablePropTypes.listOf(
    PropTypes.oneOfType([
      PropTypes.instanceOf(models.Image),
      PropTypes.instanceOf(models.Video)
    ])
  )
}

export default connect(
  (state, props) => ({
    media: mapIdsToRecords(state, props)
  }),
  dispatch => bindActionCreators({
    getMedia
  }, dispatch)
)(Playlist);

function mapIdsToRecords(state, props) {
  const mediaContent = props.playlist.get('content');

  console.log('mapIdsToRecords Playlist', mediaContent, props.playlist);

  if (mediaContent) {
    return mediaContent.map(mediaId => {
      return state.content.getIn(['media', mediaId]);
    }).filter(x => x);
  }

  return List();
}

