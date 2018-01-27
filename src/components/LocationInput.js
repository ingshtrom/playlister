import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as actions from '../modules/weather-actions';


class LocationInput extends Component {
  static propTypes = {
    locationInput: PropTypes.string.isRequired,
    updateLocationInput: PropTypes.func.isRequired
  }

  constructor(props) {
    super(props);

    this.updateValue = this.updateValue.bind(this);
  }

  updateValue(event) {
    this.props.updateLocationInput(event.target.value);
  }

  render() {
    const { locationInput } = this.props;

    return (
      <input type='text' value={locationInput} onChange={this.updateValue} />
    );
  }
}

export default connect(
  state => ({
    locationInput: state.weather.locationInput
  }),
  dispatch => bindActionCreators({
    updateLocationInput: actions.updateLocationInput
  }, dispatch)
)(LocationInput);

