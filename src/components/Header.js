import React, { Component }  from 'react';
import { NavLink, Link } from 'react-router-dom';

class Header extends Component {
  closeMenu() {
    try {
      document.getElementsByClassName('navbar-toggler')[0].click();
    } catch (err) {
      console.error('trying to close the navbar on mobile. Ignore.', err);
    }
  }

  render() {
    return (
      <header>
        <nav className='navbar navbar-expand-xs bg-dark navbar-dark fixed-top'>
          <Link to='/' className='navbar-brand text-light'>Playlister</Link>

          <div id='navbarResponsiveContent' className='collapse navbar-collapse'>
            <ul className='navbar-nav justify-content-center'>
              <NavLink
                to='/playlists'
                className='nav-item nav-link'
                onClick={this.closeMenu}>
                Playlists
              </NavLink>
              <NavLink
                to='/videos'
                className='nav-item nav-link'
                onClick={this.closeMenu}>
                Videos
              </NavLink>
            </ul>
          </div>

          <button className='navbar-toggler' data-toggle='collapse' data-target='#navbarResponsiveContent' aria-controls='navbarResponsiveContent' aria-expanded='false' aria-label='Toggle navigation'>
            <span className='navbar-toggler-icon'></span>
          </button>
        </nav>
      </header>
    );
  }
}

export default Header;

