import React, { Component } from 'react';
import PropTypes from 'prop-types';

import FolderModel from '../models/Folder';
import PlaylistModel from '../models/Playlist';

import FolderListItem from './FolderListItem';
import PlaylistListItem from './PlaylistListItem';

class ContentListItem extends Component {
  render() {
    const { item } = this.props;

    let ListItem = FolderListItem;

    if (item.type === 'PLAYLIST') {
      ListItem = PlaylistListItem;
    }

    return (
      <div>
        <ListItem item={item} />
      </div>
    );
  }
}

ContentListItem.propTypes = {
  item: PropTypes.oneOfType([
    PropTypes.instanceOf(FolderModel),
    PropTypes.instanceOf(PlaylistModel)
  ]).isRequired
};

export default ContentListItem;

