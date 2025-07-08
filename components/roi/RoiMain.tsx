import React, {useState, useMemo} from 'react'
import {Stats} from '@/components/roi/Stats'
import { BarChart } from '@/components/charts/BarChart'
import { DonutChart } from '@/components/charts/DonutChart'
import { useRoiData } from '@/app/hooks/useRoiData'
import { RoiTable } from '../ui/Table'
import { ChartData } from 'chart.js'
import { DateFilter } from '../ui/DateFilter'
import { RiExchangeDollarFill } from 'react-icons/ri'
import { useAppSelector } from '@/lib/hooks'

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
  {label: 'Customers vs Prospects', key: 'cust_pros_daily'},
  {label: 'List Type', key: 'list_data_daily'}
]

export const RoiMain = () => {
  const {data} = useRoiData()
  const [selectedKey, setSelectedKey] = useState<'cust_pros_daily' | 'list_data_daily'>('cust_pros_daily')
  const selectedOption = chartOptions.find(opt => opt.key === selectedKey)
  const [dateRange, setDateRange] = useState<[Date, Date]>([
    new Date(new Date().setMonth(new Date().getMonth() - 1)),
    new Date()
  ])
  const darkMode = useAppSelector(state => state.theme.darkMode)

  const filteredCustProsData = useMemo(() => {
    if(!data || !data.cust_pros_daily) return []        
    const categories: (keyof typeof data.cust_pros_daily)[] = ['Customers', 'Prospects']

    return categories.map(category => {
      const filtered = data.cust_pros_daily[category].filter((entry) => {
        const entryDate = new Date(entry.date)
        return entryDate >= dateRange[0] && entryDate <= dateRange[1]
      })

      const aggregate = filtered.reduce((acc, curr) => {
        acc.spend += curr.spend || 0
        acc.sales += curr.sales || 0
        acc.mailed += curr.mailed || 0
        acc.responses += curr.responses || 0
        acc.incremental_responses += curr.incremental_responses || 0
        return acc
      },{          
        date: '',
        spend: 0,
        sales: 0,
        mailed: 0,
        responses: 0,
        incremental_responses: 0,
        avg_ticket: 0,
      })

      const avg_ticket = aggregate.responses > 0 ? aggregate.sales / aggregate.responses : 0
      
      return {
        type: category,
        spend: aggregate.spend,
        sales: aggregate.sales,
        mailed: aggregate.mailed,
        responses: aggregate.responses,
        incremental_responses: aggregate.incremental_responses,
        avg_ticket
      }
    })
  }, [data, dateRange])

  const filteredListData = useMemo(() => {
    if(!data || !data.list_data_daily) return []
    const categories: (keyof typeof data.list_data_daily)[] = ['Browse_Abandoned', 'Cart_Abandoned']

    return categories.map(category => {
      const filtered = data.list_data_daily[category].filter(entry => {
        const entryDate = new Date(entry.date)
        return entryDate >= dateRange[0] && entryDate <= dateRange[1]
      })
      
      const aggregate = filtered.reduce((acc, curr) => {
        acc.spend += curr.spend || 0
        acc.sales += curr.sales || 0
        acc.mailed += curr.mailed || 0
        acc.responses += curr.responses || 0
        acc.incremental_responses += curr.incremental_responses || 0
        return acc
      },{          
        date: '',
        spend: 0,
        sales: 0,
        mailed: 0,
        responses: 0,
        incremental_responses: 0,
        avg_ticket: 0,
      })

      const avg_ticket = aggregate.responses > 0 ? aggregate.sales / aggregate.responses : 0
      
      return {
        type: category.split('_').join(' '),
        spend: aggregate.spend,
        sales: aggregate.sales,
        mailed: aggregate.mailed,
        responses: aggregate.responses,
        incremental_responses: aggregate.incremental_responses,
        avg_ticket
      }
    })    
  }, [data, dateRange])
  
  const donutChartData = useMemo(() => {
    if(!data) return {}

    const source = selectedKey === 'cust_pros_daily' ? filteredCustProsData : filteredListData
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
  }, [selectedKey, filteredCustProsData, filteredListData])

  const handleDateChange = (range: [Date, Date]) => {
    setDateRange(range)
  }
  
  if(!data) return null
  return (
    <div className='pt-5'>
      <div className='mb-3 flex justify-between items-center'>
        <h4 className='flex items-center text-lg'><RiExchangeDollarFill className='mr-1'/> ROI</h4>
        <DateFilter onDateChange={handleDateChange} minDate={new Date('2025-06-01')} maxDate={new Date('2025-07-06')}/>
      </div>
      <Stats data={data.total_data_daily} dateRange={dateRange} />
      <RoiTable 
        title="Customers vs Prospects"
        columns={columns}
        rows={filteredCustProsData}
      />
      <div className='my-8 border-2 rounded-lg p-4 dark:bg-zinc-500'>
        <div className='flex items-center justify-between mb-4'>
          <h3 className='text-lg font-semibold text-gray-700 dark:text-white uppercase'>{selectedOption?.label} Breakdown</h3>
          <select
            value={selectedKey}
            onChange={(e) => setSelectedKey(e.target.value as 'cust_pros_daily' | 'list_data_daily')}
            className='dark:bg-zinc-500 border rounded border-width-1 p-2'
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
                      legend: {position: 'bottom', labels: {color: darkMode ? '#fff' : ''}}
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
        rows={filteredListData}
      />
    </div>
  )
}