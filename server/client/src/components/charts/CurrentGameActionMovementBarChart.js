import React, { useState, useEffect } from 'react';
import HighchartsReact from 'highcharts-react-official';
import Highcharts from 'highcharts';
import { connect } from 'react-redux';

const CurrentGameActionMovementBarChart = ({ actions, movement }) => {
  const [chartOptions, setChartOptions] = useState({
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
  });

  useEffect(() => {
    setChartOptions({
      series: [
        {
          name: 'Actions',
          data: [
            actions.numberOfLeftInputs,
            actions.numberOfRightInputs
          ]
        },
        {
          name: 'Movement',
          data: [
            movement.leftDistance,
            movement.rightDistance
          ]
        }
      ]
    });
  }, [actions, movement]);

  return (
    <HighchartsReact
      highcharts={Highcharts}
      options={chartOptions}
    />
  )
}

function mapStateToProps(state) {
  return {
    actions: (state.statistics.length > 0) ? state.statistics[state.statistics.length-1].actions : 0,
    movement: (state.statistics.length > 0) ? state.statistics[state.statistics.length-1].movement : 0
  }
}

export default connect(mapStateToProps, null)(CurrentGameActionMovementBarChart);