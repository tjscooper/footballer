import React, { Component } from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import _ from 'lodash';
import { Chart } from 'chart.js';
import { randomColor } from 'randomcolor';

// Horizontal Line Chart component
class HorizontalLineChart extends Component {

  constructor(props) {
    super(props);

    this.state = {
      width: 400,
      height: 320,
      data: null,
      options: {
        legend: {
          display: false
        },
        title: {
          display: true,
          text: `Week ${ props.week.nflWeek }`
        },
        responsive: true,
        maintainAspectRatio: true,
        scales: {
          xAxes: [{
            ticks: {
                min: 0,
                max: 16,
                stepSize: 4
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

    let chartContainer = this.refs.horizontalBarChart;
    this._chart = new Chart(chartContainer, {
      type: 'horizontalBar',
      data: this.props.data,
      options: this.state.options
    });

  }

  render() {

    let width = this.state.width;
    let height = this.state.height;
    let style = { width, height };

    return (
      <div className="chartWrapper" ref="chartWrapper">
        <canvas ref="horizontalBarChart" width={width} height={height} style={style} />
      </div>
    );
  }

}

export default HorizontalLineChartContainer = createContainer(props => {

  let { week, users, getWinningCount } = props;

  // Labels on the Y axis
  let labels = [];

  // Initial dataset defaults
  let dataset = {
    borderWidth: 0,
    backgroundColor: [],
    data: []
  };


  _.each(users, user => {

    labels.push(_.upperFirst(user.username));
    dataset.backgroundColor.push(randomColor());
    dataset.data.push(getWinningCount(user, week.games));

  });

  let data = {
    labels,
    datasets: [dataset]
  };

  return {
    data
  };

}, HorizontalLineChart);
