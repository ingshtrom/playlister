import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import PlaylistModel from '../models/Playlist';

class PlaylistListItem extends Component {
  render() {
    const { item } = this.props;

    return (
      <div>
        <Link to={item.fullPath}>
          Playlist: {item.name}
        </Link>
      </div>
    );
  }
}

PlaylistListItem.propTypes = {
  item: PropTypes.instanceOf(PlaylistModel).isRequired
};

export default PlaylistListItem;

