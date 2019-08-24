import React, { Component } from 'react';
import HighchartsReact from 'highcharts-react-official';
import Highcharts from 'highcharts';
import { updateStats } from '../actions';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

class LineChart extends Component {
  constructor(props) {
    super(props);

    this.state = {
      // To avoid unnecessary update keep all options in the state.
      chartOptions: {
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
          }
        },
      },
      hoverData: null
    };
  }

  componentDidUpdate(prevProps) {
    //below updates when new game started - updating every tick too laggy
    if (this.props.gameSteps.length !== prevProps.gameSteps.length) {
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
      <div style={{marginTop: '250px', width: '400px'}}>
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
    gameSteps: state.statistics.map(game => game.gameSteps)
  }
}

function mapDispatchToProps(dispatch) {
  bindActionCreators({ updateStats }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(LineChart);