import React, {useState, useMemo} from 'react'
import {Stats} from '@/components/roi/Stats'
import { BarChart } from '@/components/charts/BarChart'
import { DonutChart } from '@/components/charts/DonutChart'
import { useRoiData } from '@/app/hooks/useRoiData'
import { RoiTable } from '../ui/Table'
import { ChartData } from 'chart.js'

// const incData = {
//   labels: ['Total Sales', 'Incremental Sales'],
//   datasets: [
//     {
//       label: 'Sales',
//       data: [112000, 54000],
//       backgroundColor: ['#5fb500', '#d6a800'],
//       barThickness: 50,
//       borderRadius: 8,
//     }
//   ]
// }

// const options = {
//   responsive: true,
//   plugins: {
//     legend: { display: false},
//     tooltip: {
//       callbacks:{
//         label: function(context: any) {
//           return `$${Number(context.raw).toLocaleString()}`
//         }
//       }
//     },
//   },
//   scales: {
//     y: {
//       beginAtZero: true,
//       ticks: {
//         callback: (value: string | number) => `$${value.toLocaleString()}`,
//       }
//     }
//   }
// }

const columns = [
  {key: 'type', label: 'Type', align: 'left' as const},
  {key: 'spend', label: 'Spend', align: 'right' as const},
  {key: 'sales', label: 'Sales', align: 'right' as const},
  {key: 'mailed', label: 'Mailed', align: 'right' as const},
  {key: 'responses', label: 'Responses', align: 'right' as const},
  {key: 'incremental_responses', label: 'Incremental Responses', align: 'right' as const},
  {key: 'avg_ticket', label: 'Avg Ticket', align: 'right' as const},
]

const chartOptions = [
  {label: 'Customers vs Prospects', key: 'cust_pros_data'},
  {label: 'List Type', key: 'list_data'}
]

export const RoiMain = () => {
  const {data} = useRoiData()
  const [selectedKey, setSelectedKey] = useState<'cust_pros_data' | 'list_data'>('cust_pros_data')
  const selectedOption = chartOptions.find(opt => opt.key === selectedKey)
  
  const donutChartData = useMemo(() => {
    if(!data) return {}

    const source = selectedKey === 'cust_pros_data' ? data.cust_pros_data : data.list_data
    const metrics = ['sales', 'mailed', 'responses']

    const map: Record<string, ChartData<'doughnut', number[], string>> = {}

    metrics.forEach((metric) => {
      map[metric] = {
        labels: source.map((entry) => entry.type),
        datasets: [
          {
            data: source.map((entry) => entry[metric as keyof typeof entry] as number),
            backgroundColor: ['#ff6384', '#36a2eb', '#ffce56', '#66bb6a', '#ba68c8', '#ff7043'],
            borderWidth: 0,
          }
        ]
      }
    })

    return map
  }, [data, selectedKey])
  
  if(!data) return null
  return (
    <div className='pt-5'>
      ROI MAIN
      <Stats />
      <RoiTable 
        title="Customers vs Prospects"
        columns={columns}
        rows={data.cust_pros_data}
      />
      <div className='my-8 border-2 rounded-lg p-4'>
        <div className='flex items-center justify-between mb-4'>
          <h3 className='text-lg font-semibold text-gray-700 uppercase'>{selectedOption?.label} Breakdown</h3>
          <select
            value={selectedKey}
            onChange={(e) => setSelectedKey(e.target.value as 'cust_pros_data' | 'list_data')}
          >
            {chartOptions.map((opt) => (
              <option key={opt.key} value={opt.key}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-3 gap-6 w-full h-[350px]'>
          {['sales', 'mailed', 'responses'].map((label, idx) => (
            <div key={label} className='flex flex-col items-center'>
              <p className='text-sm font-semibold uppercase'>{label}</p>
              <div className='w-full h-full p-5'>
                <DonutChart 
                  data={donutChartData[label]}
                  options={{
                    responsive: true, 
                    maintainAspectRatio: false, 
                    cutout: '65%', 
                    plugins: {
                      legend: {position: 'bottom'}
                    }
                  }}
                />
              </div>
            </div>
          ))}          
        </div>        
      </div>
      <RoiTable 
        title="List Types"
        columns={columns}
        rows={data.list_data}
      />
    </div>
  )
}