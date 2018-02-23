import React from 'react';
import PropTypes from 'prop-types';

import * as models from '../models';

export default class AddMedia extends React.Component {
  static propTypes = {
    parent: PropTypes.instanceOf(models.Playlist).isRequired,
    nextIndex: PropTypes.number.isRequired,
    addMedia: PropTypes.func.isRequired
  }

  constructor(props) {
    super(props);

    this.updateName = this.updateName.bind(this);
    this.updateType = this.updateType.bind(this);
    this.submitForm = this.submitForm.bind(this);

    this.state = {
      name: '',
      type: 'IMAGE'
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
      addMedia,
      parent: {
        id
      },
      nextIndex
    } = this.props;
    const { name, type } = this.state;

    addMedia(id, name, nextIndex, type);
    event.preventDefault();
  }

  render() {
    const { name, type } = this.state;

    return (
      <div id='add-media-wrapper' className='border-primary container'>
        <form className='form-inline'>
          <div className='form-group mr-3'>
            <input
              id='new-media-name'
              className='form-control'
              type='text'
              value={name}
              onChange={this.updateName}
            />
          </div>
          <div className='form-group mr-3'>
            <select
              id='new-media-type'
              className='form-control'
              value={type}
              onChange={this.updateType}
            >
              <option value='IMAGE'>Image</option>
              <option value='VIDEO'>Video</option>
            </select>
          </div>
          <button
            id='new-media-submit'
            type='submit'
            className='btn btn-primary form-control'
            onClick={this.submitForm}
          >
            Add Media
          </button>
        </form>
      </div>
    );
  }
}
