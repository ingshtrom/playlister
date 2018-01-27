import React, { Component } from 'react';

import LocationInput from './LocationInput';
import DateInput from './DateInput';
import GetWeatherButton from './GetWeatherButton';

class InputBar extends Component {
  render() {
    return (
      <div>
        <LocationInput />
        <DateInput />
        <GetWeatherButton />
      </div>
    );
  }
}

export default InputBar;
