import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import NotFound from '../components/NotFound';

class ErrorMessage extends React.Component {
  render() {
    const { message } = this.props;
    const classes = classnames({
      'display-none': !message
    });

    return (
      <div id='notfound-wrapper' className={classes}>
        <NotFound />
        <br />
      </div>
    );
  }
}

ErrorMessage.propTypes= {
  message: PropTypes.string.isRequired
};

export default ErrorMessage;

