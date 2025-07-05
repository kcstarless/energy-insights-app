import { Box, Typography, CircularProgress } from '@mui/material'

export const LoadingSpinner = () => (
  <Box sx={{ 
    display: 'flex', 
    justifyContent: 'center', 
    alignItems: 'center', 
    height: '100vh' 
  }}>
    <CircularProgress size={100} color="inherit" />
  </Box> 
)

export const ErrorDisplay = ({ error }: { error: string }) => (
  <Box sx={{ 
    display: 'flex', 
    justifyContent: 'center', 
    alignItems: 'center', 
    height: '100vh',
    flexDirection: 'column'
  }}>
    <Typography variant="h5" color="error" sx={{ mb: 2 }}>
      Error Loading Data
    </Typography>
    <Typography variant="body1" color="text.secondary">
      {error}
    </Typography>
  </Box>
)
