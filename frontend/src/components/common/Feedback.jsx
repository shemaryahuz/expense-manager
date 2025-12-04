import { Alert, Snackbar, Typography } from "@mui/material";

export default function Feedback({
  message,
  severity = "success",
  open,
  onClose,
  anchorOrigin = { vertical: "center", horizontal: "left" },
}) {
  return (
    <Snackbar
      open={open}
      autoHideDuration={3000}
      anchorOrigin={anchorOrigin}
      onClose={onClose}
    >
      <Alert variant="filled" severity={severity} onClose={onClose}>
        <Typography variant="body1">{message}</Typography>
      </Alert>
    </Snackbar>
  );
}
