import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import DatePicker from 'react-datepicker';
import moment from 'moment';

import * as actions from '../modules/weather-actions';

import 'react-datepicker/dist/react-datepicker.css';


class SearchForm extends Component {
  static propTypes = {
    date: PropTypes.number.isRequired,
    fetchWeather: PropTypes.func.isRequired,
    location: PropTypes.string.isRequired,
    updateLocationInput: PropTypes.func.isRequired,
    updateDateInput: PropTypes.func.isRequired
  }

  constructor(props) {
    super(props);

    this.fetchWeather = this.fetchWeather.bind(this);
    this.updateDate = this.updateDate.bind(this);
    this.updateLocation = this.updateLocation.bind(this);
  }

  updateDate(date) {
    // assume a moment object
    this.props.updateDateInput(date.valueOf());
  }

  updateLocation(event) {
    this.props.updateLocationInput(event.target.value);
  }

  fetchWeather() {
    this.props.fetchWeather(this.props.location, this.props.date);
  }

  render() {
    const { location, date } = this.props;

    return (
      <form className='form-inline' action='#'>
        <input
          className='form-control mr-2 mb-2 mb-md-0'
          type='text'
          placeholder='Noblesville, IN'
          value={location}
          onChange={this.updateLocation}
        />
        <span
          id='date-picker-wrapper'
          className='mr-2 mb-2 mb-md-0'
          style={{ display: 'inline-block' }}
        >
          <DatePicker
            className='form-control'
            selected={moment(date)}
            onChange={this.updateDate}
          />
        </span>

        <button
          className='btn btn-outline-success mb-2 mb-md-0'
          type='button'
          onClick={this.fetchWeather}
        >
          Get Weather
        </button>
      </form>
    );
  }
}

export default connect(
  state => ({
    location: state.weather.locationInput,
    date: state.weather.dateInput
  }),
  dispatch => bindActionCreators({
    fetchWeather: actions.fetchWeather,
    updateLocationInput: actions.updateLocationInput,
    updateDateInput: actions.updateDateInput
  }, dispatch)
)(SearchForm);

