import React, { Component } from 'react';
import HighchartsReact from 'highcharts-react-official';
import Highcharts from 'highcharts';
import { connect } from 'react-redux';

class CurrentGameTilePieChart extends Component {
  constructor(props) {
    super(props);

    this.state = {
      totalTiles: 0,
      chartOptions: {
        credits: {
          enabled: false
        },
        chart: {
          type: 'pie',
          animation: false
        },
        title: {
          text: 'Current Game Open and Closed Tiles'
        },
        tooltip: {
          pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
        },
        plotOptions: {
          pie: {
            allowPointSelect: true,
            cursor: 'pointer',
            dataLabels: {
              enabled: true,
              format: '<b>{point.name}</b>: {point.percentage:.1f} %',
              style: {
                color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
              }
            }
          },
          series: {
            animation: {
              duration: 100
            }
          }
        },
        series: [
          {
            name: 'Tiles',
            colorByPoint: true,
            data: [
              {
                name: 'Open',
                y: 1
              },
              {
                name: 'Closed',
                y: 0,
                sliced: true
              }
            ]
          }
        ]
      }
    }
  }

  componentDidUpdate(oldProps) {
    const newProps = this.props;
    //only update at end of games for performance
    // now updating every tick as per Sean
    if (oldProps !== newProps) {
      this.setState({
        chartOptions: {
          series: [
            {
              name: 'Tiles',
              colorByPoint: true,
              data: [
                {
                  name: 'Open',
                  y: newProps.tiles.open / newProps.tiles.total
                },
                {
                  name: 'Closed',
                  y: newProps.tiles.closed / newProps.tiles.total
                }
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
    tiles: (state.statistics.length > 0) ? state.statistics[state.statistics.length-1].tiles : 0
  }
}

export default connect(mapStateToProps, null)(CurrentGameTilePieChart);