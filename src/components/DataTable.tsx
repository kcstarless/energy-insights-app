import { 
  Chip, 
  Paper, 
  Table, 
  TableRow, 
  TableCell, 
  TableHead, 
  TableBody, 
  Typography, 
  CardContent, 
  TableSortLabel, 
  TableContainer 
} from '@mui/material'
import { styled } from '@mui/material/styles'
import { Card } from '@mui/material'
import { DailyUsage } from '@/types'
import { formatDate } from '@/utils/dateTimeUtils'
import { useTableSort } from '@/hooks/useTableSort'

const StyledCard = styled(Card)(({ theme }) => ({
  borderRadius: 12,
  marginBottom: theme.spacing(2),
  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
}))

interface Props {
  data: DailyUsage[]
}

export const DataTable = ({ data }: Props) => {
  const { sortedData, sortField, sortDirection, handleSort } = useTableSort(data)

  return (
    <StyledCard>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Daily Usage Details
        </Typography>
        <TableContainer component={Paper} sx={{ boxShadow: 'none' }}>
          <Table>
            <TableHead>
              <TableRow>
                <SortableHeader field="Date" current={sortField} direction={sortDirection} onSort={handleSort} />
                <SortableHeader field="Total" current={sortField} direction={sortDirection} onSort={handleSort} align="right" suffix="(kWh)" />
                <SortableHeader field="Hourly Avg" current={sortField} direction={sortDirection} onSort={handleSort} align="right" suffix="(kWh)" />
                <SortableHeader field="Peak Usage" current={sortField} direction={sortDirection} onSort={handleSort} align="right" />
                <SortableHeader field="Peak Time" current={sortField} direction={sortDirection} onSort={handleSort} align="right" />
              </TableRow>
            </TableHead>
            <TableBody>
              {sortedData.map((day) => (
                <TableRow key={day.date} hover>
                  <TableCell>{formatDate(day.date)}</TableCell>
                  <TableCell align="right">{day.totalKwh.toFixed(1)}</TableCell>
                  <TableCell align="right">{day.averageHourlyKwh.toFixed(2)}</TableCell>
                  <TableCell align="right">
                    {day.usagePeak && (
                      <Chip
                        label={`${day.usagePeak.kw.toFixed(1)} kW`}
                        color={day.usagePeak.kw > 1.5 ? 'error' : 'success'}
                        size="small"
                      />
                    )}
                  </TableCell>
                  <TableCell align="right">{day.usagePeak?.hour}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </CardContent>
    </StyledCard>
  )
}

interface SortableHeaderProps {
  field: string
  current: string
  direction: 'asc' | 'desc'
  onSort: (field: string) => void
  align?: 'left' | 'right'
  suffix?: string
}

const SortableHeader = ({ field, current, direction, onSort, align, suffix }: SortableHeaderProps) => (
  <TableCell align={align}>
    <TableSortLabel
      active={current === field}
      direction={current === field ? direction : 'asc'}
      onClick={() => onSort(field)}
    >
      <Typography fontWeight="bold">
        {field}{suffix}
      </Typography>
    </TableSortLabel>
  </TableCell>
)
