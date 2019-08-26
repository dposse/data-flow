import React, { Component } from 'react';
import HighchartsReact from 'highcharts-react-official';
import Highcharts from 'highcharts';
import { connect } from 'react-redux';

// need to change when this updates - always shows "1 step" as last game right now
class GamestepsLineChart extends Component {
  constructor(props) {
    super(props);

    this.state = {
      // To avoid unnecessary update keep all options in the state.
      chartOptions: {
        chart: {
          animation: false
        },
        title: {
          text: 'Steps per game'
        },
        xAxis: {
          categories: [],
        },
        yAxis: {
          title: {
            text: 'Steps before losing'
          }
        },
        series: [
          { 
            name: 'Game number',
            data: [] 
          }
        ],
        plotOptions: {
          line: {
              dataLabels: {
                  enabled: true
              },
              enableMouseTracking: false
          },
          series: {
            animation: {
              duration: 100
            }
          }
        },
      },
      hoverData: null
    };
  }

  componentDidUpdate(prevProps) {
    //below updates when new game started - updating every tick too laggy
    // now testing updating every tick as per Sean's suggestion
    if (this.props !== prevProps) {
      this.updateSeries();
    }
  }


  updateSeries = () => {
    // The chart is updated only with new options.
    this.setState({
      chartOptions: {
        xAxis: {
          categories: this.state.chartOptions.xAxis.categories.concat(
            this.state.chartOptions.xAxis.categories.length+1
          )
        },
        series: [
          { data: this.props.gameSteps }
        ]
      }
    });
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
    gameSteps: state.statistics.map(game => game.gameSteps)
  }
}

export default connect(mapStateToProps, null)(GamestepsLineChart);