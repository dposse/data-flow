import React, { useState, useEffect } from 'react';
import HighchartsReact from 'highcharts-react-official';
import Highcharts from 'highcharts';
import { connect } from 'react-redux';

const CurrentGameTilePieChart = ({ tiles }) => {
  const [totalTiles, setTotalTiles] = useState(0);
  const [chartOptions, setChartOptions] = useState({
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
  });
  
  useEffect(() => {
    setTotalTiles(tiles);
    setChartOptions({
      series: [
        {
          name: 'Tiles',
          colorByPoint: true,
          data: [
            {
              name: 'Open',
              y: tiles.open / tiles.total
            },
            {
              name: 'Closed',
              y: tiles.closed / tiles.total
            }
          ]
        }
      ]
    })
  }, [tiles])

  return (
    <HighchartsReact 
      highcharts={Highcharts}
      options={chartOptions}
    />
  )
}

function mapStateToProps(state) {
  return {
    tiles: (state.statistics.length > 0) ? state.statistics[state.statistics.length-1].tiles : 0
  }
}

export default connect(mapStateToProps, null)(CurrentGameTilePieChart);