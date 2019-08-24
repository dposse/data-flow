import React, { Component } from 'react';
import HighchartsReact from 'highcharts-react-official';
import Highcharts from 'highcharts';
import { connect } from 'react-redux';

class ActionMovementBarChart extends Component {
  constructor(props) {
    super(props);

    this.state = {
      chartOptions: {
        chart: {
          type: 'column'
        },
        title: {
          text: 'Actions and Movements'
        },
        xAxis: {
          categories: [
            'Left',
            'Right'
          ],
          crosshair: true
        },
        yAxis: {
          min: 0,
          title: {
            text: 'Number of tiles'
          }
        },
        plotOptions: {
          column: {
            pointPadding: 0.2,
            borderWidth: 0
          }
        },
        series: [
          {
            name: 'Actions',
            data: [10,20]
          },
          {
            name: 'Movement',
            data: [30,40]
          }
        ]
      }
    }
  }

  render() {
    const { chartOptions } = this.state;

    return (
      <div>
        <HighchartsReact 
          highcharts={Highcharts}
          options={chartOptions}
        />
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    actions: state.statistics.map(game => game.actions),
    movement: state.statistics.map(game => game.movement)
  }
}

export default connect(mapStateToProps, null)(ActionMovementBarChart);