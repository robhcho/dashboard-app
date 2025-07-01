import React from 'react'
import { Doughnut } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  ChartData,
  ChartOptions
} from 'chart.js'

ChartJS.register(ArcElement, Tooltip, Legend)

type DonutChartProps = {
  data: ChartData<'doughnut', number[], string>
  options?: ChartOptions<'doughnut'>
}

export const DonutChart: React.FC<DonutChartProps> = ({ data, options }) => {
  const chartData = {
    labels: data.labels,
    datasets: data.datasets
  }

  return <Doughnut data={chartData} options={options} />
}