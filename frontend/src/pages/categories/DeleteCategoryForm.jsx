import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";

export default function DeleteCategoryForm({ open, onClose, onDelete }) {
  return (
    <Dialog open={open} onClose={onClose} closeAfterTransition={false}>
      <DialogTitle>Delete Category</DialogTitle>
      <DialogContent>
        <DialogContentText>
          If you delete this category, all transactions associated with it will
          be moved to the "Micsellanous" category.
        </DialogContentText>
        <DialogContentText>
          This action cannot be undone, are you sure you want to delete this
          category?
        </DialogContentText>
        <DialogActions>
          <Button onClick={onClose}>Cancel</Button>
          <Button
            onClick={onDelete}
            sx={{ color: "error.dark", "&:hover": { bgcolor: "#fef0ecff" } }}
          >
            Delete
          </Button>
        </DialogActions>
      </DialogContent>
    </Dialog>
  );
}
