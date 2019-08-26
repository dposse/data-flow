import React, { Component } from 'react';
import HighchartsReact from 'highcharts-react-official';
import Highcharts from 'highcharts';
import { connect } from 'react-redux';

require('highcharts/highcharts-more')(Highcharts);

class SpiderChart extends Component {
  constructor(props) {
    super(props);

    this.state = {
      chartOptions: {
        chart: {
          polar: true,
          animation: false
        },
        title: {
          text: 'Individual Bot Performance'
        },
        // pane: {
        //   startAngle: 0,
        //   endAngle: 360
        // },
        xAxis: {
          categories: ['Steps', 'Movement right', 'Tiles Seen', 'Movement Left'],
          lineWidth: 0
        },
        yAxis: {
          gridLineInterpolation: 'polygon',
          lineWidth: 0,
          min: 0
        },
        legend: {
          align: 'left',
          verticalAlign: 'top'
        },
        plotOptions: {
          series: {
            animation: {
              duration: 100
            }
          }
        },
        series: [
          {
            name: 'Random Bot',
            data: [],
            pointPlacement: 'on'
          },
          {
            name: 'Machine Learning Bot 1',
            data: [],
            pointPlacement: 'on'
          },
          {
            name: 'Machine Learning Bot 2',
            data: [],
            pointPlacement: 'on'
          }
        ]
      }
    };
  }

  componentDidUpdate(prevProps) {
    if (this.props !== prevProps) {
      this.updateSeries();
    }
  }

  updateSeries() {
    this.setState({
      chartOptions: {
        series: [
          {
            name: 'Random Bot',
            data: [
              this.props.botStats.randomBot.steps, 
              this.props.botStats.randomBot.movement.rightDistance,
              this.props.botStats.randomBot.tilesSeen,
              this.props.botStats.randomBot.movement.leftDistance
            ],
            pointPlacement: 'on'
          },
          {
            name: 'Machine Learning Bot 1',
            data: [
              this.props.botStats.mlBot1.steps, 
              this.props.botStats.mlBot1.movement.rightDistance,
              this.props.botStats.mlBot1.tilesSeen,
              this.props.botStats.mlBot1.movement.leftDistance
            ],
            pointPlacement: 'on'
          },
          {
            name: 'Machine Learning Bot 2',
            data: [
              this.props.botStats.mlBot2.steps, 
              this.props.botStats.mlBot2.movement.rightDistance,
              this.props.botStats.mlBot2.tilesSeen,
              this.props.botStats.mlBot2.movement.leftDistance
            ],
            pointPlacement: 'on'
          }
        ]
      }
    })
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
    botStats: state.botStats
  }
}

export default connect(mapStateToProps, null)(SpiderChart);