import { Alert } from "@mui/material";

export default function AlertMessage({ severity, message }) {
  return (
    <Alert severity={severity} sx={{ mb: 2 }}>
      {message}
    </Alert>
  );
}
