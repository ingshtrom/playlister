import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as models from '../models';
import { NOOP } from '../util/react';

import { getContent } from '../modules/content-actions';

import Breadcrumbs from '../components/Breadcrumbs';
import ErrorMessage from '../components/ErrorMessage';
import Pass from '../components/Pass';

import ContentList from '../containers/ContentList';
import Playlist from '../containers/Playlist';

export class Content extends React.Component {
  componentDidMount() {
    const {
      getContent,
      match: {
        url
      }
    } = this.props;

    getContent(url);
  }

  componentDidUpdate(prevProps) {
    const oldUrl = prevProps.match.url;
    const newUrl = this.props.match.url;
    const { getContent } = this.props;

    if (oldUrl !== newUrl) {
      getContent(newUrl);
    }
  }

  render() {
    const {
      auth,
      content,
      errorMessage,
      match,
    } = this.props;

    if (!auth.isAuthenticated()) {
      return (
        <div
          className='alert alert-warning text-center'
        >
          You are not logged in! Please{' '}
          <a // eslint-disable-line
            href='#'
            className='alert-link'
            onClick={auth.login.bind(auth)}
          >
            Log In
          </a>
          {' '}to continue.
        </div>
      );
    }

    const MainComponent = Content.getComponentToLoad(content);

    return (
      <div>
        <Breadcrumbs match={match} />
        <ErrorMessage message={errorMessage} />

        <Pass id='content-main-component-pass'>
          <MainComponent match={match} content={content} />
        </Pass>
      </div>
    );
  }
}

Content.propTypes = {
  content: PropTypes.oneOfType([
    PropTypes.instanceOf(models.Folder),
    PropTypes.instanceOf(models.Playlist)
  ]),
  errorMessage: PropTypes.string,
  getContent: PropTypes.func.isRequired,
  match: PropTypes.shape({
    url: PropTypes.string.isRequired
  }).isRequired
}

Content.getComponentToLoad = content => {
  if (!content) return NOOP;

  const type = content.get('type');
  if (!type) return NOOP;

  if (type === 'PLAYLIST') {
    return Playlist;
  }

  return ContentList;
};


export default connect(
  (state, props) => ({
    content: state.content.getIn(['data', props.match.url]),
    errorMessage: state.content.get('errorMessage'),
  }),
  dispatch => bindActionCreators({
    getContent
  }, dispatch)
)(Content);

