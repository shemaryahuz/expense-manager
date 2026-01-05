import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from "@mui/material";

export default function DeleteAccountDialog({
  open,
  isLoading,
  onCancel,
  onConfirm,
}) {
  return (
    <Dialog open={open} onClose={onCancel}>
      <DialogTitle>Delete account</DialogTitle>
      <DialogContent>
        <Typography variant="body1">
          Are you sure you want to delete your account? This action cannot be
          undone and will permanently remove all user data.
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={onCancel} sx={{ textTransform: "none" }}>
          Cancel
        </Button>
        <Button
          onClick={onConfirm}
          color="error"
          variant="contained"
          disabled={isLoading}
          sx={{ textTransform: "none" }}
        >
          Delete account
        </Button>
      </DialogActions>
    </Dialog>
  );
}
