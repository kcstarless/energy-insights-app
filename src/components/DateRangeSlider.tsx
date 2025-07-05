import { Box, Slider } from '@mui/material'
import { DailyUsage } from '@/types'

interface Props {
  data: DailyUsage[]
  range: number[]
  onChange: (event: Event, newValue: number | number[]) => void
  onChangeCommitted: (event: Event | React.SyntheticEvent, newValue: number | number[]) => void
}

export const DateRangeSlider = ({ data, range, onChange, onChangeCommitted }: Props) => (
  <Box>
    <Slider
      value={range}
      onChange={onChange}
      onChangeCommitted={onChangeCommitted}
      min={0}
      max={data.length - 1}
      step={1}
      valueLabelDisplay="auto"
      valueLabelFormat={(value) => data[value]?.date || ''}
      marks={[
        { value: 0, label: data[0]?.date || 'Start' },
        { value: data.length - 1, label: data[data.length - 1]?.date || 'End' }
      ]}
      sx={{ width: '85%', mx: 'auto', display: 'block' }}
    />
  </Box>
)
