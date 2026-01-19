import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";

import { useTranslation } from "../../hooks/i18n";

import { CategoryCardStyles as styles } from "./styles/CategoryCard.styles";

export default function DeleteCategoryForm({ open, onClose, onDelete }) {
  const { translate } = useTranslation();

  return (
    <Dialog open={open} onClose={onClose} closeAfterTransition={false}>
      <DialogTitle>{translate("Delete category")}</DialogTitle>
      <DialogContent>
        <DialogContentText>
          {translate(
            "If you delete this category, all transactions associated with it will be moved to the 'Miscellaneous' category."
          )}
        </DialogContentText>
        <DialogContentText>
          {translate(
            "This action cannot be undone, are you sure you want to delete this category?"
          )}
        </DialogContentText>
        <DialogActions>
          <Button onClick={onClose}>{translate("Cancel")}</Button>
          <Button onClick={onDelete} sx={styles.deleteButton}>
            {translate("Delete")}
          </Button>
        </DialogActions>
      </DialogContent>
    </Dialog>
  );
}
