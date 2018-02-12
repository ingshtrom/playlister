import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as models from '../models';
import { getMedia } from '../modules/content-actions';

export class Playlist extends Component {
  componentDidMount() {
    const { content, getMedia } = this.props;
    const ids = content.get('content');

    if (ids && ids.size) {
      getMedia(content.get('content'));
    }
  }

  render() {
    const { childContent, content } = this.props;

    return (
      <div>
        <div className='h1'>
          {content.name}
        </div>
        { childContent.map(Playlist.renderMediaItem) }
      </div>
    );
  }
}

Playlist.propTypes = {
  content: PropTypes.instanceOf(models.Playlist).isRequired,
  childContent: ImmutablePropTypes.listOf(
    PropTypes.oneOfType([
      PropTypes.instanceOf(models.Image),
      PropTypes.instanceOf(models.Video)
    ])
  )
}

Playlist.renderMediaItem = item => {
  return (
    <div key={item.id}>
      <a href={item.blobUrl} target="_blank">
        {item.id} | {item.name} | {item.type}
      </a>
    </div>
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Playlist);


export function mapStateToProps(state, props) {
  const content = props.content;
  const childContent = content
    .get('content')
    .map(id => state.content.getIn(['media', id]))
    .filter(x => x);

  return { content, childContent };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    getMedia
  }, dispatch);
}

