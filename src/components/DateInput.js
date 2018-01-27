import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import DatePicker from 'react-datepicker';
import moment from 'moment';

import * as actions from '../modules/weather-actions';

import 'react-datepicker/dist/react-datepicker.css';


class DateInput extends Component {
  static propTypes = {
    dateInput: (props, propName, componentName) => {
      if (!moment.isMoment(props[propName]))
        return new Error(`Invalid prop '${propName}' supplied to '${componentName}'. Expected a moment object, not '${typeof props[propName]}'. Validation failed.`);
    },
    updateDateInput: PropTypes.func.isRequired
  }

  constructor(props) {
    super(props);

    this.updateValue = this.updateValue.bind(this);
  }

  updateValue(date) {
    console.log('date', date);
    this.props.updateDateInput(date);
  }

  render() {
    const { dateInput } = this.props;

    return (
      <DatePicker selected={dateInput} onChange={this.updateValue} />
    );
  }
}

export default connect(
  state => ({
    dateInput: moment(state.weather.dateInput)
  }),
  dispatch => bindActionCreators({
    updateDateInput: actions.updateDateInput
  }, dispatch)
)(DateInput);

