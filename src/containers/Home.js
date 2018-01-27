import React, { Component } from 'react';

import InputBar from '../components/InputBar';
import WeatherGraphs from '../components/WeatherGraphs';

class Home extends Component {
  render() {
    return (
      <div>
        <InputBar />
        <WeatherGraphs />
      </div>
    );
  }
}

export default Home;


