import React, { Component } from 'react';
import HighchartsReact from 'highcharts-react-official';
import Highcharts from 'highcharts';
import { connect } from 'react-redux';

class SpiderChart extends Component {
  constructor(props) {
    super(props);

    this.state = {
      chartOptions: {
        chart: {
          polar: true,
          type: 'line'
        },
        title: {
          text: 'Individual Bot Performance'
        },
        xAxis: {
          categories: ['Steps', 'Movement right', 'Tiles Seen', 'Movement Left'],
          tickmarkPlacement: 'on',
          lineWidth: 0
        },
        yAxis: {
          gridLineInterpolation: 'polygon',
          lineWidth: 0,
          min: 0
        },
        legend: {
          align: 'right',
          verticalAlign: 'middle'
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