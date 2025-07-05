import { Typography, CardContent, Grid2 } from '@mui/material'
import { styled } from '@mui/material/styles'
import { Card } from '@mui/material'
import { formatDate } from '@/utils/dateTimeUtils'
import { UsageSummary } from '@/types'

const SummaryCard = styled(Card)(({ theme }) => ({
  borderRadius: 12,
  padding: theme.spacing(2),
  marginBottom: theme.spacing(5),
  color: theme.palette.primary.contrastText,
  backgroundColor: theme.palette.primary.main,
  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)',
}))

interface Props {
  data: UsageSummary
}

export const Summary = ({ data }: Props) => (
  <SummaryCard>
    <CardContent>
      <Grid2 container spacing={2}>
        <Grid2 size={{ xs: 12, md: 3 }}>
          <Typography variant="subtitle1">Total Usage</Typography>
          <Typography variant="h5" fontWeight="bold">
            {data.totalKwh.toFixed(1)} kWh
          </Typography>
        </Grid2>
        <Grid2 size={{ xs: 12, md: 3 }}>
          <Typography variant="subtitle1">Daily Average</Typography>
          <Typography variant="h5" fontWeight="bold">
            {data.averageDailyKwh.toFixed(1)} kWh
          </Typography>
        </Grid2>
        <Grid2 size={{ xs: 12, md: 4 }}>
          <Typography variant="subtitle1">Period</Typography>
          <Typography variant="h5" fontWeight="bold">
            {formatDate(data.startDate)} - {formatDate(data.endDate)}
          </Typography>
        </Grid2>
        <Grid2 size={{ xs: 12, md: 2 }}>
          <Typography variant="subtitle1">No. of Days</Typography>
          <Typography variant="h5" fontWeight="bold">
            {data.days.length}
          </Typography>
        </Grid2>
      </Grid2>
    </CardContent>
  </SummaryCard>
)
