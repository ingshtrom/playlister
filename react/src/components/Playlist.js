import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as models from '../models';
import { getMedia } from '../modules/content-actions';

class Playlist extends Component {
  componentDidMount() {
    const { getMedia, playlist } = this.props;
    const mediaIds = playlist.get('content');

    if (mediaIds && mediaIds.length) {
      console.log('getting media from Playlist component', mediaIds, playlist);
      getMedia(mediaIds);
    }
  }

  render() {
    return (
      <div className='h1'>
        {this.props.playlist.name}
        { /* this.props.media.map(item => <div key={item.name}>{item.name}</div>) */ }
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
  null,
  dispatch => bindActionCreators({
    getMedia
  }, dispatch)
)(Playlist);

