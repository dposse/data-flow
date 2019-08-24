import React, { Component } from 'react';
import HighchartsReact from 'highcharts-react-official';
import Highcharts from 'highcharts/highmaps';
import { connect } from 'react-redux';

class Heatmap extends Component {
  constructor(props) {
    super(props);

    const axisLabels = this.props.currentBoard.map((row, index) => index+1);

    this.state = {
      chartOptions: {
        title: {
          text: 'Heatmap of the board'
        },
        xAxis: {
          categories: ['this','should','show','some','categories']
        },
        yAxis: {
          categories: [1,2,3,4,5],
          opposite: true
        },
        colorAxis: {
          min: 0,
          minColor: '#FFFFFF',
          maxColor: Highcharts.getOptions().colors[0]
        },
        legend: {
          align: 'right',
          layout: 'vertical',
          margin: 0,
          verticalAlign: 'top',
          y: 25,
          symbolHeight: 280
        },
        series: [
          {
            name: 'Board state over time',
            borderwidth: 1,
            data: [
              [0,0,49], [0,1,0], [0,2,0], [0,3,0], [0,4,0],
              [1,0,0], [1,1,0], [1,2,0], [1,3,0], [1,4,0],
              [2,0,0], [2,1,0], [2,2,0], [2,3,0], [2,4,0],
              [3,0,0], [3,1,0], [3,2,0], [3,3,0], [3,4,0],
              [4,0,0], [4,1,0], [4,2,0], [4,3,0], [4,4,0]
            ],
            dataLabels: {
              enabled: true,
              color: '#000000'
            }
          }
        ]
      }
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.currentBoard != prevProps.currentBoard) {
      this._updateHeatMap();
    }
  }

  _updateHeatMap() {
    this.setState({
      chartOptions: {
        series: [
          {
            data: [...this.state.chartOptions.series[0].data, this.props.currentBoard]
          }
        ]
      }
    })
  }

  render() {
    const { chartOptions } = this.state;

    return (
      <div>
        <HighchartsReact 
          highcharts={Highcharts}
          options={chartOptions}
          constructorType={'mapChart'}
        />
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    currentBoard: state.board
  }
}

export default connect(mapStateToProps, null)(Heatmap);