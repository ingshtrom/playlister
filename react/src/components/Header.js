import React, { Component }  from 'react';
import { Link } from 'react-router-dom';

class Header extends Component {
  render() {
    return (
      <header>
        <nav className='navbar navbar-expand-sm bg-primary fixed-top'>
          <Link to='/' className='navbar-brand text-light'>Playlister</Link>
          <Link to='/old-404' className='nav-item text-light'>Funny</Link>
        </nav>
      </header>
    );
  }
}

export default Header;

