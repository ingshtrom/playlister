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


class WeatherPrecipitationGraph extends Component {
  static propTypes = {
    data: PropTypes.arrayOf(
      PropTypes.shape({
        temperature: PropTypes.number.isRequired
      })
    ).isRequired
  }

  static getLabelFromStats(stats) {
    let label = `probability: ${stats.precipProbability}%`;

    if (stats.precipType) {
      label += `\ntype: ${stats.precipType}`;
    }

    if (stats.precipAccumulation) {
      label += `\naccumulation: ${stats.precipAccumulation}"`
    }

    return label;
  }

  render() {
    const data = this.props.data.map(
      (stats, hourIndex) => ({
        x: hourIndex,
        y: stats.precipProbability,
        label: WeatherPrecipitationGraph.getLabelFromStats(stats)
      })
    );


    return (
      <div className=''>
        <div className='text-center h3'>
          Precipitation
        </div>
        <VictoryChart
          theme={VictoryTheme.material}
          containerComponent={<VictoryVoronoiContainer />}
        >
          <VictoryBar
            domain={{ x: [0, 24], y: [0, 100] }}
            labels={d => d.y}
            labelComponent={<VictoryTooltip/>}
            data={data}
            interpolation='natural'
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
)(WeatherPrecipitationGraph);

function getWeatherData(state) {
  try {
    return state.weather.weatherData.hourly.data;
  } catch (e) {
    return []
  }
}

