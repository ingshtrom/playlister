import React from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';

import * as models from '../models';

export default class MediaListItem extends React.Component {
  static propTypes = {
   media: ImmutablePropTypes.listOf(
      PropTypes.oneOfType([
        PropTypes.instanceOf(models.Image),
        PropTypes.instanceOf(models.Video)
      ])
    ),
    moveDown: PropTypes.func.isRequired,
    moveUp: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props);

    this.renderMediaItem    = this.renderMediaItem.bind(this);
    this.renderMediaPreview = this.renderMediaPreview.bind(this);
  }

  renderMediaPreview(type, url, alt) {
    if (type === 'VIDEO') {
      return (
        <div>
          <video />
        </div>
      );
    }

    return (
      <div>
        <img
          className='rounded'
          style={{ maxWidth: '100%', maxHeight: '25%' }}
          src={url}
          alt={alt} />
      </div>
    );
  }

  renderMediaItem(item, index) {
    const { moveDown, moveUp } = this.props;

    return (
      <div key={item.id} className='list-group-item'>
        <div className='d-flex w-100 justify-content-between'>
          <h4 className='mb-3'>
            {item.name}
            <a href={item.url} alt={item.name} target='_blank'>icon</a>
          </h4>
          <small className='text-secondary'> {item.type} </small>
        </div>
        { this.renderMediaPreview(item.type, item.url, item.name) }
      </div>
    );
  }

  render() {
    const { media } = this.props;

    return (
      <div className='list-group'>
        { media.map(this.renderMediaItem) }
      </div>
    );
  }
}
