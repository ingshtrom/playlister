import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as actions from '../modules/weather-actions';


class DateInput extends Component {
  // static propTypes = {
  //   dateInput: PropTypes.string.isRequired,
  //   updateDateInput: PropTypes.func.isRequired
  // }

  constructor(props) {
    super(props);

    this.updateValue = this.updateValue.bind(this);
  }

  updateValue(event) {
    this.props.updateDateInput(event.target.value);
  }

  render() {
    const { dateInput } = this.props;

    return (
      <input type='date' value={dateInput} onChange={this.updateValue} />
    );
  }
}

export default connect(
  // state => ({
  //   dateInput: state.weather.dateInput
  // }),
  // dispatch => bindActionCreators({
  //   updateDateInput: actions.updateDateInput
  // }, dispatch)
)(DateInput);

