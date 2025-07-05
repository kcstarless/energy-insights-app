import { DateString, TimeString } from '@/types'

export function formatDate(dateString: DateString): string {
  if (!dateString || dateString.trim() === '') return ''
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'short',
    weekday: 'short',
  })
}

export function convertDateToISO(datePreConversion: string): DateString {
  const [day, month, year] = datePreConversion.split('/')

  const monthMap: { [key: string]: string } = {
    'Jan': '01', 'Feb': '02', 'Mar': '03', 'Apr': '04',
    'May': '05', 'Jun': '06', 'Jul': '07', 'Aug': '08',
    'Sep': '09', 'Oct': '10', 'Nov': '11', 'Dec': '12'
  }

  const monthNumber = monthMap[month]
  return `${year}-${monthNumber}-${day.padStart(2, '0')}`
}

export function indexToTimeString(index: number): TimeString {
  const hours = Math.floor(index / 2)
  const minutes = (index % 2) * 30
  return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`
}