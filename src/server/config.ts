import path from 'path'

export const CSV_FILE_LOCATION = path.join(process.cwd(), 'src', 'server', 'data', 'sample.csv')

export const CSV_CONFIG = {
  EXPECTED_COLUMNS: 53,
  DATE_COLUMN: 3,
  FIRST_DATA_COLUMN: 5,
  LAST_DATA_COLUMN: 52,
  INTERVALS_PER_DAY: 48
} as const
