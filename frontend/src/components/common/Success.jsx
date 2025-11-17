import { Alert } from '@mui/material'

export default function Success({ message }) {
  return (
    <Alert severity="success">
      {message}
    </Alert>
  )
}