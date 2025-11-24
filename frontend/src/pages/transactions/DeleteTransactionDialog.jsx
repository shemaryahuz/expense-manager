import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";

export default function DeleteTransactionDialog({ open, onClose, onDelete }) {
  return (
    <Dialog open={open} onClose={onClose} closeAfterTransition={false}>
      <DialogTitle>Delete Transaction</DialogTitle>

      <DialogContent>
        <DialogContentText>
          This action cannot be undone, are you sure you want to delete this
          transaction?
        </DialogContentText>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button
          onClick={onDelete}
          sx={{ color: "error.dark", "&:hover": { bgcolor: "#fef0ecff" } }}
        >
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
}
