import { TableRow, TableCell, IconButton, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button } from "@mui/material";
import { Delete } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { deleteTransaction } from "../../features/transactions/transactionsThunks";
import { useState } from "react";

export default function TransactionRow({ transaction }) {

  const { transactions } = useSelector((state) => state.transactions);
  const dispatch = useDispatch();

  const [ dialogOpen, setDialogOpen ] = useState(false);

  const handleOpen = () => {
    setDialogOpen(true);
  }

  const handleClose = () => {
    setDialogOpen(false);
  }
  
  const handleDelete = () => {
    dispatch(deleteTransaction(transaction.id));
  }
  return (
    <TableRow>
      <TableCell>{transaction.date}</TableCell>
      <TableCell>{transaction.title}</TableCell>
      <TableCell>{transaction.category}</TableCell>
      <TableCell sx={{ color: transaction.type === "income" ? "green" : "red"}}>
        {transaction.type === "income" ? "+ " : "- "}
        {transaction.amount}
      </TableCell>
      <TableCell>
        <IconButton>
          <Delete onClick={handleOpen}/>
          <Dialog open={dialogOpen} onClose={handleClose}>
            <DialogTitle>Delete Transaction</DialogTitle>
            <DialogContent>
              <DialogContentText>
                This action cannot be undone, are you sure you want to delete this transaction?
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose}>Cancel</Button>
              <Button onClick={handleDelete}>Delete</Button>
            </DialogActions>
          </Dialog>
        </IconButton>
      </TableCell>
    </TableRow>
  );
}
