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
import { clearMessage } from "../../features/categories/categoriesSlice";
import { selectCategoriesState } from "../../features/categories/categoriesSelectors";

import { STATUSES } from "../../constants/features/statusConstants";

import AlertMessage from "../../components/common/AlertMessage";

const { LOADING, FAILED, SUCCEEDED } = STATUSES;

export default function AddCategoryForm({ open, onClose }) {
  const dispatch = useDispatch();

  const [categoryName, setCategoryName] = useState("");

  const { status, message } = useSelector(selectCategoriesState);

  useEffect(() => {
    if (status === SUCCEEDED && message) {
      setCategoryName("");
      onClose();
    }
  }, [status, message]);

  const handleCategoryNameChange = ({ target: { value } }) => {
    dispatch(clearMessage());
    setCategoryName(value);
  };

  const handleClose = () => {
    setCategoryName("");
    dispatch(clearMessage());
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
      {status === FAILED && message && (
        <AlertMessage severity="error" message={message} />
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
