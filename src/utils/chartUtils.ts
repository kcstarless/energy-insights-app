import { DailyUsage } from '@/types'

export function getTickDates(data: DailyUsage[]): string[] {
  const n = data.length
  if (n === 0) return []
  
  const indexes = Array.from(new Set([
    0,
    Math.floor((n - 1) / 3),
    Math.floor(2 * (n - 1) / 3),
    n - 1
  ]))
  
  return indexes.map(i => data[i]?.date)
}

export function getBarColor(value: number, avg: number): string {
  if (value >= 1.5 * avg) return '#f44336' // red
  if (value > avg) return '#2196f3'        // blue
  return '#4caf50'                         // green
}
