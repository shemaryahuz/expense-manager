import { TableRow, TableCell, IconButton } from "@mui/material";
import { Delete, Edit } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { deleteTransaction } from "../../features/transactions/transactionsThunks";
import { useEffect, useState } from "react";
import DeleteTransactionForm from "./DeleteTransactionForm";
import { fetchCategories } from "../../features/categories/categoriesThunks";

export default function TransactionRow({ transaction }) {
  const dispatch = useDispatch();
  const { categories } = useSelector((state) => state.categories);
  useEffect(() => {
    if (categories.length === 0) {
      dispatch(fetchCategories());
    }
  }, [dispatch]);

  const category =
    categories.find((category) => 
      category.id === transaction.categoryId)?.name || "None";

  const [dialogOpen, setDialogOpen] = useState(false);

  const handleOpen = () => {
    setDialogOpen(true);
  };

  const handleClose = () => {
    setDialogOpen(false);
  };

  const handleDelete = () => {
    dispatch(deleteTransaction(transaction.id));
  };
  return (
    <TableRow>
      <TableCell>{transaction.date}</TableCell>
      <TableCell>{transaction.title}</TableCell>
      <TableCell>{category}</TableCell>
      <TableCell
        sx={{ color: transaction.type === "income" ? "green" : "red" }}
      >
        {transaction.type === "income" ? "+ " : "- "}
        {transaction.amount}
      </TableCell>
      <TableCell>
        <IconButton>
          <Edit />
        </IconButton>
        <IconButton>
          <Delete onClick={handleOpen} sx={{ color: "error.dark" }} />
          <DeleteTransactionForm
            open={dialogOpen}
            onClose={handleClose}
            onDelete={handleDelete}
          />
        </IconButton>
      </TableCell>
    </TableRow>
  );
}
