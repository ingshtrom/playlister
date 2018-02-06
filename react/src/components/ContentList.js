import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';

import FolderModel from '../models/Folder';
import PlaylistModel from '../models/Playlist';

import ContentListItem from '../components/ContentListItem';
import NotFound from './NotFound';

class ContentList extends Component {
  static propTypes = {
    content: ImmutablePropTypes.listOf(
      PropTypes.oneOfType([
        PropTypes.instanceOf(FolderModel),
        PropTypes.instanceOf(PlaylistModel)
      ])
    ).isRequired,
    match: PropTypes.shape({
      url: PropTypes.string.isRequired
    }).isRequired
  }

  constructor(props) {
    super(props);

    this.renderContentItem = this.renderContentItem.bind(this);
    this.renderLoader = this.renderLoader.bind(this);
    this.renderErrorMessage = this.renderErrorMessage.bind(this);
  }

  renderContentItem(ci) {
    return (
      <ContentListItem
        key={`${ci.name}_${ci.type}`}
        item={ci}
      />
    );
  }

  renderErrorMessage() {
    return (
      <NotFound />
    );
  }

  renderLoader() {
    const { isLoading } = this.props;
    if (isLoading) {
      return (
        <div className='loading-modal justify-content-center'>
          <div className='loader'></div>
        </div>
      );
    }


    return null;
  }

  render() {
    const { content } = this.props;

    console.log('ContentList', content);

    return (
      <div>
        { content.map(this.renderContentItem) }
      </div>
    );
  }
}

export default ContentList;

