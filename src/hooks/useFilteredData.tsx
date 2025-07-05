import { useMemo } from 'react'
import { UsageSummary } from '@/types'

export const useFilteredData = (data: UsageSummary | undefined, dateRange: number[]) => {
  return useMemo(() => {
    if (!data?.days.length) return data
    
    const filteredDays = data.days.slice(dateRange[0], dateRange[1] + 1)
    const newTotalKwh = filteredDays.reduce((sum, day) => sum + day.totalKwh, 0)
    
    return {
      totalKwh: newTotalKwh,
      averageDailyKwh: newTotalKwh / filteredDays.length || 0,
      startDate: filteredDays[0]?.date || data.startDate,
      endDate: filteredDays[filteredDays.length - 1]?.date || data.endDate,
      days: filteredDays
    }
  }, [data, dateRange])
}