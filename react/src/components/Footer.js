import React, { Component }  from 'react';

import poweredByDarkSky from '../media/poweredby-darksky-darkbackground.png';

class Footer extends Component {
  closeMenu() {
    try {
      document.getElementsByClassName('navbar-toggler')[0].click();
    } catch (err) {
      console.error('trying to close the navbar on mobile. Ignore.', err);
    }
  }

  render() {
    return (
      <footer className='footer bg-dark'>
        <div className='text-center'>
          <span className='h3 text-light align-middle'>
            USED TO BE...
          </span>
          <a
            href='https://darksky.net/poweredby/'
            target='_blank'
            rel='noopener noreferrer'
          >
            <img
              alt='Powered By DarkSky'
              src={poweredByDarkSky}
              style={{ width: '50%' }}
            />
          </a>
        </div>
      </footer>
    );
  }
}

export default Footer;

