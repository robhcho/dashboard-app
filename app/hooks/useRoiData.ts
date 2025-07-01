import { useEffect, useState } from 'react'

export type RoiData = {
  Cost: number,
  Sales: number,
  Adj_Sales: number,
  Response: number,
  Adj_Response: number,
  Response_rate: number
}

export const useRoiData = () => {
  const [data, setData] = useState<RoiData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<null | string>(null)

  useEffect(() => {
    // const today = dayjs().format('YYYY-MM-DD')
    // const twelveMonthsAgo = dayjs().subtract(12, 'month').format('YYYY-MM-DD')
    const fetchData = async () => {
      try {
        const res = await fetch('/mock/roi.json')
        const data = await res.json()
        
        setData(data)        
      } catch (err) {
        console.error(err)
        setError('Failed to load ROI data')
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  return { data, loading, error}
}