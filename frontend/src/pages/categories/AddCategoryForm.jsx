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
import {
  selectCategoriesState,
  clearMessages,
} from "../../features/categories/categoriesSlice";

import { STATUSES } from "../../constants/features/statusConstants";

import AlertMessage from "../../components/common/AlertMessage";

const { LOADING, SUCCEEDED } = STATUSES;

export default function AddCategoryForm({ open, onClose }) {
  const dispatch = useDispatch();

  const [categoryName, setCategoryName] = useState("");

  const {
    actionStatus: status,
    actionError: error,
    successMessage,
  } = useSelector(selectCategoriesState);

  useEffect(() => {
    if (status === SUCCEEDED && open) {
      setCategoryName("");
      setTimeout(() => {
        dispatch(clearMessages());
        onClose();
      }, 2000);
    }
  }, [status, open]);

  const handleCategoryNameChange = (event) => {
    dispatch(clearMessages());
    const {
      target: { value },
    } = event;
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
    <Dialog
      component="form"
      onSubmit={handleAdd}
      open={open}
      onClose={onClose}
      closeAfterTransition={false}
    >
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
      {error && <AlertMessage severity="error" message={error} />}
      {successMessage && (
        <AlertMessage severity="success" message={successMessage} />
      )}
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button type="submit" sx={{ color: "success.dark" }}>
          {status === LOADING ? "Saving..." : "Add"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
