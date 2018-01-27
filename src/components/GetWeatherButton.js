import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import moment from 'moment';

import * as actions from '../modules/weather-actions';

class GetWeatherButton extends Component {
  static propTypes = {
    locationInput: PropTypes.string.isRequired,
    dateInput: PropTypes.instanceOf(moment).isRequired
  }

  constructor(props) {
    super(props);

    this.getWeather = this.getWeather.bind(this);
  }

  getWeather() {
    this.props.fetchWeather(this.props.locationInput, this.props.dateInput);
  }

  render() {
    return (
      <button type='button' onClick={this.getWeather}>
        Get Weather
      </button>
    );
  }
}

export default connect(
  state => ({
    locationInput: state.weather.locationInput,
    dateInput: moment(state.weather.dateInput)
  }),
  dispatch => bindActionCreators({
    fetchWeather: actions.fetchWeather
  }, dispatch)
)(GetWeatherButton);

