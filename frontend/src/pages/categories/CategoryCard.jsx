import { useState } from "react";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Box,
  Divider,
  Menu,
  MenuItem,
  IconButton,
  Button,
  ButtonBase,
} from "@mui/material";
import { Edit, Delete, ExpandMore, MoreVert } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import CategoryTransactions from "./CategoryTransactions";
import { INCOME_ID } from "../../features/categories/categoriesSlice";
import EditCategoryFoem from "./EditCategoryFoem";
import DeleteCategoryForm from "./DeleteCategoryForm";
import { deleteCategory } from "../../features/categories/categoriesThunks";

export default function CategoryCard({ category }) {
  const dispatch = useDispatch();

  const { categoriesTransactions: transactions } = useSelector((state) => state.transactions);

  const filteredTransactions = transactions.filter(
    (transaction) => transaction.categoryId === category.id
  );

  const amount = filteredTransactions.reduce(
    (accumulator, transaction) => accumulator + transaction.amount,
    0
  );

  const [anchorEl, setAnchorEl] = useState(null);
  const menuOpen = Boolean(anchorEl);

  const [deleteOpen, setDeleteOpen] = useState(false);

  const handleMenuClick = (event) => {
    event.stopPropagation();
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = (event) => {
    event.stopPropagation();
    setAnchorEl(null);
  };

  const handleDeleteOpen = (event) => {
    event.stopPropagation();
    setDeleteOpen(true);
  };

  const handleDeleteClose = (event) => {
    event.stopPropagation();
    setDeleteOpen(false);
  };

  const handleDelete = (event) => {
    event.stopPropagation();
    dispatch(deleteCategory(category.id));
  };

  return (
    <Accordion>
      <AccordionSummary
        expandIcon={<ExpandMore />}
        aria-controls="panel1a-content"
        id="panel1a-header"
      >
        <Box>
          <Typography variant="h5" sx={{ fontWeight: "bold", flexGrow: 1 }}>
            {category.name}
          </Typography>
          {amount > 0 && (
            <Typography
              variant="h6"
              sx={{ color: category.id === INCOME_ID ? "green" : "red" }}
            >
              {category.id === INCOME_ID ? "+ " : "- "} {amount}
            </Typography>
          )}
        </Box>
      </AccordionSummary>
      <Divider />
      <AccordionDetails sx={{ width: "100%", maxWidth: "md" }}>
        {/* show menu only for custom categories */}
        {category.userId !== null && (
          <>
            <Button
              onClick={handleMenuClick}
              startIcon={<MoreVert />}
              sx={{ textTransform: "none" }}
            >
              <Typography>Options</Typography>
            </Button>
            <Menu anchorEl={anchorEl} open={menuOpen} onClose={handleMenuClose}>
              <MenuItem onClick={() => {}} sx={{ display: "flex", gap: 1 }}>
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
            <EditCategoryFoem />
            <DeleteCategoryForm
              open={deleteOpen}
              onClose={handleDeleteClose}
              onDelete={handleDelete}
            />
          </>
        )}
        {filteredTransactions.length > 0 ? (
          <CategoryTransactions transactions={filteredTransactions} />
        ) : (
          <Typography>No transactions yet</Typography>
        )}
      </AccordionDetails>
    </Accordion>
  );
}
