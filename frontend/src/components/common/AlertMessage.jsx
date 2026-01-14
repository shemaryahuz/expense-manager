import { Alert } from "@mui/material";

import { useTranslation } from "../../hooks/i18n";

export default function AlertMessage({ severity, message }) {
  const { translate } = useTranslation();

  return (
    <Alert severity={severity} sx={{ mt: 2, mb: 2 }}>
      {translate(message)}
    </Alert>
  );
}
