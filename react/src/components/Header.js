import React, { Component }  from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

class Header extends Component {
  static propTypes = {
    auth: PropTypes.object.isRequired,
    isLoading: PropTypes.bool.isRequired,
    loadingProgress: PropTypes.number.isRequired,
  }

  constructor(props) {
    super(props);

    this.renderUser = this.renderUser.bind(this);
    this.renderLoadingBar = this.renderLoadingBar.bind(this);
  }

  renderUser() {
    const { auth } = this.props;
    const isAuthenticated = auth.isAuthenticated();

    if (!isAuthenticated) {
      return (
        <button
          className='btn btn-secondary'
          onClick={() => auth.login()}
        >
          Login
        </button>
      );
    }

    const user = auth.getSession();
    console.log(user);

    return (
      <div>
        <span className='text-white align-middle mr-2'>
          {user.email.split('@')[0]}
        </span>
        <button
          className='btn btn-secondary'
          onClick={() => auth.logout()}
        >
          Logout
        </button>
      </div>
    );
  }

  renderLoadingBar() {
    const { isLoading, loadingProgress } = this.props;

    // if (!isLoading) {
    //   return (null);
    // }

    return (
      <div className="progress">
        <div
          className="progress-bar progress-bar-striped progress-bar-animated"
          role="progressbar"
          aria-valuenow={loadingProgress}
          aria-valuemin="0"
          aria-valuemax="100"
          style={{ width: `${loadingProgress}%` }}
        ></div>
      </div>
    );
  }

  render() {
    return (
      <header>
        <nav className='navbar navbar-expand-sm bg-primary fixed-top'>
          <Link to='/' className='navbar-brand text-light mr-auto'>Playlister</Link>

          {this.renderUser()}
        </nav>

        { this.renderLoadingBar() }
      </header>
    );
  }
}

export default connect(
  state => ({
    isLoading: state.content.get('isLoading'),
    loadingProgress: state.content.get('loadingProgress'),
  }),
)(Header);

