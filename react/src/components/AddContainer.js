import React from 'react';
import PropTypes from 'prop-types';

import * as models from '../models';

export default class AddContainer extends React.Component {
  static propTypes = {
    parent: PropTypes.instanceOf(models.Folder).isRequired,
    addContainer: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props);

    this.openNewContainerDialog = this.openNewContainerDialog.bind(this);
  }

  openNewContainerDialog() {
    alert('new container?');
  }

  render() {
    return (
      <div id='add-container-wrapper'>
        <button className='btn btn-primary' onClick={this.openNewContainerDialog} >
          New Container
        </button>
      </div>
    );
  }
}

