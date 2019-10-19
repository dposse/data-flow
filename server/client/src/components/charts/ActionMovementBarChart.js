import React, { useState, useEffect } from 'react';
import HighchartsReact from 'highcharts-react-official';
import Highcharts from 'highcharts';
import { connect } from 'react-redux';

const ActionMovementBarChart = ({ actions, movement, gameLost }) => {
  const [chartOptions, setChartOptions] = useState({
    credits: {
      enabled: false
    },
    chart: {
      type: 'column',
      animation: false
    },
    title: {
      text: 'Total Actions and Movements'
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
  })

  useEffect(() => {
    setChartOptions({
      series: [
        {
          name: 'Actions',
          data: [
            actions.reduce((acc, curr) => acc + curr.numberOfLeftInputs, 0),
            actions.reduce((acc, curr) => acc + curr.numberOfRightInputs, 0)
          ]
        },
        {
          name: 'Movement',
          data: [
            movement.reduce((acc, curr) => acc + curr.leftDistance, 0),
            movement.reduce((acc, curr) => acc + curr.rightDistance, 0)
          ]
        }
      ]
    })
  }, [gameLost])
  
  return (
    <HighchartsReact
      highcharts={Highcharts}
      options={chartOptions}
    />
  )
}

function mapStateToProps(state) {
  return {
    actions: state.statistics.map(game => game.actions),
    movement: state.statistics.map(game => game.movement),
    gameLost: state.gameLost
  }
}

export default connect(mapStateToProps, null)(ActionMovementBarChart);