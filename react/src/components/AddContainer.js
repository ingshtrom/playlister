import React from 'react';
import PropTypes from 'prop-types';

import * as models from '../models';
import { normalizeRootUrl } from '../util/url';

export default class AddContainer extends React.Component {
  static propTypes = {
    parent: PropTypes.instanceOf(models.Folder).isRequired,
    addContainer: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props);

    this.updateName = this.updateName.bind(this);
    this.updateType = this.updateType.bind(this);
    this.submitForm = this.submitForm.bind(this);

    this.state = {
      name: '',
      type: 'FOLDER'
    };
  }


  updateName(event) {
    this.setState({
      name: event.target.value
    });
  }

  updateType(event) {
    this.setState({
      type: event.target.value
    });
  }

  submitForm(event) {
    const {
      parent: {
        id, fullPath
      },
      addContainer
    } = this.props;
    const { name, type } = this.state;
    const prefix = normalizeRootUrl(fullPath);

    addContainer(id, name, `${prefix}/${name}`, type);
    event.preventDefault();
  }

  render() {
    const { name, type } = this.state;

    return (
      <div id='add-container-wrapper' className='border-primary container'>
        <form className='form-inline'>
          <div className='form-group mr-3'>
            <input
              id='new-container-name'
              className='form-control'
              type='text'
              value={name}
              onChange={this.updateName}
            />
          </div>
          <div className='form-group mr-3'>
            <select
              id='new-container-type'
              className='form-control'
              value={type}
              onChange={this.updateType}
            >
              <option value='FOLDER'>Folder</option>
              <option value='PLAYLIST'>Playlist</option>
            </select>
          </div>
          <button
            id='new-container-submit'
            type='submit'
            className='btn btn-primary form-control'
            onClick={this.submitForm}
          >
            Create New Container
          </button>
        </form>
      </div>
    );
  }
}

