import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as models from '../models';
import {
  addMedia,
  moveMediaDown,
  moveMediaUp,
  toggleMediaPreview,
} from '../modules/content-actions';
import AddMedia from '../components/AddMedia';
import MediaList from '../components/MediaList';

export class Playlist extends Component {
  static propTypes = {
    content: PropTypes.instanceOf(models.Playlist).isRequired,
    childContent: ImmutablePropTypes.listOf(
      PropTypes.oneOfType([
        PropTypes.instanceOf(models.Image),
        PropTypes.instanceOf(models.Video)
      ])
    ),
    addMedia: PropTypes.func.isRequired,
    moveMediaUp: PropTypes.func.isRequired,
    moveMediaDown: PropTypes.func.isRequired,
    toggleMediaPreview: PropTypes.func.isRequired,
  }

  render() {
    const {
      addMedia,
      childContent,
      content,
      moveMediaDown,
      moveMediaUp,
      toggleMediaPreview,
    } = this.props;

    return (
      <div>
        <AddMedia
          parent={content}
          addMedia={addMedia}
          nextIndex={childContent.size || 0}
        />
        <hr />
        <div className='h1'>
          {content.name}
        </div>
        <MediaList
          media={childContent}
          moveDown={moveMediaDown}
          moveUp={moveMediaUp}
          togglePreview={toggleMediaPreview}
        />
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Playlist);

export function mapStateToProps(state, props) {
  const content = props.content;
  const childContent = content
    .get('mediaContent')
    .map(id => state.content.getIn(['media', id]))
    .filter(x => x)
    .sort((a, b) => {
      const aIndex = a.playlistIndex;
      const bIndex = b.playlistIndex;

      if (aIndex < bIndex) return -1;
      if (aIndex > bIndex) return 1;
      return 0;
    });

  return { content, childContent };
}

export function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    addMedia,
    moveMediaDown,
    moveMediaUp,
    toggleMediaPreview,
  }, dispatch);
}
