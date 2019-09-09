import React, { useState, useEffect } from 'react';
import HighchartsReact from 'highcharts-react-official';
import Highcharts from 'highcharts';
import { connect } from 'react-redux';

require('highcharts/highcharts-more')(Highcharts);

const SpiderChart = ({ botStats }) => {
  const [chartOptions, setChartOptions] = useState(
    {
      credits: {
        enabled: false
      },
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
  );

  useEffect(() => {
    if (botStats.randomBot !== undefined)
      setChartOptions({
        series: [
          {
            name: 'Random Bot',
            data: [
              botStats.randomBot.steps, 
              botStats.randomBot.movement.rightDistance,
              botStats.randomBot.tilesSeen,
              botStats.randomBot.movement.leftDistance
            ],
            pointPlacement: 'on'
          },
          {
            name: 'Machine Learning Bot 1',
            data: [
              botStats.mlBot1.steps, 
              botStats.mlBot1.movement.rightDistance,
              botStats.mlBot1.tilesSeen,
              botStats.mlBot1.movement.leftDistance
            ],
            pointPlacement: 'on'
          },
          {
            name: 'Machine Learning Bot 2',
            data: [
              botStats.mlBot2.steps, 
              botStats.mlBot2.movement.rightDistance,
              botStats.mlBot2.tilesSeen,
              botStats.mlBot2.movement.leftDistance
            ],
            pointPlacement: 'on'
          }
        ]
      });
  }, [botStats]);

  return (
    <HighchartsReact 
      highcharts={Highcharts}
      options={chartOptions}
    />
  )
}

function mapStateToProps(state) {
  return {
    botStats: state.botStats
  }
}

export default connect(mapStateToProps, null)(SpiderChart);