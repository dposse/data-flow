import React, { Component } from 'react';
import HighchartsReact from 'highcharts-react-official';
import Highcharts from 'highcharts';
import { connect } from 'react-redux';

class CurrentGameActionMovementBarChart extends Component {
  constructor(props) {
    super(props);

    this.state = {
      chartOptions: {
        credits: {
          enabled: false
        },
        chart: {
          type: 'column',
          animation: false
        },
        title: {
          text: 'Current Game Actions and Movements'
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
          },
          series: {
            animation: {
              duration: 100
            }
          }
        },
        series: [
          {
            name: 'Actions',
            data: []
          },
          {
            name: 'Movement',
            data: []
          }
        ]
      }
    }
  }

  componentDidUpdate(oldProps) {
    //only update at end of games for performance
    // now updating every tick as per Sean
    const newProps = this.props;
    if (oldProps !== newProps) {
      this.setState({
        chartOptions: {
          series: [
            {
              name: 'Actions',
              data: [
                newProps.actions.numberOfLeftInputs,
                newProps.actions.numberOfRightInputs
              ]
            },
            {
              name: 'Movement',
              data: [
                newProps.movement.leftDistance,
                newProps.movement.rightDistance
              ]
            }
          ]
        }
      });
    }
  }

  render() {
    const { chartOptions } = this.state;

    return (
        <HighchartsReact
          highcharts={Highcharts}
          options={chartOptions}
        />
    )
  }
}

function mapStateToProps(state) {
  return {
    actions: (state.statistics.length > 0) ? state.statistics[state.statistics.length-1].actions : 0,
    movement: (state.statistics.length > 0) ? state.statistics[state.statistics.length-1].movement : 0
  }
}

export default connect(mapStateToProps, null)(CurrentGameActionMovementBarChart);