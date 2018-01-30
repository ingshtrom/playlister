import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as contentActions from '../modules/content-actions';

class ContentList extends Component {
  static propTypes = {
    content: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string.isRequired,
        type: PropTypes.oneOf(['folder', 'playlist', 'media']),
        content: PropTypes.array.isRequired
      }).isRequired
    ).isRequired,
    getContent: PropTypes.func.isRequired,
    isLoading: PropTypes.bool.isRequired,
    match: PropTypes.shape({
      url: PropTypes.string.isRequired
    }).isRequired
  }

  constructor(props) {
    super(props);

    this.renderContentItem = this.renderContentItem.bind(this);
    this.renderLoader = this.renderLoader.bind(this);
  }

  componentWillMount() {
    const { url } = this.props.match;
    console.time('getContent');
    this.props.getContent(url);
  }


  componentWillUpdate(props) {
    const oldUrl = this.props.match.url;
    const newUrl = props.match.url;

    if (oldUrl !== newUrl) {
      this.props.getContent(newUrl);
    }
  }

  renderContentItem(ci) {
    const { match } = this.props;

    const url = match.url === '/' ? '' : match.url;

    return (
      <div key={`${ci.name}_${ci.type}`}>
        <Link to={`${url}/${ci.name}`}>{ci.name}</Link>
      </div>
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
    const { content, match } = this.props;

    return (
      <div>
        { match.url }
        <hr />
        { content.map(this.renderContentItem) }
        { this.renderLoader() }
      </div>
    );
  }
}

export default connect(
  state => ({
    content: state.content.data.content || [],
    isLoading: state.content.isLoading
  }),
  dispatch => bindActionCreators({
    getContent: contentActions.getContent
  }, dispatch)
)(ContentList);

