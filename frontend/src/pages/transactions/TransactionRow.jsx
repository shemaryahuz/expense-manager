import { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";

import { TableRow, TableCell, IconButton, Box } from "@mui/material";
import { Delete, Edit } from "@mui/icons-material";

import { deleteTransaction } from "../../features/transactions/transactionsThunks";
import { fetchCategories } from "../../features/categories/categoriesThunks";
import { selectCategories } from "../../features/categories/categoriesSelectors";

import { INCOME } from "../../constants/features/transactionsConstants";

import DeleteTransactionDialog from "./DeleteTransactionDialog";
import TransactionForm from "./TransactionForm";

export default function TransactionRow({ transaction }) {
  const dispatch = useDispatch();

  const { id, date, title, amount, type, categoryId } = transaction;
  const categories = useSelector(selectCategories);

  useEffect(() => {
    if (categories.length === 0) {
      dispatch(fetchCategories());
    }
  }, [dispatch]);

  const categoryName =
    categories.find((category) => category.id === categoryId)?.name || "None";

  const [editDialogOpen, setEditDialogOpen] = useState(false);

  const handleEditOpen = () => {
    setEditDialogOpen(true);
  };

  const handleEditClose = () => {
    setEditDialogOpen(false);
  };

  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  const handleDeleteOpen = () => {
    setDeleteDialogOpen(true);
  };

  const handleDeleteClose = () => {
    setDeleteDialogOpen(false);
  };

  const handleDelete = () => {
    dispatch(deleteTransaction(id));
  };

  return (
    <TableRow>
      <TableCell>{date}</TableCell>
      <TableCell>{title}</TableCell>
      <TableCell>{categoryName}</TableCell>
      <TableCell>
        <Box
          sx={{
            color: type === INCOME ? "green" : "red",
            display: "flex",
            alignItems: "center",
          }}
        >
          {type === INCOME ? "+ " : "- "}
          ${amount}
        </Box>
      </TableCell>

      <TableCell>
        <IconButton onClick={handleEditOpen}>
          <Edit />
        </IconButton>
        <TransactionForm
          open={editDialogOpen}
          onClose={handleEditClose}
          isExisting={true}
          existingTransaction={transaction}
        />

        <IconButton>
          <Delete onClick={handleDeleteOpen} sx={{ color: "error.dark" }} />
          <DeleteTransactionDialog
            open={deleteDialogOpen}
            onClose={handleDeleteClose}
            onDelete={handleDelete}
          />
        </IconButton>
      </TableCell>
    </TableRow>
  );
}
