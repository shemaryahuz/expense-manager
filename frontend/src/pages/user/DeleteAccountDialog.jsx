import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from "@mui/material";

import { useTranslation } from "../../hooks/i18n";

export default function DeleteAccountDialog({
  open,
  isLoading,
  onCancel,
  onConfirm,
}) {
  const { translate } = useTranslation();

  return (
    <Dialog open={open} onClose={onCancel} closeAfterTransition={false}>
      <DialogTitle>{translate("Delete Account")}</DialogTitle>
      <DialogContent>
        <Typography variant="body1">
          {translate("Are you sure you want to delete your account?")}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {translate(
            "This action is permanent and cannot be undone. All user data will be permanently deleted"
          )}
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={onCancel} sx={{ textTransform: "none" }}>
          {translate("Cancel")}
        </Button>
        <Button
          onClick={onConfirm}
          color="error"
          variant="contained"
          disabled={isLoading}
          sx={{ textTransform: "none" }}
        >
          {translate("Delete")}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
