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


class WeatherVisibilityGraph extends Component {
  static propTypes = {
    data: PropTypes.arrayOf(
      PropTypes.shape({
        visibility: PropTypes.number
      })
    ).isRequired
  }

  render() {
    const data = this.props.data.map(
      (stats, hourIndex) => ({
        x: hourIndex,
        y: stats.visibility || 0,
        label: (stats.visibility || 0) + ' miles'
      })
    );


    return (
      <div>
        <div className='text-center h3'>
          Visibility
        </div>
        <VictoryChart
          theme={VictoryTheme.material}
          containerComponent={<VictoryVoronoiContainer />}
        >
          <VictoryBar
            domain={{ y: [0, 10] }}
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
)(WeatherVisibilityGraph);

function getWeatherData(state) {
  try {
    return state.weather.weatherData.hourly.data;
  } catch (e) {
    return []
  }
}

