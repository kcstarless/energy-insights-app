import { useState, useMemo } from 'react'
import { DailyUsage } from '@/types'

export const useTableSort = (data: DailyUsage[], initialField: string = 'Date') => {
  const [sortField, setSortField] = useState<string>(initialField)
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc')

  const handleSort = (field: string) => {
    const isAsc = sortField === field && sortDirection === 'asc'
    setSortDirection(isAsc ? 'desc' : 'asc')
    setSortField(field)
  }

  const getValue = (item: DailyUsage, field: string) => {
    switch (field) {
      case 'Date': return new Date(item.date).getTime()
      case 'Total': return item.totalKwh
      case 'Hourly Avg': return item.averageHourlyKwh
      case 'Peak Usage': return item.usagePeak?.kw || 0
      case 'Peak Time': return item.usagePeak?.hour || ''
      default: return 0
    }
  }

  const sortedData = useMemo(() => {
    return [...data].sort((a, b) => {
      const aValue = getValue(a, sortField)
      const bValue = getValue(b, sortField)
      const diff = aValue < bValue ? -1 : aValue > bValue ? 1 : 0
      return sortDirection === 'asc' ? diff : -diff
    })
  }, [data, sortField, sortDirection])

  return {
    sortedData,
    sortField,
    sortDirection,
    handleSort
  }
}