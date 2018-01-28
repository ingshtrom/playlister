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
import moment from 'moment';


class WeatherTempGraph extends Component {
  static propTypes = {
    data: PropTypes.arrayOf(
      PropTypes.shape({
        temperature: PropTypes.number.isRequired
      })
    ).isRequired
  }

  // TODO: do a sexy gradient.... O.o!
  static getTempColor(data) {
    const temp = data.temperature;

    if (temp > 100) {
      return '#FF0000';
    } else if (temp > 70) {
      return '#FF4600';
    } else if (temp > 50) {
      return '#FF8c00';
    } else if (temp > 32) {
      return '#FFf000';
    } else if (temp > 10) {
      return '#00a4ff';
    } else {
      return '#0500ff';
    }
  }

  static getLabel(stats) {
    return `${stats.temperature}° F\n`;
  }

  render() {
    const data = this.props.data.map(
      (stats, hourIndex) => ({
        x: Number(moment(stats.time * 1000).format('H')), // need the number formatting for Victory to evenly space domain ticks
        y: stats.temperature,
        fill: WeatherTempGraph.getTempColor,
        label: WeatherTempGraph.getLabel(stats)
      })
    );


    return (
      <div className=''>
        <div className='text-center h3'>
          Temperature
        </div>
        <VictoryChart
          theme={VictoryTheme.material}
          containerComponent={<VictoryVoronoiContainer />}
        >
          <VictoryBar
            domain={{ x: [0, 23], y: [-50, 150] }}
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
)(WeatherTempGraph);

function getWeatherData(state) {
  try {
    return state.weather.weatherData.hourly.data;
  } catch (e) {
    return []
  }
}

