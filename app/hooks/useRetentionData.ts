import { useEffect, useState } from 'react'

export type RetentionEntry = {
  yearmo: string
  customers_new: number
  customers_new_ly: number
  customers_ret: number
  customers_ret_ly: number
  avg_ticket_new: number
  avg_ticket_ret: number
}

export const useRetentionData = () => {
  const [data, setData] = useState<RetentionEntry[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch('/mock/custretention.json')
        if(!res.ok) throw new Error(`HTTP error ${res.status}`)
        const json = await res.json()
        setData(json)        
      } catch (err: any) {
        console.error('Error fetching data')
        setError(err.message || 'Unknown error')
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  return { data, loading, error}
}