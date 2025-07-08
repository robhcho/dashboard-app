import { useEffect, useState } from 'react'

export type DecileData = {
  DecileRange: string
  DecileId: number
  LostOpp: number
  CPP: number
  ROI: number
}

type LostOppData = {
  Month: string
  Data: DecileData[]
}

export const useLostOppData = () => {
  const [lostopps, setLostopps] = useState<LostOppData[] | null>(null) 
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch('mock/lostopp.json')
        if(!res.ok) throw new Error(`Failed to load: ${res.status}`)
        const data = await res.json()

        setLostopps(data)
      } catch(err: any) {
        console.error('Error fetching promos', err)
        setError(err.message || 'Unknown error')
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  return {lostopps, loading, error}
}