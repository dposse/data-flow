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
        }
      }
    };
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

}

export default connect(mapStateToProps, null)(SpiderChart);