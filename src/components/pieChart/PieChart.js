import React from 'react'
import { Doughnut } from 'react-chartjs-2'
import styled from 'styled-components'

import Card from '../card'
import enhance from './pieChartEnhance'


const Container = styled.div`
    display: flex;
    align-items: center;
    height: 200px;

    .text_on_pie{
        position: absolute;
        transform: translate(58px,-112px);
        text-align: center;
        font-family: Montserrat;
        font-size: 18px;
        font-weight: normal;
        color: #0f334b;

        span{
            font-weight: bold;
        }
    }

    .chart_info{
        margin-left: 34px;
        width: 100%;


        .chart_item{


            .item_top_section{
                display: flex;
                align-items: center;
                font-family: Montserrat;
                font-size: 14px;
                font-weight: 500;
                color: #0f334b;
                margin-bottom: 4px;

                .color{
                width: 15px;
                height: 16px;
                border-radius: 5px;
                margin-right: 8px;
                box-shadow: 0px 3px 9.5px 0.5px rgba(0, 0, 0, 0.1);
                }
            } 
        }

        .info_title{
            font-family: Montserrat;
            font-size: 14px;
            font-weight: normal;
            color: #0f334b;
        }

        .line{
            height: 2px;
            width: 100%;
            opacity: 0.2;
            background-color: #447491;
            margin: 11px 0;
        }
    }
`


const PieChart = ({ pieData }) => {
  const data = pieData()
  const percents = data.percentages
  const titles = data.titles
  const chartData = {
    datasets: [{
      data: percents,
      backgroundColor: [
        '#7fac30',
        '#ed2b3b',
        '#0f334b',
      ],
    }],
  }

  const options = {
    cutoutPercentage: 80,
    tooltips: { enabled: false },
  }

  const Body = () => (
    <Container>
      <div className="pie_chart">
        <Doughnut data={chartData} options={options} height={170} width={170} />
        <div className="text_on_pie">
            TOTAL
            <br /><span>{data.totalGame}</span><br />
            BETS
        </div>
      </div>

      <div className="chart_info">
        {
             (function () {
               return percents.map((item, index) => (
                 <div key={index} className="chart_item">
                   <div className="item_top_section">
                     <div className="color" style={{ backgroundColor: chartData.datasets[0].backgroundColor[index] }} />
                     <div>{item}%</div>
                   </div>
                   <div className="info_title">
                     {titles[index]}
                   </div>
                   {index < 2 ? <div className="line" /> : null}
                 </div>
                   ))
             }())
         }
      </div>
    </Container>
      )


  return <Card title="Pie Chart" width="30%"><Body /> </Card>
}

export default enhance(PieChart)
