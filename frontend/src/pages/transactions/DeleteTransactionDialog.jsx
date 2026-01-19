import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";

import { useTranslation } from "../../hooks/i18n";

export default function DeleteTransactionDialog({ open, onClose, onDelete }) {
  const { translate } = useTranslation();

  return (
    <Dialog open={open} onClose={onClose} closeAfterTransition={false}>
      <DialogTitle>{translate("Delete Transaction")}</DialogTitle>

      <DialogContent>
        <DialogContentText>
          {translate(
            "This action cannot be undone, are you sure you want to delete this transaction?"
          )}
        </DialogContentText>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>{translate("Cancel")}</Button>
        <Button
          onClick={onDelete}
          sx={{ color: "error.dark", "&:hover": { bgcolor: "#fef0ecff" } }}
        >
          {translate("Delete")}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
