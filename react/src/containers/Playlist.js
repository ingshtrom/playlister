import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as models from '../models';
import { addMedia } from '../modules/content-actions';
import AddMedia from '../components/AddMedia';

export class Playlist extends Component {
  static propTypes = {
    content: PropTypes.instanceOf(models.Playlist).isRequired,
    childContent: ImmutablePropTypes.listOf(
      PropTypes.oneOfType([
        PropTypes.instanceOf(models.Image),
        PropTypes.instanceOf(models.Video)
      ])
    )
  }

  static renderMediaItem = item => {
    return (
      <div key={item.id}>
        <a href={item.url} target="_blank">
          {item.id} | {item.name} | {item.type}
        </a>
      </div>
    );
  }

  render() {
    const {
      addMedia,
      childContent,
      content
    } = this.props;

    return (
      <div>
        <AddMedia
          parent={content}
          addMedia={addMedia}
        />
        <hr />
        <div className='h1'>
          {content.name}
        </div>
        { childContent.map(Playlist.renderMediaItem) }
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
    addMedia
  }, dispatch);
}
