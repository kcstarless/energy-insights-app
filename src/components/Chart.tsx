import { Box, Typography, CardContent } from '@mui/material'
import { styled } from '@mui/material/styles'
import { Card } from '@mui/material'
import { 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip, 
  BarChart, 
  CartesianGrid, 
  ResponsiveContainer, 
  Cell 
} from 'recharts'
import { DailyUsage } from '@/types'
import { getBarColor, getTickDates } from '@/utils/chartUtils'

const StyledCard = styled(Card)(({ theme }) => ({
  borderRadius: 12,
  marginBottom: theme.spacing(2),
  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
}))

interface Props {
  data: DailyUsage[]
  average: number
}

export const Chart = ({ data, average }: Props) => (
  <StyledCard>
    <CardContent>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant="h6">Daily Energy Consumption</Typography>
        <Legend />
      </Box>
      
      <Box sx={{ height: 350, width: '100%' }}>
        <ResponsiveContainer>
          <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" ticks={getTickDates(data)} />
            <YAxis label={{ value: 'kWh', angle: -90, position: 'insideLeft' }} />
            <Tooltip />
            <Bar dataKey="totalKwh" name="Total Usage (kWh)" isAnimationActive={false}>
              {data.map((entry, idx) => (
                <Cell key={`cell-${idx}`} fill={getBarColor(entry.totalKwh, average)} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </Box>
    </CardContent>
  </StyledCard>
)

const Legend = () => (
  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
    <LegendItem color="#4caf50" label="Below Daily Avg" />
    <LegendItem color="#2196f3" label="Above Daily Avg" />
    <LegendItem color="#f44336" label="High Usage" />
  </Box>
)

const LegendItem = ({ color, label }: { color: string; label: string }) => (
  <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
    <Box sx={{ width: 18, height: 18, bgcolor: color, borderRadius: 0.5, border: '1px solid #ccc' }} />
    <Typography variant="body2" sx={{ ml: 0.5 }}>{label}</Typography>
  </Box>
)
