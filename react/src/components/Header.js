import React, { Component }  from 'react';
import { Link } from 'react-router-dom';

import SearchForm from './SearchForm';

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
        <nav className='navbar navbar-expand-sm bg-dark navbar-dark fixed-top'>
          <Link to='/' className='navbar-brand text-light'>Weather Zylo</Link>

          <SearchForm />
        </nav>
      </header>
    );
  }
}

export default Header;

