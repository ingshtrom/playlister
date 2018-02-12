import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

class Loader extends React.Component {
  render() {
    const { isLoading } = this.props;
    const classes = classnames({
      'content-loader': true,
      'loading-modal': true,
      'justify-content-center': true,
      'display-none': !isLoading,
    });

    return (
      <div className={classes}>
        <div className='loader'></div>
      </div>
    );
  }
}

Loader.propTypes= {
  isLoading: PropTypes.bool.isRequired
};

export default Loader;
