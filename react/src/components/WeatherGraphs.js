import React, { Component } from 'react';
import WeatherTempGraph from './WeatherTempGraph';
import WeatherPrecipitationGraph from './WeatherPrecipitationGraph';
import WeatherUVIndexGraph from './WeatherUVIndexGraph';
import WeatherVisibilityGraph from './WeatherVisibilityGraph';

class WeatherGraphs extends Component {
  render() {
    return (
      <div>
        <hr />
        <WeatherTempGraph />
        <hr />
        <WeatherPrecipitationGraph />
        <hr />
        <WeatherUVIndexGraph />
        <hr />
        <WeatherVisibilityGraph />
      </div>
    );
  }
}

export default WeatherGraphs;

