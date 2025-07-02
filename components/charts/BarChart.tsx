'use client'

import { Bar } from 'react-chartjs-2'
import { 
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
  ChartData,
  ChartOptions
} from 'chart.js'

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend)

type BarProps = {
  data: ChartData<'bar', number[], string>
  options?: ChartOptions<'bar'>
}

export const BarChart: React.FC<BarProps> = ({data, options}) => {
  return <Bar data={data} options={options} />
}