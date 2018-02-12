import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { connect } from 'react-redux';
import { List } from 'immutable';

import { normalizeRootUrl } from '../util/url';
import * as models from '../models';

import ContentListItem from '../components/ContentListItem';

export class ContentList extends Component {
  render() {
    const { childContent } = this.props;

    return (
      <div>
        { childContent.map(ContentList.renderContentItem) }
      </div>
    );
  }
}

ContentList.propTypes = {
  content: PropTypes.oneOfType([
    PropTypes.instanceOf(models.Folder),
    PropTypes.instanceOf(models.Playlist)
  ]),
  childContent: ImmutablePropTypes.listOf( // these are the mapped Records from `content`
    PropTypes.oneOfType([
      PropTypes.instanceOf(models.Folder),
      PropTypes.instanceOf(models.Playlist)
    ])
  ),
  match: PropTypes.shape({
    url: PropTypes.string.isRequired
  }).isRequired
};

ContentList.renderContentItem = ci => {
  return (
    <ContentListItem
      key={`${ci.name}_${ci.type}`}
      item={ci}
    />
  );
};

export default connect(
  (state, props) => ({
    childContent: getChildContent(state, props)
  })
)(ContentList);

export function getChildContent(state, props) {
  const { content } = props;

  if (!content || !content.get('content')) {
    return List();
  }

  return content.get('content').map(childName => {
    try {
      const fullUrl = `${normalizeRootUrl(props.match.url)}/${childName}`;
      return state.content.getIn(['data', fullUrl]);
    } catch (err) {
      console.error('ERROR', err);
      return null;
    }
  }).filter(x => x)
}

