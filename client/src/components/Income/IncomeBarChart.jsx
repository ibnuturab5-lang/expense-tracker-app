import React from 'react'
import { BarChart, Bar, Rectangle, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const IncomeBarChart = ({incomeData}) => {
  const chartData= incomeData.map((income)=>({
    source: income.source,
    amount:income.amount,
  }));
  return (
    <div className='h-full w-full mt-8'>
<ResponsiveContainer width="100%" height="70%">
      <BarChart
        width={400}
        height={300}
        data={chartData}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        {/* <CartesianGrid strokeDasharray="3 3" /> */}
        <XAxis dataKey='source' />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey='amount' fill="#8884d8" activeBar={<Rectangle fill="pink" stroke="blue" />} />
             </BarChart>
    </ResponsiveContainer>
    </div>
  )
}

export default IncomeBarChart