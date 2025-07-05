import { formatDate, convertDateToISO, indexToTimeString } from '@/utils/dateTimeUtils'

describe('dateTimeUtils', () => {
  describe('formatDate', () => {
    it('formats date string correctly', () => {
      expect(formatDate('2021-02-28')).toBe('Sun, Feb 28')
    })

    it('handles empty string', () => {
      expect(formatDate('')).toBe('')
    })
  })

  describe('convertDateToISO', () => {
    it('converts DD/MMM/YYYY to YYYY-MM-DD format', () => {
      expect(convertDateToISO('28/Feb/2021')).toBe('2021-02-28')
    })

    it('converts with single digit day', () => {
      expect(convertDateToISO('5/Jan/2020')).toBe('2020-01-05')
    })
  })

  describe('indexToTimeString', () => {
    it('converts index 0 to 00:00', () => {
      expect(indexToTimeString(0)).toBe('00:00')
    })

    it('converts index 1 to 00:30', () => {
      expect(indexToTimeString(1)).toBe('00:30')
    })
  })
})
