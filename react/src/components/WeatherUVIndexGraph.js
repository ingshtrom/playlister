import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  VictoryChart,
  VictoryBar,
  VictoryTheme,
  VictoryTooltip,
  VictoryVoronoiContainer,
} from 'victory';


class WeatherUVIndexGraph extends Component {
  static propTypes = {
    data: PropTypes.arrayOf(
      PropTypes.shape({
        uvIndex: PropTypes.number
      })
    ).isRequired
  }

  render() {
    const data = this.props.data.map(
      (stats, hourIndex) => ({
        x: hourIndex,
        y: stats.uvIndex || 0,
        label: stats.uvIndex || 0
      })
    );


    return (
      <div className=''>
        <div className='text-center h3'>
          UV Index
        </div>
        <VictoryChart
          theme={VictoryTheme.material}
          containerComponent={<VictoryVoronoiContainer />}
        >
          <VictoryBar
            labelComponent={<VictoryTooltip/>}
            data={data}
          />
        </VictoryChart>
      </div>
    );
  }
}

export default connect(
  state => ({
    data: getWeatherData(state)
  })
)(WeatherUVIndexGraph);

function getWeatherData(state) {
  try {
    return state.weather.weatherData.hourly.data;
  } catch (e) {
    return []
  }
}

