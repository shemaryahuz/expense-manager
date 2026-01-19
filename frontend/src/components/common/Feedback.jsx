import { Alert, Snackbar, Typography } from "@mui/material";

import { useTranslation } from "../../hooks/i18n";

export default function Feedback({
  message,
  severity = "success",
  open,
  onClose,
  anchorOrigin = { vertical: "center", horizontal: "left" },
}) {
  const { translate } = useTranslation();

  return (
    <Snackbar
      open={open}
      autoHideDuration={3000}
      anchorOrigin={anchorOrigin}
      onClose={onClose}
    >
      <Alert variant="filled" severity={severity} onClose={onClose}>
        <Typography variant="body1">{translate(message) || message}</Typography>
      </Alert>
    </Snackbar>
  );
}
