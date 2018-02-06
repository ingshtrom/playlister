import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { connect } from 'react-redux';

import { normalizeRootUrl } from '../util/url';
import * as models from '../models';

import ContentListItem from '../components/ContentListItem';
import NotFound from './NotFound';

class ContentList extends Component {
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
    const { resultContent } = this.props;

    console.log('ContentList', resultContent);

    return (
      <div>
        { resultContent.map(this.renderContentItem) }
      </div>
    );
  }
}

ContentList.propTypes = {
  content: ImmutablePropTypes.listOf(PropTypes.string).isRequired, // these is the array of IDs passed in 
  resultContent: ImmutablePropTypes.listOf( // these are the mapped Records from `content`
    PropTypes.oneOfType([
      PropTypes.instanceOf(models.Folder),
      PropTypes.instanceOf(models.Playlist)
    ])
  ),
  match: PropTypes.shape({
    url: PropTypes.string.isRequired
  }).isRequired
};

export default connect(
  (state, props) => ({
    resultContent: mapIdsToRecords(state, props)
  })
)(ContentList);

function mapIdsToRecords(state, props) {
  const result = props.content.map(childName => {
    const fullUrl = `${normalizeRootUrl(props.match.url)}/${childName}`;
    return state.content.getIn(['data', fullUrl]);
  });

  console.log('mapIdsToRecords', result);
  return result;
}

