import { Typography } from "@mui/material";

import AlertMessage from "../../components/common/AlertMessage";
import Feedback from "../../components/common/Feedback";

import { useTranslation } from "../../hooks/i18n";

export default function ProfileHeader({
  showError,
  errorMessage,
  showSuccess,
  successMessage,
  onCloseSuccess,
}) {
  const { translate } = useTranslation();

  return (
    <>
      <Typography variant="h3" sx={{ fontWeight: "bold" }}>
        {translate("Account Settings")}
      </Typography>
      <Typography variant="body1" color="text.secondary">
        {translate("View and manage your account details")}
      </Typography>

      {showError && <AlertMessage severity="error" message={errorMessage} />}

      <Feedback
        open={showSuccess}
        onClose={onCloseSuccess}
        severity="success"
        message={successMessage}
      />
    </>
  );
}
