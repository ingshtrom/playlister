import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import FolderModel from '../models/Folder';

class FolderListItem extends Component {
  render() {
    const { item } = this.props;

    return (
      <div>
        <Link to={item.fullUrl}>
          Folder: {item.name}
        </Link>
      </div>
    );
  }
}

FolderListItem.propTypes = {
  item: PropTypes.instanceOf(FolderModel).isRequired
};

export default FolderListItem;

