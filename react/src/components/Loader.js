import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

class Loader extends React.Component {
  render() {
    const { isLoading, loadingProgress } = this.props;
    const classes = classnames({
      'fixed-bottom': true,
      'loading-modal': true,
      // 'display-none': !isLoading,
    });

    return (
      <div className={classes}>
        <div className="progress">
          <div
            className="progress-bar progress-bar-striped progress-bar-animated"
            role="progressbar"
            aria-valuenow={loadingProgress}
            aria-valuemin="0"
            aria-valuemax="100"
          ></div>
        </div>
      </div>
    );
  }
}

Loader.propTypes= {
  isLoading: PropTypes.bool.isRequired,
  loadingProgress: PropTypes.number.isRequired,
};

export default Loader;
