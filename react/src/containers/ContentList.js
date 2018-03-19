import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { List } from 'immutable';

import { normalizeRootUrl } from '../util/url';
import * as Sort from '../util/sort';
import * as models from '../models';

import {
  addContainer,
  deleteContainer,
  updateContainer,
} from '../modules/content-actions';

import ContentListItem from '../components/ContentListItem';
import AddContainer from '../components/AddContainer';
import ContentSorter from '../components/ContentSorter';

export class ContentList extends Component {
  constructor(props) {
    super(props);

    this.setSort = this.setSort.bind(this);
    this.setSecondarySort = this.setSecondarySort.bind(this);

    this.state = {
      sort: Sort.Options[0],
      secondarySort: Sort.Options[0],
    };
  }

  setSort(sort) {
    this.setState({ sort });
  }

  setSecondarySort(sort) {
    this.setState({ secondarySort: sort });
  }

  render() {
    const {
      addContainer,
      content,
      childContent,
      deleteContainer,
      updateContainer,
    } = this.props;

    const sortedChildContent = Sort.Sort(this.state.sort, this.state.secondarySort, childContent);

    return (
      <div>
        <AddContainer
          parent={content}
          addContainer={addContainer}
        />
        <hr />
        <ContentSorter
          options={Sort.Options}
          selectedSort={this.state.sort}
          selectedSecondarySort={this.state.secondarySort}
          setSort={this.setSort}
          setSecondarySort={this.setSecondarySort}
        />
        <div className='list-group'>
          { sortedChildContent.map(ContentList.renderContentItem(deleteContainer, updateContainer)) }
        </div>
      </div>
    );
  }
}

ContentList.propTypes = {
  addContainer: PropTypes.func.isRequired,
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
  deleteContainer: PropTypes.func.isRequired,
  match: PropTypes.shape({
    url: PropTypes.string.isRequired
  }).isRequired,
  updateContainer: PropTypes.func.isRequired,
};

ContentList.renderContentItem = (deleteContainer, updateContainer) => {
  return ci => {
    return (
      <ContentListItem
        key={`${ci.name}_${ci.type}`}
        item={ci}
        deleteContainer={deleteContainer}
        updateContainer={updateContainer}
      />
    );
  };
};

export default connect(
  (state, props) => ({
    childContent: getChildContent(state, props)
  }),
  dispatch => bindActionCreators({
    addContainer,
    deleteContainer,
    updateContainer,
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

