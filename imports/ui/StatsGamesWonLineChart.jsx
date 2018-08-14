import React, { Component } from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import _ from 'lodash';
import { Chart } from 'chart.js';
import { randomColor } from 'randomcolor';

// Horizontal Line Chart component
class StatsGamesWonLineChart extends Component {

  constructor(props) {
    super(props);

    this.state = {
      width: 400,
      height: 240,
      data: null,
      options: {
        legend: {
          display: false
        },
        title: {
          display: true,
          text: `Games Won`
        },
        responsive: true,
        maintainAspectRatio: true,
        scales: {
          xAxes: [{
            ticks: {
                min: 0,
                max: 256,
                stepSize: 32
            }
          }]
        }
      }
    };

    this._chart = null;
  }

  componentDidMount() {

    (window.onresize = () => {
      let wrapper = this.refs.chartWrapper;
      let width = wrapper.clientWidth;
      let height = wrapper.clientHeight;

      // this next part is imperative to resizing the chart:
      if (this._chart) {
        this._chart.chart.width = width;
        this._chart.chart.height = height;
      }
      this.setState({ width, height });
    })();

  }

  componentDidUpdate() {

    if (this._chart) {
      this._chart.destroy();
    }

    let chartContainer = this.refs.statsGamesWonLineChart;
    this._chart = new Chart(chartContainer, {
      type: 'horizontalBar',
      data: this.props.data,
      options: Object.assign({}, this.state.options, { 'scales.xAxes[0].ticks.max': this.props.total })
    });

  }

  render() {

    let width = this.state.width;
    let height = this.state.height;
    let style = { width, height };

    return (
      <div className="chartWrapper" ref="chartWrapper">
        <canvas ref="statsGamesWonLineChart" width={width} height={height} style={style} />
      </div>
    );
  }

}

export default StatsGamesWonLineChartContainer = createContainer(props => {

  let { stats } = props;

  // Labels on the Y axis
  let labels = [];

  // Initial dataset defaults
  let dataset = {
    borderWidth: 0,
    backgroundColor: [],
    data: []
  };

  _.each(stats, stat => {
    labels.push(_.upperFirst(stat.name));
    dataset.data.push(stat.wins);
  });

  let data = {
    labels,
    datasets: [dataset]
  };

  return {
    total: stats.length ? stats[0].total : 0,
    data
  };

}, StatsGamesWonLineChart);
