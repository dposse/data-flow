import React, { useState, useEffect } from 'react';
import HighchartsReact from 'highcharts-react-official';
import Highcharts from 'highcharts';
import { connect } from 'react-redux';

// need to change when this updates - always shows "1 step" as last game right now
const GamestepsLineChart = ({ gameSteps, gameLost }) => {
  const [chartOptions, setChartOptions] = useState({
    credits: {
      enabled: false
    },
    chart: {
      animation: false
    },
    title: {
      text: 'Total Steps per Game'
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
  })

  useEffect(() => {
    setChartOptions({
      xAxis: {
        categories: chartOptions.xAxis.categories.concat(
          chartOptions.xAxis.categories.length+1
        )
      },
      series: [
        { data: gameSteps }
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
    gameSteps: state.statistics.map(game => game.gameSteps),
    gameLost: state.gameLost
  }
}

export default connect(mapStateToProps, null)(GamestepsLineChart);