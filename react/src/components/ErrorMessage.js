import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

class ErrorMessage extends React.Component {
  render() {
    const { message } = this.props;
    const classes = classnames({
      'display-none': !message
    });

    return (
      <div id='notfound-wrapper' className={classes}>
        <div className='alert alert-danger'>
          {message}
        </div>
        <hr />
      </div>
    );
  }
}

ErrorMessage.propTypes= {
  message: PropTypes.string.isRequired
};

export default ErrorMessage;

