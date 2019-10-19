import React, { useState, useEffect } from 'react';
import HighchartsReact from 'highcharts-react-official';
import Highcharts from 'highcharts';
import { connect } from 'react-redux';

const TilePieChart = ({ tiles, gameLost }) => {
  const [chartOptions, setChartOptions] = useState({
    credits: {
      enabled: false
    },
    chart: {
      type: 'pie',
      animation: false
    },
    title: {
      text: 'Total Open and Closed Tiles'
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
  })

  useEffect(() => {
    setChartOptions({
      series: [
        {
          name: 'Tiles',
          colorByPoint: true,
          data: [
            {
              name: 'Open',
              y: tiles.reduce((acc, curr) => acc+curr.open, 0) / tiles.reduce((acc, curr) => acc+curr.total, 0)
            },
            {
              name: 'Closed',
              y: tiles.reduce((acc, curr) => acc+curr.closed, 0) / tiles.reduce((acc, curr) => acc+curr.total, 0)
            }
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
    tiles: state.statistics.map(game => game.tiles),
    gameLost: state.gameLost
  }
}

export default connect(mapStateToProps, null)(TilePieChart);