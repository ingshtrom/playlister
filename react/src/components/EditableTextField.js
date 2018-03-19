import React from 'react';
import PropTypes from 'prop-types';
import PencilIcon from 'react-icons/lib/fa/pencil';
import CheckMarkIcon from 'react-icons/lib/fa/check';

export default class EditableTextField extends React.Component {
  static propTypes = {
    value: PropTypes.string.isRequired,
    updateValue: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props);

    this.enableEditMode = this.enableEditMode.bind(this);
    this.updateValue = this.updateValue.bind(this);
    this.submitForm = this.submitForm.bind(this);

    this.state = {
      editing: false,
      tmpValue: props.value,
    };
  }

  enableEditMode(event) {
    event.preventDefault();

    this.setState({
      editing: true
    });
  }

  updateValue(event) {
    this.setState({ tempValue: event.target.value });
  }

  submitForm() {
    this.props.updateValue(this.state.tmpValue);
  }

  render() {
    const { tmpValue } = this.state;

    if (this.state.editing) {
      return (
        <span className='border-primary container'>
          <form className='form-inline'>
            <span className='form-group mr-3'>
              <input
                className='form-control'
                type='text'
                value={this.state.tmpValue}
                onChange={this.updateValue}
              />
            </span>
            <button
              type='submit'
              className='btn btn-primary form-control'
              onClick={this.submitForm}
            >
              <CheckMarkIcon />
            </button>
          </form>
        </span>
      );
    }

    return (
      <span>
        <span className='align-middle ml-3'>
          {tmpValue}
        </span>
        <PencilIcon
          className='text-primary ml-1'
          onClick={this.enableEditMode}
        />
      </span>
    );
  }
}

