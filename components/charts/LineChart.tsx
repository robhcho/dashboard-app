'use client'
import { Line } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
  ChartData,
  ChartOptions,
} from 'chart.js'

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend)

type LineProps = {
  data: ChartData<'line', (number | null)[], string>
  options?: ChartOptions<'line'>
}

export const LineChart: React.FC<LineProps> = ({data, options}) => {
  return <Line data={data} options={options} />
}