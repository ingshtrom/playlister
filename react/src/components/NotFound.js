import React, { Component } from 'react';

import gif from '../media/cat.gif';

class NotFound extends Component {
  render() {
    return (
      <div className='jumbotron justify-content-middle text-center'>
        <p className='lead h3'>We're trying to find what you are looking for... but it is proving difficult...</p>
        <img src={gif} alt='Fat Cat' className='img-fluid' style={{ width: '80%' }} />
      </div>
    );
  }
}

export default NotFound;
