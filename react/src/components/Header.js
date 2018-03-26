import React, { Component }  from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

class Header extends Component {
  static propTypes = {
    auth: PropTypes.object.isRequired
  }

  constructor(props) {
    super(props);

    this.renderUser = this.renderUser.bind(this);
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

  render() {
    return (
      <header>
        <nav className='navbar navbar-expand-sm bg-primary fixed-top'>
          <Link to='/' className='navbar-brand text-light mr-auto'>Playlister</Link>

          {this.renderUser()}
        </nav>
      </header>
    );
  }
}

export default Header;

