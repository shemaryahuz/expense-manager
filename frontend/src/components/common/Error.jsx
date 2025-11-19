import { Alert } from '@mui/material'

export default function Error({ error }) {
  return (
    <Alert severity="error" sx={{ mb: 2 }}>
      {error}
    </Alert>
  )
}
