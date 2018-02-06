import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import FolderModel from '../models/Folder';
import PlaylistModel from '../models/Playlist';

import { getContent } from '../modules/content-actions';

import ContentList from '../components/ContentList';
import NotFound from '../components/NotFound';
import Playlist from '../components/Playlist';

class Content extends Component {
  static propTypes = {
    content: PropTypes.oneOfType([
      PropTypes.instanceOf(FolderModel),
      PropTypes.instanceOf(PlaylistModel)
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
    if (errorMessage) {
      return (
        <div>
          <NotFound />
          <br />
        </div>
      );
    }

    return (null);
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

  renderMainContent(content, match) {
    if (content) {
      if (content.get('type') === 'PLAYLIST') {
        return (
          <Playlist playlist={content} />
        );
      }

      if (content.get('content')) {
        console.log('getting main component', content.get('content'));

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
        { match.url }
        <hr />
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

// function mapStateAndPropsToContent(state, props) {
//   const mainContent = state.content.getIn(['data', props.match.url]);

//   if (mainContent) {
//     const x = mainContent
//       .updateIn(['content'],
//         childNames => childNames.map(
//           childName => {
//             console.log('map child content', childName);
//             const fullUrl = `${normalizeRootUrl(props.match.url)}/${childName}`;
//             return state.content.getIn(['data', fullUrl]);
//           }
//         )
//       );

//     console.log('mapStateAndPropsToContent result', x.toJS());
//     return x;
//   }

//   return mainContent;
// }

