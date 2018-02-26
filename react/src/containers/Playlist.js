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
} from '../modules/content-actions';
import AddMedia from '../components/AddMedia';
import MediaListItem from '../components/MediaListItem';

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
    moveMediaDown: PropTypes.func.isRequired
  }

  render() {
    const {
      addMedia,
      childContent,
      content,
      moveMediaDown,
      moveMediaUp,
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
        <MediaListItem
          media={childContent}
          moveDown={moveMediaDown}
          moveUp={moveMediaUp}
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
    .filter(x => x);

  return { content, childContent };
}

export function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    addMedia,
    moveMediaDown,
    moveMediaUp,
  }, dispatch);
}
