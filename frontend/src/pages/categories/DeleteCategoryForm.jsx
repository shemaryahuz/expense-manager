import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";

import { CategoryCardStyles as styles } from "./styles/CategoryCard.styles";

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
            sx={styles.deleteButton}
          >
            Delete
          </Button>
        </DialogActions>
      </DialogContent>
    </Dialog>
  );
}
