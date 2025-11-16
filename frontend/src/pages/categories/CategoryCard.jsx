import { useState } from "react";

import { useDispatch, useSelector } from "react-redux";

import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Box,
  Divider,
  Menu,
  MenuItem,
  Button,
  TextField,
  IconButton,
} from "@mui/material";

import { Edit, Delete, ExpandMore, MoreVert } from "@mui/icons-material";

import { selectCategoriesTransactions } from "../../features/transactions/transactionsSelectors";
import { updateCategory } from "../../features/categories/categoriesThunks";
import { deleteCategory } from "../../features/categories/categoriesThunks";
import { INCOME_ID } from "../../features/categories/categoriesSlice";

import CategoryTransactions from "./CategoryTransactions";
import DeleteCategoryForm from "./DeleteCategoryForm";

export default function CategoryCard({ category }) {
  const dispatch = useDispatch();

  const { id, userId, name } = category;
  const transactions = useSelector(selectCategoriesTransactions);

  const filteredTransactions = transactions.filter(
    (transaction) => transaction.categoryId === id
  );

  const amount = filteredTransactions.reduce(
    (accumulator, transaction) => accumulator + transaction.amount,
    0
  );

  const [anchorEl, setAnchorEl] = useState(null);
  const menuOpen = Boolean(anchorEl);

  const handleMenuClick = (event) => {
    event.stopPropagation();
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = (event) => {
    event.stopPropagation();
    setAnchorEl(null);
  };

  const [isEditing, setIsEditing] = useState(false);
  const [updatedName, setUpdatedName] = useState(name);

  const handleEdit = (event) => {
    event.stopPropagation();
    setIsEditing(true);
    handleMenuClose(event);
  };

  const handleNameChange = (event) => {
    const { value } = event.target;
    setUpdatedName(value);
  };

  const handleEditCancel = (event) => {
    event.stopPropagation();
    setIsEditing(false);
    setUpdatedName(name);
  };

  const handleEditSave = (event) => {
    event.stopPropagation();
    dispatch(updateCategory({ ...category, name: updatedName }));
    setIsEditing(false);
  };

  const [deleteOpen, setDeleteOpen] = useState(false);

  const handleDeleteOpen = (event) => {
    event.stopPropagation();
    setDeleteOpen(true);
    handleMenuClose(event);
  };

  const handleDeleteClose = (event) => {
    event.stopPropagation();
    setDeleteOpen(false);
  };

  const handleDelete = (event) => {
    event.stopPropagation();
    dispatch(deleteCategory(category.id));
    handleDeleteClose(event);
  };

  return (
    <Accordion sx={{ position: "relative" }}>
      <AccordionSummary
        expandIcon={<ExpandMore />}
        aria-controls="panel1a-content"
        id="panel1a-header"
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            width: "100%",
            justifyContent: "space-between",
          }}
        >
          {isEditing ? (
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1,
                flexGrow: 1,
              }}
              onClick={(event) => event.stopPropagation()}
            >
              <TextField
                variant="standard"
                autoFocus
                value={updatedName}
                onChange={handleNameChange}
                sx={{
                  "& .MuiInputBase-input": {
                    typography: "h5",
                    fontWeight: "bold",
                  },
                }}
              />
            </Box>
          ) : (
            <Box sx={{ flexGrow: 1 }}>
              <Typography variant="h5" sx={{ fontWeight: "bold" }}>
                {name}
              </Typography>
              {amount > 0 && (
                <Typography
                  variant="h6"
                  sx={{ color: id === INCOME_ID ? "green" : "red" }}
                >
                  {id === INCOME_ID ? "+ " : "- "} {amount}
                </Typography>
              )}
            </Box>
          )}
        </Box>
      </AccordionSummary>
      <Divider />

      <AccordionDetails sx={{ width: "100%", maxWidth: "md" }}>
        {isEditing && (
          <Box sx={{ display: "flex", gap: 1, mb: 2 }}>
            <Button onClick={handleEditSave} disabled={!updatedName}>
              Save
            </Button>
            <Button onClick={handleEditCancel}>Cancel</Button>
          </Box>
        )}
        {userId !== null && !isEditing && (
          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-end",
            }}
          >
            <IconButton onClick={handleMenuClick}>
              <MoreVert />
            </IconButton>

            <Menu anchorEl={anchorEl} open={menuOpen} onClose={handleMenuClose}>
              <MenuItem onClick={handleEdit} sx={{ display: "flex", gap: 1 }}>
                <Edit />
                <Typography>Rename category</Typography>
              </MenuItem>
              <MenuItem
                onClick={handleDeleteOpen}
                sx={{ display: "flex", gap: 1 }}
              >
                <Delete sx={{ color: "error.dark" }} />
                <Typography>Delete category</Typography>
              </MenuItem>
            </Menu>
          </Box>
        )}

        <DeleteCategoryForm
          open={deleteOpen}
          onClose={handleDeleteClose}
          onDelete={handleDelete}
        />
        {filteredTransactions.length > 0 ? (
          <CategoryTransactions transactions={filteredTransactions} />
        ) : (
          <Typography>No transactions yet</Typography>
        )}
      </AccordionDetails>
    </Accordion>
  );
}
