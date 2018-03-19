import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import PlaylistIcon from 'react-icons/lib/fa/list-alt'
import FolderIcon from 'react-icons/lib/fa/folder-o'
import TrashIcon from 'react-icons/lib/fa/trash-o';
import PencilIcon from 'react-icons/lib/fa/pencil';

import FolderModel from '../models/Folder';
import PlaylistModel from '../models/Playlist';

class ContentListItem extends Component {
  static propTypes = {
    deleteContainer: PropTypes.func.isRequired,
    item: PropTypes.oneOfType([
      PropTypes.instanceOf(FolderModel),
      PropTypes.instanceOf(PlaylistModel)
    ]).isRequired,
    updateContainer: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props);

    this.deleteContainer = this.deleteContainer.bind(this);
    this.renameContainer = this.renameContainer.bind(this);
  }

  deleteContainer(event) {
    const { item } = this.props;
    event.preventDefault();

    const confirmation = confirm(`Delete ${item.type} '${item.name}'`); // eslint-disable-line

    if (confirmation) this.props.deleteContainer(item.id);
  }

  renameContainer(event) {
    event.preventDefault();

    const { item, updateContainer } = this.props;

    const newName = prompt('Please enter new name:', item.name);
    if (newName) updateContainer(item.id, { name: newName });
  }

  render() {
    const { item } = this.props;

    const containerTypeIcon = item.type === 'PLAYLIST' ? <PlaylistIcon className='text-primary' /> : <FolderIcon className='text-primary' />;

    return (
      <div key={item.id} className='list-group-item'>
        <Link to={item.fullPath}>
          <div className='d-flex w-100 align-items-center justify-content-between'>
            <div className='h2'>
              { containerTypeIcon }
              <span className='align-middle ml-3'>
                {item.name}
              </span>
              <PencilIcon
                className='text-primary ml-1'
                onClick={this.renameContainer}
              />
            </div>
            <div className='btn-toolbar'>
              <div className='btn-group btn-group-sm ml-1'>
                <button className='btn btn-danger' onClick={this.deleteContainer}>
                  <TrashIcon />
                </button>
              </div>
            </div>
          </div>
        </Link>
      </div>
    );
  }
}

export default ContentListItem;

