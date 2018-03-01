import React from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import ArrowUpIcon from 'react-icons/lib/fa/arrow-up';
import ArrowDownIcon from 'react-icons/lib/fa/arrow-down';
import ImageFileIcon from 'react-icons/lib/fa/file-image-o';
import VideoFileIcon from 'react-icons/lib/fa/file-movie-o';
import DownloadIcon from 'react-icons/lib/fa/cloud-download';

import * as models from '../models';

export default class MediaList extends React.Component {
  static propTypes = {
   media: ImmutablePropTypes.listOf(
      PropTypes.oneOfType([
        PropTypes.instanceOf(models.Image),
        PropTypes.instanceOf(models.Video)
      ])
    ),
    moveDown: PropTypes.func.isRequired,
    moveUp: PropTypes.func.isRequired,
    togglePreview: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props);

    this.renderMediaItem      = this.renderMediaItem.bind(this);
    this.renderMediaPreview   = this.renderMediaPreview.bind(this);
    this.renderMediaItemConditionalToolbar = this.renderMediaItemConditionalToolbar.bind(this);
    this.getPreviewButtonText = this.getPreviewButtonText.bind(this);
  }

  renderMediaPreview(preview, type, url, alt) {
    if (!preview) return (null);

    if (type === 'VIDEO') {
      return (
        <div>
          <hr />
          No previews for videos, yet. Sorry!
          { /*
          <video width={100} height={100} src={url} controls>
            <source src={url} type={type} />
          </video>
          */ }
        </div>
      );
    }

    return (
      <div>
        <hr />
        <img
          className='rounded'
          style={{ maxWidth: '100%', maxHeight: '25%' }}
          src={url}
          alt={alt}
        />
      </div>
    );
  }

  getPreviewButtonText(preview) {
    if (preview) {
      return 'Close Preview';
    }

    return 'Preview';
  }

  renderMediaItemConditionalToolbar(item) {
    const { togglePreview } = this.props;

    if (!item.url) {
      return (
        <div className='btn-group btn-group-sm'>
          <button
            className='btn btn-outline-secondary'
            disabled
          >
            Processing...
          </button>
        </div>
      );
    }

    return (
      <div className='btn-group btn-group-sm'>
        <button
          className='btn btn-outline-primary'
          onClick={togglePreview.bind(null, item.id)}
        >
          { this.getPreviewButtonText(item.isBeingPreviewed) }
        </button>
        <a
          className='btn btn-outline-primary'
          href={item.url}
          alt={item.name}
          download={item.name}
          target='_blank'
        >
          <DownloadIcon />
        </a>
      </div>
    );
  }

  renderMediaItem(item) {
    const { moveDown, moveUp } = this.props;

    const mediaTypeIcon = item.type === 'VIDEO' ? <VideoFileIcon className='text-primary' /> : <ImageFileIcon className='text-success' />;

    return (
      <div key={item.id} className='list-group-item'>
        <div className='d-flex w-100 align-items-center justify-content-between'>
          <div className='h2'>
            { mediaTypeIcon }
            <span className='align-middle ml-3'>
              {item.name}
            </span>
          </div>
          <div className='btn-toolbar'>
            { this.renderMediaItemConditionalToolbar(item) }

            <div className='btn-group btn-group-sm ml-1'>
              <button className='btn btn-outline-secondary' onClick={moveUp.bind(null, item.containerId, item.id)}>
                <ArrowUpIcon />
              </button>
              <button className='btn btn-outline-secondary' onClick={moveDown.bind(null, item.containerId, item.id)}>
                <ArrowDownIcon />
              </button>
            </div>
          </div>
        </div>
        { this.renderMediaPreview(item.isBeingPreviewed, item.type, item.url, item.name) }
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
