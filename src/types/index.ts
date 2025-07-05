export type DateString = string
export type TimeString = string

export interface UsagePeak {
  hour: TimeString
  kw: number
}

export interface DailyUsage {
  date: DateString
  totalKwh: number
  averageHourlyKwh: number
  usagePeak: UsagePeak
}

export interface UsageSummary {
  totalKwh: number
  averageDailyKwh: number
  startDate: DateString
  endDate: DateString
  days: DailyUsage[]
}
