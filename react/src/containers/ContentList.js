import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { List } from 'immutable';

import { normalizeRootUrl } from '../util/url';
import * as models from '../models';

import {
  addContainer,
} from '../modules/content-actions';

import ContentListItem from '../components/ContentListItem';
import AddContainer from '../components/AddContainer';

export class ContentList extends Component {
  render() {
    const {
      content,
      childContent,
      addContainer,
    } = this.props;

    return (
      <div>
        <AddContainer
          parent={content}
          addContainer={addContainer}
        />
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
  }).isRequired,
  addContainer: PropTypes.func.isRequired
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
  }),
  dispatch => bindActionCreators({
    addContainer
  }, dispatch)
)(ContentList);

export function getChildContent(state, props) {
  const { content } = props;

  if (!content || !content.get('content')) {
    return List();
  }

  return content.get('content').map(childName => {
    try {
      const fullPath = `${normalizeRootUrl(props.match.url)}/${childName}`;
      return state.content.getIn(['data', fullPath]);
    } catch (err) {
      console.error('ERROR', err);
      return null;
    }
  }).filter(x => x)
}

