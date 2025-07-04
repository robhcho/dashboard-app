import { useEffect, useState } from 'react'

export type Promo = {
  promo_name: string
  promo_dates: {
    start: string
    end: string
  }
  format: string
  creatives: {
    front: string
    back: string
  }
  total_data: {
    spend: number
    mailed: number
    responses: number
    sales: number
  }
  roi: {
    status: string
    spend: number
    mailed: number
    responses: number
    sales: number
    total_sales: number
  }[]
  roi_by_market: {
    market: string
    spend: number
    mailed: number
    responses: number
    sales: number
    total_sales: number
  }
}

export const usePromoData = () => {
  const [promos, setPromos] = useState<Promo[] | null>(null)
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchPromos = async () => {
      try {
        const res = await fetch('/mock/promo.json')
        if(!res.ok) throw new Error(`Failed to load: ${res.status}`)
        const data = await res.json()
        setPromos(data)
      } catch(err: any) {
        console.error('Error fetching promos', err)
        setError(err.message || 'Unknown error')
      } finally {
        setLoading(false)
      }
    }

    fetchPromos()
  }, [])

  return { promos, loading, error }
}