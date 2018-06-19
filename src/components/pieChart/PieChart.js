import React from 'react'
import RC2 from 'react-chartjs2'
import { Doughnut } from 'react-chartjs-2'

import Card from '../card'

const PieChart = (props) => {
  const percents = []
  props.data.percentage.forEach(item => percents.push(item.percent))

  const data = {
    datasets: [{
      data: [10, 20, 30],
    }] }

  const Body = () => (
    <div>
      <RC2 data={data} type="doughnut" />
      {/* <Doughnut data={data.datasets.data} /> */}
      {console.log(data)}
    </div>
  )

  return (
    <div>
      <Card title="Pie Chart" content={Body} />
    </div>
  )
}

export default PieChart
