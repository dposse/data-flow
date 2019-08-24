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
    const newProps = this.props;
    if (!oldProps.gameLost && newProps.gameLost) {
      this.setState({
        chartOptions: {
          series: [
            {
              name: 'Actions',
              data: [
                newProps.actions.reduce((acc, curr) => acc + curr.numberOfLeftInputs, 0),
                newProps.actions.reduce((acc, curr) => acc + curr.numberOfRightInputs, 0)
              ]
            },
            {
              name: 'Movement',
              data: [
                newProps.movement.reduce((acc, curr) => acc + curr.leftDistance, 0),
                newProps.movement.reduce((acc, curr) => acc + curr.rightDistance, 0)
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
      <div style={{width: '400px'}}>
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
    movement: state.statistics.map(game => game.movement),
    gameLost: state.gameLost
  }
}

export default connect(mapStateToProps, null)(ActionMovementBarChart);