import { Typography } from "@mui/material";

import AlertMessage from "../../components/common/AlertMessage";
import Feedback from "../../components/common/Feedback";

export default function ProfileHeader({
  showError,
  errorMessage,
  showSuccess,
  successMessage,
  onCloseSuccess,
}) {
  return (
    <>
      <Typography variant="h4" sx={{ fontWeight: "bold", mb: 1 }}>
        Account settings
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
        View and manage your account details.
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


