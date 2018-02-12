import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as models from '../models';
import { NOOP } from '../util/react';

import { getContent } from '../modules/content-actions';

import Breadcrumbs from '../components/Breadcrumbs';
import ErrorMessage from '../components/ErrorMessage';
import Loader from '../components/Loader';
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

  render() {
    const {
      content,
      errorMessage,
      isLoading,
      match,
    } = this.props;

    const MainComponent = Content.getComponentToLoad(content);

    return (
      <div>
        <Breadcrumbs match={match} />
        <ErrorMessage message={errorMessage} />
        <Loader isLoading={isLoading} />

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
  isLoading: PropTypes.bool.isRequired,
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
    isLoading: state.content.get('isLoading')
  }),
  dispatch => bindActionCreators({
    getContent
  }, dispatch)
)(Content);

