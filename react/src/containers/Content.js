import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import classnames from 'classnames';

import * as models from '../models';

import { getContent } from '../modules/content-actions';

import Breadcrumbs from '../components/Breadcrumbs';
import ContentList from '../components/ContentList';
import NotFound from '../components/NotFound';
import Playlist from '../components/Playlist';

export class Content extends Component {
  static propTypes = {
    content: PropTypes.oneOfType([
      PropTypes.instanceOf(models.Folder),
      PropTypes.instanceOf(models.Playlist)
    ]),
    errorMessage: PropTypes.string,
    getContent: PropTypes.func.isRequired,
    isLoading: PropTypes.bool.isRequired,
    match: PropTypes.shape({
      url: PropTypes.string.isRequired
    }).isRequired
  }

  constructor(props) {
    super(props);

    this.renderLoader = this.renderLoader.bind(this);
    this.renderErrorMessage = this.renderErrorMessage.bind(this);
    this.renderMainContent = this.renderMainContent.bind(this);
  }

  componentDidMount() {
    const { url } = this.props.match;
    this.props.getContent(url);
  }

  renderErrorMessage() {
    const { errorMessage } = this.props;

    const classes = classnames({
      'display-none': !errorMessage
    });

    return (
      <div id='notfound-wrapper' className={classes}>
        <NotFound />
        <br />
      </div>
    );
  }

  renderLoader() {
    const { isLoading } = this.props;

    const classes = classnames({
      'loading-modal': true,
      'justify-content-center': true,
      'display-none': !isLoading
    });

    return (
      <div id='content-loader' className={classes}>
        <div className='loader'></div>
      </div>
    );
  }

  renderMainContent(content, match) {
    if (content) {
      if (content.get('type') === 'PLAYLIST') {
        return (
          <Playlist playlist={content} />
        );
      }

      if (content.get('content')) {
        return (
          <ContentList match={match} content={content.get('content')} />
        );
      }
    }

    return (null);
  }

  render() {
    const { content, match } = this.props;

    return (
      <div>
        <Breadcrumbs match={match} />
        { this.renderErrorMessage() }
        { this.renderMainContent(content, match) }

        { this.renderLoader() }
      </div>
    );
  }
}

export default connect(
  (state, props) => ({
    content: state.content.getIn(['data', props.match.url]),
    errorMessage: state.content.get('errorMessage'),
    isLoading: state.content.get('isLoading')
  }),
  dispatch => bindActionCreators({
    getContent
  }, dispatch)
)(Content);

