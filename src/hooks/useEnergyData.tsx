import { useState, useEffect } from 'react'
import { UsageSummary } from '@/types'

export const useEnergyData = () => {
  const [data, setData] = useState<UsageSummary | undefined>(undefined)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        setError(null)
        
        const resp = await fetch('/api/usage')
        
        if (!resp.ok) {
          setError(`Failed to load energy data (Error: ${resp.status})`)
          return
        }
        
        const data: UsageSummary = await resp.json()
        setData(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load data, please check your network')
        console.error('Error fetching energy data:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  return { data, loading, error }
}
