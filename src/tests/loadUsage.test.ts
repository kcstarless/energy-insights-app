import { loadUsage } from '@/server/loadUsage'

// Basic Tests for loadUsage function
describe('loadUsage', () => {
  it('should return a valid UsageSummary object', async () => {
    const result = await loadUsage()
    
    expect(result).toBeDefined()
    expect(result).toHaveProperty('totalKwh')
    expect(result).toHaveProperty('averageDailyKwh')
    expect(result).toHaveProperty('startDate')
    expect(result).toHaveProperty('endDate')
    expect(result).toHaveProperty('days')
  })

  it('should have positive total kWh', async () => {
    const result = await loadUsage()
    
    expect(result?.totalKwh).toBeGreaterThan(0)
  })

  it('should have valid date range', async () => {
    const result = await loadUsage()
    
    expect(result?.startDate).toBeTruthy()
    expect(result?.endDate).toBeTruthy()
    expect(result?.startDate).toMatch(/^\d{4}-\d{2}-\d{2}$/) // ISO date format
    expect(result?.endDate).toMatch(/^\d{4}-\d{2}-\d{2}$/)
  })

  it('should have at least one day of data', async () => {
    const result = await loadUsage()
    
    expect(result?.days.length).toBeGreaterThan(0)
  })

  it('should calculate average correctly', async () => {
    const result = await loadUsage()
    
    if (result) {
      const expectedAverage = result.totalKwh / result.days.length
      expect(result.averageDailyKwh).toBeCloseTo(expectedAverage, 2)
    }
  })

  it('should have valid daily usage structure', async () => {
    const result = await loadUsage()
    
    if (result && result.days.length > 0) {
      const firstDay = result.days[0]
      expect(firstDay).toHaveProperty('date')
      expect(firstDay).toHaveProperty('totalKwh')
      expect(firstDay).toHaveProperty('averageHourlyKwh')
      expect(firstDay).toHaveProperty('usagePeak')
      expect(firstDay.usagePeak).toHaveProperty('hour')
      expect(firstDay.usagePeak).toHaveProperty('kw')
    }
  })
})
