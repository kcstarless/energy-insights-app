import { useState, useEffect, useCallback } from 'react'
import { Box, Tab, Tabs, Typography } from '@mui/material'
import { useEnergyData } from '@/hooks/useEnergyData'
import { useFilteredData } from '@/hooks/useFilteredData'
import { Summary } from '@/components/Summary'
import { DateRangeSlider } from '@/components/DateRangeSlider'
import { Chart } from '@/components/Chart'
import { DataTable } from '@/components/DataTable'
import { LoadingSpinner, ErrorDisplay } from '@/components/UIStates'

const EnergyUsageDashboard = () => {
  const [tabValue, setTabValue] = useState(0)
  const [sliderRange, setSliderRange] = useState<number[]>([])
  const [dataRange, setDataRange] = useState<number[]>([])

  const { data, loading, error } = useEnergyData()

  useEffect(() => {
    if (data?.days.length) {
      const initialRange = [data.days.length - 30, data.days.length - 1]
      setSliderRange(initialRange)
      setDataRange(initialRange)
    }
  }, [data])

  const filteredData = useFilteredData(data, dataRange)

  const handleSliderChange = useCallback((event: Event | React.SyntheticEvent, newValue: number | number[]) => {
    setSliderRange(newValue as number[])
  }, [])

  const handleSliderChangeCommitted = useCallback((event: Event | React.SyntheticEvent, newValue: number | number[]) => {
    setDataRange(newValue as number[])
  }, [])

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue)
  }

  if (error) return <ErrorDisplay error={error} />
  if (loading) return <LoadingSpinner />
  if (!data || !filteredData) return null

  return (
    <Box sx={{ maxWidth: 1200, margin: '0 auto', padding: 5 }}>
      <Typography variant="h4" sx={{ fontWeight: 'bold', marginBottom: '40px' }}>
        Energy Usage Dashboard
      </Typography>

      <Summary data={filteredData} />
      
      <DateRangeSlider 
        data={data.days} 
        range={sliderRange} 
        onChange={handleSliderChange}
        onChangeCommitted={handleSliderChangeCommitted}
      />
      
      <Tabs value={tabValue} onChange={handleTabChange} sx={{ mb: 2 }} variant="fullWidth">
        <Tab label="Daily Usage Chart" />
        <Tab label="Detailed Usage" />
      </Tabs>

      {tabValue === 0 && (
        <Chart data={filteredData.days} average={filteredData.averageDailyKwh} />
      )}
      {tabValue === 1 && (
        <DataTable data={filteredData.days} />
      )}
    </Box>
  )
}

export default EnergyUsageDashboard
