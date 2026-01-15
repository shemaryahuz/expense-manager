import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { TableRow, TableCell, IconButton, Box } from "@mui/material";
import { Delete, Edit } from "@mui/icons-material";

import { deleteTransaction } from "../../features/transactions/transactionsThunks";
import { fetchCategories } from "../../features/categories/categoriesThunks";
import { selectCategories } from "../../features/categories/categoriesSelectors";
import { selectCurrency } from "../../features/settings/settingsSlice";

import { useTranslation } from "../../hooks/i18n";
import { getCategoryName } from "../../utiles/categoriesUtils";

import { INCOME } from "../../constants/features/transactionsConstants";

import DeleteTransactionDialog from "./DeleteTransactionDialog";
import TransactionForm from "./TransactionForm";

export default function TransactionRow({ transaction }) {
  const dispatch = useDispatch();

  const { translate } = useTranslation();

  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  const categories = useSelector(selectCategories);

  const { symbol } = useSelector(selectCurrency);

  const { id, date, title, amount, type, categoryId } = transaction;
  const categoryName = getCategoryName(categories, categoryId) || "None";

  useEffect(() => {
    if (categories.length === 0) {
      dispatch(fetchCategories());
    }
  }, [dispatch, categories.length]);

  const handleEditOpen = () => setEditDialogOpen(true);

  const handleEditClose = () => setEditDialogOpen(false);

  const handleDeleteOpen = () => setDeleteDialogOpen(true);

  const handleDeleteClose = () => setDeleteDialogOpen(false);

  const handleDelete = () => {
    handleDeleteClose();
    dispatch(deleteTransaction(id));
  };

  return (
    <TableRow>
      <TableCell>{date}</TableCell>
      <TableCell>{title}</TableCell>
      <TableCell>{translate(categoryName)}</TableCell>
      <TableCell>
        <Box
          sx={{
            color: type === INCOME ? "green" : "red",
            display: "flex",
            alignItems: "center",
          }}
        >
          {type === INCOME ? "+ " : "- "}
          {symbol}
          {amount}
        </Box>
      </TableCell>

      <TableCell>
        <IconButton onClick={handleEditOpen}>
          <Edit />
        </IconButton>
        <TransactionForm
          open={editDialogOpen}
          onClose={handleEditClose}
          isEditMode={true}
          existingTransaction={transaction}
        />
        <IconButton onClick={handleDeleteOpen}>
          <Delete sx={{ color: "error.dark" }} />
        </IconButton>
        <DeleteTransactionDialog
          open={deleteDialogOpen}
          onClose={handleDeleteClose}
          onDelete={handleDelete}
        />
      </TableCell>
    </TableRow>
  );
}
