import React from 'react';
import PropTypes from 'prop-types';

export default class Breadcrumbs extends React.Component {
  static propTypes = {
    match: PropTypes.shape({
      url: PropTypes.string.isRequired
    }).isRequired
  }

  render() {
    const { match } = this.props;

    return (
      <div id='breadcrumb-wrapper'>
        <span>
          {match.url}
        </span>
        <hr />
      </div>
    );
  }
}

