import { useEffect, useState } from 'react'

export type DemoRecord = {
  metric: string
  customers: number
  customers_baseline: number
  customers_ly: number
}

export type DemoData = {
  MetricType: string
  Key: string
  Data: DemoRecord[]
}

export const useDemoData = () => {
  const [data, setData] = useState<DemoData[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch('mock/demographics.json')
        if(!res.ok) throw new Error(`Failed to load: ${res.status}`)
        const data = await res.json()
        setData(data)
      } catch (err:any) {
        console.error('Error fetching data', err)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])
  return {data, loading}
}
