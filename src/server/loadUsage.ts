import { promisify } from 'util'
import { readFile } from 'fs'
import { convertDateToISO, indexToTimeString } from '@/utils/dateTimeUtils'
import { UsagePeak, DailyUsage, UsageSummary } from '@/types'
import { CSV_CONFIG, CSV_FILE_LOCATION } from './config'

const readFilePromise = promisify(readFile)

export async function loadUsage(): Promise<UsageSummary | undefined> {
  const csvRows = await loadCSV()
  if (!csvRows || csvRows.length === 0) {
    console.warn('CSV file contains no data rows')
    return undefined
  }

  let totalKwh = 0
  let startDate = ''
  let endDate = ''
  const days: DailyUsage[] = []

  for (const line of csvRows) {
    if (!line.trim()) {
      console.warn('Missing line: Data may not be accurate')
      continue
    }

    const columns = line.split(',')
    if (columns.length < CSV_CONFIG.EXPECTED_COLUMNS) {
      console.warn('Missing columns: Data may not be accurate')
      continue
    }
    
    const date = convertDateToISO(columns[CSV_CONFIG.DATE_COLUMN])
    const halfHourlyValues = getHalfHourlyValues(columns)
    const dailyTotalKwh = getDailyTotalKwh(halfHourlyValues)
    const averageHourlyKwh = dailyTotalKwh / 24
    const usagePeak = getPeakUsage(halfHourlyValues)

    if (!startDate) startDate = date
    endDate = date
    totalKwh += dailyTotalKwh
    days.push({ date, totalKwh: dailyTotalKwh, averageHourlyKwh, usagePeak })
  }

  const averageDailyKwh = totalKwh / days.length || 0

  return { 
    totalKwh, 
    averageDailyKwh, 
    startDate, 
    endDate, 
    days 
  }
}

const loadCSV = async () => {
  try {
    const data = await readFilePromise(CSV_FILE_LOCATION, 'utf8')
    return data.split('\n').slice(1)
  } catch (error) {
    console.error('Error reading CSV file:', error)
    return undefined
  }
}

const getHalfHourlyValues = (columns: string[]): number[] => {
  const values: number[] = []
  for (let i = CSV_CONFIG.FIRST_DATA_COLUMN; i <= CSV_CONFIG.LAST_DATA_COLUMN; i++) {
    values.push(parseFloat(columns[i]) || 0)
  }
  return values
}

const getDailyTotalKwh = (halfHourlyValues: number[]): number => {
  return halfHourlyValues.reduce((sum, val) => sum + val, 0)
}

const getPeakUsage = (halfHourlyValues: number[]): UsagePeak => {
  let peakValue = 0
  let peakIndex = 0

  halfHourlyValues.forEach((value, index) => {
    if (value > peakValue) {
      peakValue = value
      peakIndex = index
    }
  })
  
  return {
    hour: indexToTimeString(peakIndex),
    kw: peakValue * 2,
  }
}
