import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";

import { addCategory } from "../../features/categories/categoriesThunks";
import { selectCategoriesState } from "../../features/categories/categoriesSelectors";
import { clearMessages } from "../../features/categories/categoriesSlice";

import Error from "../../components/common/Error";
import Success from "../../components/common/Success";

export default function AddCategoryForm({ open, onClose }) {
  const dispatch = useDispatch();

  const { actionLoading, actionError, success } = useSelector(selectCategoriesState);

  const [categoryName, setCategoryName] = useState("");

  useEffect(() => {
    if (success && open) {
      setCategoryName("");
      setTimeout(() => {
        dispatch(clearMessages());
        onClose();
      }, 2000);
    }
  }, [success, open]);

  const handleCategoryNameChange = (event) => {
    dispatch(clearMessages());
    const { value } = event.target;
    setCategoryName(value);
  };

  const handleClose = () => {
    setCategoryName("");
    dispatch(clearMessages());
    onClose();
  };

  const handleAdd = (event) => {
    event.preventDefault();
    dispatch(addCategory({ name: categoryName }));
  };

  return (
    <Dialog component="form" onSubmit={handleAdd} open={open} onClose={onClose} closeAfterTransition={false}>
      <DialogTitle>Add Category</DialogTitle>
      <DialogContent>
        <TextField
          sx={{ mt: 2 }}
          required
          id="category-name"
          label="Category Name"
          variant="outlined"
          fullWidth
          onChange={handleCategoryNameChange}
        />
      </DialogContent>
      {actionError && <Error error={actionError} />}
      {success && <Success message={success} />}
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button type="submit" sx={{ color: "success.dark" }}>
          {actionLoading ? "Saving..." : "Add"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
