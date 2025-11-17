import { useState } from "react";
import { useDispatch } from "react-redux";

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";

import Error from "../../components/common/Error";

import { addCategory } from "../../features/categories/categoriesThunks";

export default function AddCategoryForm({ open, onClose }) {
  const dispatch = useDispatch();

  const [categoryName, setCategoryName] = useState("");
  const [error, setError] = useState("");

  const handleCategoryNameChange = (event) => {
    setError("");
    const { value } = event.target;
    setCategoryName(value);
  };

  const handleClose = () => {
    setCategoryName("");
    setError("");
    onClose();
  };

  const handleAdd = () => {
    if (!categoryName) {
      setError("Category name is required");
      return;
    }
    dispatch(addCategory({ name: categoryName }));
    handleClose();
  };

  return (
    <Dialog open={open} onClose={onClose} closeAfterTransition={false}>
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
      {error && <Error error={error} />}
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleAdd} sx={{ color: "success.dark" }}>
          Add
        </Button>
      </DialogActions>
    </Dialog>
  );
}
